'use strict';

(function () {
  var MAX_PINS = 5;
  var housingType = document.querySelector('#housing-type');

  function filterHotels(hotels) {
    window.map.renderHotels(hotels.slice(0, MAX_PINS));

    // временное решение - выводит описание первого элемента массива
    window.card.getAds(hotels[0]);

    housingType.addEventListener('change', function () {
      if (housingType.value !== 'any') {
        var chosenHotels = hotels.filter(function (hotel) {
          return hotel.offer.type === housingType.value;
        });
      } else {
        chosenHotels = hotels;
      }
      window.map.renderHotels(chosenHotels.slice(0, MAX_PINS));
      console.log(chosenHotels);
      console.log(housingType.value);
    });
  }

  window.filter = {
    filterHotels: filterHotels
  };
})();
