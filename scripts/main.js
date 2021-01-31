let formElement = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-edit');
let popupCloseButton = formElement.querySelector('.popup__close');
let nameInput = form.elements.title;
let aboutInput = form.elements.about;
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let saveButton = formElement.querySelector('.popup__button');

// Функция открытия окна редактирования
function fEditButton() {
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
    formElement.classList.add('popup_opened');
}

//Функция закрытия окна редактирования
function fCloseButton() {
    formElement.classList.remove('popup_opened');
}

// Функция кнопки сохранения
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value
    profileSubtitle.textContent = aboutInput.value
    formElement.classList.remove('popup_opened');
}

// Вызов функции открытия окна редактирования
editButton.addEventListener('click', fEditButton);

// Вызов функции закрытия окна редактирования по кнопке
popupCloseButton.addEventListener('click', fCloseButton);

// Сохранение результата работы функции
formElement.addEventListener('submit', formSubmitHandler);