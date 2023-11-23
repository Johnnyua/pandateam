import { createElement } from '../../helpers/index.js';

const showLoader = () => {
  const loaderElement = createElement({
    tagName: 'div',
    className: 'loader',
  });
  return loaderElement;
};

const hideLoader = () => {
  const loaderElement = document.querySelector('.loader');
  loaderElement?.remove();
};

export { showLoader, hideLoader };
