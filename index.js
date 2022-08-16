/*
 **  [img-1](https://stackblitz.com/files/js-39qpnd/github/CatzillaOrz/complete-javascript-course/master/16-Asynchronous/starter/img/img-1.jpg)
 ** [img-2](https://stackblitz.com/files/js-39qpnd/github/CatzillaOrz/complete-javascript-course/master/16-Asynchronous/starter/img/img-2.jpg)
 ** [img-3](https://stackblitz.com/files/js-39qpnd/github/CatzillaOrz/complete-javascript-course/master/16-Asynchronous/starter/img/img-3.jpg)
 */

'use strict';
import './style.css';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.eu/rest/v2/name/portugal');
request.send();
request.addEventListener('load', function (data) {
  console.log('', this.responseText);
  const data = this.responseText;
});
