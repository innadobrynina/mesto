const configAPI = {
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-22",
    headers: {
        authorization: "bb37a53f-65dd-4153-b255-188fa4e0f13b",
        "Content-Type": "application/json",
    },
};

const validateConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-submit',
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
const profileForm = profilePopup.querySelector('.popup__container');
const profilePopupButton = document.querySelector('.profile__button-edit');
const nameInput = profileForm.querySelector('.popup__input_name');
const aboutInput = profileForm.querySelector('.popup__input_about');

const imagePopupSelector = '.popup-image';

const addCardPopupSelector = '.popup-add';
const addCardPopup = document.querySelector(addCardPopupSelector);
const addCardForm = addCardPopup.querySelector('.popup__container');
const addCardPopupButton = document.querySelector('.profile__button-add');

const avatarPopupSelector = '.popup-update-avatar';
const avatarPopup = document.querySelector(avatarPopupSelector);
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarLogo = document.querySelector('.profile__avatar-block');
const avatarSelector = '.profile__avatar';

const confirmPopupSelector = '.popup-confirm';
const confirmPopup = document.querySelector('.popup-confirm');


export {
    configAPI,
    validateConfig,
    cardsElementsSelector,
    cardTemplate,
    profileTitleSelector,
    profileSubtitleSelector,
    avatarSelector,
    profilePopupSelector,
    profileForm,
    profilePopupButton,
    nameInput,
    aboutInput,
    imagePopupSelector,
    addCardPopupSelector,
    addCardForm,
    addCardPopupButton,
    avatarPopupSelector,
    avatarPopup,
    avatarForm,
    avatarLogo,
    confirmPopupSelector,
    confirmPopup,
};