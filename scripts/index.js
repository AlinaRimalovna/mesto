import { Card } from "./Card.js"
import { initialCards } from "./constants.js"
import { config } from "./validate.js"
import { FormValidator } from "./FormValidator.js"


const editButton = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup_type_edit');
const userName = document.querySelector('.profile__name');
const userAbout = document.querySelector('.profile__info-about');
const inputName = document.querySelector('.popup__input_type_name');
const inputAbout = document.querySelector('.popup__input_type_about');
const editForm = document.querySelector('form[name="editform"]');
const addButton = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_type_add');
const popupView = document.querySelector('.popup_type_view');
const elements = document.querySelector('.elements');
const addForm = document.querySelector('form[name="addform"]');
export const image = document.querySelector('.popup__image')
export const caption = document.querySelector('.popup__caption')
const templateElement = document.querySelector('template')
const imageLink = document.querySelector('.popup__input_type_image')
const imageName = document.querySelector('.popup__input_type_location')
const closeButtons = document.querySelectorAll('.popup__close-icon');
const submitButton = document.querySelector('.popup__button-add');


function openPopup(popup) {//открытие попапа
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
  inputName['value'] = userName.textContent;
  inputAbout['value'] = userAbout.textContent;

}

function handleFormEditSubmit(evt) {//редактирование и сохранение изменений
  evt.preventDefault();
  userName.textContent = inputName.value;
  userAbout.textContent = inputAbout.value;
  closePopup(popupEdit);
}

function openPopupAdd() { //открытие формы добавить и очищение
  openPopup(popupAdd);
  addForm.reset();
  newCardFormValidator.enableButton()
}



function addCard(item) {//добавление карточек в разметку
  const card = new Card(item.name, item.link);

  const cardElement = card.generateCard();


  elements.prepend(cardElement)
}



export function deleteCard(card) {//функция удаления карточек

  card.remove()
}

export function clickLike(card) {//функция добавления лайков

  card.querySelector('.element__like').classList.toggle('element__like_active');
}

function handleFormAdd(event) {//добавление карточки через попап
  event.preventDefault()
  const form = event.target
  const link = imageLink.value
  const name = imageName.value
  const card = { name, link }
  addCard(card)
  closePopup(popupAdd);
}

export function openPopupView(card) {//функция открытия просмотра картинок
  const img = card.querySelector('.element__image')
  image.setAttribute('src', img.src);
  image.setAttribute('alt', img.alt);
  caption.textContent = img.alt
  openPopup(popupView);
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
