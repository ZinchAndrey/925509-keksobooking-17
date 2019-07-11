'use strict';

(function () {
  var AVATAR_TEMPLATE = 'img/avatars/user0';
  var AVATAR_EXTENSION = '.png';
  var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var Y_FROM = 130;
  var Y_TO = 630;

  function generateObject(avatarNumber) {
    return {
      author: {
        avatar: AVATAR_TEMPLATE + avatarNumber + AVATAR_EXTENSION,
      },
      offer: {
        type: window.util.getRandomElement(HOUSE_TYPES),
      },
      location: {
        x: window.util.getRandomNumber(0, window.util.getBlockWidth('.map__pins')),
        y: window.util.getRandomNumber(Y_FROM, Y_TO),
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

  window.data = {
    generateData: generateData
  };
})();
