// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM elements
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

// Add event listener for adding a task
addButton.addEventListener('click', addTask);

// Render tasks from the tasks array
renderTasks();

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    taskInput.value = '';
  }
}

// Function to remove a task
function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

// Function to toggle task completion
function toggleTask(id) {
  tasks.forEach(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
  });
  saveTasks();
  renderTasks();
}

// Function to edit a task
function editTask(id, newText) {
  tasks.forEach(task => {
    if (task.id === id) {
      task.text = newText;
    }
  });
  saveTasks();
  renderTasks();
}

// Function to create an editable task input field
function createEditInput(id, currentValue) {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentValue;
  input.addEventListener('blur', event => {
    const newValue = event.target.value.trim();
    editTask(id, newValue);
  });
  input.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
      const newValue = event.target.value.trim();
      editTask(id, newValue);
    }
  });
  return input;
}

// Function to update task count
function updateTaskCount() {
  const remainingTasks = tasks.filter(task => !task.completed).length;
  taskCount.textContent = `Tasks Remaining: ${remainingTasks}`;
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.classList.add('taskText');
    taskText.addEventListener('dblclick', () => {
      const editInput = createEditInput(task.id, task.text);
      taskItem.replaceChild(editInput, taskText);
      editInput.focus();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deleteButton'); // Add the deleteButton class
    deleteButton.addEventListener('click', () => removeTask(task.id));

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });

  updateTaskCount();
}
// Add event listener for adding a task
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    addTask();
  }
});
