let editButton = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup__type_edit');
let name = document.querySelector('.profile__info-name');
let about = document.querySelector('.profile__info-about');
let inputName = document.querySelector('.popup__input_type_name');
let inputAbout = document.querySelector('.popup__input_type_about');
let closeButton = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('form[name="editform"]');
let addButton = document.querySelector('.profile__button-add');
let popupAdd = document.querySelector('.popup__type_add');
let popupView = document.querySelector('.popup__type_view');
let closeButtonAdd = document.querySelector('.popup__close-icon_add');
let closeButtonView = document.querySelector('.popup__close-icon_view');
let elements = document.querySelector('.elements');
const form = document.querySelector('form[name="addform"]');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function popupOpened() {//открытие формы редактировать и заполнение
  popup.classList.add('popup_opened');
  inputName['value'] = name.textContent;
  inputAbout['value'] = about.textContent;
}

function popupClosed() {// закрытие формы редактировать
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {//редактирование и сохранение изменений
  evt.preventDefault(); 
  name.textContent = inputName['value'];
  about.textContent =  inputAbout['value'];
  popupClosed();
}

function popupOpenedAdd() { //открытие формы добавить
  popupAdd.classList.add('popup_opened');
}
function popupClosedAdd() { // закрытие формы добавить
  popupAdd.classList.remove('popup_opened');
}

function popupOpenedView() { //открытие попапа просмотра картинки
  popupView.classList.add('popup_opened');
}

function popupClosedView() { // закрытие попапа просмотра картинки
  popupView.classList.remove('popup_opened');
}

function cardsAdd(card) {//добавление карточек, удаление и лайки
  const cardAdd = document.querySelector('template').content. cloneNode(true);
  const cardTitle = cardAdd.querySelector('.element__title');
  cardTitle.textContent = card.name
  const cardImage = cardAdd.querySelector('.element__image');
 cardImage.setAttribute('src', card.link);
 cardImage.setAttribute('alt', `${card.name}`);
 const deleteButton = cardAdd.querySelector('.element__delete');
 deleteButton.addEventListener('click',cardsDelete)
 const like = cardAdd.querySelector('.element__like');
 like.addEventListener('click', likeActive);
 cardImage.addEventListener('click', viewOpened);
  elements.prepend(cardAdd)
}
initialCards.forEach(cardsAdd)

function cardsDelete(event) {//функция удаления карточек
  const button = event.target
  const card = button.closest('.element')
  card.remove()
}

function likeActive(event) {//функция добавления лайков
  const button = event.target
  const card = button.closest('.element__like')
  card.classList.add('element__like_active');
}

function handleForm(event) {//добавление карточки через попап
  event.preventDefault()
  const form = event.target
  const link = form.querySelector('.popup__input_type_image').value
  const name = form.querySelector('.popup__input_type_location').value
  const card = {name, link}
  cardsAdd(card)
  popupClosedAdd();
}

function  viewOpened(event) {//функция открытия просмотра картинок
  const img = event.target
  const image = document.querySelector('.popup__image')
  image.setAttribute('src', img.src);
  const caption = document.querySelector('.popup__caption')
caption.textContent = img.alt
popupOpenedView();
}

editButton.addEventListener('click', popupOpened);
closeButton.addEventListener('click', popupClosed);
formElement.addEventListener('submit', handleFormSubmit); 
addButton.addEventListener('click', popupOpenedAdd);
closeButtonAdd.addEventListener('click', popupClosedAdd);
form.addEventListener('submit', handleForm);
closeButtonView.addEventListener('click', popupClosedView);