let editButton = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');

function popupOpened() {
  popup.classList.add('popup_opened');
}
editButton.addEventListener('click', popupOpened);


// renderAdded();

let closeButton = document.querySelector('.popup__close-icon');
// let popup = document.querySelector('.popup');

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

// let Name = document.querySelector('.profile__info-name');
// let InputName = document.querySelector('.popup__name');
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
// NewName();

/* <p id="paragraph">Это текст внутри элемента.</p> 
let paragraph = document.getElementById('paragraph');

console.log(paragraph.textContent); // "Это текст внутри элемента."
paragraph.textContent = 'А это новый текст.'; // можно перезаписать содержимое  */

// value="Жак-Ив Кусто"

// value="Исследователь океана"