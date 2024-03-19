import { cardTemplate } from "../index.js";
export { createCard };

// Функция создания карточки
function createCard(card, openImageHandler, userId, deleteCallback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImages = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImages.alt = card.name;
  cardImages.src = card.link;
  cardTitle.textContent = card.name;

  cardImages.addEventListener("click", () => {
    openImageHandler(card.link, card.name, card.name);
  });

  deleteButton.addEventListener("click", () => {
    deleteCard(card._id, cardElement);
  });

  if (card.owner._id === userId) {
    deleteButton.style.display = "block";
  } else {
    deleteButton.style.display = "none";
  }

  if (card.likes.some((like) => like._id === userId)) {
    likeBtn.classList.add("card__like-button_is-active");
  }

  likeBtn.addEventListener("click", () => {
    toggleLike(card._id, likeBtn, likeCounter);
  });

  likeCounter.textContent = card.likes.length;

  return cardElement;
}

// Функция постановки и снятия лайка на карточке
function toggleLike(cardId, likeBtn, likeCounter) {
  const isLiked = likeBtn.classList.contains("card__like-button_is-active");
  const method = isLiked ? "DELETE" : "PUT";

  fetch(`https://nomoreparties.co/v1/wff-cohort-8/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: "f0900dc3-fecd-4246-b516-514bd8cfc01c",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Не удалось ${isLiked ? "убрать лайк" : "поставить лайк"} карточке: ${
            response.status
          }`
        );
      }
      return response.json();
    })
    .then((data) => {
      likeBtn.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = data.likes.length;
    })
    .catch((error) => {
      console.error(
        `Ошибка ${isLiked ? "убирания лайка" : "постановки лайка"} карточке:`,
        error
      );
    });
}

// Функция удаления карточки
function deleteCard(cardId, cardElement) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-8/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "f0900dc3-fecd-4246-b516-514bd8cfc01c",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Не удалось удалить карту: ${response.status}`);
      }
      cardElement.remove();
    })
    .catch((error) => {
      console.error("Ошибка удаления карты:", error);
    });
}
