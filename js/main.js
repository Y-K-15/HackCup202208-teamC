'use strict'



{
  const hamburger = document.getElementById('hamburger');
  const hamburgerTop = document.getElementById('hamburger-top');
  const hamburgerCenter = document.getElementById('hamburger-center');
  const hamburgerBottom = document.getElementById('hamburger-bottom');
  const hamburgerContent = document.querySelector('.content-before');


  hamburger.addEventListener('click',() =>  {
  hamburgerTop.classList.toggle('js-hamburger-top');
  hamburgerCenter.classList.toggle('js-hamburger-center');
  hamburgerBottom.classList.toggle('js-hamburger-bottom');
  hamburgerContent.classList.toggle('js-hamburger-content');
  })




}