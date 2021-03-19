export default class FormValidator {
    constructor() {
        this._options = {
            formSelector: '.popup__container',
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_inactive',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__input-error_active',
        }

    }

    _showInputError(formElement, inputElement, errorMessage, options) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(options.inputErrorClass);
        errorElement.classList.add(options.errorClass);
        errorElement.textContent = errorMessage;
    };

    _hideInputError(formElement, inputElement, options) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(options.inputErrorClass);
        errorElement.classList.remove(options.errorClass);
        errorElement.textContent = "";
    };

    _checkInputValidity(formElement, inputElement, options) {
        const isInputNotValid = !inputElement.validity.valid;

        if (isInputNotValid) {
            const errorMessage = inputElement.validationMessage;

            this._showInputError(formElement, inputElement, errorMessage, options);
        } else {
            this._hideInputError(formElement, inputElement, options);
        }

    };

    _toggleButtonState(inputList, buttonElement, options) {
        const hasNotValidInput = inputList.some((inputElement) => !inputElement.validity.valid);

        if (hasNotValidInput) {
            buttonElement.setAttribute("disabled", true);
            buttonElement.classList.add(options.inactiveButtonClass);
        } else {
            buttonElement.removeAttribute("disabled");
            buttonElement.classList.remove(options.inactiveButtonClass);
        }
    }

    _setEventListeners(formElement, options) {
        const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
        const buttonElement = formElement.querySelector(options.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement, options);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(formElement, inputElement, options);
                this._toggleButtonState(inputList, buttonElement, options);
            });
        });
    };

    enableValidation() {
        const formElements = document.querySelectorAll(this._options.formSelector);
        const formList = Array.from(formElements);

        formList.forEach((formElement) => {
            this._setEventListeners(formElement, this._options);
        });
    };
}