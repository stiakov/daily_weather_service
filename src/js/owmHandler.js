import {owmKey} from "./setup";

export const getWeather = async (location) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${owmKey}`;
  const response =  await fetch(url);
  return response.json();
};