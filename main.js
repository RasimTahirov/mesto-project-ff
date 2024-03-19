(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};function e(t,e,n,o){var r=i.querySelector(".card").cloneNode(!0),c=r.querySelector(".card__image"),a=r.querySelector(".card__title"),u=r.querySelector(".card__delete-button"),l=r.querySelector(".card__like-button"),s=r.querySelector(".card__like-counter");return c.alt=t.name,c.src=t.link,a.textContent=t.name,c.addEventListener("click",(function(){e(t.link,t.name,t.name)})),u.addEventListener("click",(function(){!function(t,e){fetch("https://nomoreparties.co/v1/wff-cohort-8/cards/".concat(t),{method:"DELETE",headers:{authorization:"f0900dc3-fecd-4246-b516-514bd8cfc01c"}}).then((function(t){if(!t.ok)throw new Error("Не удалось удалить карту: ".concat(t.status));e.remove()})).catch((function(t){console.error("Ошибка удаления карты:",t)}))}(t._id,r)})),t.owner._id===n?u.style.display="block":u.style.display="none",t.likes.some((function(t){return t._id===n}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(){!function(t,e,n){var o=e.classList.contains("card__like-button_is-active"),r=o?"DELETE":"PUT";fetch("https://nomoreparties.co/v1/wff-cohort-8/cards/likes/".concat(t),{method:r,headers:{authorization:"f0900dc3-fecd-4246-b516-514bd8cfc01c"}}).then((function(t){if(!t.ok)throw new Error("Failed to ".concat(o?"unlike":"like"," the card: ").concat(t.status));return t.json()})).then((function(t){e.classList.toggle("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(t){console.error("Error ".concat(o?"unliking":"liking"," the card:"),t)}))}(t._id,l,s)})),s.textContent=t.likes.length,r}function n(t){if("Escape"===t.key){var e=document.querySelector(".popup.popup_is-opened");e&&r(e)}}function o(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",n),_.value=v.textContent,m.value=h.textContent}function r(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function c(t){if(!t.target.closest(".popup__content")){var e=t.target.closest(".popup");e&&r(e)}}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}t.d({},{gj:()=>i,aW:()=>h,Ou:()=>m,_M:()=>v,Kk:()=>_}),document.querySelectorAll(".popup__close").forEach((function(t){t.addEventListener("click",(function(){var e=t.closest(".popup");e&&r(e)}))}));var i=document.querySelector("#card-template").content,u=document.querySelector(".places__list");Promise.all([fetch("https://nomoreparties.co/v1/wff-cohort-8/users/me",{headers:{authorization:"f0900dc3-fecd-4246-b516-514bd8cfc01c"}}).then((function(t){if(!t.ok)throw new Error("Ошибка загрузки информации о пользователе: ".concat(t.status));return t.json()})),fetch("https://nomoreparties.co/v1/wff-cohort-8/cards",{headers:{authorization:"f0900dc3-fecd-4246-b516-514bd8cfc01c"}}).then((function(t){if(!t.ok)throw new Error("Ошибка загрузки карточек: ".concat(t.status));return t.json()}))]).then((function(t){var n,o,r=(o=2,function(t){if(Array.isArray(t))return t}(n=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==e);u=!0);}catch(t){l=!0,r=t}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(n,o)||function(t,e){if(t){if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}(n,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],i=r[1];v.textContent=c.name,h.textContent=c.about;var l=c._id;document.querySelector(".profile__image").style.backgroundImage="url('".concat(c.avatar,"')"),i.forEach((function(t){var n=e(t,q,l);u.appendChild(n)}))})).catch((function(t){console.error("Произошла ошибка:",t)}));var l=document.querySelector(".profile__edit-button"),s=document.querySelector(".profile__add-button"),d=document.querySelector(".popup_type_edit"),p=document.querySelector(".popup_type_new-card");l.addEventListener("click",(function(){return o(d)})),s.addEventListener("click",(function(){return o(p)})),d.addEventListener("click",(function(t){return c(t)})),p.addEventListener("click",(function(t){return c(t)})),document.querySelector(".popup_type_image ").addEventListener("click",(function(t){return c(t)}));var f=document.querySelector(".popup__form"),_=document.querySelector(".popup__input_type_name"),m=document.querySelector(".popup__input_type_description"),v=document.querySelector(".profile__title"),h=document.querySelector(".profile__description");f.addEventListener("submit",(function(t){t.preventDefault();var e,n,o=_.value,c=m.value,a=f.querySelector(".popup__button");a.textContent="Сохранение...",(e=o,n=c,fetch("https://nomoreparties.co/v1/wff-cohort-8/users/me",{method:"PATCH",headers:{authorization:"f0900dc3-fecd-4246-b516-514bd8cfc01c","Content-Type":"application/json"},body:JSON.stringify({name:e,about:n})}).then((function(t){if(!t.ok)throw new Error("Ошибка при обновлении данных профиля: ".concat(t.status));return t.json()})).catch((function(t){console.error("Произошла ошибка при обновлении данных профиля:",t.message)}))).then((function(t){v.textContent=t.name,h.textContent=t.about,a.textContent="Сохранить",r(d)})).catch((function(t){console.error("Ошибка при обновлении данных профиля:",t),a.textContent="Сохранить"}))})),_.value=v.textContent,m.value=h.textContent;var y=document.querySelector(".popup_type_image"),b=y.querySelector(".popup__content_content_image").querySelector(".popup__image"),S=document.querySelector(".popup__caption"),E=p.querySelector(".popup__form"),g=p.querySelector(".popup__input_type_card-name"),k=p.querySelector(".popup__input_type_url");function q(t,e,n){o(y),b.src=t,b.alt=e,S.textContent=n}E.addEventListener("submit",(function(t,n){t.preventDefault();var o={name:g.value,link:k.value};E.querySelector(".popup__button").textContent="Сохранение...",fetch("https://nomoreparties.co/v1/wff-cohort-8/cards",{method:"POST",headers:{authorization:"f0900dc3-fecd-4246-b516-514bd8cfc01c","Content-Type":"application/json"},body:JSON.stringify(o)}).then((function(t){if(!t.ok)throw new Error("Ошибка при добавлении новой карточки: ".concat(t.status));return t.json()})).then((function(o){o.owner._id;var c=e(o,q,n);u.insertBefore(c,u.firstChild),r(p),t.target.reset()})).catch((function(t){console.error("Ошибка при добавлении новой карточки:",t)}))}));var w=document.querySelectorAll(".popup__input"),C=(f.querySelector(".".concat(w.id,"-error")),document.querySelectorAll(".popup__button")),L=function(t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(t){var e=t.nextElementSibling;e.classList.remove("form__input-error_active"),e.textContent="",C.forEach((function(t){t.removeAttribute("disabled","true"),t.classList.remove("popup__button-inactive")}))}(t):function(t,e){var n=t.nextElementSibling;n.classList.add("form__input-error_active"),n.textContent=e,C.forEach((function(t){t.setAttribute("disabled","true"),t.classList.add("popup__button-inactive")}))}(t,t.validationMessage)};f.addEventListener("submit",(function(t){t.preventDefault(),w.forEach((function(t){return L(t)}))})),w.forEach((function(t){t.addEventListener("input",(function(){L(t)}))}));var x=document.getElementById("avatar-form"),j=document.getElementById("avatar-url"),A=document.querySelector(".popup__avatar");document.querySelector(".profile__image").addEventListener("click",(function(){o(A)})),x.addEventListener("submit",(function(t){t.preventDefault();var e,n=j.value,o=x.querySelector(".popup__button");o.textContent="Сохранение...",e=n,fetch("https://nomoreparties.co/v1/wff-cohort-8/users/me/avatar",{method:"PATCH",headers:{authorization:"f0900dc3-fecd-4246-b516-514bd8cfc01c","Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).then((function(t){if(!t.ok)throw new Error("Failed to change avatar: ".concat(t.status))})).catch((function(t){console.error("Error changing avatar:",t)})),r(A),o.textContent="Сохранить"}))})();
//# sourceMappingURL=main.js.map