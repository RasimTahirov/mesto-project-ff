import "./pages/index.css";
import { createCard, currentUserCanDelete } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupOverlay,
} from "./components/modal.js";
import { showError, hideError, isValid } from "./components/validation.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// Загрузка информации о пользователе и карточек  с сервера
function loadUserInfo() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-8/users/me", {
    headers: {
      authorization: "f0900dc3-fecd-4246-b516-514bd8cfc01c",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Ошибка загрузки информации о пользователе: ${response.status}`
      );
    }
    return response.json();
  });
}

function loadCards() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-8/cards", {
    headers: {
      authorization: "f0900dc3-fecd-4246-b516-514bd8cfc01c",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка загрузки карточек: ${response.status}`);
    }
    return response.json();
  });
}

// Обработка данных пользователя и карточек при их загрузке
Promise.all([loadUserInfo(), loadCards()])
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
  })
  .catch((error) => {
    console.error("Произошла ошибка:", error);
  });

// Открытие и закрытие модального окна
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupNewCard = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

buttonOpenPopupProfile.addEventListener("click", () => openPopup(popupEdit));
buttonOpenPopupNewCard.addEventListener("click", () => openPopup(popupNewCard));

popupEdit.addEventListener("click", (evt) => closePopupOverlay(evt, popupEdit));
popupNewCard.addEventListener("click", (evt) =>
  closePopupOverlay(evt, popupNewCard)
);

const hidePopupImg = document.querySelector(".popup_type_image ");
hidePopupImg.addEventListener("click", (evt) =>
  closePopupOverlay(evt, hidePopupImg)
);

// Изменение имени
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");

// Редактирование профиля
function updateUserProfile(name, about) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-8/users/me", {
    method: "PATCH",
    headers: {
      authorization: "f0900dc3-fecd-4246-b516-514bd8cfc01c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Ошибка при обновлении данных профиля: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      console.error(
        "Произошла ошибка при обновлении данных профиля:",
        error.message
      );
    });
}

// Обработчик отправки формы редактирования
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  const saveButton = formElement.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";

  updateUserProfile(newName, newJob)
    .then((updatedUserData) => {
      nameElement.textContent = updatedUserData.name;
      jobElement.textContent = updatedUserData.about;

      saveButton.textContent = "Сохранить";

      closePopup(popupEdit);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении данных профиля:", error);

      saveButton.textContent = "Сохранить";
    });
}

formElement.addEventListener("submit", handleEditFormSubmit);

nameInput.value = nameElement.textContent;
jobInput.value = jobElement.textContent;

// Открытие иллюстрации
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImageContent = popupTypeImage.querySelector(
  ".popup__content_content_image"
);
const popupImage = popupImageContent.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// Функция добавления новой карточки
const popupNewCardForm = popupNewCard.querySelector(".popup__form");
const newCardNameInput = popupNewCard.querySelector(
  ".popup__input_type_card-name"
);
const newCardLinkInput = popupNewCard.querySelector(".popup__input_type_url");

let userId;

// Добавление новой карточки
function addNewCard(event, userId) {
  event.preventDefault();
  const newCard = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value,
  };

  const saveButton = popupNewCardForm.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";

  fetch("https://nomoreparties.co/v1/wff-cohort-8/cards", {
    method: "POST",
    headers: {
      authorization: "f0900dc3-fecd-4246-b516-514bd8cfc01c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCard),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Ошибка при добавлении новой карточки: ${response.status}`
        );
      }
      return response.json();
    })
    .then((newCardData) => {
      const currentUserCanDelete = newCardData.owner._id === userId;
      const newCardElement = createCard(
        newCardData,
        openImageHandler,
        userId,
        currentUserCanDelete
      );
      cardsContainer.insertBefore(newCardElement, cardsContainer.firstChild);
      closePopup(popupNewCard);
      event.target.reset();
    })
    .catch((error) => {
      console.error("Ошибка при добавлении новой карточки:", error);
    });
}

popupNewCardForm.addEventListener("submit", addNewCard);

function openImageHandler(src, alt, caption) {
  openPopup(popupTypeImage);
  popupImage.src = src;
  popupImage.alt = alt;
  popupCaption.textContent = caption;
}

// Валидация формы
const formInput = document.querySelectorAll(".popup__input");
const formError = formElement.querySelector(`.${formInput.id}-error`);
const submitButton = document.querySelectorAll(".popup__button");

formElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  formInput.forEach((input) => isValid(input));
});

formInput.forEach((input) => {
  input.addEventListener("input", function () {
    isValid(input);
  });
});

const avatarForm = document.getElementById("avatar-form");
const avatarUrlInput = document.getElementById("avatar-url");
const popupAvatar = document.querySelector(".popup__avatar");
const profileImage = document.querySelector(".profile__image");

// Обновление аватара пользователя
function changeAvatar(avatarUrl) {
  fetch("https://nomoreparties.co/v1/wff-cohort-8/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "f0900dc3-fecd-4246-b516-514bd8cfc01c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar: avatarUrl }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to change avatar: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("Error changing avatar:", error);
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
  closePopup(popupAvatar);
  saveButton.textContent = "Сохранить";
}

profileImage.addEventListener("click", openAvatarModal);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

export {
  cardTemplate,
  createCard,
  openImageHandler,
  formInput,
  formError,
  submitButton,
  nameInput,
  jobInput,
  nameElement,
  jobElement,
};
