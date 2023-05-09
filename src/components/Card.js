export class Card {
  constructor({ data, handleCardClick, handleDeleteIconClick, handleLikeClick }, selector, userId) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this.cardId = data._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
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
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__image').alt = this._title;
    this._element.querySelector('.element__like-amount').textContent = this._likes.length;


    if (this._ownerId !== this._userId) {
      this._element.querySelector('.element__delete').remove()
      this.isLiked()
    }

    return this._element;
  }

  deleteCard() {
    this._element.remove()
  }

  likeCard(like) {
    this._likes = like
    this._element.querySelector('.element__like').classList.add('element__like_active');
    this._element.querySelector('.element__like-amount').textContent = this._likes.length;
  }
  removeLikeCard(like) {
    this._likes = like
    this._element.querySelector('.element__like').classList.remove('element__like_active');
    this._element.querySelector('.element__like-amount').textContent = this._likes.length;
  }
  _deleteButton() {

  }

  isLiked() {
    console.log(this._userId)
    return this._likes.some(card => card._id === this._userId)
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteIconClick(this);
    });
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeClick(this);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {

      this._handleCardClick()

    });
  }
}