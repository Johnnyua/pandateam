import { locale } from '../../config/config.js';
import { createElement } from '../../helpers/index.js';
import { useLangStore } from '../../store/index.js';

const langState = () => {
  const langStore = useLangStore();
  return langStore.state;
};

const getModalContainer = () => {
  return document.querySelector('#root');
}

const hideModal = () => {
  const modal = document.querySelector('.modal__layer');
  modal?.remove();
}

const  createModalHeader = (title, onClose) => {
  const headerElement = createElement({
    tagName: 'div',
    className: 'modal__header',
  });
  const titleElement = createElement({ tagName: 'span' });
  const closeButton = createElement({
    tagName: 'button',
    className: 'modal__header__close__btn',
  });
 
  titleElement.innerText = title;
  closeButton.innerText = '×';

  const close = () => {
    hideModal();
    onClose();
  };
  closeButton.addEventListener('click', close);
  headerElement.append(titleElement, closeButton);

  return headerElement;
}

const createModalFooter = (onClose, onConfirm) => {
  const langStore = langState();
  const footerElement = createElement({
    tagName: 'div',
    className: 'modal__footer',
  });
  const closeButton = createElement({
    tagName: 'button',
    className: 'modal__footer__close__btn btn',
  });
  const confirmButton = createElement({
    tagName: 'button',
    className: 'modal__footer__confirm__btn btn',
  });
  closeButton.innerText = locale[langStore.lang].btn.close;
  confirmButton.innerText = locale[langStore.lang].btn.confirm;

  const close = () => {
    hideModal();
    onClose();
  };
  const confirm = () => {
    hideModal();
    onConfirm();
  };
  closeButton.addEventListener('click', close);
  confirmButton.addEventListener('click', confirm);
  footerElement.append(confirmButton, closeButton);
  return footerElement;
}

const createModal = ({ title, bodyElement, onClose, onConfirm }) => {
  const layer = createElement({ tagName: 'div', className: 'modal__layer' });
  const modalContainer = createElement({
    tagName: 'div',
    className: 'modal__root',
  });
  const headerElement = createModalHeader(title, onClose);
  const footerElement = createModalFooter(onClose, onConfirm);

  modalContainer.append(headerElement, bodyElement, footerElement);
  layer.append(modalContainer);

  return layer;
}

const showModal = ({ title, bodyElement, onClose = () => {}, onConfirm = () => {} }) => {
  const root = getModalContainer();
  const modal = createModal({ title, bodyElement, onClose, onConfirm });

  root.append(modal);
}

export { showModal };
