let editButton = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let name = document.querySelector('.profile__info-name');
let about = document.querySelector('.profile__info-about');
let inputName = document.querySelector('.popup__input_type_name');
let inputAbout = document.querySelector('.popup__input_type_about');

function popupOpened() { //открытие формы и заполнение
  popup.classList.add('popup_opened');
  inputName['value'] = name.textContent;
  inputAbout['value'] = about.textContent;
}
editButton.addEventListener('click', popupOpened);

let closeButton = document.querySelector('.popup__close-icon');
function popupClosed() { // закрытие формы
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', popupClosed);


let formElement = document.querySelector('.popup__form');

function handleFormSubmit (evt) {//редактирование и сохранение изменений
  evt.preventDefault(); 

  name.textContent = inputName['value'];
  about.textContent =  inputAbout['value'];
  popupClosed();
}

formElement.addEventListener('submit', handleFormSubmit); 