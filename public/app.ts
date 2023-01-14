const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const addButton = document.getElementById("add-button") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;

let todos: { text: string; done: boolean }[];

// Load todos from localStorage on page load
if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos") || "");
  renderTodos();
} else {
  todos = [];
}

addButton.addEventListener("click", function (event: Event) {
  event.preventDefault();
  addTodo();
});

function addTodo() {
  const newTodo = { text: todoInput.value + "  Daniel", done: false };
  todos.push(newTodo);
  renderTodos();
  todoInput.value = "";
  saveTodos();
}

function renderTodos() {
  todoList.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const li = document.createElement("li") as HTMLLIElement;
    li.innerHTML = `<span>${todo.text}</span>`;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", function () {
      todo.done = checkbox.checked;
      if (todo.done) {
        li.classList.add("done");
      } else {
        li.classList.remove("done");
      }
      saveTodos();
    });
    if (todo.done) {
      li.classList.add("done");
    } else {
      li.classList.remove("done");
    }
    li.prepend(checkbox);
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function () {
      todos.splice(i, 1);
      renderTodos();
      saveTodos();
    });
    li.append(deleteButton);
    todoList.appendChild(li);
  }
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
