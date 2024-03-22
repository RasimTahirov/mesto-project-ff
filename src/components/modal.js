export { openPopup, closePopup, popups };
import { nameInput, jobInput, nameElement, jobElement } from "../index.js";

// Закрытие окна по esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup.popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Открытие popup
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);

  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
}

// Закрытие popup
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
}

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_is-opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__button")) {
    const popup = evt.target.closest(".popup");
    if (popup) {
      closePopup(popup);
    }
  }
});
