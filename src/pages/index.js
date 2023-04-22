import './index.css';
import { initialCards } from "../utils/constants.js"
import { Card } from "../components/Card.js"
import { config } from "../utils/constants.js"
import { FormValidator } from "../components/FormValidator.js"
import { PopupWithImage } from "../components/PopupWithImage.js"
import { PopupWithForm } from "../components/PopupWithForm.js"
import { Section } from "../components/Section.js"
import { UserInfo } from "../components/UserInfo.js"


const editButton = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup_type_edit');
const inputNameProfile = document.querySelector('.popup__input_type_name');
const inputAboutProfile = document.querySelector('.popup__input_type_about');
const addButton = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_type_add');


const section = new Section({
  items: initialCards,
  renderer: renderCard
},
  '.elements');

section.renderItems()

function createCard(data, template) {
  const card = new Card({ data, handleCardClick: () => { openFullImg(data) } }, 'template');
  return card.generateCard();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData, 'template')
  section.addItem(cardElement)
}

function openFullImg(data) {

  popupFullImage.open(data)
}

const popupFullImage = new PopupWithImage('.popup_type_view');

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__info-about'
});
userInfo.getUserInfo();

const userPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleForm: (data) => {
    userInfo.setUserInfo({
      userName: data.name,
      userAbout: data.about
    });

    userPopup.close()
  }
});

const cardAddPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleForm: (data) => {
    handleFormAdd(data);
  }
});

function handleFormAdd(data) {//добавление карточки через попап
  console.log(data)
  const cardElement = createCard(data)
  section.addItem(cardElement)
  cardAddPopup.close();
}

function inputFillingPopupEdit() {//заполнение формы редактировать 
  const inputValues = userInfo.getUserInfo()
  inputNameProfile['value'] = inputValues.userName;
  inputAboutProfile['value'] = inputValues.userAbout;
  profileFormValidator.resetValidation()
}

const profileFormValidator = new FormValidator(config, popupEdit)

const newCardFormValidator = new FormValidator(config, popupAdd)

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();



editButton.addEventListener('click', () => {
  inputFillingPopupEdit();
  userPopup.open();
  profileFormValidator.resetValidation();
});

addButton.addEventListener('click', () => {
  cardAddPopup.open();
  newCardFormValidator.resetValidation();
});
