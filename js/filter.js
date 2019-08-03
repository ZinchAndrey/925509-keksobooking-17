'use strict';

(function () {
  var MAX_PINS = 5;
  var housingType = document.querySelector('#housing-type');

  function filterHotels(hotels) {
    window.map.renderHotels(hotels.slice(0, MAX_PINS));

    housingType.addEventListener('change', function () {
      var chosenHotels = hotels;
      if (housingType.value !== 'any') {
        chosenHotels = hotels.filter(function (hotel) {
          return hotel.offer.type === housingType.value;
        });
      }
      window.map.renderHotels(chosenHotels.slice(0, MAX_PINS));

      // ------------------- получение номера объявления
      // var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      // mapPins.forEach(function (item) {
      //   console.log(item.getAttribute('data-id'));
      // });
      // // ---------------------- вывожу сообщение при клике на первый пин
      // var mapPin = document.querySelector('.map__pin:not(.map__pin--main)');
      // mapPin.addEventListener('click', function () {
      //   console.log('1');
      // });
      // --------------------

    });
  }

  window.filter = {
    filterHotels: filterHotels
  };
})();
