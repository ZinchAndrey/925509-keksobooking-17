'use strict';

(function () {
  window.load = function () {

    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    // xhr.responseType = 'json';
    xhr.open('GET', URL);

    xhr.addEventListener('load', function (evt) {
      var xhrArray = JSON.parse(xhr.responseText);

      // console.log(evt.target === xhr);
      // console.log(xhr.readyState);
      // console.log(xhr.status + ' ' + xhr.statusText);
      // console.log(xhrArray);

      // try {
      //   console.log(xhrArray);
      // } catch (err) {
      //   console.error('err.message'); // использовать блок error из шаблона template
      // }
    });

    xhr.send();
  };
})();
