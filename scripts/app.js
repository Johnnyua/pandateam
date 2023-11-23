import { storage } from './storage/storage.js';
import { config, locale } from './config/config.js';
import {
  renderWeather,
  renderPlacesAutocomplete,
  renderLangChange,
  cityInputEl,
  favoriteBtnEl,
  favoriteBtnTextEl,
  langLink,
  cityAddBtnEl,
  periodTabEl,
  mainTabEl,
  weatherContainer,
} from './dom/index.js';
import { proxy, proxySubscribe } from './global/index.js';
import {
  LocationService,
  WeatherService,
  AutocompleteService,
} from './services/index.js';
import {
  createElement,
  filterObjectList,
  getActivePeriodTab,
  getMainPeriodTab,
} from './helpers/index.js';
import { useLangStore } from './store/index.js';
import { showModal, showLoader, hideLoader } from './dom/components/index.js';

langLink.forEach((elem) => {
  elem.addEventListener('click', handleChangeLanguage);
});
mainTabEl.forEach((elem) => {
  elem.addEventListener('click', handleMainTabsChange);
});
periodTabEl.forEach((elem) => {
  elem.addEventListener('click', handleTabPeriodChange);
});
cityInputEl.addEventListener('input', handlePlaceNameInput);
favoriteBtnEl.addEventListener('click', handleFavoriteClick);
cityAddBtnEl.addEventListener('click', handleAddClick);

const placeProxy = proxy({});
let placesListProxy = proxy([]);
proxySubscribe(placesListProxy, 'value', async () => await loadWeather());
const lang = proxy('ua');
proxySubscribe(lang, 'value', () => renderLangChange());
let placesWeatherListProxy = proxy([]);
proxySubscribe(placesWeatherListProxy, 'value', () =>
  renderWeather(placesWeatherListProxy, deletePlace)
);
const placesAutocompleteProxy = proxy([]);
proxySubscribe(placesAutocompleteProxy, 'value', () =>
  renderPlacesAutocomplete(placesAutocompleteProxy, choosePlace)
);

function handleChangeLanguage(e) {
  const activeLang = document.querySelector('.lang__link.active');
  if (!e.target.classList.contains('active')) {
    activeLang.classList.remove('active');
    e.target.classList.add('active');
  }
  const languageValue = e.target.innerHTML.toLowerCase();
  const langStore = useLangStore();
  langStore.setLanguage(languageValue);
  lang.value = languageValue;
  loadWeather();
}

async function handleMainTabsChange(e) {
  const activeMainTab = getMainPeriodTab();
  if (!e.target.classList.contains('active')) {
    activeMainTab.classList.remove('active');
    e.target.classList.add('active');
  }
  const activeMainTabName = e.target.getAttribute('data-tab');
  if (activeMainTabName === 'maintab') {
    placesListProxy.splice(0, placesListProxy.length, { ...placeProxy });
  }
  if (activeMainTabName === 'favoritetab') {
    const favoriteCities = storage.get(config.favoriteKey);
    placesListProxy.splice(
      0,
      placesListProxy.length,
      ...(favoriteCities || [])
    );
  }
}

async function handleTabPeriodChange(e) {
  const activePeriodTab = getActivePeriodTab();
  if (!e.target.classList.contains('active')) {
    activePeriodTab.classList.remove('active');
    e.target.classList.add('active');
  }
  loadWeather();
}

async function handlePlaceNameInput(e) {
  checkFavoritePlace(e.target.value);
  const places = await AutocompleteService.loadPlaces(e.target.value);
  placesAutocompleteProxy.splice(0, placesAutocompleteProxy.length, ...places);
}

async function handleAddClick() {
  if (placesListProxy.length < config.citiesQuantity) {
    const index = [...placesListProxy].findIndex((item) => {
      return item.placeId === placeProxy.placeId;
    });
    if (index === -1) {
      placesListProxy.push({ ...placeProxy });
    }
  }
}

function handleFavoriteClick(e) {
  if (!Object.keys(placeProxy).length) {
    console.log('Enter city');
    return;
  }
  const cityIsFaforite = checkFavoritePlace(placeProxy.placeName);
  addRemoveFavoriteCities(placeProxy, cityIsFaforite);
}

