'use strict';

(function () {
  var PHOTOS_WIDTH = 40;
  var PHOTOS_HEIGHT = 40;
  var templateCard = document.querySelector('#card').content.querySelector('article');
  var sectionMap = document.querySelector('.map');
  var afterMapCard = document.querySelector('.map__filters-container');

  var getAds = function (promo) {
    var offer = promo.offer;
    var author = promo.author;
    var mapCardElement = templateCard.cloneNode(true);

    mapCardElement.querySelector('.popup__title').textContent = offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    mapCardElement.querySelector('.popup__type').textContent = translateHouseType(offer.type);
    mapCardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + 'комнаты для ' + offer.guests;
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до' + offer.checkout;
    // ниже скорее всего надо будет доработать как-то вывод удобств
    mapCardElement.querySelector('.popup__features').textContent = offer.features;
    mapCardElement.querySelector('.popup__description').textContent = offer.description;
    mapCardElement.querySelector('.popup__photos').textContent = offer.photos;
    mapCardElement.querySelector('.popup__avatar').src = author.avatar;

    var photosElement = mapCardElement.querySelector('.popup__photos');
    photosElement.innerHTML = '';
    photosElement.appendChild(getPhotos(offer.photos));

    sectionMap.insertBefore(mapCardElement, afterMapCard);
  };

  var translateHouseType = function (type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return type;
    }
  };

  var getPhotos = function (arr) {
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
  };

  window.card = {
    getAds: getAds
  };
})();
