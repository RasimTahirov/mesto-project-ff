(()=>{"use strict";function e(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-8",headers:{authorization:"f0900dc3-fecd-4246-b516-514bd8cfc01c","Content-Type":"application/json"}},r=document.querySelector("#card-template").content;function n(n,o,c,a){var u=r.querySelector(".card").cloneNode(!0),i=u.querySelector(".card__image"),l=u.querySelector(".card__title"),s=u.querySelector(".card__delete-button"),p=u.querySelector(".card__like-button"),d=u.querySelector(".card__like-counter");return i.alt=n.name,i.src=n.link,l.textContent=n.name,i.addEventListener("click",(function(){o(n.link,n.name,n.name)})),s.addEventListener("click",(function(){!function(r,n){(function(r){return fetch("".concat(t.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:t.headers}).then(e)})(r).then((function(){n.remove()})).catch((function(e){console.error("Ошибка:",e)}))}(n._id,u)})),n.owner._id===c?s.style.display="block":s.style.display="none",n.likes.some((function(e){return e._id===c}))&&p.classList.add("card__like-button_is-active"),p.addEventListener("click",(function(){!function(r,n,o){var c=n.classList.contains("card__like-button_is-active");(function(r,n){var o=n?"DELETE":"PUT";return fetch("".concat(t.baseUrl,"/cards/likes/").concat(r),{method:o,headers:t.headers}).then(e)})(r,c).then((function(e){n.classList.toggle("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.error("Ошибка ".concat(c?"убирания лайка":"постановки лайка"," карточке:"),e)}))}(n._id,p,d)})),d.textContent=n.likes.length,u}function o(e){if("Escape"===e.key){var t=document.querySelector(".popup.popup_is-opened");t&&a(t)}}function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function a(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup_is-opened")||t.target.classList.contains("popup__close"))&&a(e)}))}));var u=["inputSelector","submitButtonSelector"];function i(e,t,r){var n=r.inputErrorClass,o=r.errorClass,c=t.nextElementSibling;c&&(t.classList.remove(n),c.classList&&(c.classList.remove(o),c.classList.remove("form__input-error_active")),c.textContent="")}function l(e,t,r){var n=r.inactiveButtonClass;e.some((function(e){return!e.validity.valid}))?(t.classList.add(n),t.disabled=!0):(t.classList.remove(n),t.disabled=!1)}function s(e,t){var r=t.inputSelector,n=t.submitButtonSelector,o=function(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}(t,u),c=Array.from(e.querySelectorAll(r)),a=e.querySelector(n);c.forEach((function(e){e.addEventListener("input",(function(){!function(e,t,r){var n=r.inputErrorClass,o=r.errorClass;t.validity.valid?(t.setCustomValidity(""),i(0,t,{inputErrorClass:n,errorClass:o})):(t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),function(e,t,r,n){var o=n.inputErrorClass,c=n.errorClass,a=t.nextElementSibling;a&&(t.classList.add(o),a.textContent=r,a.classList.add(c),a.classList.add("form__input-error_active"))}(0,t,t.validationMessage,{inputErrorClass:n,errorClass:o}))}(0,e,o),l(c,a,o)}))})),l(c,a,o)}function p(e,t){var r=t.inputErrorClass,n=t.errorClass,o=t.inactiveButtonClass,c=Array.from(e.querySelectorAll(".popup__input")),a=e.querySelector(".popup__button");c.forEach((function(e){i(0,e,{inputErrorClass:r,errorClass:n})})),a.classList.add(o),a.disabled=!0}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var f=document.querySelector(".places__list");Promise.all([fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then(e),fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then(e)]).then((function(e){var t,r,o=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,r)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?d(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];C.textContent=c.name,q.textContent=c.about;var u=c._id;document.querySelector(".profile__image").style.backgroundImage="url('".concat(c.avatar,"')"),a.forEach((function(e){var t=n(e,w,u);f.appendChild(t)})),b.value=c.name,S.value=c.about})).catch((function(e){console.error("Ошибка:",e)}));var _=document.querySelector(".profile__edit-button"),m=document.querySelector(".profile__add-button"),y=document.querySelector(".popup_type_edit"),v=document.querySelector(".popup_type_new-card");_.addEventListener("click",(function(){return c(y)})),m.addEventListener("click",(function(){return c(v)}));var h=document.querySelector(".popup__form"),b=document.querySelector(".popup__input_type_name"),S=document.querySelector(".popup__input_type_description"),C=document.querySelector(".profile__title"),q=document.querySelector(".profile__description");h.addEventListener("submit",(function(r){r.preventDefault();var n,o,c=b.value,u=S.value,i=h.querySelector(".popup__button");i.textContent="Сохранение...",(n=c,o=u,fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:n,about:o})}).then(e)).then((function(e){C.textContent=e.name,q.textContent=e.about;var t=h.closest(".popup");t&&a(t)})).catch((function(e){console.error("Ошибка",e)})).finally((function(){i.textContent="Сохранить"}))}));var E=document.querySelector(".popup_type_image"),g=E.querySelector(".popup__content_content_image").querySelector(".popup__image"),L=document.querySelector(".popup__caption"),k=v.querySelector(".popup__form"),x=v.querySelector(".popup__input_type_card-name"),O=v.querySelector(".popup__input_type_url");function w(e,t,r){c(E),g.src=e,g.alt=t,L.textContent=r}k.addEventListener("submit",(function(r,o){var c={name:x.value,link:O.value},u=k.querySelector(".popup__button");u.textContent="Сохранение...",function(r){return fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify(r)}).then(e)}(c).then((function(e){e.owner._id;var t=n(e,w,o);f.insertBefore(t,f.firstChild),r.target.reset(),u.classList.add("popup__button-inactive"),u.disabled=!0;var c=k.closest(".popup");c&&a(c)})).catch((function(e){console.error("Ошибка:",e)})).finally((function(){u.textContent="Сохранение"}))}));var A=document.getElementById("avatar-form"),j=document.getElementById("avatar-url"),U=document.querySelector(".popup__avatar"),B=document.querySelector(".profile__image");B.addEventListener("click",(function(){c(U)})),A.addEventListener("submit",(function(r){r.preventDefault();var n,o,c=j.value;A.querySelector(".popup__button").textContent="Сохранение...",n=c,(o=A.querySelector(".popup__button")).textContent="Сохранение...",function(r){return fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:r})}).then(e)}(n).then((function(e){B.style.backgroundImage="url(".concat(n,")");var t=A.closest(".popup");t&&a(t),j.value=""})).catch((function(e){console.error("Ошибка:",e)})).finally((function(){o.textContent="Сохранить"}))}));var I={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-inactive",inputErrorClass:"popup__input_type_error",errorClass:"form__input-error"};!function(e){document.querySelectorAll(e.formSelector).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),s(t,e)}))}(I),p(document.querySelector('.popup__form[name="edit-profile"]'),I),p(document.querySelector('.popup__form[name="new-place"]'),I)})();
//# sourceMappingURL=main.js.map