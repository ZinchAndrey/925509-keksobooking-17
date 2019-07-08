'use strict';

var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 80;

var mapPinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map--faded');
var isMapActive = false;
var mainForm = document.querySelector('.ad-form');
var address = document.getElementById('address');


mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

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

    if (getPinXY()[0] + MAIN_PIN_WIDTH / 2 < 0) {
      mapPinMain.style.left = -MAIN_PIN_WIDTH / 2 + 'px';
    }

    if (getPinXY()[1] + MAIN_PIN_HEIGHT < 0) {
      mapPinMain.style.top = -MAIN_PIN_HEIGHT + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (!isMapActive) {
      map.classList.remove('map--faded');
      mainForm.classList.remove('ad-form--disabled');
      generateHotels(OBJECTS_COUNT);
      removeDisableAttribute();
      isMapActive = true;
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

function getPinXY() {
  return [mapPinMain.offsetLeft, mapPinMain.offsetTop];
}

mapPinMain.addEventListener('mousemove', function () {
  address.value = getPinXY()[0] + MAIN_PIN_WIDTH / 2 + ', ' + (getPinXY()[1] + MAIN_PIN_HEIGHT);

  address.setAttribute('disabled', '');
});
