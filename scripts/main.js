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
const popupContainer = document.querySelector(".popup__container");

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
function noLine() {
    nameInput.classList.remove("popup__input_type_error");
    aboutInput.classList.remove("popup__input_type_error");
}

// Функция очищения данных при вводе
function clearInput() {
    const arrayPopup = document.querySelectorAll('section.popup');
    arrayPopup.forEach((elPopup) => {
        const inputArray = elPopup.querySelectorAll(".popup__input");
        if (inputArray != null) {
            inputArray.forEach((el) => {
                el.value = '';
            })
        }
    })
}

// Функция очищения выводимых ошибок при вводе
function clearError() {
    const arrayPopup = document.querySelectorAll('section.popup');
    arrayPopup.forEach((elPopup) => {
        const errorArray = elPopup.querySelectorAll(".popup__input-error");
        if (errorArray != null) {
            errorArray.forEach((err) => {
                err.classList.remove("popup__input-error_active");
            });
        }
    })
}

// Функция закрытия всплывающих окон
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc)
}

// Функция закрытия всплывающих окон по кнопке Escape
function closeByEsc(evt) {
    if (evt.keyCode === 27) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
        noLine();
    }
}

// Применяем фукнцию открытия всплывающих окон для открытия всех всплывающих окон
profilePopupButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
    openPopup(profilePopup);
    noLine();
    clearError();
});


addCardPopupButton.addEventListener("click", () => {
    const buttonElement = addCardPopup.querySelector('.popup__button');
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add('popup__button_inactive');
    openPopup(addCardPopup);
    clearInput();
    clearError();

});

// Применяем фукнцию закрытия всплывающих окон по оверлей

window.addEventListener("click", function clickOverlay(evt) {
    const arrayPopup = document.querySelectorAll('section.popup');
    arrayPopup.forEach((elPopup) => {
        if (evt.target == elPopup) {
            if (evt.target != popupContainer && evt.target != document.querySelectorAll('.popup__input')) {
                closePopup(elPopup);
                if (evt.target != document.querySelector('.popup-image')) {
                    clearInput();
                    clearError();
                }
            }
        }
    })
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
const templateEl = document.querySelector(".template");
const inputPlaceEl = document.querySelector(".popup__input_place");
const inputImageEl = document.querySelector(".popup__input_image");

// Создаем карточки
function getItem(item) {
    const newItem = templateEl.content.querySelector('.card').cloneNode(true);
    const titleEl = newItem.querySelector(".card__title");
    const imageEl = newItem.querySelector(".card__image");
    titleEl.textContent = item.place;
    imageEl.setAttribute("src", item.link);
    imageEl.setAttribute("alt", item.place);

    // Создаем кнопку удаления карточки и применяем к ней функцию удаления
    const removeBtn = newItem.querySelector(".card__remove");
    removeBtn.addEventListener("click", handleDelete);

    // Создаем кнопку лайка карточки и применяем к ней функцию проставления лайка
    const likeBtn = newItem.querySelector(".card__like");
    likeBtn.addEventListener('click', likeTag);

    // создаем функцию закрытия всплывающего изображения по клику на него
    const imagePopup = document.querySelector('.popup-image');
    const closeBtnImg = imagePopup.querySelector(".popup__close");
    closeBtnImg.addEventListener("click", () => {
        closePopup(imagePopup);
    });

    // Берем изображение и вставляем его во всплывающее окно
    const modalImg = document.getElementById('img01');
    const captionText = document.querySelector('.popup-image__caption');
    imageEl.addEventListener("click", () => {
        openPopup(imagePopup);
        modalImg.src = item.link;
        modalImg.alt = item.place;
        captionText.textContent = item.place;
    });
    return newItem;
}

// Добавляем карточки в секцию elements
function render() {
    const html = initialCards.map(getItem);
    listContainerEl.append(...html);
}

// Создаем функцию удаления карточки
function handleDelete(event) {
    const targetEl = event.target;
    const targetItem = targetEl.closest(".card");
    targetItem.remove();
}

// Создаем функцию проставления лайка
function likeTag(evt) {
    evt.target.classList.toggle('card__like_active');
};

// Добавляем новую карточку по клику кнопки
function handleAdd(evt) {
    evt.preventDefault();
    const inputPlaceText = inputPlaceEl.value;

    const inputImageLink = inputImageEl.value;
    const listPlaceItem = getItem({
        place: inputPlaceText,
        link: inputImageLink,
    });

    listContainerEl.prepend(listPlaceItem);
    inputPlaceEl.value = '';
    inputImageEl.value = '';
    closePopup(addCardPopup);
}

cardPopuploadButton.addEventListener("click", handleAdd);

// Сохранение результата работы функции
addCardPopup.addEventListener("submit", handleAdd);

render();