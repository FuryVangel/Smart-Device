'use strict';

var modalOpen = document.querySelector('.page-header__button');
var modalShow = document.querySelector('.modal');
var modalClose = document.querySelector('.modal-window__close-btn');
var modalOverlay = document.querySelector('.modal-overlay');
var body = document.querySelector('body');
var nameModal = modalShow.querySelector('[name=name-modal]');
var address = document.querySelector('.col-adress .page-footer__list');
var addressToggle = document.querySelector('.js-toggle-address');
var listToggle = document.querySelector('.js-toggle-list');
var list = document.querySelector('.col-list .page-footer__list');

// Открытие модального окна
modalOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalShow.classList.add('modal-overlay--show');
  nameModal.focus();
  body.classList.add('overflow');
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

// Поддержка плавного скролла в IE11
var scrolls = [].slice.call(document.querySelectorAll('a[href*="#"]'));
var animationTime = 600;
var framesCount = 30;

scrolls.forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault();

    var coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

    var scroller = setInterval(function () {
      var scrollBy = coordY / framesCount;

      if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        window.scrollBy(0, scrollBy);
      } else {
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
    }, animationTime / framesCount);
  });
});

// Валидация для телефона
IMask(document.querySelector('#phone'), {
  mask: '+{7}(000)000-00-00'
});
IMask(document.querySelector('#phone-modal'), {
  mask: '+{7}(000)000-00-00'
});

// Открытие/закрытие аккордеона
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
    addressToggle.classList.remove('btn-close');

    list.classList.remove('open');
    list.classList.add('close');
    listToggle.classList.add('btn-close');

  } else {
    address.classList.remove('open');
    address.classList.add('close');
    addressToggle.classList.add('btn-close');
  }
});

// Хранение данных в localStorage
if (localStorage.length) {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    document.getElementById(key).value = localStorage.getItem(key);
  }
}

var dataItems = document.querySelectorAll('input, textarea');
if (dataItems) {
  for (var j = 0; j < dataItems.length; j++) {
    (function (item) {
      item.addEventListener('change', function () {
        var id = item.getAttribute('id');
        if (item.value) {
          localStorage.setItem(id, item.value);
        } else {
          localStorage.removeItem(id);
        }
      });
    })(dataItems[j]);
  }
}
