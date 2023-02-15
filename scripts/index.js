let editButton = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');

function popupOpened() {
  popup.classList.add('popup_opened');
}
editButton.addEventListener('click', popupOpened);

let closeButton = document.querySelector('.popup__close-icon');

function popupClosed() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', popupClosed);

let Name = document.querySelector('.profile__info-name');
let InputName = document.querySelector('.popup__name');

function ChangeName() {
  InputName['value'] = Name.textContent;
}
ChangeName();

let About = document.querySelector('.profile__info-about');
let InputAbout = document.querySelector('.popup__about');

function ChangeAbout() {
  InputAbout['value'] = About.textContent;
}
ChangeAbout();

let PopupButton = document.querySelector('.popup__button');

function NewName() {
  Name.textContent = InputName['value'];
}

PopupButton.addEventListener('click', NewName);
PopupButton.addEventListener('click', popupClosed);

function NewAbout() {
  About.textContent = InputAbout['value'];
}

PopupButton.addEventListener('click', NewAbout);
PopupButton.addEventListener('click', popupClosed);