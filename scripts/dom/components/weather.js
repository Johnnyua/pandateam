import { createElement } from '../../helpers/index.js';
import { useLangStore } from '../../store/index.js';
import { locale } from '../../config/config.js';

const langState = () => {
  const langStore = useLangStore();
  return langStore.state;
};

const createWeatherContent = (place, onDelete) => {
  const langStore = langState();
  const content = createElement({
    tagName: 'div',
    className: 'weather__content',
    attributes: {
      'data-table': place.placeId,
    },
  });
  const contentHeader = createElement({
    tagName: 'div',
    className: 'weather__content__header',
  });
  const contentTitle = createElement({
    tagName: 'h2',
    className: 'weather__content__title title',
    attributes: {
      id: 'cityTitle',
    },
  });
  const contentButton = createElement({
    tagName: 'button',
    className: 'weather__content__btn btn',
  });

  const contentTable = createElement({
    tagName: 'div',
    className: 'weather__content__table table',
    attributes: {
      id: 'weather',
    },
  });

  contentTitle.innerHTML = place.placeName;
  contentButton.innerHTML = locale[langStore.lang].btn.del;
  const onClick = (event) => onDelete(event, place);
  contentButton.addEventListener('click', onClick, false);
  contentHeader.append(contentTitle, contentButton);

  const contentTableRows = place.weatherList.map((item) => {
    const contentTableRow = createElement({
      tagName: 'div',
      className: 'table__row',
    });
    const contentTableDate = createElement({
      tagName: 'span',
      className: 'table__date',
    });
    const contentTableContent = createElement({
      tagName: 'div',
      className: 'table__content',
    });
    const contentTableWeather = createElement({
      tagName: 'div',
      className: 'table__content__weather',
    });
    const contentTableTemp = createElement({
      tagName: 'span',
      className: 'table__content__temp',
    });
    const contentTableImg = createElement({
      tagName: 'img',
      className: 'table__content__img icon',
      attributes: {
        src: item.iconLink,
        title: item.description,
        alt: item.description,
      },
    });
    const contentTableDescription = createElement({
      tagName: 'span',
      className: 'table__content__description',
    });
    contentTableDate.innerHTML = item.date;
    contentTableTemp.innerHTML = item.temp;
    contentTableDescription.innerHTML = item.description;
    contentTableWeather.append(contentTableTemp, contentTableImg);
    contentTableContent.append(contentTableWeather, contentTableDescription);

    contentTableRow.append(contentTableDate, contentTableContent);
    return contentTableRow;
  });
  contentTable.append(...contentTableRows);
  content.append(contentHeader, contentTable);
  return content;
};

const createWeather = (place = {}, onClick = () => {}) => {
  const placeWeather = createWeatherContent(place, onClick);
  return placeWeather;
};

export { createWeather };
