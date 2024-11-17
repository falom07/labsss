const list = document.getElementById('todo-list');
const itemCountSp = document.getElementById('item-count');
const uncheckedCountSp = document.getElementById('unchecked-count');

let todos = [];

function updateCounters() {
  const total = todos.length;
  const unchecked = todos.filter(todo => !todo.done).length;
  itemCountSp.textContent = total;
  uncheckedCountSp.textContent = unchecked;
}

function renderTodo(todo) {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerHTML = `
    <input type="checkbox" class="form-check-input me-2" id="todo-${todo.id}" ${todo.done ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
    <label for="todo-${todo.id}">
      <span class="${todo.done ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span>
    </label>
    <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
  `;
  list.appendChild(li);
}

function renderTodos() {
  list.innerHTML = '';
  todos.forEach(renderTodo);
  updateCounters();
}

function newTodo() {
  const text = prompt('Введіть текст таски:');
  if (text) {
    const newTask = { id: Date.now(), text, done: false };
    todos.push(newTask);
    renderTodos();
  }
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

function toggleTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.done = !todo.done;
    renderTodos();
  }
}

renderTodos();
