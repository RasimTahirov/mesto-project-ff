function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  const { inputErrorClass, errorClass } = validationConfig;
  const errorElement = inputElement.nextElementSibling;
  if (errorElement) {
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    errorElement.classList.add("form__input-error_active");
  }
}

function hideInputError(formElement, inputElement, validationConfig) {
  const { inputErrorClass, errorClass } = validationConfig;
  const errorElement = inputElement.nextElementSibling;
  if (errorElement) {
    inputElement.classList.remove(inputErrorClass);
    if (errorElement.classList) {
      errorElement.classList.remove(errorClass);
      errorElement.classList.remove("form__input-error_active");
    }
    errorElement.textContent = "";
  }
}

function checkInputValidity(
  formElement,
  formInput,
  { inputErrorClass, errorClass }
) {
  if (!formInput.validity.valid) {
    if (formInput.validity.patternMismatch) {
      formInput.setCustomValidity(formInput.dataset.errorMessage);
    } else {
      formInput.setCustomValidity("");
    }
    showInputError(formElement, formInput, formInput.validationMessage, {
      inputErrorClass,
      errorClass,
    });
  } else {
    formInput.setCustomValidity("");
    hideInputError(formElement, formInput, { inputErrorClass, errorClass });
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((formInput) => !formInput.validity.valid);
}

function toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
  const isInvalidUrl = inputList.some((input) => !input.validity.valid);
  if (isInvalidUrl) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(
  formElement,
  { inputSelector, submitButtonSelector, ...rest }
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((formInput) => {
    formInput.addEventListener("input", function () {
      checkInputValidity(formElement, formInput, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });

  toggleButtonState(inputList, buttonElement, rest);
}

function enableValidation(validationConfig) {
  const forms = document.querySelectorAll(validationConfig.formSelector);
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationConfig);
  });
}

function clearValidation(
  formElement,
  { inputErrorClass, errorClass, inactiveButtonClass }
) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  inputList.forEach((formInput) => {
    hideInputError(formElement, formInput, { inputErrorClass, errorClass });
  });

  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

export { enableValidation, clearValidation };
