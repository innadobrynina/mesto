let formElement = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let popupCloseButton = formElement.querySelector('.popup__close');
let nameInput = formElement.querySelector('.popup__name');
let aboutInput = formElement.querySelector('.popup__about');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let saveButton = formElement.querySelector('.popup__button');


// Функция открытия окна редактирования
function fEditButton() {
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
    formElement.classList.add('popup_opened');
}

// Вызов функции открытия окна редактирования
editButton.addEventListener('click', fEditButton);

// Закрытие окна по кнопке
popupCloseButton.addEventListener('click', function() {
    formElement.classList.remove('popup_opened');
});

// Функция кнопки сохранения
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value
    profileSubtitle.textContent = aboutInput.value
    formElement.classList.remove('popup_opened');
}

// Сохранение результата работы функции
formElement.addEventListener('submit', formSubmitHandler);