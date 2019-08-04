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
    });
  }

  window.filter = {
    filterHotels: filterHotels
  };
})();
