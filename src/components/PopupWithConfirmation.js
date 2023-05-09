import { Popup } from "./Popup.js"

export class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector)
    this._popupButton = this._popup.querySelector('.popup__button');
  }
  setSubmitAction(action) {
    this._handleForm = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener('click', (event) => {
      event.preventDefault();
      this._handleForm();
    });

  }
}