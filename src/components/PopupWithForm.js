import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);

        this._form = this._popupElement.querySelector('.popup__container');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._handleFormSubmit = handleFormSubmit;
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
        this._form.reset();
        super.close();
    }

}