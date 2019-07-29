'use strict';

(function () {
  var templateCard = document.querySelector('#card').content.querySelector('article');
  var sectionMap = document.querySelector('.map');
  var afterMapCard = document.querySelector('.map__filters-container');

  var getAds = function (promo) {
    var offer = promo.offer;
    // var author = promo.author;
    var mapCardElement = templateCard.cloneNode(true);

    mapCardElement.querySelector('.popup__title').textContent = offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    // ниже после равно скорее всего дб функция, которая будет получать на вход тип жилья и писать по-русски потом;
    mapCardElement.querySelector('.popup__type').textContent = offer.type;
    mapCardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + 'комнаты для ' + offer.guests;
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до' + offer.checkout;
    // ниже скорее всего надо будет доработать как-то вывод удобств
    mapCardElement.querySelector('.popup__features').textContent = offer.features;
    mapCardElement.querySelector('.popup__description').textContent = offer.description;
    mapCardElement.querySelector('.popup__photos').textContent = offer.photos;

    sectionMap.insertBefore(mapCardElement, afterMapCard);
  };

  window.card = {
    getAds: getAds
  };
})();
