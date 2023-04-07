import { initialCards } from "./constants.js"
import { Card } from "./Card.js"

import { config } from "./validate.js"
import { FormValidator } from "./FormValidator.js"


const editButton = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup_type_edit');
const userName = document.querySelector('.profile__name');
const userAbout = document.querySelector('.profile__info-about');
const inputNameProfile = document.querySelector('.popup__input_type_name');
const inputAboutProfile = document.querySelector('.popup__input_type_about');
const editForm = document.querySelector('form[name="editform"]');
const addButton = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_type_add');
const elements = document.querySelector('.elements');
const addForm = document.querySelector('form[name="addform"]');
const inputLinkFormCard = document.querySelector('.popup__input_type_image')
const inputNameFormCard = document.querySelector('.popup__input_type_location')
const closeButtons = document.querySelectorAll('.popup__close-icon');


export function openPopup(popup) {//открытие попапа
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
}


function closePopup(popup) {// закрытие попапа
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
}

function openPopupEdit() {//открытие формы редактировать и заполнение
  openPopup(popupEdit);
  inputNameProfile['value'] = userName.textContent;
  inputAboutProfile['value'] = userAbout.textContent;

}

function handleFormEditSubmit(evt) {//редактирование и сохранение изменений
  evt.preventDefault();
  userName.textContent = inputNameProfile.value;
  userAbout.textContent = inputAboutProfile.value;
  closePopup(popupEdit);
}

function openPopupAdd() { //открытие формы добавить и очищение
  openPopup(popupAdd);
  addForm.reset();
  newCardFormValidator.resetValidation()
}


function createCard(data, template){
  const card = new Card(data.name, data.link, 'template');

  return card.generateCard();
 
}
function addCard(data, template, conteiner){
  conteiner.prepend(createCard(data, template, conteiner))
} 

initialCards.forEach((item) => {
  
  addCard(item, 'template', elements);
});


function handleFormAdd(event) {//добавление карточки через попап
  event.preventDefault()
  const form = event.target
  const link = inputLinkFormCard.value
  const name = inputNameFormCard.value
  const card = { name, link }
  addCard(card, 'template', elements)
  closePopup(popupAdd);
}

function closePopupbutton() {
  closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });
}
closePopupbutton()

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup)
  }
}

function closePopupOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup)
  }
}

editButton.addEventListener('click', openPopupEdit);
editForm.addEventListener('submit', handleFormEditSubmit);
addButton.addEventListener('click', openPopupAdd);
addForm.addEventListener('submit', handleFormAdd);


const profileFormValidator = new FormValidator(config, popupEdit)

const newCardFormValidator = new FormValidator(config, popupAdd)

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();



