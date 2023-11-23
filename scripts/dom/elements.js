const mainTabBtnEl = document.querySelector('[data-tab="maintab"]');
const favoriteTabBtnEl = document.querySelector('[data-tab="favoritetab"]');
const dayTabEl = document.querySelector('[data-tabperiod="dayWeather"]');
const weekTabEl = document.querySelector('[data-tabperiod="weekWeather"]');
const periodTabEl = document.querySelectorAll(
  '.weather__body__tabs .tabs__caption'
);
const mainTabEl = document.querySelectorAll(
  '.weather__head__tabs .tabs__caption'
);
const cityInputEl = document.querySelector('#cityInput');
const cityTitleEl = document.querySelector('#cityTitle');
const favoriteBtnTextEl = document.querySelector('#favorite span');
const favoriteBtnEl = document.querySelector('#favorite');
const cityAddBtnEl = document.querySelector('#cityAdd');
const langLink = document.querySelectorAll('.lang__list .lang__link');
const autocompleteContainer = document.querySelector('#autocompleteContainer');
const autocompleteListEl = document.querySelector('#autocompleteList');
const weatherContainer = document.querySelector('#weatherContainer');
const chartContainer = document.querySelector('#chart');

export {
  mainTabBtnEl,
  favoriteTabBtnEl,
  dayTabEl,
  weekTabEl,
  periodTabEl,
  cityInputEl,
  cityTitleEl,
  favoriteBtnEl,
  favoriteBtnTextEl,
  langLink,
  autocompleteContainer,
  autocompleteListEl,
  weatherContainer,
  chartContainer,
  cityAddBtnEl,
  mainTabEl,
};
