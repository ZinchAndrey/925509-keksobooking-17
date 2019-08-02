'use strict';

(function () {
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;
  var HOUSE_SETTINGS = {
    'palace': {
      label: 'Дворец',
      placeholder: MIN_PRICE_PALACE,
      min: MIN_PRICE_PALACE
    },
    'flat': {
      label: 'Квартира',
      placeholder: MIN_PRICE_FLAT,
      min: MIN_PRICE_FLAT
    },
    'house': {
      label: 'Дом',
      placeholder: MIN_PRICE_HOUSE,
      min: MIN_PRICE_HOUSE
    },
    'bungalo': {
      label: 'Бунгало',
      placeholder: MIN_PRICE_BUNGALO,
      min: MIN_PRICE_BUNGALO
    }
  };

  var hotelType = document.querySelector('#type');
  var minPrice = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var fieldSets = document.querySelectorAll('fieldset');

  setDisableFieldset();

  syncField(timeIn, timeOut);
  syncField(timeOut, timeIn);

  hotelType.addEventListener('change', function () {
    var selectedValue = hotelType.value;
    var selectedSettings = HOUSE_SETTINGS[selectedValue];
    var attributes = Object.keys(selectedSettings);

    attributes.forEach(function (item) {
      var attribute = item;
      var value = selectedSettings[attribute];
      minPrice.setAttribute(attribute, value);
    });
  });

  function setDisableFieldset() {
    fieldSets.forEach(function (item) {
      item.setAttribute('disabled', '');
    });
  }

  function syncField(fieldFrom, fieldTo) {
    fieldFrom.addEventListener('change', function () {
      fieldTo.value = fieldFrom.value;
    });
  }

  function removeDisableAttribute() {
    fieldSets.forEach(function (item) {
      item.removeAttribute('disabled', '');
    });
  }

  window.form = {
    removeDisableAttribute: removeDisableAttribute,
    HOUSE_SETTINGS: HOUSE_SETTINGS
  };
})();
