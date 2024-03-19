export { openPopup, closePopup, closePopupOverlay };
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

// Закрытие по overlay
function closePopupOverlay(evt) {
  const popupContent = evt.target.closest(".popup__content");
  if (!popupContent) {
    const popup = evt.target.closest(".popup");
    if (popup) {
      closePopup(popup);
    }
  }
}

const closeBtn = document.querySelectorAll(".popup__close");

closeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const popup = btn.closest(".popup");
    if (popup) {
      closePopup(popup);
    }
  });
});
