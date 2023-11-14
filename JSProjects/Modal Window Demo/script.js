'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden'); //removes hidden class
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden'); //removes hidden class
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal); //scrap later
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
}
