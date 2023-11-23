const createElement = ({ tagName, className, attributes = {} }) => {
  const element = document.createElement(tagName);

  if (className) {
    const classNames = className.split(' ').filter(Boolean); // Include only not empty className values after the splitting
    element.classList.add(...classNames);
  }

  Object.keys(attributes).forEach((key) =>
    element.setAttribute(key, attributes[key])
  );

  return element;
};

const createImage = (img = { src: '', title: '', alt: '' }, className = '') => {
  const attributes = { ...img };
  const imgElement = createElement({
    tagName: 'img',
    className: className,
    attributes,
  });

  return imgElement;
};

const getActivePeriodTab = () => {
  const activePerioTab = document.querySelector(
    '.weather__body__tabs .tabs__caption.active'
  );
  return activePerioTab;
};

const getMainPeriodTab = () => {
  const activeMainTab = document.querySelector(
    '.weather__head__tabs .tabs__caption.active'
  );
  return activeMainTab;
};

export { createElement, createImage, getActivePeriodTab, getMainPeriodTab };
