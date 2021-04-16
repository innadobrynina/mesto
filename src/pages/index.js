import Api from '../components/Api.js';
import ('./index.css');

import {
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
    avatarForm,
    avatarLogo,
    confirmPopupSelector,
} from '../utils/input_data.js';


import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

let currentUser;

// Функция добавления карточки по клику кнопки
const handleAddCard = () => {
    addCardFormValidator.clearValidation();
    addCardPopup.open();
}

// Функция открытия окна попапа редактирования профайла
const handleEditProfile = () => {
    const { name, about } = userEl.getUserInfo();
    nameInput.value = name;
    aboutInput.value = about;
    profileFormValidator.clearValidation();
    profilePopup.open();
}

const popupImage = new PopupWithImage(imagePopupSelector);

const confirmAction = () => {
    return new Promise((res, rej) => {
        confirmPopup.open(res, rej);
    });
};

function deleteCardWithConfirm(cardId, cardEl) {
    api
        .deleteCard(cardId)
        .then(() => {
            cardEl.style.transition = "0.5s";

            setTimeout(() => {
                cardEl.remove();
                cardEl = null;
            }, 500);
        })
        .catch((err) => {
            console.log("Ошибка при удалении карточки");
            console.log(err);
        });
}



//Функция формирования карточки
const getCard = (data) => {
    const card = new Card(data, currentUser, cardTemplate, () => popupImage.open(data.name, data.link), {
            handleToggleLike: function(action, cardId) {
                if (action === "PUT") {
                    return api.putLike(cardId);
                } else {
                    return api.deleteLike(cardId);
                }
            },
        },

        {
            handleDeleteCard: function(cardId, cardEl) {
                confirmAction()
                    .then(() => {
                        deleteCardWithConfirm(cardId, cardEl);
                    })
                    .catch(() => console.log("Запрет удаления карточки"));
            },
        }
    );
    return card.generateCard();
};

const cardSection = new Section({
        renderer: (data) => getCard(data),
    },
    cardsElementsSelector
);


const userEl = new UserInfo({
    nameSelector: profileTitleSelector,
    aboutSelector: profileSubtitleSelector,
    avatarSelector,
});


const profilePopup = new PopupWithForm(profilePopupSelector, {
    handleFormSubmit: function(user) {
        this.savingData();
        api
            .setUserInfo({
                name: user.name,
                about: user.about,
            })
            .then((userData) => {
                userEl.setUserInfo(userData);
                profilePopup.close();
            })
            .catch((err) => {
                console.log(err);
            });
    },
});

const addCardPopup = new PopupWithForm(addCardPopupSelector, {
    handleFormSubmit: function(card) {
        this.savingData();
        api
            .createCard({
                name: card.name,
                link: card.link,
            })
            .then((card) => {
                cardSection.addItem(card);
                addCardPopup.close();
            })
            .catch((err) => {
                console.log(err);
            });
    },
});

const avatarPopup = new PopupWithForm(avatarPopupSelector, {
    handleFormSubmit: function({ avatar }) {
        this.savingData();
        api
            .updateAvatar(avatar)
            .then((userData) => {
                userEl.setUserAvatar(userData);
                avatarPopup.close();
            })
            .catch((err) => {
                console.log("Обновление аватара", err);
            });
    },
});

const handleUpdateAvatar = () => {
    avatarFormValidator.clearValidation();
    avatarPopup.open();
};

const confirmPopup = new PopupWithConfirm(confirmPopupSelector, {
    handleFormSubmit: function() {},
});


const profileFormValidator = new FormValidator(validateConfig, profileForm);
const addCardFormValidator = new FormValidator(validateConfig, addCardForm);
const avatarFormValidator = new FormValidator(validateConfig, avatarForm);

popupImage.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopup.setEventListeners();
confirmPopup.setEventListeners();

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

addCardPopupButton.addEventListener('click', handleAddCard);
profilePopupButton.addEventListener('click', handleEditProfile);
avatarLogo.addEventListener('click', handleUpdateAvatar);

const api = new Api(configAPI);

Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cards]) => {
        currentUser = userData;
        userEl.setUserInfo(currentUser);
        userEl.setUserAvatar(currentUser);
        cardSection.setItems(cards);
        cardSection.renderItems();
    })
    .catch((err) => {
        console.log("Promise отклонен", err);
    });