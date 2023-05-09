import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleForm }) {
    super(popupSelector)
    this._handleForm = handleForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
  }
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;

  }
  close() {
    super.close();
    this._popupForm.reset();

  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleForm(this._getInputValues());
    });
  }
}