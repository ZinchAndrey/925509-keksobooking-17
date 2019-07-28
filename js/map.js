'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 85;
  // var OBJECTS_COUNT = 8;
  var Y_FROM = 130;
  var Y_TO = 630;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAX_PINS = 5;

  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map--faded');
  var mainForm = document.querySelector('.ad-form');
  var address = document.querySelector('#address');
  var templatePin = document.querySelector('#pin').content.querySelector('button');
  var housingType = document.querySelector('#housing-type');

  var isMapActive = false;

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var pinCoordinates = getPinXY();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      if (pinCoordinates.x < 0) {
        mapPinMain.style.left = 0 + 'px';
      }

      if (pinCoordinates.x > mapPinsBlock.offsetWidth - MAIN_PIN_WIDTH) {
        mapPinMain.style.left = mapPinsBlock.offsetWidth - MAIN_PIN_WIDTH + 'px';
      }

      if (pinCoordinates.y < Y_FROM) {
        mapPinMain.style.top = Y_FROM + 'px';
      }

      if (pinCoordinates.y > (Y_TO)) {
        mapPinMain.style.top = (Y_TO) + 'px';
      }

      pinCoordinates = getPinXY();
      address.value = pinCoordinates.x + MAIN_PIN_WIDTH / 2 + ', ' + (pinCoordinates.y + MAIN_PIN_HEIGHT);
      address.setAttribute('disabled', '');
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      if (!isMapActive) {
        setMapActive();
        loadHotels();

      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function getPinXY() {
    return {
      x: mapPinMain.offsetLeft,
      y: mapPinMain.offsetTop
    };
  }

  function showError(message) {
    var templateError = document.querySelector('#error').content.querySelector('div');
    var errorElement = templateError.cloneNode(true);
    mapPinsBlock.appendChild(errorElement);
    console.log(message);
  }

  function setMapActive() {
    map.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    window.form.removeDisableAttribute();
    isMapActive = true;
  }

  var hotelsArray = [];

  function filterHotels(hotels) {
    housingType.addEventListener('change', function () {
      if (housingType.value !== 'any') {
        var chosenHotels = hotels.filter(function (hotel) {
          return hotel.offer.type === housingType.value;
        });
      } else {
        chosenHotels = hotels;
      }
      renderHotels(chosenHotels.slice(0, MAX_PINS));
      console.log(chosenHotels);
      console.log(housingType.value);
    });

    // получить фильтры
    // отфильтровать
    // передать в переменную и ее подставить в функцию renderHotels
  }

  // var pin = document.querySelectorAll('.map__pin');

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  function renderHotels(hotels) {
    removePins();

    for (var i = 0; i < hotels.length; i++) { // сделать forEach и не забыть в цикле [i] убрать. см 14ую минуту
      var element = templatePin.cloneNode(true);
      element.setAttribute('alt', 'Объявление № ' + (i + 1));
      element.setAttribute('style', 'left: ' + (hotels[i].location.x - PIN_WIDTH / 2) + 'px;' + 'top: ' + (hotels[i].location.y - PIN_HEIGHT) + 'px;');
      element.children[0].setAttribute('src', hotels[i].author.avatar);
      mapPinsBlock.appendChild(element);
    }
  }


  function loadHotels() {
    window.backend.load(function (hotels) {
      filterHotels(hotels);
      console.log(hotelsArray);
    }, showError);
  }
})();
