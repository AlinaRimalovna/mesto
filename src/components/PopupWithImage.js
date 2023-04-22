import { Popup } from "./Popup.js"

export class PopupWithImage extends Popup {
  constructor(popupSelector) {

    super(popupSelector)
  }
  open(data) {

    const imagePopupView = document.querySelector('.popup__image')
    const captionPopupView = document.querySelector('.popup__caption')
    imagePopupView.setAttribute('src', data.link);
    imagePopupView.setAttribute('alt', data.name);
    captionPopupView.textContent = data.name;

    super.open();
  }
}