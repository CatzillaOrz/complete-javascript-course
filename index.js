/*
 **  [img-1](https://stackblitz.com/files/js-39qpnd/github/CatzillaOrz/complete-javascript-course/master/16-Asynchronous/starter/img/img-1.jpg)
 ** [img-2](https://stackblitz.com/files/js-39qpnd/github/CatzillaOrz/complete-javascript-course/master/16-Asynchronous/starter/img/img-2.jpg)
 ** [img-3](https://stackblitz.com/files/js-39qpnd/github/CatzillaOrz/complete-javascript-course/master/16-Asynchronous/starter/img/img-3.jpg)
 */

'use strict';
import './style.css';

const img1 =
  'https://stackblitz.com/files/js-39qpnd/github/CatzillaOrz/complete-javascript-course/master/16-Asynchronous/starter/img/img-1.jpg';

const img2 =
  'https://stackblitz.com/files/js-39qpnd/github/CatzillaOrz/complete-javascript-course/master/16-Asynchronous/starter/img/img-2.jpg';

const img3 =
  'https://stackblitz.com/files/js-39qpnd/github/CatzillaOrz/complete-javascript-course/master/16-Asynchronous/starter/img/img-3.jpg';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imgContainer = document.querySelector('.images');

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

// render error
function renderError(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
}

//
function getCountryAndNeighbour(name) {
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
      // 1=0
      renderCountry(data2, 'neighbour');
    });
  });
}

// getCountryAndNeighbour('usa');
// getCountryData('USA');
// getCountryData('China');

/*
 **  fetch
 ** @return  promise
 **
 */
const request = fetch(`https://restcountries.com/v2/name/usa?fullText=true`);
function getCountryData(country) {
  fetch(`https://restcountries.com/v2/name/${country}?fullText=true`)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      const [country] = data;
      renderCountry(country);

      const [neighbour] = country.borders;
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then((res) => res.json())

    .then((entity) => renderCountry(entity, 'neighbour'))

    .catch((err) => {
      console.log('💥💥💥💥Something went wrong 💥💥💥 ', err);
      renderError(`'💥💥💥💥Something went wrong 💥💥💥   ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}

// getCountryData('usa');
btn.addEventListener('click', function () {
  getCountryData('usa');
});

/*
 **  [functions] > [Promise] > [Callback]
 **
 **
 */
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then((data) => console.log('', data)); //  [Promise] => Q(2)
// console.log('get Position'); // [function ] => Q(1)

/*
 **  task
 **
 **
 */

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImg = function (imagePath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imagePath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};
/* 
 let currentImg;
 createImg(img1)
   .then((img) => {
     console.log('img 1 loaded');
     currentImg = img;
     return wait(2);
   })
   .then(() => {
     currentImg.style.display = 'none';
     return createImg(img2);
   })
   .then((img) => {
     console.log('img 2 loaded');
     currentImg = img;
     return wait(2);
   })
   .catch((e) => console.log('', e));
  */
const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coord;

    console.log('', lat, lng);

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    const dataGeo = await resGeo.json();
    console.log('', dataGeo);

    const res = await feth(
      `https://restcountries.com/v2/name/${dataGeo.country}?fullText=true`
    );

    const [data] = await res.json();

    console.log('', data);
    renderCountry(data);
    return `You are in ${dataGeo.country}`;
  } catch (e) {
    console.log('', e);
    // Throw error
    throw e;
  }
};

// whereAmI();
/* 
whereAmI()
  .then((city) => console.log('2:', `${city}`))
  .catch((e) => console.log('3:', e))
  .finally(() => console.log('finished getting location'));
 */

/*
 **  Promise all()
 **
 **
 */

const getJSON = function (url, errorMsg) {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const get3Countries = async function (city1, city2, city3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${city1}?fullText=true`),
      getJSON(`https://restcountries.com/v2/name/${city2}?fullText=true`),
      getJSON(`https://restcountries.com/v2/name/${city3}?fullText=true`),
    ]);
    console.log(
      '',
      data.map((d) => d[0].capital)
    );
  } catch (e) {
    console.log('err', e);
  }
};
// get3Countries('portugal', 'canada', 'usa');

/*
 **  coding challenge
 **
 **
 */

const loadPage = async function(){
  try{
    let img = await createImg(img1);
    console.log('Image 1 loaded', )
    await wait(2);
    img.style.display = 'none'

    img = await createImg(img2);
    console.log('image 2 loaded', );
    await wait(2);
    img.style.display = 'none';
    
    
  }catch(e){
    console.log('err', e);
  }
}

loadPage();