"use strict";

//Selectors
const body = document.querySelector("body");
const header = document.querySelector(".header");
const todo = document.querySelectorAll(".todo_box");
const themeSwitcher = document.querySelector(".nav_logo");
const todoInput = document.querySelector(".todo_input");
const todoAmount = document.querySelector(".items_left");
const createTodo = document.querySelector(".create_todo");
const todoList = document.querySelector(".todo_list");
const sort = document.querySelector(".sorting_todo");
const colorBtnSort = document.querySelectorAll(".sorting_todo button");
const clearCompletedBtn = document.querySelector(".clear_completed");
const footerText = document.querySelector(".footer p");

//Parameters
let itemsLeft = 0;
let itemsCompleted = 0;

//Event Listeners
themeSwitcher.addEventListener("click", function (e) {
  themeSwitcher.classList.toggle("light_mode");
  body.classList.toggle("light_mode");
  header.classList.toggle("light_mode");
  todo.forEach((e) => e.classList.toggle("light_mode"));
  todoList.classList.toggle("light_mode");
  clearCompletedBtn.classList.toggle("light_mode");
  colorBtnSort.forEach((btn) => btn.classList.toggle("light_mode"));
  footerText.classList.toggle("light_mode");
});

createTodo.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTodo(e);
    itemsLeft++;
    todoAmount.textContent = itemsLeft;
  }
});

todoList.addEventListener("click", deleteAndCheck);

sort.addEventListener("click", filterTodo);

clearCompletedBtn.addEventListener("click", clearCompleted);

//Functions
function addTodo(e) {
  e.preventDefault();

  if (todoInput.value !== "") {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const completeBtn = document.createElement("span");
    completeBtn.innerHTML = '<img src="./images/icon-check.svg" alt="">';
    completeBtn.classList.add("tick");
    todoDiv.appendChild(completeBtn);

    const todoLi = document.createElement("li");
    todoLi.classList.add("todo_item");
    todoLi.innerText = todoInput.value;
    todoDiv.appendChild(todoLi);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove_item");
    deleteBtn.innerHTML = ' <img src="./images/icon-cross.svg" alt="" />';
    todoDiv.appendChild(deleteBtn);

    todoList.appendChild(todoDiv);
  }
  todoInput.value = "";
}

function deleteAndCheck(e) {
  const item = e.target;
  const parent = item.parentElement;

  //Delete Item
  if (item.classList.contains("remove_item")) {
    parent.classList.add("fall");

    parent.addEventListener("transitionend", function () {
      parent.remove();
    });

    if (parent.classList.contains("todo_done")) {
      itemsCompleted--;
    }

    itemsLeft--;
    todoAmount.textContent = itemsLeft;
  }

  //Check item
  if (item.classList.contains("tick")) {
    const tick = document.querySelector(".tick");
    parent.classList.toggle("todo_done");
  }
}

function clearCompleted(e) {
  const allTodo = todoList.childNodes;

  allTodo.forEach((td) => {
    switch (e.target.value) {
      case "clear":
        if (td.classList.contains("todo_done")) {
          td.remove();
          itemsCompleted--;
          itemsLeft--;
          todoAmount.textContent = itemsCompleted;
        }
        break;
    }
  });
}

function filterTodo(e) {
  const allTodo = todoList.childNodes;
  todoAmount.textContent = itemsCompleted;

  allTodo.forEach((td) => {
    switch (e.target.value) {
      case "all":
        td.style.display = "flex";
        todoAmount.textContent = itemsLeft;
        break;

      case "active":
        td.style.display = "flex";
        todoAmount.textContent = itemsLeft;
        break;

      case "completed":
        if (td.classList.contains("todo_done")) {
          td.style.display = "flex";
          itemsCompleted++;
          todoAmount.textContent = itemsCompleted;
        } else {
          td.style.display = "none";
        }
        break;
    }
  });
}
