import './style.css';
('use strict');

/* DOM practice */
const message = document.createElement('div'); /* create dom */
message.classList.add('cookie-message'); /* add class */
// message.textContent = 'we use cookie for improved'
message.innerHTML =
  'we use cookie for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>';
const header = document.querySelector('header');
// header.prepend(message); /* add dom */
header.append(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); /* remvoe dom */
  });
// style
message.style.background = '#37383d';
message.style.width = '120%';

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

///////////////////////////////////////

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
