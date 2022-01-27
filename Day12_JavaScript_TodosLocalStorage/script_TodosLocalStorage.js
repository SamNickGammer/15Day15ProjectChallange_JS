const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;
  if (todo) {
    todoText = todo.text;
  }
  if (todoText) {
    const todosElement = document.createElement('li');
    if (todo && todo.completed) {
      todosElement.classList.add('completed');
    }

    todosElement.innerHTML = todoText;

    todosElement.addEventListener('click', () => {
      todosElement.classList.toggle('completed');
      updateList();
    });
    todosElement.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todosElement.remove();
      updateList();
    });
    todosUL.appendChild(todosElement);
    input.value = '';
    updateList();
  }
}

function updateList() {
  todosElement = document.querySelectorAll('li');
  const todos = [];
  todosElement.forEach((element) => {
    todos.push({
      text: element.innerText,
      complete: element.classList.contains('completed'),
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}
