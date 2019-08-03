'use strict';

(function () {
  var PHOTOS_WIDTH = 40;
  var PHOTOS_HEIGHT = 40;
  var ESC_KEYCODE = 27;
  var templateCard = document.querySelector('#card').content.querySelector('article');
  var sectionMap = document.querySelector('.map');
  var afterMapCard = document.querySelector('.map__filters-container');

  function getAds(promo) {
    var offer = promo.offer;
    var author = promo.author;
    var mapCardElement = templateCard.cloneNode(true);

    mapCardElement.querySelector('.popup__title').textContent = offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    mapCardElement.querySelector('.popup__type').textContent = window.form.HOUSE_SETTINGS[offer.type].label;
    mapCardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests;
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    // ниже скорее всего надо будет доработать как-то вывод удобств
    mapCardElement.querySelector('.popup__features').textContent = offer.features;
    mapCardElement.querySelector('.popup__description').textContent = offer.description;
    mapCardElement.querySelector('.popup__avatar').src = author.avatar;

    var photosElement = mapCardElement.querySelector('.popup__photos');
    photosElement.innerHTML = '';
    photosElement.appendChild(createPhotos(offer.photos));

    sectionMap.insertBefore(mapCardElement, afterMapCard);
    addCardListener(mapCardElement);

    function addCardListener(mapCard) {
      var popupClose = mapCard.querySelector('.popup__close');
      popupClose.addEventListener('click', function () {
        mapCard.remove();
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          mapCard.remove();
        }
      });
    }
  }

  function createPhotos(arr) {
    var fragment = document.createDocumentFragment();

    arr.forEach(function (element) {
      var img = document.createElement('img');
      img.className = 'popup__photo';
      img.src = element;
      img.alt = 'Фотография жилья';
      img.width = PHOTOS_WIDTH;
      img.height = PHOTOS_HEIGHT;
      fragment.appendChild(img);
    });
    return fragment;
  }

  window.card = {
    getAds: getAds
  };
})();
