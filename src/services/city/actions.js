import axios from "axios";
import * as types from "./types";

export function getCity(name: string) {
  return {
    type: types.GET_CITY,
    promise: axios.get(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10&namePrefix=${name}`)
  };
}

export function setCity(name: string) {
  return {
    type: types.SET_CITY,
    promise: axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&APPID=d16ff0f9235d79ddab7efe987d9bb201`)
  };
}

export function delCity(index: number) {
  return {
    type: types.DEL_CITY,
    index
  };
}

export function getTempCity(lat: number, lon: number) {
  return {
    type: types.GET_TEMP_CITY,
    promise: axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=d16ff0f9235d79ddab7efe987d9bb201`)
  };
}
