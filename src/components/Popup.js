export default class Popup {
    _escape = "Escape";

    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closePopupButton = this._popupElement.querySelector('.popup__close');
        this.close = this.close.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        this._popupElement.addEventListener('pointerdown', this._handleEscClose);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        this._popupElement.removeEventListener('pointerdown', this._handleEscClose);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === this._escape || evt.target === this._popupElement) {
            this.close();
        }
    }

    setEventListeners() {

        this._closePopupButton.addEventListener('click', this.close);
    }
}