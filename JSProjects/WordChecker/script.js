var wordCheckArray = [];

function saveArrayToLocalStorage(array) {
  localStorage.setItem("wordCheck", JSON.stringify(array));
}

document.addEventListener("DOMContentLoaded", function () {
  // Waits for DOM content to fully load before attaching EL

  fetch("JSProjectsWordCheckerarray.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch array from file");
      }
      return response.json();
    })
    .then((data) => {
      wordCheckArray = data; // Initialize wordCheckArray with the retrieved array

      // Access form and add event listener for the submit event
      document
        .querySelector("#phraseCheck")
        .addEventListener("submit", function (event) {
          // Prevent default form submission behavior
          event.preventDefault();

          // Access input element, get entered phrase
          const inputElement = document.getElementById("wcheck");
          const enteredPhrase = inputElement.value.trim(); // Removes leading and trailing spaces

          // Logic for adding phrase to array
          if (wordCheckArray.includes(enteredPhrase)) {
            console.log("The phrase is already in the array.");
          } else {
            console.log("The phrase is not in the array.");
            wordCheckArray.push(enteredPhrase);
            saveArrayToLocalStorage(wordCheckArray); // Using "wordCheck" as the key
          }

          // Entering phrase into console
          console.log("Entered Phrase:", enteredPhrase);
        });
    })
    .catch((error) => {
      console.error("Error fetching array from file:", error);
    });
});
