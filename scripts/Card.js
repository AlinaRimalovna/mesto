import { initialCards } from "./constants.js"
import { deleteCard, clickLike, openPopupView, image, caption } from "./index.js"


export class Card {
  constructor(name, link, selector) {
    this._title = name;
    this._image = link;
    this._selector = selector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('template')
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__image').alt = this._title;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      deleteCard(this._element);
    });
    this._element.querySelector('.element__like').addEventListener('click', () => {
      clickLike(this._element);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      openPopupView(this._element);
    });
  }


}
initialCards.forEach((item) => {

  const card = new Card(item.name, item.link);

  const cardElement = card.generateCard();


  document.querySelector('.elements').append(cardElement);
});

