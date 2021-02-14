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

// Функция открытия всплывающих окон
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

// Функция закрытия всплывающих окон
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

// Применяем фукнцию открытия всплывающих окон для открытия всех всплывающих окон
profilePopupButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
    openPopup(profilePopup)
});

addCardPopupButton.addEventListener("click", () => {
    openPopup(addCardPopup)
});

// Применяем фукнцию закрытия всплывающих окон для закрытия всех всплывающих окон
profilePopupCloseButton.addEventListener("click", () => {
    closePopup(profilePopup);
})

cardPopupCloseButton.addEventListener("click", () => {
    closePopup(addCardPopup)
});

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
        openPopup(imagePopup)
        modalImg.src = item.link
        captionText.textContent = item.place
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
    console.log("handleAdd");
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