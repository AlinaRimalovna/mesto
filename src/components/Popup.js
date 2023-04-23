export class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('click', this._closePopupOverlay);
    document.removeEventListener('keydown', this._handleEscClose);
  }
  setEventListeners() {
    this._popup.querySelector('.popup__close-icon').addEventListener('click', () => {
      this.close();
    });
     this._popup.addEventListener('click', (evt) => {
      this._closePopupOverlay (evt)
      }
    );
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close()
    }
  }
  _closePopupOverlay (evt) {
    if (evt.currentTarget === evt.target) {
      this.close()
    }
  }
}



