'use strict';

var AVATAR_TEMPLATE = 'img/avatars/user0';
var AVATAR_EXTENSION = '.png';
var OBJECTS_COUNT = 8;
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var Y_FROM = 130;
var Y_TO = 630;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
// var MAIN_PIN_WIDTH = 65;
// var MAIN_PIN_HEIGHT = 65;


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

mapPinMain.addEventListener('click', function () {
  if (!isMapActive) {
    map.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    generateHotels(OBJECTS_COUNT);
    removeDisableAttribute();
    isMapActive = true;
  }
});

// generateHotels(OBJECTS_COUNT);

function getPinXY() {
  return mapPinMain.getAttribute('style').match(/\d+/g);
}

mapPinMain.addEventListener('mouseup', function () {
  address.value = getPinXY();
  address.setAttribute('disabled', '');
});

var hotelType = document.getElementById('type');
var selectedItem = hotelType.querySelectorAll('option');
var minPrice = document.getElementById('price');
// var submitButton = document.querySelector('.ad-form__submit');

hotelType.addEventListener('input', function () {
  for (var i = 0; i < selectedItem.length; i++) {
    if (selectedItem[i].selected) {
      if (selectedItem[i].value === 'house') {
        // console.log('установи минимальную цену 5000 руб');
        minPrice.setAttribute('placeholder', '5000');
        minPrice.setAttribute('min', '5000');
      } else if (selectedItem[i].value === 'flat') {
        // console.log('установи минимальную цену 1000 руб');
        minPrice.setAttribute('placeholder', '1000');
        minPrice.setAttribute('min', '1000');
      } else if (selectedItem[i].value === 'bungalo') {
        // console.log('установи минимальную цену 0 руб');
        minPrice.setAttribute('placeholder', '0');
        minPrice.setAttribute('min', '0');
      } else if (selectedItem[i].value === 'palace') {
        // console.log('установи минимальную цену 10000 руб');
        minPrice.setAttribute('placeholder', '10000');
        minPrice.setAttribute('min', '10000');
      }
    }
  }
});

var timeIn = document.getElementById('timein');
var timeOut = document.getElementById('timeout');
var selectedTimeIn = timeIn.querySelectorAll('option');
var selectedTimeOut = timeOut.querySelectorAll('option');

timeIn.addEventListener('change', function () {
  for (var i = 0; i < selectedTimeIn.length; i++) {
    if (selectedTimeIn[i].selected) {
      for (var j = 0; j < selectedTimeIn.length; j++) {
        if (j !== i) {
          selectedTimeOut[j].removeAttribute('selected');
        }
      }
      selectedTimeOut[i].setAttribute('selected', '');
    }
  }
});

// console.log(timein);
// console.log(selectedTimeOut);
