'use strict';

// (function () {
//   var housingType = document.querySelector('#housing-type');
//
//   function filterHotels(hotels) {
//     housingType.addEventListener('change', function () {
//       if (housingType.value !== 'any') {
//         var chosenHotels = hotels.filter(function (hotel) {
//           return hotel.offer.type === housingType.value;
//         });
//       } else {
//         chosenHotels = hotels;
//       }
//       window.map.renderHotels(chosenHotels.slice(0, window.map.MAX_PINS));
//       console.log(chosenHotels);
//       console.log(housingType.value);
//     });
//   }
//   filterHotels();
//
//   window.filter = {
//     filterHotels: filterHotels
//   };
// })();
