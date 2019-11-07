import {owmKey} from "./setup";

export const getWeather = async (location) => {
  console.log('location', location);
  const url = `https://api.openweathermap.org/data/2.5/weather?id=${location}&appid=${owmKey}`;
  const response =  await fetch(url);
  return response.json();
};

const convertKtoF = (val) => Math.round((val - 273.15) * (9 / 5) + 32);
const convertKtoC = (val) => Math.round(val - 273.15);

export const getKtoF = (k) => `${convertKtoF(k)}ºF`;
export const minmaxKtoF = (min, max) => `min ${convertKtoF(min)} / max ${convertKtoF(max)}`;

export const getKtoC = (k) => `${Math.round(k - 273.15)}ºC`;
export const minmaxKtoC = (min, max) => `min ${convertKtoC(min)}º / max ${convertKtoC(max)}º`;
