'use strict';

(function () {
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomNumber(from, to) {
    return Math.floor(Math.random() * (to - from)) + from;
  }

  function getBlockWidth(blockClass) {
    return document.querySelector(blockClass).offsetWidth;
  }

  window.util = {
    getRandomElement: getRandomElement,
    getRandomNumber: getRandomNumber,
    getBlockWidth: getBlockWidth
  };
})();
