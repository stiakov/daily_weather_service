import {owmKey} from "./setup";

export const getWeather = async (location) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?id=${location}&appid=${owmKey}`;
  const response =  await fetch(url);
  return response.json();
};

const convertKtoF = (val) => Math.round((val - 273.15) * (9 / 5) + 32);
const convertKtoC = (val) => Math.round(val - 273.15);

export const getKtoF = (k) => `${convertKtoF(k)}ºF`;
export const minmaxKtoF = (min, max) => `▼ ${convertKtoF(min)}º  –  ▲ ${convertKtoF(max)}º`;

export const getKtoC = (k) => `${convertKtoC(k)}ºC`;
export const minmaxKtoC = (min, max) => `▼ ${convertKtoC(min)}º  –  ▲ ${convertKtoC(max)}º`;

export const getWeatherIcon = (str) => `http://openweathermap.org/img/wn/${str}@2x.png`
