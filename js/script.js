"use strict";
//Variables
const inputTodo = document.querySelector(".form-control");
const listTodo = document.querySelector(".list-group");
const formTodo = document.querySelector(".add");
const btnDelete = document.querySelectorAll(".delete");

const todos = [];

////Functions
const addTodo = function (value) {
  if (!value) return;
  todos.push(value);
  const markup = `
        <li class="list-group-item d-flex justify-content-between align-items-center"
        >
            <span>${value}</span>
            <i class="fa fa-trash-o delete"></i>
        </li>
      `;

  listTodo.insertAdjacentHTML("beforeend", markup);
  inputTodo.value = "";
};

const presistTodos = function () {
  localStorage.setItem("todos", JSON.stringify(todos));
};

/// Event Listeners
formTodo.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = inputTodo.value;

  addTodo(value);
  console.log(todos);
  presistTodos();
});

listTodo.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    // console.log(e.target.previousElementSibling.textContent);
    const index = todos.findIndex(
      (el) => el === e.target.previousElementSibling.textContent
    );
    todos.splice(index, 1);
    presistTodos();
  }
});

window.addEventListener("load", function (e) {
  const storage = JSON.parse(localStorage.getItem("todos"));
  if (!storage) return;
  storage.forEach((value) => {
    addTodo(value);
  });
});
