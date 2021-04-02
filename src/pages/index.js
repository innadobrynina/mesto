import ('./index.css');

import {
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
} from '../utils/input_data.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// Функция добавления карточки по клику кнопки
const handleAddCard = () => {
    addCardForm.reset();
    addCardFormValidator.clearValidation();
    addCardPopup.open();
}

// Функция открытия окна попапа редактирования профайла
const handleEditProfile = () => {
    const { name, about } = user.getUserInfo();
    nameInput.value = name;
    aboutInput.value = about;
    profileFormValidator.clearValidation();
    profilePopup.open();
}

const popupImage = new PopupWithImage(imagePopupSelector);


//Функция формирования карточки
const getCard = (data) => {
    const card = new Card(data, () => popupImage.open(data.place, data.link), cardTemplate);
    return card.generateCard();
}

const cardSection = new Section({
        items: initialCards,
        renderer: (data) => {
            cardSection.addItem(getCard(data));
        },
    },
    cardsElementsSelector
);


const user = new UserInfo({
    nameSelector: profileTitleSelector,
    aboutSelector: profileSubtitleSelector,
});

// Функция кнопки сохранения
const submitProfileForm = (data) => {
    user.setUserInfo({
        name: data["title-name"],
        about: data["about-name"],
    })
    profilePopup.close();
}


const profilePopup = new PopupWithForm(profilePopupSelector, (data) =>
    submitProfileForm(data)
);


//Функция кнопки загрузить
const submitAddCardForm = (data) => {
    const place = data["place-name"];
    const link = data["link-image"];
    cardSection.addItem(getCard({ place, link }));
    addCardPopup.close();
};

const addCardPopup = new PopupWithForm(addCardPopupSelector, (data) => submitAddCardForm(data));

const profileFormValidator = new FormValidator(validateConfig, profileForm);
const addCardFormValidator = new FormValidator(validateConfig, addCardForm);

popupImage.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

addCardPopupButton.addEventListener('click', handleAddCard);
profilePopupButton.addEventListener('click', handleEditProfile);

cardSection.renderItems();