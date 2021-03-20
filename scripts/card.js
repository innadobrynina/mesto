export default class Card {
    constructor(item) {
        this._item = item;
    }

    // Создаем функцию удаления карточки
    _handleDelete(event) {
        const targetEl = event.target;
        const targetItem = targetEl.closest(".card");
        targetItem.remove();
    }

    // Создаем функцию проставления лайка
    _likeTag(evt) {
        evt.target.classList.toggle('card__like_active');
    };

    // Функция открытия всплывающих окон
    _openPopup(popup) {
        popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeByEsc.bind(this));
    }

    // Функция закрытия всплывающих окон по кнопке Escape
    _closeByEsc(evt) {
        if (evt.keyCode === 27) /* escape */ {
            const openedPopup = document.querySelector('.popup_opened');
            this._closePopup(openedPopup);
            this._noLineForProfileForm();
        }
    }

    // Функция отмены подчеркивания 
    _noLineForProfileForm() {
        const nameInput = edit.elements.title;
        const aboutInput = edit.elements.about;
        nameInput.classList.remove("popup__input_type_error");
        aboutInput.classList.remove("popup__input_type_error");
    }

    // Функция закрытия всплывающих окон
    _closePopup(popup) {
        if (popup === null) {
            return
        }
        popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closeByEsc.bind(this));
    }

    getCard() {
        const item = this._item;

        const templateEl = document.querySelector(".template");
        const newItem = templateEl.content.querySelector('.card').cloneNode(true);
        const titleEl = newItem.querySelector(".card__title");
        const imageEl = newItem.querySelector(".card__image");
        titleEl.textContent = item.place;
        imageEl.setAttribute("src", item.link);
        imageEl.setAttribute("alt", item.place);

        // Создаем кнопку удаления карточки и применяем к ней функцию удаления
        const removeBtn = newItem.querySelector(".card__remove");
        removeBtn.addEventListener("click", this._handleDelete.bind(this));

        // Создаем кнопку лайка карточки и применяем к ней функцию проставления лайка
        const likeBtn = newItem.querySelector(".card__like");
        likeBtn.addEventListener('click', this._likeTag.bind(this));

        // создаем функцию закрытия всплывающего изображения по клику на него
        const imagePopup = document.querySelector('.popup-image');
        const closeBtnImg = imagePopup.querySelector(".popup__close");
        closeBtnImg.addEventListener("click", () => {
            this._closePopup(imagePopup);
        });

        // Берем изображение и вставляем его во всплывающее окно
        const modalImg = document.getElementById('img01');
        const captionText = document.querySelector('.popup-image__caption');
        imageEl.addEventListener("click", () => {
            this._openPopup(imagePopup);
            modalImg.src = item.link;
            modalImg.alt = item.place;
            captionText.textContent = item.place;
        });

        return newItem;
    }

}