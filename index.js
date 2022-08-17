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
function renderCountry(data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}
//
function getCountryData(name) {
  // request (1)
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://restcountries.com/v2/name/${name}?fullText=true`
  );
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);

    const [neighbour] = data.borders;
    if (!neighbour) return;
    // request(2)
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
}

getCountryData('portugal');
// getCountryData('USA');
// getCountryData('China');
