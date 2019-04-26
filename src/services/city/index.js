// @flow
import * as types from "./types";

type State = {
  cities: Array<string | null>,
  citiesSelected: Array<{ name: string, temp: number } | null>,
  tempMycity: { name: string, temp: number }
};

const initialState: State = {
  cities: [],
  citiesSelected: [],
  tempMycity: { name: "", temp: 0 }
};

export default function city(state: State = initialState, action: Object): State {
  var result = Object.assign({}, state);

  switch (action.type) {
    case types.GET_CITY + "_REQUEST": {
      result.cities = [];
      break;
    }

    case types.GET_CITY + "_SUCCESS": {
      const cities = action.result.data.data.map(e => {
        return e.city + ", " + e.countryCode;
      });
      result.cities = cities;
      break;
    }

    case types.SET_CITY + "_SUCCESS": {
      result.citiesSelected = [
        ...result.citiesSelected,
        { name: action.result.data.name + "," + action.result.data.sys.country, temp: action.result.data.main.temp }
      ];
      break;
    }

    case types.DEL_CITY: {
      result.citiesSelected = result.citiesSelected.filter((e, t) => {
        return t !== action.index;
      });
      break;
    }

    case types.GET_TEMP_CITY + "_SUCCESS": {
      result.tempMycity = { name: action.result.data.name + "," + action.result.data.sys.country, temp: action.result.data.main.temp };
      break;
    }

    default:
      return result;
  }

  return result;
}
