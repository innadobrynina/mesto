import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.popup__container');
        this._inputList = this._form.querySelectorAll('.popup__input');

        this._submitButton = this._form.querySelector('.popup__form-submit').firstChild;
        this._submitButtonCaption = this._submitButton.data;
    }

    _getInputValues() {
        const inputValues = {};

        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
        this._submitButton.data = this._submitButtonCaption;
    }

    savingData() {
        this._submitButton.data = "Сохранение...";
    }
}