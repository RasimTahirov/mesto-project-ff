import "./pages/index.css";
import { createCard, cardTemplate } from "./components/card.js";
import { closePopup, openPopup } from "./components/modal.js";
import { getUserInfo, getInitialCards, updateUserProfile as apiUpdateUserProfile,addCard, changeAvatar as apiChangeAvatar } from "./components/api.js";
import { enableValidation, clearValidation } from "./components/validation";

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// Обработка данных пользователя и карточек при их загрузке
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    nameElement.textContent = userData.name;
    jobElement.textContent = userData.about;

    const userId = userData._id;

    const profileImage = document.querySelector(".profile__image");
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;

    cardsData.forEach((card) => {
      const createdCard = createCard(card, openImageHandler, userId);
      cardsContainer.appendChild(createdCard);
    });

    nameInput.value = userData.name;
    jobInput.value = userData.about;
  })
  .catch((error) => {
    console.error("Ошибка:", error);
  });

// Открытие и закрытие модального окна
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupNewCard = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

buttonOpenPopupProfile.addEventListener("click", () => openPopup(popupEdit));
buttonOpenPopupNewCard.addEventListener("click", () => openPopup(popupNewCard));

// Изменение имени
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;
  const saveButton = formElement.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";

  apiUpdateUserProfile(newName, newJob)
    .then((updatedUserData) => {
      nameElement.textContent = updatedUserData.name;
      jobElement.textContent = updatedUserData.about;
      const popup = formElement.closest(".popup");
      if (popup) {
        closePopup(popup);
      }
    })
    .catch((error) => {
      console.error("Ошибка", error);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });
}

formElement.addEventListener("submit", handleEditFormSubmit);

// Открытие иллюстрации
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImageContent = popupTypeImage.querySelector(".popup__content_content_image");
const popupImage = popupImageContent.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// Функция добавления новой карточки
const popupNewCardForm = popupNewCard.querySelector(".popup__form");
const newCardNameInput = popupNewCard.querySelector(".popup__input_type_card-name");
const newCardLinkInput = popupNewCard.querySelector(".popup__input_type_url");

let userId;

function addNewCard(event, userId) {
  const newCard = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value,
  };

  const saveButton = popupNewCardForm.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";

  addCard(newCard)
    .then((newCardData) => {
      const currentUserCanDelete = newCardData.owner._id === userId;
      const newCardElement = createCard(
        newCardData,
        openImageHandler,
        userId,
        currentUserCanDelete
      );
      cardsContainer.insertBefore(newCardElement, cardsContainer.firstChild);
      event.target.reset();
      saveButton.classList.add("popup__button-inactive");
      saveButton.disabled = true;
      const popup = popupNewCardForm.closest(".popup");
      if (popup) {
        closePopup(popup);
      }
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    })
    .finally(() => {
      saveButton.textContent = "Сохранение";
    });
}

popupNewCardForm.addEventListener("submit", addNewCard);

function openImageHandler(src, alt, caption) {
  openPopup(popupTypeImage);
  popupImage.src = src;
  popupImage.alt = alt;
  popupCaption.textContent = caption;
}

// Обновление аватара
const avatarForm = document.getElementById("avatar-form");
const avatarUrlInput = document.getElementById("avatar-url");
const popupAvatar = document.querySelector(".popup__avatar");
const profileImage = document.querySelector(".profile__image");

function changeAvatar(avatarUrl) {
  const saveButton = avatarForm.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";

  apiChangeAvatar(avatarUrl)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${avatarUrl})`;
      const popup = avatarForm.closest(".popup");
      if (popup) {
        closePopup(popup);
      }
      avatarUrlInput.value = "";
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });
}

function openAvatarModal() {
  openPopup(popupAvatar);
}

function handleAvatarFormSubmit(event) {
  event.preventDefault();
  const newAvatarUrl = avatarUrlInput.value;
  const saveButton = avatarForm.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  changeAvatar(newAvatarUrl);
}

profileImage.addEventListener("click", openAvatarModal);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Валидация
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "form__input-error",
};

enableValidation(validationConfig);

const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
clearValidation(profileForm, validationConfig);

const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
clearValidation(newPlaceForm, validationConfig);

export {
  cardTemplate,
  createCard,
  openImageHandler,
};
