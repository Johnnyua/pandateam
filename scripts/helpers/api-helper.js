import { config } from '../config/config.js';
import { useLangStore } from '../store/index.js';

const langState = () => {
  const langStore = useLangStore();
  return langStore.state;
};

const getWeatherApi = async (url, query = {}) => {
  const langStore = langState();
  Object.assign(query, {
    appid: config.apiKey,
    lang: langStore.lang,
    units: config.weatherUnits,
  });
  const params = { ...query };
  const data = await axios.get(url, { params: params });
  return data;
};

const getIPGeoApi = async () => {
  const data = await axios.get(config.ipUrl);
  return data;
};

const getPlacesApi = async (value) => {
  const params = {
    format: 'json',
    text: value,
    apiKey: config.apiKeyAuto,
  };
  const data = await axios.get(config.apiAuto, { params: params });
  return data;
};

export { getWeatherApi, getIPGeoApi, getPlacesApi };
