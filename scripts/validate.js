const showInputError = (formElement, inputElement, errorMessage, options) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass);
    errorElement.classList.add(options.errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, options) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = "";

};


const checkInputValidity = (formElement, inputElement, options) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;

        showInputError(formElement, inputElement, errorMessage, options);
    } else {
        hideInputError(formElement, inputElement, options);
    }

};

const toggleButtonState = (inputList, buttonElement, options) => {
    const hasNotValidInput = inputList.some((inputElement) => !inputElement.validity.valid);

    if (hasNotValidInput) {
        buttonElement.setAttribute("disabled", true);
        buttonElement.classList.add(options.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove(options.inactiveButtonClass);
    }
}


const setEventListeners = (formElement, options) => {
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    const buttonElement = formElement.querySelector(options.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, options);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, options);
            toggleButtonState(inputList, buttonElement, options);
        });
    });
};


const enableValidation = (options) => {
    const formElements = document.querySelectorAll(options.formSelector);
    const formList = Array.from(formElements);

    formList.forEach((formElement) => {
        setEventListeners(formElement, options);
    });
};


enableValidation({
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
});
/* 
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
} */