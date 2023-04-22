



export class Card {
  constructor({ data, handleCardClick }, selector) {
    this._title = data.name;
    this._image = data.link;
    this._handleCardClick = handleCardClick;
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

      this._handleCardClick(this._title, this._image)

    });
  }

  _deleteCard() {//функция удаления карточек
    this._element.remove()
  }

  _likeCard() {//функция добавления лайков
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }


}


