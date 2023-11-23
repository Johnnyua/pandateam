import {
  API_KEY_WEATHER,
  API_KEY_IP,
  API_KEY_AUTOCOMPLETE,
} from './api_keys.js';

const BASE_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast';
const BASE_URL_IP = 'https://ipgeolocation.abstractapi.com/v1/?api_key=';
const BASE_URL_AUTOCOMPLETE =
  'https://api.geoapify.com/v1/geocode/autocomplete';
const BASE_URL_WEATHER_ICON =
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/';
// Put your API keys here

const config = {
  forecastUrl: BASE_URL_FORECAST,
  apiKey: API_KEY_WEATHER,
  favoriteKey: 'favotitecities',
  ipUrl: BASE_URL_IP + API_KEY_IP,
  apiKeyAuto: API_KEY_AUTOCOMPLETE,
  apiAuto: BASE_URL_AUTOCOMPLETE,
  iconUrl: BASE_URL_WEATHER_ICON,
  citiesQuantity: 5,
  numberOfWeekTimestamps: 72,
  numberOfDayTimestamps: 4,
  weatherUnits: 'metric',
};

const locale = {
  ua: {
    btn: {
      add: 'Додати',
      addToFav: 'В обране',
      del: 'Видалити',
      delFromFav: 'Видалити з обраного',
      close: 'Закрити',
      confirm: 'Підтвердити',
    },
    tab: {
      main: 'Головна',
      fav: 'Обране',
      day: 'День',
      week: 'Тиждень',
    },
    title: {
      modalDel: 'Видалити зі списку',
      chartTitle: 'Температура за період',
    },
    text: {
      delPlaceFromList: ' буде видалено зі списку.\n Підтверджуєте?',
    },
  },
  en: {
    btn: {
      add: 'Add',
      addToFav: 'Add to favotite',
      del: 'Delete',
      delFromFav: 'Delete from favorite',
      close: 'Close',
      confirm: 'Confirm',
    },
    tab: {
      main: 'Main',
      fav: 'Favorite',
      day: 'Day',
      week: 'Week',
    },
    title: {
      modalDel: 'Delete from list',
      chartTitle: 'Temperature by period',
    },
    text: {
      delPlaceFromList: ' will be removed from the list.\n Do you confirm?',
    },
  },
};
export { config, locale };
