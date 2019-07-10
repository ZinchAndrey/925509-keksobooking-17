'use strict';

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 85;
var OBJECTS_COUNT = 8;
var Y_FROM = 130;
var Y_TO = 630;

var mapPinsBlock = document.querySelector('.map__pins');
var mapPinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map--faded');
var isMapActive = false;
var mainForm = document.querySelector('.ad-form');
var address = document.querySelector('#address');

mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
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
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (!isMapActive) {
      window.generateHotels(OBJECTS_COUNT);
      map.classList.remove('map--faded');
      mainForm.classList.remove('ad-form--disabled');
      window.removeDisableAttribute();
      isMapActive = true;
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
mapPinMain.addEventListener('mousemove', function () {
  var pinCoordinates = getPinXY();
  address.value = pinCoordinates.x + MAIN_PIN_WIDTH / 2 + ', ' + (pinCoordinates.y + MAIN_PIN_HEIGHT);

  address.setAttribute('disabled', '');
});

function getPinXY() {
  return {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop
  };
  // [mapPinMain.offsetLeft, mapPinMain.offsetTop];
}
