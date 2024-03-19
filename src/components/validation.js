import { formInput, formError, submitButton } from "../index.js"

const showError = (input, errorMessage) => {
    const errorElement = input.nextElementSibling;
    errorElement.classList.add("form__input-error_active");
    errorElement.textContent = errorMessage;
    submitButton.forEach((button) => {
      button.setAttribute("disabled", "true");
      button.classList.add("popup__button-inactive");
    });
  };
  
  const hideError = (input) => {
    const errorElement = input.nextElementSibling;
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
    submitButton.forEach((button) => {
      button.removeAttribute("disabled", "true");
      button.classList.remove("popup__button-inactive");
    });
  };
  
  const isValid = (input) => {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity("");
    }
  
    if (!input.validity.valid) {
      showError(input, input.validationMessage);
    } else {
      hideError(input);
    }
  };

  export { showError, hideError, isValid }
