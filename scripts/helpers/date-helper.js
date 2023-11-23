import { useLangStore } from '../store/index.js';

const langState = () => {
  const langStore = useLangStore();
  return langStore.state;
};

const convertFromGMTToDate = (dt) => {
  const date = new Date(dt * 1000);
  return date;
};

const formatDateLocale = (date) => {
  const langStore = langState();
  return new Intl.DateTimeFormat(langStore.lang, {
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(date).replace('г.', '');
};

const formatTimeLocale = (date) => {
  const langStore = langState();
  return new Intl.DateTimeFormat(langStore.lang, {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};

export { convertFromGMTToDate, formatDateLocale, formatTimeLocale };
