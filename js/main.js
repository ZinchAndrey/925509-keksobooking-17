'use strict';

var AVATAR_TEMPLATE = 'img/avatars/user0';
var AVATAR_EXTENSION = '.png';
var OBJECTS_COUNT = 8;
var MIN_PRICE_BUNGALO = 0;
var MIN_PRICE_FLAT = 1000;
var MIN_PRICE_HOUSE = 5000;
var MIN_PRICE_PALACE = 10000;
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var HOUSE_SETTINGS = {
  'palace': {
    placeholder: MIN_PRICE_PALACE,
    min: MIN_PRICE_PALACE
  },
  'flat': {
    placeholder: MIN_PRICE_FLAT,
    min: MIN_PRICE_FLAT
  },
  'house': {
    placeholder: MIN_PRICE_HOUSE,
    min: MIN_PRICE_HOUSE
  },
  'bungalo': {
    placeholder: MIN_PRICE_BUNGALO,
    min: MIN_PRICE_BUNGALO
  }
};
var Y_FROM = 130;
var Y_TO = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 85;

var mapPinsBlock = document.querySelector('.map__pins');
var map = document.querySelector('.map--faded');
var templatePin = document.querySelector('#pin').content.querySelector('button');
var mapPinMain = document.querySelector('.map__pin--main');
var mainForm = document.querySelector('.ad-form');
var address = document.querySelector('#address');
var hotelType = document.querySelector('#type');
var minPrice = document.querySelector('#price');

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

var fieldSets = document.querySelectorAll('fieldset');

var isMapActive = false;

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

mapPinMain.addEventListener('mousemove', function () {
  var pinCoordinates = getPinXY();
  address.value = pinCoordinates.x + MAIN_PIN_WIDTH / 2 + ', ' + (pinCoordinates.y + MAIN_PIN_HEIGHT);

  address.setAttribute('disabled', '');
});

hotelType.addEventListener('change', function () {
  var selectedValue = hotelType.value;
  var selectedSettings = HOUSE_SETTINGS[selectedValue];
  var attributes = Object.keys(selectedSettings);

  for (var i = 0; i < attributes.length; i++) {
    var attribute = attributes[i];
    var value = selectedSettings[attribute];
    minPrice.setAttribute(attribute, value);
  }
});

setDisableFieldset();

syncTime(timeIn, timeOut);
syncTime(timeOut, timeIn);

function setDisableFieldset() {
  for (var i = 0; i < fieldSets.length; i++) {
    fieldSets[i].setAttribute('disabled', '');
  }
}

function removeDisableAttribute() {
  for (var i = 0; i < fieldSets.length; i++) {
    fieldSets[i].removeAttribute('disabled', '');
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
  var hotels = generateData(objectsCount);

  for (var i = 0; i < objectsCount; i++) {
    var element = templatePin.cloneNode(true);
    element.setAttribute('alt', 'Объявление № ' + (i + 1));
    element.setAttribute('style', 'left: ' + (hotels[i].location.x - PIN_WIDTH / 2) + 'px;' + 'top: ' + (hotels[i].location.y - PIN_HEIGHT) + 'px;');
    element.children[0].setAttribute('src', hotels[i].author.avatar);
    mapPinsBlock.appendChild(element);
  }
  return element;
}

function getPinXY() {
  return {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop
  };
}

function syncTime(firstTime, secondTime) {
  firstTime.addEventListener('change', function () {
    secondTime.value = firstTime.value;
  });
}
