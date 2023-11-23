import { locale } from '../config/config.js';
import { createElement } from '../helpers/index.js';
import { useLangStore } from '../store/index.js';
import {
  autocompleteContainer,
  cityAddBtnEl,
  favoriteBtnEl,
  favoriteBtnTextEl,
  mainTabBtnEl,
  favoriteTabBtnEl,
  dayTabEl,
  weekTabEl,
} from '../dom/index.js';
import { createWeather, chart } from './components/index.js';
import { weatherContainer } from './index.js';

const langState = () => {
  const langStore = useLangStore();
  return langStore.state;
};

const renderLangChange = () => {
  const langStore = langState();
  cityAddBtnEl.innerHTML = locale[langStore.lang].btn.add;
  if (favoriteBtnEl.classList.contains('active')) {
    favoriteBtnTextEl.innerHTML = locale[langStore.lang].btn.delFromFav;
  } else {
    favoriteBtnTextEl.innerHTML = locale[langStore.lang].btn.addToFav;
  }
  const cityDelBtnEl = document.querySelectorAll('.weather__content__btn');
  cityDelBtnEl.forEach((elem) => {
    elem.innerHTML = locale[langStore.lang].btn.del;
  });
  mainTabBtnEl.innerHTML = locale[langStore.lang].tab.main;
  favoriteTabBtnEl.innerHTML = locale[langStore.lang].tab.fav;
  dayTabEl.innerHTML = locale[langStore.lang].tab.day;
  weekTabEl.innerHTML = locale[langStore.lang].tab.week;
};

const renderElement = (el, proxyObject) => {
  el.innerHTML = proxyObject.value;
};

const renderObject = (el, proxyObject, prop) => {
  el.innerHTML = proxyObject[prop];
};

const renderWeather = (citiesList, deleteFavoriteCity) => {
  weatherContainer.innerHTML = '';
  const chartData = [];
  citiesList.forEach((place) => {
    const placeWeather = createWeather(place, deleteFavoriteCity);
    place.weatherList.forEach((item) => {
      const { date, temp } = item;
      chartData.push({ date, temp });
    });
    const chartEl = chart(chartData, place.placeId);
    weatherContainer.append(placeWeather, chartEl);
  });
};

const renderPlacesAutocomplete = (placies, checkPlace) => {
  let autocompleteList = document.querySelector('#autocompleteList');
  if (autocompleteList) {
    autocompleteList.remove();
  }
  if (!placies.length && autocompleteList) {
    autocompleteList.remove();
    return autocompleteContainer;
  }
  autocompleteList = createElement({
    tagName: 'ul',
    className: 'autocomplete__list',
    attributes: {
      id: 'autocompleteList',
    },
  });
  const placiesElements = placies.map((place) => {
    const placeItem = createElement({
      tagName: 'li',
      className: 'autocomplete__item',
    });
    const placeIcon = createElement({
      tagName: 'span',
      className: 'autocomplete__icon',
    });
    const placeText = createElement({
      tagName: 'span',
      className: 'autocomplete__text',
    });

    placeIcon.innerHTML = `
      <svg viewBox="0 0 640 512" height="24">
        <path
          d="M616 192H480V24c0-13.26-10.74-24-24-24H312c-13.26 0-24 10.74-24 24v72h-64V16c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v80h-64V16c0-8.84-7.16-16-16-16H80c-8.84 0-16 7.16-16 16v80H24c-13.26 0-24 10.74-24 24v360c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V216c0-13.26-10.75-24-24-24zM128 404c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm128 192c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm160 96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12V76c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm160 288c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40z"
          fill="currentColor"
        ></path>
      </svg>
    `;
    placeText.innerHTML = place.placeName;
    const onClick = (event) => checkPlace(event, place);
    placeItem.addEventListener('click', onClick, false);
    placeItem.append(placeIcon, placeText);
    return placeItem;
  });
  autocompleteList.append(...placiesElements);
  autocompleteContainer.append(autocompleteList);
  return autocompleteContainer;
};

export {
  renderWeather,
  renderElement,
  renderObject,
  renderPlacesAutocomplete,
  renderLangChange,
};
