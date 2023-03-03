const editButton = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup_type_edit');
const userName = document.querySelector('.profile__info-name');
const about = document.querySelector('.profile__info-about');
const inputName = document.querySelector('.popup__input_type_name');
const inputAbout = document.querySelector('.popup__input_type_about');
const closeButtonEdit = document.querySelector('.popup__close-icon_edit');
const editForm = document.querySelector('form[name="editform"]');
const addButton = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_type_add');
const popupView = document.querySelector('.popup_type_view');
const closeButtonAdd = document.querySelector('.popup__close-icon_add');
const closeButtonView = document.querySelector('.popup__close-icon_view');
const elements = document.querySelector('.elements');
const addForm = document.querySelector('form[name="addform"]');
const image = document.querySelector('.popup__image')
const caption = document.querySelector('.popup__caption')

function openPopup(popup) {//открытие попапа
  popup.classList.add('popup_opened');
}

function closePopup(popup) {// закрытие попапа
  popup.classList.remove('popup_opened');
}

function openPopupEdit() {//открытие формы редактировать и заполнение
  openPopup(popupEdit);
  inputName['value'] = userName.textContent;
  inputAbout['value'] = about.textContent;

}

function handleFormEditSubmit(evt) {//редактирование и сохранение изменений
  evt.preventDefault();
  userName.textContent = inputName.value;
  about.textContent = inputAbout.value;
  closePopup(popupEdit);
}

function openPopupAdd() { //открытие формы добавить и очищение
  openPopup(popupAdd);
  addForm.reset();
}

function createCard(card) {//создание карточек, удаление и лайки
  const cardAdd = document.querySelector('template').content.cloneNode(true);
  const cardTitle = cardAdd.querySelector('.element__title');
  cardTitle.textContent = card.name
  const cardImage = cardAdd.querySelector('.element__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  const deleteButton = cardAdd.querySelector('.element__delete');
  deleteButton.addEventListener('click', deleteCard)
  const like = cardAdd.querySelector('.element__like');
  like.addEventListener('click', clickLike);
  cardImage.addEventListener('click', openPopupView);
  return cardAdd
}

function addCard(card) {//добавление карточек в разметку
  const cardElement = createCard(card)
  elements.prepend(cardElement)
}
initialCards.forEach(addCard)

function deleteCard(event) {//функция удаления карточек
  const button = event.target
  const card = button.closest('.element')
  card.remove()
}

function clickLike(event) {//функция добавления лайков
  const button = event.target
  const card = button.closest('.element__like')
  card.classList.toggle('element__like_active');
}

function handleFormAdd(event) {//добавление карточки через попап
  event.preventDefault()
  const form = event.target
  const link = form.querySelector('.popup__input_type_image').value
  const name = form.querySelector('.popup__input_type_location').value
  const card = { name, link }
  addCard(card)
  closePopup(popupAdd);
}

function openPopupView(event) {//функция открытия просмотра картинок
  const img = event.target
  image.setAttribute('src', img.src);
  image.setAttribute('alt', img.alt);
  caption.textContent = img.alt
  openPopup(popupView);
}

editButton.addEventListener('click', openPopupEdit);
closeButtonEdit.addEventListener('click', function () { closePopup(popupEdit) });
editForm.addEventListener('submit', handleFormEditSubmit);
addButton.addEventListener('click', openPopupAdd);
closeButtonAdd.addEventListener('click', function () { closePopup(popupAdd) });
addForm.addEventListener('submit', handleFormAdd);
closeButtonView.addEventListener('click', function () { closePopup(popupView) }); 