const addRemoveFavoriteCities = (value, remove = true) => {
  const favoriteList = storage.get(config.favoriteKey);
  const activeMainTab = getMainPeriodTab();
  const activeMainTabName = activeMainTab.getAttribute('data-tab');
  if (!favoriteList) {
    const newFavoriteList = [];
    newFavoriteList.push(value);
    storage.set(config.favoriteKey, newFavoriteList);
    addRemoveFavoriteClass(remove);
    if (activeMainTabName === 'favoritetab') {
      placesListProxy.push(value);
    }
    return;
  }

  if (remove) {
    const changedList = filterObjectList(
      favoriteList,
      'placeName',
      value.placeName
    );
    storage.set(config.favoriteKey, changedList);
    addRemoveFavoriteClass(remove);
    if (activeMainTabName === 'favoritetab') {
      placesListProxy.splice(0, placesListProxy.length, ...changedList);
    }
  } else {
    if (favoriteList.length < config.citiesQuantity) {
      favoriteList.push(value);
      storage.set(config.favoriteKey, favoriteList);
      addRemoveFavoriteClass(remove);
      if (activeMainTabName === 'favoritetab') {
        placesListProxy.push(value);
      }
    } else {
      console.log('List is full');
    }
  }
};

const addRemoveFavoriteClass = (remove = true) => {
  if (remove) {
    favoriteBtnEl.classList.remove('active');
    favoriteBtnTextEl.innerHTML = locale[lang.value].btn.addToFav;
  } else {
    favoriteBtnEl.classList.add('active');
    favoriteBtnTextEl.innerHTML = locale[lang.value].btn.delFromFav;
  }
};

const deletePlace = async (e, value) => {
  const modalBodyElement = createElement({
    tagName: 'div',
    className: 'modal__body',
  });
  modalBodyElement.innerHTML =
    value.placeName + locale[lang.value].text.delPlaceFromList;
  showModal({
    title: locale[lang.value].title.modalDel,
    bodyElement: modalBodyElement,
    onClose: () => {},
    onConfirm: () => confirmDeletePlace(value),
  });
};

const confirmDeletePlace = (value) => {
  const changedList = filterObjectList(
    placesWeatherListProxy,
    'placeId',
    value.placeId
  );
  placesListProxy.splice(0, placesListProxy.length, ...changedList);
};

const choosePlace = (e, value) => {
  e.stopPropagation();
  cityInputEl.value = value.placeName;
  Object.assign(placeProxy, value);
  checkFavoritePlace(value.placeName);
  placesAutocompleteProxy.splice(0, placesAutocompleteProxy.length);
};

const checkFavoritePlace = (value) => {
  const favoriteList = storage.get(config.favoriteKey);
  if (!favoriteList) {
    return false;
  }
  const isFavorite = favoriteList.some((item) => item.placeName === value);
  addRemoveFavoriteClass(!isFavorite);
  return isFavorite;
};

const loadWeather = async () => {
  try {
    const loaderElement = showLoader();
    weatherContainer.append(loaderElement);
    const avtivePeriodTab = getActivePeriodTab();
    const activePeriodTabName = avtivePeriodTab.getAttribute('data-tabperiod');
    const weatherData = await Promise.all(
      placesListProxy.map(async (place) => {
        let result;
        if (activePeriodTabName === 'dayWeather') {
          result = await WeatherService.loadCurrentWeather({
            lat: place.lat,
            lon: place.lon,
          });
        }

        if (activePeriodTabName === 'weekWeather') {
          result = await WeatherService.loadWeatherFor5Days({
            lat: place.lat,
            lon: place.lon,
          });
        }
        return result;
      })
    );
    placesWeatherListProxy.splice(
      0,
      placesWeatherListProxy.length,
      ...weatherData
    );
  } catch (error) {
  } finally {
    hideLoader();
  }
};

document.addEventListener('DOMContentLoaded', init);
async function init() {
  const geoData = await LocationService.getLocation();
  Object.assign(placeProxy, geoData);
  placesListProxy.splice(0, placesListProxy.length, { ...placeProxy });
}

export { init };
