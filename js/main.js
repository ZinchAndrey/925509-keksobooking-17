'use strict';

var AVATAR_TEMPLATE = 'img/avatars/user0';
var AVATAR_EXTENSION = '.png';
var OBJECTS_COUNT = 8;
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var Y_FROM = 130;
var Y_TO = 630;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

var mapPinsBlock = document.querySelector('.map__pins');

var map = document.querySelector('.map--faded');
map.classList.remove('map--faded');

var templatePin = document.querySelector('#pin').content.querySelector('button');

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
    // Math.floor(Math.random()*(i + 1));
    // data.push(generateObject(i + 1));
  }
  return data;
}

for (var i = 0; i < OBJECTS_COUNT; i++) {
  var element = templatePin.cloneNode(true);
  element.setAttribute('alt', 'Объявление № ' + (i + 1));
  element.setAttribute('style', 'left: ' + (generateData(OBJECTS_COUNT)[i].location.x - PIN_WIDTH / 2) + 'px;' + 'top: ' + (generateData(OBJECTS_COUNT)[i].location.y - PIN_HEIGHT) + 'px;');
  element.children[0].setAttribute('src', generateData(OBJECTS_COUNT)[i].author.avatar);
  // element.children[0].setAttribute('alt', 'Объявление № ' + i + 1);
  mapPinsBlock.appendChild(element);
  // console.log(element);
}
