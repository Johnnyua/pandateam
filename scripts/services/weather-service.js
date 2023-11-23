import { getWeatherApi } from '../helpers/api-helper.js';
import { config } from '../config/config.js';
import {
  convertFromGMTToDate,
  createIconUrl,
  calcAvgTemp,
  formatDateLocale,
  formatTimeLocale
} from '../helpers/index.js';
const loadCurrentWeather = async (params) => {
  try {
    const query = {
      cnt: config.numberOfDayTimestamps,
      ...params,
    };
    const result = await getWeatherApi(config.forecastUrl, query);
    if (!result.data) {
      throw new Error('No data');
    }
    const data = result.data;
    const weatherList = data.list.map((item) => {
      const date = convertFromGMTToDate(item.dt);
      const iconLink = createIconUrl(item.weather[0].icon);
      const weatherItem = {
        id: item.weather[0].id,
        date: formatTimeLocale(date),
        iconLink: iconLink,
        temp: Math.round(item.main.temp),
        description: item.weather[0].description,
      };
      return weatherItem;
    });
    const placesWeather = {
      placeId: data.city.id,
      placeName: data.city.name,
      lat: data.city.coord.lat,
      lon: data.city.coord.lon,
      weatherList: weatherList,
    };
    return placesWeather;
  } catch (error) {
    console.log(error.message);
  }
};

const loadWeatherFor5Days = async (params = {}) => {
  try {
    const query = {
      cnt: config.numberOfWeekTimestamps,
      ...params,
    };
    const result = await getWeatherApi(config.forecastUrl, query);
    if (!result.data) {
      throw new Error('No data');
    }
    const data = result.data;
    const weatherList = data.list.map((item) => {
      const date = convertFromGMTToDate(item.dt);
      const iconLink = createIconUrl(item.weather[0].icon);
      const weatherItem = {
        id: item.weather[0].id,
        date: formatDateLocale(date),
        iconLink: iconLink,
        temp: Math.round(item.main.temp),
        description: item.weather[0].description,
      };
      return weatherItem;
    });

    const weatherGroupObj = Object.groupBy(weatherList, ({ date }) => date);
    const weatherGroupList = calcAvgTemp(weatherGroupObj);
    const placesWeather = {
      placeId: data.city.id,
      placeName: data.city.name,
      lat: data.city.coord.lat,
      lon: data.city.coord.lon,
      weatherList: weatherGroupList,
    };
    return placesWeather;
  } catch (error) {
    console.log(error.message);
  }
};

export { loadCurrentWeather, loadWeatherFor5Days };
