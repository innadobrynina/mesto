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

const validateConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: '.popup__input_type_error',
    errorClass: 'popup__input-error_active',
}

const cardsElementsSelector = '.elements';
const cardTemplate = '.template';
const profileTitleSelector = '.profile__title';
const profileSubtitleSelector = '.profile__subtitle';

const profilePopupSelector = '.popup-profile';
const profilePopup = document.querySelector(profilePopupSelector);
const profileForm = profilePopup.querySelector(".popup__container");
const profilePopupButton = document.querySelector(".profile__button-edit");
const nameInput = profileForm.querySelector('.popup__input_name');
const aboutInput = profileForm.querySelector('.popup__input_about');

const imagePopupSelector = '.popup-image';

const addCardPopupSelector = '.popup-add';
const addCardPopup = document.querySelector(addCardPopupSelector);
const addCardForm = addCardPopup.querySelector(".popup__container");
const addCardPopupButton = document.querySelector(".profile__button-add");


export {
    initialCards,
    validateConfig,
    cardsElementsSelector,
    cardTemplate,
    profileTitleSelector,
    profileSubtitleSelector,
    profilePopupSelector,
    profileForm,
    profilePopupButton,
    nameInput,
    aboutInput,
    imagePopupSelector,
    addCardPopupSelector,
    addCardForm,
    addCardPopupButton,
};