import { initialCards } from "./constants.js"
import { openPopup } from "./index.js"


export class Card {
  constructor(name, link, selector) {
    this._title = name;
    this._image = link;
    this._selector = selector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
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
      this._deleteCard(this._element);
    });
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeCard(this._element);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openFullImage(this._title, this._image);
    });
  }
 
    _deleteCard() {//функция удаления карточек
      this._element.remove()
      }
    
      _likeCard() {//функция добавления лайков
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
      }
      _openFullImage(event) {//функция открытия просмотра картинок
        const popupView = document.querySelector('.popup_type_view');
        const imagePopupView = document.querySelector('.popup__image')
    const captionPopupView = document.querySelector('.popup__caption')
    imagePopupView.setAttribute('src', this._image);
    imagePopupView.setAttribute('alt', this._title);
    captionPopupView.textContent = this._title
    openPopup(popupView);
      }

}


