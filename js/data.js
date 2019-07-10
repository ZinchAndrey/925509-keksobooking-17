'use strict';

var AVATAR_TEMPLATE = 'img/avatars/user0';
var AVATAR_EXTENSION = '.png';
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var Y_FROM = 130;
var Y_TO = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var mapPinsBlock = document.querySelector('.map__pins');
var templatePin = document.querySelector('#pin').content.querySelector('button');
var mapPinMain = document.querySelector('.map__pin--main');

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(from, to) {
  return Math.floor(Math.random() * (to - from)) + from;
}

function getBlockWidth(blockClass) {
  return document.querySelector(blockClass).offsetWidth;
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
  // [mapPinMain.offsetLeft, mapPinMain.offsetTop];
}
