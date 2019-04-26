// @flow

import React, { PureComponent } from "react";
import classNames from "classnames";

import { IconClose } from "../../../../components/icons.jsx";

import styles from "./style.scss";

interface props {
  cityName: string;
  temp: number;

  removeCite(): void;
}

interface State {}

export default class City extends PureComponent<props, State> {
  render() {
    const { cityName, removeCite, temp } = this.props;

    return (
      <article className={classNames(styles.article)}>
        <i className={classNames(styles.article_close)} onClick={() => removeCite()}>
          <IconClose />
        </i>
        <header className={classNames(styles.article_header)}>{cityName}</header>
        <p className={classNames(styles.article_info)}>{temp} °C</p>
      </article>
    );
  }
}
