'use strict';

var MIN_PRICE_BUNGALO = 0;
var MIN_PRICE_FLAT = 1000;
var MIN_PRICE_HOUSE = 5000;
var MIN_PRICE_PALACE = 10000;

var fieldset = document.querySelectorAll('fieldset');
var mainForm = document.querySelector('.ad-form');
var hotelType = document.getElementById('type');
var selectedItem = hotelType.querySelectorAll('option');
var minPrice = document.getElementById('price');


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

setDisableFieldset();
