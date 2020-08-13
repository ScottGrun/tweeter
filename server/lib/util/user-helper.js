'use strict';

const Chance = require('chance');
const md5 = require('md5');

const chance = new Chance();

module.exports = {
  generateRandomUser: () => {
    const gender = chance.gender();
    const firstName = chance.first({ gender });
    const lastName = chance.last();
    const userName = `${firstName}  ${lastName}`;

    let userHandle = '@';
    if (Math.random() > 0.5) {
      let prefix = chance.prefix({ gender });
      prefix = prefix.replace('.', '');
      userHandle += prefix;
    }

    userHandle += lastName;

    if (Math.random() > 0.5) {
      const suffix = Math.round(Math.random() * 100);
      userHandle += suffix;
    }

    const avatars = {
      Female: [
        'https://images.unsplash.com/photo-1580974582391-a6649c82a85f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1586&q=80',
        'https://images.unsplash.com/photo-1486302913014-862923f5fd48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1510596195784-d780d414056a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1569605292330-189ccf83f98b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1618&q=80'
      ],
      Male: [
        'https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1596935884413-260a972dab44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1585602173562-e7eeb0e6f380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1302&q=80',
        'https://images.unsplash.com/photo-1568344559488-28f10db78280?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1498&q=80'
      ]
    };

    const avatarArray = avatars[gender];
    const userAvatar =
      avatarArray[Math.floor(Math.random() * avatarArray.length)];

    return {
      name: userName,
      handle: userHandle,
      avatars: userAvatar
    };
  }
};
