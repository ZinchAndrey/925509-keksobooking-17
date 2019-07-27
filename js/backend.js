'use strict';

(function () {
  var load = function (onSuccess, onError) {

    var URL = 'https://js.dump.academy/keksobooking/data1';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else if (xhr.status === 400) {
        onError('Неверный запрос');
      } else if (xhr.status === 404) {
        onError('Ничего не найдено');
      }
    });

    xhr.send();
  };
  window.backend = {
    load: load
  };
})();
