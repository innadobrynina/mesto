import Card from './card.js';
import FormValidator from './FormValidator.js';

const profilePopup = document.querySelector(".popup-profile");
const profilePopupButton = document.querySelector(".profile__button-edit");
const profilePopupCloseButton = profilePopup.querySelector(".popup__close");
const nameInput = edit.elements.title;
const aboutInput = edit.elements.about;
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const addCardPopup = document.querySelector(".popup-add");
const cardPopupCloseButton = addCardPopup.querySelector(".popup__close");
const cardPopuploadButton = addCardPopup.querySelector(".popup__button");
const addCardPopupButton = document.querySelector(".profile__button-add");

const initialCards = [{
        place: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        place: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        place: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        place: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        place: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        place: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

// Функция открытия всплывающих окон
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

// Функция отмены подчеркивания 
function noLineForProfileForm() {
    nameInput.classList.remove("popup__input_type_error");
    aboutInput.classList.remove("popup__input_type_error");
}

// Функция очищения данных при вводе
function clearInput(formName) {
    formName.reset();
}

// Функция очищения выводимых ошибок при вводе
function clearError(formError) {
    const errorTxt = formError.querySelectorAll('.popup__input-error_active');
    if (errorTxt != null) {
        errorTxt.forEach((err) => {
            err.classList.remove('popup__input-error_active');
        })
    }
}

// Функция закрытия всплывающих окон
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

// Функция закрытия всплывающих окон по кнопке Escape
function closeByEsc(evt) {
    if (evt.keyCode === 27) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
        noLineForProfileForm();
    }
}

// Применяем фукнцию открытия всплывающих окон для открытия всех всплывающих окон
profilePopupButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
    openPopup(profilePopup);
    noLineForProfileForm();
    clearError(profilePopup);
});


addCardPopupButton.addEventListener("click", () => {
    const buttonElement = addCardPopup.querySelector('.popup__button');
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add('popup__button_inactive');
    openPopup(addCardPopup);
    const formName = document.getElementById('add');
    clearInput(formName);
    clearError(addCardPopup);

});

// Применяем фукнцию закрытия всплывающих окон по оверлей
function closeByOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

const popups = document.querySelectorAll('section.popup');

popups.forEach((elPopup) => {
    elPopup.addEventListener('mousedown', closeByOverlayClick);
})

// Применяем фукнцию закрытия всплывающих окон для закрытия всех всплывающих окон

profilePopupCloseButton.addEventListener("click", () => {
    closePopup(profilePopup);
})

cardPopupCloseButton.addEventListener("click", () => {
    closePopup(addCardPopup);
})

// Функция кнопки сохранения
function submitProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    closePopup(profilePopup);
}

// Сохранение результата работы функции
profilePopup.addEventListener("submit", submitProfileForm);

// Находим шаблон template
const listContainerEl = document.querySelector(".elements");
// const templateEl = document.querySelector(".template");
const inputPlaceEl = document.querySelector(".popup__input_place");
const inputImageEl = document.querySelector(".popup__input_image");

// Добавляем карточки в секцию elements
function render() {
    const html = initialCards.map((item) => new Card(item).getCard());
    listContainerEl.append(...html);
    new FormValidator().enableValidation();
}

// Добавляем новую карточку по клику кнопки
function handleAdd(evt) {
    console.log("handleAdd");
    evt.preventDefault();
    const inputPlaceText = inputPlaceEl.value;

    const inputImageLink = inputImageEl.value;
    const listPlaceItem = new Card({
        place: inputPlaceText,
        link: inputImageLink,
    }).getCard();

    listContainerEl.prepend(listPlaceItem);
    inputPlaceEl.value = '';
    inputImageEl.value = '';
    closePopup(addCardPopup);
}

cardPopuploadButton.addEventListener("click", handleAdd);

render();