import './index.css';
import { Card } from "../components/Card.js"
import { config } from "../utils/constants.js"
import { FormValidator } from "../components/FormValidator.js"
import { PopupWithImage } from "../components/PopupWithImage.js"
import { PopupWithForm } from "../components/PopupWithForm.js"
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js"
import { Section } from "../components/Section.js"
import { UserInfo } from "../components/UserInfo.js"
import { Api } from "../components/Api.js"


const editButton = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup_type_edit');
const inputNameProfile = document.querySelector('.popup__input_type_name');
const inputAboutProfile = document.querySelector('.popup__input_type_about');
const addButton = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_type_add');
const popupAvatar = document.querySelector('.popup_type_avatar');
const editAvatarButton = document.querySelector('.profile__avatar-box');
let userId;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
      authorization: 'af28987c-eb8f-466e-946d-63fad4a279ae',
      'Content-Type': 'application/json'
    }
});

async function getUserData() {
  try {
    const userInfoData = await api.getUserInfo();
    userInfo.setUserInfo({
      userName: userInfoData.name,
      userAbout: userInfoData.about,
      userAvatar: userInfoData.avatar      
    })
    userId = userInfoData._id;
    return userId
  } catch (error) {
    console.error(`Ошибка при загрузке: ${error}`);
  }
}
 

async function getTasks() {
  try {
    getUserData();
    const cards = await api.getInitialCards();
    section.renderItems(cards);
  } catch (error) {
    console.error(`Ошибка при загрузке: ${error}`);
  }
}
getTasks();

const section = new Section({ renderer: renderCard }, '.elements');

function createCard(data, template) {
  const card = new Card({ 
    data,
    handleCardClick: () => { openFullImg(data) },
    handleDeleteIconClick: () => { 
      deletePopup.open();
      deletePopup.setSubmitAction(() => {
        const cardId = data._id;
        api.deleteCard(cardId)
        .then (res => {
          card.deleteCard();
          deletePopup.close();
      })
    });
   },
    handleLikeClick: () => {
      console.log(data)
      const cardId = data._id;
      if (!card.isLiked()) {
      api.likeCard(cardId)
      .then (res => {
        console.log(res.likes)
        card.likeCard(res.likes)
      })
    } else {
        api.deleteLikeCard(cardId)
        .then(res => {
         card.removeLikeCard(res.likes);
        })
      }
    } 
   },
    'template',
     userId);
  return card.generateCard();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData, 'template')
  section.addItem(cardElement)
}

const popupFullImage = new PopupWithImage('.popup_type_view');
popupFullImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__info-about',
  avatarSelector: '.profile__avatar'
});

const userPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleForm: (data) => {
    editButton.textContent = 'Сохранение...';
    api.changeUserInfo(data.name, data.about)
    .then((res) => {
      userInfo.setUserInfo({
        userName: res.name,
        userAbout: res.about,
        userAvatar: res.avatar
      })
    })
    .catch(err => console.error(`Ошибка:${err}`))
    .finally(() => {
      editButton.textContent = 'Сохранить';
    })
    userPopup.close()
  }
});
userPopup.setEventListeners();

const cardAddPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleForm: (data) => {
    handleFormAdd(data);
  }
});
cardAddPopup.setEventListeners();

function handleFormAdd(data) {//добавление карточки через попап
  
  addButton.textContent = 'Сохранение...';
  api.addNewCard(data.name, data.link)
  .then((res) => {
    const cardElement = createCard(res)
    section.addItem(cardElement)
  })
  .catch(err => console.error(`Ошибка:${err}`))
  .finally(() => {
    addButton.textContent = 'Создать';
  })
  cardAddPopup.close();
}

async function inputFillingPopupEdit() {//заполнение формы редактировать 
  try {
    const userInfo = await api.getUserInfo();
  inputNameProfile['value'] = userInfo.name;
  inputAboutProfile['value'] = userInfo.about;
  }
  catch (error) {
        console.error(`Ошибка при загрузке: ${error}`);
      }
}

const profileFormValidator = new FormValidator(config, popupEdit)
profileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(config, popupAdd)
newCardFormValidator.enableValidation();

const newAvatarFormValidator = new FormValidator(config, popupAvatar)
newAvatarFormValidator.enableValidation();

const deletePopup = new PopupWithConfirmation({ popupSelector: '.popup_type_delete' });
deletePopup.setEventListeners();

function openFullImg(data) {
  popupFullImage.open(data)
}

const cardAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleForm: async (data) => {
    try { 
      editAvatarButton.textContent = 'Сохранение...';
      api.changeAvatar(data.avatar)
      .then ((res) => {
        getUserData()
        cardAvatarPopup.close()

      })
      .finally(() => {
        editAvatarButton.textContent = 'Сохранить';
      })
    }
    catch (error) {
      console.error(`Ошибка при загрузке: ${error}`);
    }
    
  }
});
cardAvatarPopup.setEventListeners();



editButton.addEventListener('click', () => {
  inputFillingPopupEdit();
  userPopup.open();
  profileFormValidator.resetValidation();
});

addButton.addEventListener('click', () => {
  cardAddPopup.open();
  newCardFormValidator.resetValidation();
});

editAvatarButton.addEventListener('click', () => {
  cardAvatarPopup.open();
  newAvatarFormValidator.resetValidation();
});
