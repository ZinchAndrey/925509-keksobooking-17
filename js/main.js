'use strict';

var AVATAR_TEMPLATE = 'img/avatars/user0';
var AVATAR_EXTENSION = '.png';
var OBJECTS_COUNT = 8;
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var Y_FROM = 130;
var Y_TO = 630;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var MIN_PRICE_BUNGALO = 0;
var MIN_PRICE_FLAT = 1000;
var MIN_PRICE_HOUSE = 5000;
var MIN_PRICE_PALACE = 10000;
var MAIN_PIN_WIDTH = 62; // 40 возможно
var MAIN_PIN_HEIGHT = 80;


var mapPinsBlock = document.querySelector('.map__pins');

var map = document.querySelector('.map--faded');

var templatePin = document.querySelector('#pin').content.querySelector('button');

var fieldset = document.querySelectorAll('fieldset');

var mapPinMain = document.querySelector('.map__pin--main');

var address = document.getElementById('address');

var isMapActive = false;

var mainForm = document.querySelector('.ad-form');

function setDisableFieldset() {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].setAttribute('disabled', '');
  }
}

function removeDisableAttribute() {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].removeAttribute('disabled', '');
  }
}

function getBlockWidth(blockClass) {
  return document.querySelector(blockClass).offsetWidth;
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(from, to) {
  return Math.floor(Math.random() * (to - from)) + from;
}

function generateObject(avatarNumber) {
  return {
    author: {
      avatar: AVATAR_TEMPLATE + avatarNumber + AVATAR_EXTENSION,
    },
    offer: {
      type: getRandomElement(HOUSE_TYPES),
    },
    location: {
      x: getRandomNumber(0, getBlockWidth('.map__pins')),
      y: getRandomNumber(Y_FROM, Y_TO),
    }
  };
}

function generateData(objectsCount) {
  var data = [];

  for (var i = 0; i < objectsCount; i++) {
    data[i] = generateObject(i + 1);
  }
  return data;
}

function generateHotels(objectsCount) {
  for (var i = 0; i < objectsCount; i++) {
    var element = templatePin.cloneNode(true);
    element.setAttribute('alt', 'Объявление № ' + (i + 1));
    element.setAttribute('style', 'left: ' + (generateData(objectsCount)[i].location.x - PIN_WIDTH / 2) + 'px;' + 'top: ' + (generateData(objectsCount)[i].location.y - PIN_HEIGHT) + 'px;');
    element.children[0].setAttribute('src', generateData(objectsCount)[i].author.avatar);
    mapPinsBlock.appendChild(element);
  }
  return element;
}

setDisableFieldset();

// mapPinMain.addEventListener('click', function () {
//   if (!isMapActive) {
//     map.classList.remove('map--faded');
//     mainForm.classList.remove('ad-form--disabled');
//     generateHotels(OBJECTS_COUNT);
//     removeDisableAttribute();
//     isMapActive = true;
//   }
// });

// //////////////////////////////

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


// //////////////////////////////
function getPinXY() {
  return [mapPinMain.offsetLeft, mapPinMain.offsetTop];
}

// console.log(getPinXY()[0] - MAIN_PIN_WIDTH / 2);
// console.log(getPinXY()[1] + MAIN_PIN_HEIGHT);


mapPinMain.addEventListener('mousemove', function () {
  address.value = getPinXY()[0] + MAIN_PIN_WIDTH / 2 + ', ' + (getPinXY()[1] + MAIN_PIN_HEIGHT);

  address.setAttribute('disabled', '');
});

// mapPinMain.addEventListener('mouseup', function () {
//   console.log(getPinXY());
//   console.log(mapPinMain.offsetTop);
// });

var hotelType = document.getElementById('type');
var selectedItem = hotelType.querySelectorAll('option');
var minPrice = document.getElementById('price');

function setMinPriceAttributes(minimalPrice) {
  minPrice.setAttribute('placeholder', minimalPrice);
  minPrice.setAttribute('min', minimalPrice);
}

hotelType.addEventListener('input', function () {
  for (var i = 0; i < selectedItem.length; i++) {
    if (selectedItem[i].selected) {
      if (selectedItem[i].value === 'house') {
        setMinPriceAttributes(MIN_PRICE_HOUSE);
      } else if (selectedItem[i].value === 'flat') {
        setMinPriceAttributes(MIN_PRICE_FLAT);
      } else if (selectedItem[i].value === 'bungalo') {
        setMinPriceAttributes(MIN_PRICE_BUNGALO);
      } else if (selectedItem[i].value === 'palace') {
        setMinPriceAttributes(MIN_PRICE_PALACE);
      }
    }
  }
});

var timeIn = document.getElementById('timein');
var timeOut = document.getElementById('timeout');

function syncTime(firstTime, secondTime) {
  firstTime.addEventListener('change', function () {
    secondTime.value = firstTime.value;
  });
}

syncTime(timeIn, timeOut);
syncTime(timeOut, timeIn);
