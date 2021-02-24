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
const popup = document.querySelector(".popup");

// Функция открытия всплывающих окон
function openPopup(popup, noLine) {
    popup.classList.add('popup_opened');
    if (noLine != '') {
        nameInput.classList.remove("popup__input_type_error");
        aboutInput.classList.remove("popup__input_type_error");
    }
}

// Функция закрытия всплывающих окон
function closePopup(popup, inputArray, errorArray) {
    popup.classList.remove('popup_opened');

    if (inputArray != null) {
        inputArray.forEach((el) => {
            el.value = '';
        });
    }
    if (errorArray != null) {
        errorArray.forEach((err) => {
            err.classList.remove("popup__input-error_active");
        });
    }

}

// Применяем фукнцию открытия всплывающих окон для открытия всех всплывающих окон
profilePopupButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
    const noLine = '1';
    openPopup(profilePopup, noLine)
});

addCardPopupButton.addEventListener("click", () => {
    openPopup(addCardPopup)
});

// Применяем фукнцию закрытия всплывающих окон для закрытия всех всплывающих окон

window.onkeydown = function(evt) {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        const arrayPopup = document.querySelectorAll('section.popup');
        arrayPopup.forEach((elPopup) => {
            const inputArray = elPopup.querySelectorAll(".popup__input");
            const errorArray = elPopup.querySelectorAll(".popup__input-error");
            closePopup(elPopup, inputArray, errorArray);
        })
    }
}

window.addEventListener("click", function clickOverlay(evt) {
    const arrayPopup = document.querySelectorAll('section.popup');
    arrayPopup.forEach((elPopup) => {
        if (evt.target == elPopup) {
            if (evt.target != popupContainer && evt.target != document.querySelectorAll('.popup__input')) {
                const inputArray = elPopup.querySelectorAll(".popup__input");
                const errorArray = elPopup.querySelectorAll(".popup__input-error");
                closePopup(elPopup, inputArray, errorArray);
            }
        }
    })
})

profilePopupCloseButton.addEventListener("click", () => {
    const inputArray = profilePopup.querySelectorAll(".popup__input");
    const errorArray = profilePopup.querySelectorAll(".popup__input-error");
    closePopup(profilePopup, inputArray, errorArray);
})

cardPopupCloseButton.addEventListener("click", () => {
    const inputArray = addCardPopup.querySelectorAll(".popup__input");
    const errorArray = addCardPopup.querySelectorAll(".popup__input-error");
    closePopup(addCardPopup, inputArray, errorArray);
})

// Функция кнопки сохранения
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    closePopup(profilePopup);
}

// Сохранение результата работы функции
profilePopup.addEventListener("submit", formSubmitHandler);

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

// Находим шаблон template
const listContainerEl = document.querySelector(".elements");
const templateEl = document.querySelector(".template");
const inputPlaceEl = document.querySelector(".popup__input_place");
const inputImageEl = document.querySelector(".popup__input_image");

// Создаем карточки
function getItem(item) {
    const newItem = templateEl.content.cloneNode(true);
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
    return newItem.children[0];
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