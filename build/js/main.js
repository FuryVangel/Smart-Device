'use strict';

var modalOpen = document.querySelector('.page-header__button');
var modalShow = document.querySelector('.modal');
var modalClose = document.querySelector('.modal-window__close-btn');
var modalOverlay = document.querySelector('.modal-overlay');
var body = document.querySelector('body');
var modalForm = modalShow.querySelector('.modal form');
var nameModal = modalShow.querySelector('[name=name-modal]');
var phoneModal = modalShow.querySelector('[name=phone-modal]');
var messageModal = modalShow.querySelector('[name=message-modal]');
var storageName = localStorage.getItem('name');
var storagePhone = localStorage.getItem('phone');
var storageMessage = localStorage.getItem('message');
var heroScroll = document.querySelector('.hero__scroll');
var heroScrollButton = document.querySelector('.hero__button');
var advantages = document.querySelector('#advantages');
var support = document.querySelector('#support');
var address = document.querySelector('.col-adress .page-footer__list');
var addressToggle = document.querySelector('.page-footer__address-toggle');
var listToggle = document.querySelector('.page-footer__list-toggle');
var list = document.querySelector('.col-list .page-footer__list');

// Открытие модального окна
modalOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalShow.classList.add('modal-overlay--show');
  nameModal.focus();
  body.classList.add('overflow');
  if (storageName && storagePhone && storageMessage) {
    nameModal.value = storageName;
    phoneModal.value = storagePhone;
    messageModal.value = storageMessage;
  }
});

modalShow.querySelector('.modal-window').addEventListener('click', function (e) {
  e.stopPropagation();
});

// Закрытие модального окна
modalClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalShow.classList.remove('modal-overlay--show');
  body.classList.remove('overflow');
});

// Закрытие модального окна по оверлею
modalOverlay.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalShow.classList.remove('modal-overlay--show');
  body.classList.remove('overflow');
});

// Закрытие  модального окна по кнопке ESC
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modalShow.classList.contains('modal-overlay--show')) {
      modalShow.classList.remove('modal-overlay--show');
    }
  }
});

// Хранение данных в localStorage
modalForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  localStorage.setItem('name', nameModal.value);
  localStorage.setItem('phone', phoneModal.value);
  localStorage.setItem('message', messageModal.value);
});

// Скрол
if (heroScroll) {
  heroScroll.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollBy({
      top: (advantages.offsetTop - window.scrollY),
      behavior: 'smooth'
    });
    body.classList.remove('overflow');
  });
}

if (heroScrollButton) {
  heroScrollButton.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollBy({
      top: (support.offsetTop - window.scrollY),
      behavior: 'smooth'
    });
    body.classList.remove('overflow');
  });
}

// Валидация для телефона
IMask(document.querySelector('#phone'), {
  mask: '+{7}(000)000-00-00'
});
IMask(document.querySelector('#phone-modal'), {
  mask: '+{7}(000)000-00-00'
});

// Открытие/закрытие аккордиона
listToggle.addEventListener('click', function () {
  if (list.classList.contains('close') || address.classList.contains('open')) {
    list.classList.remove('close');
    list.classList.add('open');
    listToggle.classList.remove('btn-close');

    address.classList.remove('open');
    address.classList.add('close');
    addressToggle.classList.add('btn-close');
  } else {
    list.classList.remove('open');
    list.classList.add('close');
    listToggle.classList.add('btn-close');
  }
});

addressToggle.addEventListener('click', function () {
  if (address.classList.contains('close') || list.classList.contains('open')) {
    address.classList.remove('close');
    address.classList.add('open');
    addressToggle.classList.remove('toggle-close');

    list.classList.remove('open');
    list.classList.add('close');
    listToggle.classList.add('toggle-close');

  } else {
    address.classList.remove('open');
    address.classList.add('close');
    addressToggle.classList.add('toggle-close');
  }
});
