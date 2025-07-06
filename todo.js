console.log("script.js is connected");

const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearCompleted = document.getElementById('clearCompleted');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const updateTaskCount = () => {
  const remaining = tasks.filter(task => !task.completed).length;
  taskCount.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} remaining`;
};

const createTaskElement = (task) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${task.text}</span>
    <button class="delete-btn"><i class="fas fa-trash"></i></button>
  `;

  if (task.completed) li.classList.add('completed');

  li.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'I') {
      task.completed = !task.completed;
      li.classList.toggle('completed');
      saveTasks();
      updateTaskCount();
    }
  });

  li.querySelector('.delete-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    tasks = tasks.filter(t => t.text !== task.text);
    saveTasks();
    renderTasks();
  });

  return li;
};

const addTask = (text) => {
  if (text.trim() === '') return;
  const task = { text: text.trim(), completed: false };
  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = '';
};

addButton.addEventListener('click', () => {
  console.log("Add clicked");
  addTask(taskInput.value);
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask(taskInput.value);
  }
});

clearCompleted.addEventListener('click', () => {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
});

const renderTasks = () => {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    taskList.appendChild(createTaskElement(task));
  });
  updateTaskCount();
};

renderTasks();
