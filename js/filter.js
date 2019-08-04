'use strict';

(function () {
  var MAX_PINS = 5;
  var housingType = document.querySelector('#housing-type');

  function startHotels(hotels) {
    window.map.renderHotels(hotels.slice(0, MAX_PINS));

    // housingType.addEventListener('change', function () {
    //   var chosenHotels = hotels;
    //   if (housingType.value !== 'any') {
    //     chosenHotels = hotels.filter(function (hotel) {
    //       return hotel.offer.type === housingType.value;
    //     });
    //   }
    //   window.map.renderHotels(chosenHotels.slice(0, MAX_PINS));
    //   console.log(chosenHotels);
    // });
  }

  // на этот блок буду вешать обработчик change для отрисовки пинов
  var filtersForm = document.querySelector('.map__filters');

  var filterPrice = document.querySelector('#housing-price');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterCapacity = document.querySelector('#housing-guests');
  var filterFeatures = document.querySelector('#housing-features');
  var inputFeatures = filterFeatures.querySelectorAll('input');

  // Определяем диапазон цен
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  // Функция, которая получает массив пинов и генерирует из тех же пинов новый массив отфильтрованный по значениям фильтра
  var filterPins = function (pins) {
    var filteredPins = pins.filter(function (pin) {
      return (
        isPinTypeFiltered(pin) &&
        isPinPriceFiltered(pin) &&
        isPinRoomsFiltered(pin) &&
        isPinGuestFiltered(pin) &&
        isPinFeauturesFiltered(pin)
      );
    });
    return filteredPins;
  };

  // ф-я проверяет значение типа пина
  var isPinTypeFiltered = function (pin) {
    var filterTypeValue = housingType.value;
    return filterTypeValue === 'any' || filterTypeValue === pin.offer.type;
  };

  // ф-я проверяет значение по цене
  var isPinPriceFiltered = function (pin) {
    var filterPriceValue = filterPrice.value;
    return (
      (filterPriceValue === 'any') ||
      (filterPriceValue === 'low' && pin.offer.price < MIN_PRICE) ||
      (filterPriceValue === 'middle' && pin.offer.price > MIN_PRICE && pin.offer.price < MAX_PRICE) ||
      (filterPriceValue === 'high' && pin.offer.price > MAX_PRICE)
    );
  };

  // ф-я проверяет зн-е по количеству комнат
  // для приведения типов (через строку) использую parseInt
  var isPinRoomsFiltered = function (pin) {
    var filterRoomsValue = filterRooms.value;
    return (
      (filterRoomsValue === 'any') ||
      (parseInt(filterRoomsValue, 10) === pin.offer.rooms)
    );
  };

  // ф-я для проверки количества гостей
  // для приведения типов (через строку) использую parseInt
  var isPinGuestFiltered = function (pin) {
    var filterCapacityValue = filterCapacity.value;
    return (
      (filterCapacityValue === 'any') ||
      (parseInt(filterCapacityValue, 10) === pin.offer.guests)
    );
  };

  // метод создает новый массив на основе условия, если оно верное - то элемент добавляется в новый массив,
  // если нет - то он просто пропускает
  var isPinFeauturesFiltered = function (pin) {

  // Конструкция every проверяет каждый элемент на условие, возвращает true (если  каждый элемент удовлетворяет условию)
    return Array.from(inputFeatures).every(function (inputFeature) {

    // при инвертировании выражения, меняем знаки
      return !(inputFeature.checked && !pin.offer.features.includes(inputFeature.value));
    });
  };

  // создаю callback функцию с функцией debounce(), и в ней помещаю все действия связанные с отрисовкой пинов по фильтрам
  var filterChangeHandler = window.debounce(function () {
    var pins = filterPins(window.map.hotels);
    window.map.removePins();
    // window.map.renderHotels(hotels.slice(0, MAX_PINS));
    window.map.renderHotels(pins.slice(0, MAX_PINS));
  });

  // getStartedPins();

  // Вызываю полученную callback функцию (с функцией устранение дребезга ('debounce()')) на событии формы с фильтрами
  // filterChangeHandler();
  filtersForm.addEventListener('change', filterChangeHandler);

  window.filter = {
    startHotels: startHotels,
    filterPins: filterPins // удалить
  };
})();
