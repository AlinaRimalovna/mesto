let editButton = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let name = document.querySelector('.profile__info-name');
let about = document.querySelector('.profile__info-about');
let inputName = document.querySelector('.popup__input_type_name');
let inputAbout = document.querySelector('.popup__input_type_about');
let closeButton = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.popup__form');

function popupOpened() { //открытие формы и заполнение
  popup.classList.add('popup_opened');
  inputName['value'] = name.textContent;
  inputAbout['value'] = about.textContent;
}

function popupClosed() { // закрытие формы
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {//редактирование и сохранение изменений
  evt.preventDefault(); 

  name.textContent = inputName['value'];
  about.textContent =  inputAbout['value'];
  popupClosed();
}

editButton.addEventListener('click', popupOpened);
closeButton.addEventListener('click', popupClosed);
formElement.addEventListener('submit', handleFormSubmit); 