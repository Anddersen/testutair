// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Select from "react-select";

import City from "./components/city/index.jsx";

import * as actionsCity from "../../services/city/actions";

import styles from "./style.scss";

interface props {
  cities: Array<string | null>;
  citiesSelected: Array<{ name: string, temp: number } | null>;
  tempMycity: { name: string, temp: number };

  getCity(string): Promise<any>;
  getTempCity(lat: number, lon: number): Promise<any>;
  setCity(string): void;
  delCity(string): void;
}

interface State {
  statusNavigator: boolean;
}

class Main extends Component<props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      statusNavigator: false
    };
  }

  componentDidMount() {
    const { getCity, getTempCity } = this.props;
    getCity("");

    navigator.geolocation.getCurrentPosition((position: any) => {
      this.setState({ statusNavigator: true });
      getTempCity(position.coords.latitude, position.coords.longitude);
    });
  }

  onInputChange(name: string) {
    const { getCity } = this.props;
    getCity(name);
  }

  handleChange(e: any) {
    const { setCity } = this.props;
    const cityName = e.label;

    setCity(cityName);
  }

  removeCite(index: number) {
    const { delCity } = this.props;
    delCity(index);
  }

  render() {
    const { cities, citiesSelected, tempMycity } = this.props;
    const { statusNavigator } = this.state;

    const options = cities.map(e => {
      if (e) {
        return { value: e, label: e };
      }
    });

    const citiesList = citiesSelected.map((e, t) => {
      if (e) {
        return <City key={t} cityName={e.name} temp={e.temp} removeCite={() => this.removeCite(t)} />;
      }
    });

    return (
      <section className={classNames(styles.main)}>
        <header className={classNames(styles.main_header)}>utair test</header>
        <section className={classNames(styles.main_content)}>
          <div>
            {statusNavigator ? (
              <p className={classNames(styles.main_content_mycity)}>
                Your city: {tempMycity.name} {tempMycity.temp} °C
              </p>
            ) : null}
            <h1>Choose city</h1>
            <Select
              options={options}
              onInputChange={name => this.onInputChange(name)}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <div className={classNames(styles.main_content_items)}>{citiesList}</div>
          </div>
        </section>
      </section>
    );
  }
}

export default connect(
  state => ({
    cities: state.city.cities,
    citiesSelected: state.city.citiesSelected,
    tempMycity: state.city.tempMycity
  }),
  {
    getCity: actionsCity.getCity,
    setCity: actionsCity.setCity,
    delCity: actionsCity.delCity,
    getTempCity: actionsCity.getTempCity
  }
)(Main);
