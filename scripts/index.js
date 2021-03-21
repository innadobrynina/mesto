import Card from './Card.js';
import { initialCards, validateConfig, ESCAPE } from './input_data.js';
import FormValidator from './FormValidator.js';

const profilePopup = document.querySelector(".popup-profile");
const profileForm = profilePopup.querySelector(".popup__container");
const profilePopupButton = document.querySelector(".profile__button-edit");
const nameInput = edit.elements.title;
const aboutInput = edit.elements.about;
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const addCardPopup = document.querySelector(".popup-add");
const addCardForm = addCardPopup.querySelector(".popup__container");
const addPlaceInput = addCardForm.querySelector(".popup__input_place");
const addLinkInput = addCardForm.querySelector(".popup__input_image");
const addCardPopupButton = document.querySelector(".profile__button-add");

const imagePopup = document.querySelector(".popup-image");
const modalImg = document.querySelector('.popup-image__content');
const captionText = document.querySelector('.popup-image__caption');

const cardsElements = document.querySelector('.elements');
const closePopupButtons = document.querySelectorAll(".popup__close");


//Вызываем функции

profilePopupButton.addEventListener("click", handleEditProfile);
profileForm.addEventListener("submit", submitProfileForm);
addCardPopupButton.addEventListener("click", handleAddCard);
addCardForm.addEventListener("submit", submitAddCardForm);
closePopupButtons.forEach((button) =>
    button.addEventListener("click", closePopupButton)
);

//Функции

// Функция получения данных карточек
function handleCardClick(place, link) {
    modalImg.src = link;
    modalImg.alt = place;
    captionText.textContent = place;
    openPopup(imagePopup);
}

//Фунукция закрытия попапов по кнопке
function closePopupButton(evt) {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
}

// Функция закрытия всплывающих окон
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener("pointerdown", closeByEsc);
    document.removeEventListener('keydown', closeByEsc);
}

// Функция закрытия всплывающих окон по кнопке Escape
function closeByEsc(evt) {
    const popup = document.querySelector(".popup_opened");
    if (evt.key === ESCAPE || evt.target === popup) {
        closePopup(popup);
    }
}

// Фукнция закрытия всплывающих окон по оверлей 
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

// Функция открытия всплывающих окон
function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.removeEventListener("pointerdown", closeByEsc);
    document.addEventListener('keydown', closeByEsc);
}

// Функция открытия окна попапа редактирования профайла
function handleEditProfile() {
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
    profileFormValidator.clearValidation();
    openPopup(profilePopup);
}

// Функция кнопки сохранения
function submitProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    closePopup(profilePopup);
}

// Функция добавления карточки по клику кнопки
function handleAddCard() {
    addCardForm.reset();
    addCardFormValidator.clearValidation();
    openPopup(addCardPopup);
}

//Функция формирования карточки
function getCard(data) {
    const card = new Card(data, '.template', handleCardClick);
    return card.generateCard();
}

//Функция вставки карточки 
function render(cardEl) {
    cardsElements.prepend(cardEl);
}

//Функция кнопки загрузить
function submitAddCardForm(evt) {
    evt.preventDefault();
    const place = addPlaceInput.value;
    const link = addLinkInput.value;

    render(getCard({ place, link }));

    addCardForm.reset();
    closePopup(addCardPopup);
}


initialCards.forEach((data) => {
    render(getCard(data));
});


const profileFormValidator = new FormValidator(validateConfig, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validateConfig, addCardForm);
addCardFormValidator.enableValidation();