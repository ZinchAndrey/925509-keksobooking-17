'use strict';

(function () {
  var NOT_FOUND_STATUS = 404;
  var INVALID_STATUS = 400;
  var OK_STATUS = 200;
  var URL = 'https://js.dump.academy/keksobooking/data';

  function load(onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onSuccess(xhr.response);
      } else if (xhr.status === INVALID_STATUS) {
        onError('Неверный запрос');
      } else if (xhr.status === NOT_FOUND_STATUS) {
        onError('Ничего не найдено');
      }
    });

    xhr.send();
  }
  window.backend = {
    load: load
  };
})();
