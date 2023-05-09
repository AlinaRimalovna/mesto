import { Popup } from "./Popup.js"

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._imagePopupView = this._popup.querySelector('.popup__image')
    this._captionPopupView = this._popup.querySelector('.popup__caption')
  }
  open(data) {
    super.open();
    this._imagePopupView.setAttribute('src', data.link);
    this._imagePopupView.setAttribute('alt', data.name);
    this._captionPopupView.textContent = data.name;
  }
}