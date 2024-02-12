"use strict";
console.log("This is JavaScript in strict mode!"); //delete later

document
  .getElementById("todo-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); //prevent form submission
    //1.get the value from the input box

    const todoInput = document.getElementById("todo-add");

    const todoText = todoInput.value;
    console.log(todoInput.value);

    //2.append the value to the list

    //get the list
    const newTodoList = document.getElementById("tList");

    //new list item
    const newTask = document.createElement("li");
    newTask.textContent = todoText;

    //apend to list
    tList.appendChild(newTask);
  });
