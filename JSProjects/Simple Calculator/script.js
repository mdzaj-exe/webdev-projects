const button = document.querySelector(".btn");
const numberButtons = document.querySelectorAll(".btn-number");
const buttonPlus = document.querySelector(".btn-plus");
const buttonMinus = document.querySelector(".btn-minus");
const buttonMult = document.querySelector(".btn-mult");
const buttonEqual = document.querySelector(".btn-equal");

/*
button.addEventListener("click", function (event) {
  // Code to handle button click for the basic button
  const button = event.target.textContent;
  console.log(clickedNumber);
  // event.target gets the button element that was clicked
});
*/

numberButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    const clickedNumber = event.target.textContent;
    console.log(clickedNumber);
  });
});

buttonPlus.addEventListener("click", function (event) {
  // Code to handle button click for the plus button
  console.log("Plus Button Clicked");
});

buttonMinus.addEventListener("click", function (event) {
  // Code to handle button click for the minus button
  console.log("Minus Button Clicked");
});

buttonMult.addEventListener("click", function (event) {
  // Code to handle button click for the multiplication button
  console.log("Multiplication Button Clicked");
});

buttonEqual.addEventListener("click", function (event) {
  // Code to handle button click for the equal button
  console.log("Equal Button Clicked");
});
