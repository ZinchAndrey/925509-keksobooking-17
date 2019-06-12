'use strict';

function getRandom() {
  return Math.random();
}

var announcements = [
  {
    autor: {
      avatar: 'img/avatars/user0' + Math.round(getRandom() * 8) + '.png'
    },
    offer: {
      type: 'palace'
    },
    location: {
      x: 150,
      y: 50
    }
  }
];

console.log(announcements);
