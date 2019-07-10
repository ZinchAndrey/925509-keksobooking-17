'use strict';

var MIN_PRICE_BUNGALO = 0;
var MIN_PRICE_FLAT = 1000;
var MIN_PRICE_HOUSE = 5000;
var MIN_PRICE_PALACE = 10000;
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

// var mainForm = document.querySelector('.ad-form');
// var address = document.querySelector('#address');
var hotelType = document.querySelector('#type');
var minPrice = document.querySelector('#price');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

var fieldSets = document.querySelectorAll('fieldset');

setDisableFieldset();

syncTime(timeIn, timeOut);
syncTime(timeOut, timeIn);

hotelType.addEventListener('change', function () {
  var selectedValue = hotelType.value;
  var selectedSettings = HOUSE_SETTINGS[selectedValue];
  // placeholder: MIN_PRICE_FLAT,
  // min: MIN_PRICE_FLAT
  var attributes = Object.keys(selectedSettings); // ['placeholder', 'min']

  for (var i = 0; i < attributes.length; i++) {
    var attribute = attributes[i];
    var value = selectedSettings[attribute];
    minPrice.setAttribute(attribute, value);
  }
});

function setDisableFieldset() {
  for (var i = 0; i < fieldSets.length; i++) {
    fieldSets[i].setAttribute('disabled', '');
  }
}

function syncTime(firstTime, secondTime) {
  firstTime.addEventListener('change', function () {
    secondTime.value = firstTime.value;
  });
}

function removeDisableAttribute() {
  for (var i = 0; i < fieldSets.length; i++) {
    fieldSets[i].removeAttribute('disabled', '');
  }
}
