let formElement = document.querySelector(".popup");
let editButton = document.querySelector(".profile__button-edit");
let popupCloseButton = formElement.querySelector(".popup__close");
let nameInput = edit.elements.title;
let aboutInput = edit.elements.about;
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let saveButton = formElement.querySelector(".popup__button");

// Функция открытия окна редактирования
function fEditButton() {
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
    formElement.classList.add("popup_opened");
}

//Функция закрытия окна редактирования
function fCloseButton() {
    formElement.classList.remove("popup_opened");
}

// Функция кнопки сохранения
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    formElement.classList.remove("popup_opened");
}

// Вызов функции открытия окна редактирования
editButton.addEventListener("click", fEditButton);

// Вызов функции закрытия окна редактирования по кнопке
popupCloseButton.addEventListener("click", fCloseButton);

// Сохранение результата работы функции
formElement.addEventListener("submit", formSubmitHandler);

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
const addButtonEl = document.querySelector(".profile__button-add");
const inputPlaceEl = document.querySelector(".popup-add__input_place");
const inputImageEl = document.querySelector(".popup-add__input_image");

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

    // Создаем всплывающее окно изображения
    const formImage = document.querySelector('.popup-image');

    // Берем изображение и вставляем его во всплывающее окно
    const modalImg = document.getElementById('img01');
    const captionText = document.querySelector('.popup-image__caption');
    imageEl.onclick = function() {
        // formImage.style.display = "flex";
        formImage.classList.add("popup-add_opened");
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }


    // Создаем кнопку закрытия всплывающего окна
    const closeBtnImg = document.getElementsByClassName("popup-image__close")[0];

    // создаем функцию закрытия всплывающего окна по клику по кнопке
    closeBtnImg.onclick = function() {
        formImage.classList.remove("popup-add_opened");
    }
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


let addFormElement = document.querySelector(".popup-add");
let addCloseButton = addFormElement.querySelector(".popup__close");
let loadButton = addFormElement.querySelector(".popup__button");

// Функция открытия окна редактирования
function fAddButton() {
    addFormElement.classList.add("popup-add_opened");
}

//Функция закрытия окна редактирования
function fAddCloseButton() {
    addFormElement.classList.remove("popup-add_opened");
}

// Вызов функции открытия окна редактирования
addButtonEl.addEventListener("click", fAddButton);

// Вызов функции закрытия окна редактирования по кнопке
addCloseButton.addEventListener("click", fAddCloseButton);


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
    inputPlaceEl.value = 'Название';
    inputImageEl.value = 'Ссылка на картинку';
    addFormElement.classList.remove("popup-add_opened");
}

loadButton.addEventListener("click", handleAdd);

// Сохранение результата работы функции
addFormElement.addEventListener("submit", handleAdd);

render();