const taskContent = document.querySelector('.task-content');
const taskForm = document.querySelector('#add');
const newTask = document.querySelector('#new-task');
const allCompleted = document.querySelector('.all-completed');

let items = [];
let allDone = false;

const addTask = function (a) {
  a.preventDefault();
  if (newTask.value.trim().length > 0) {
    taskForm.classList.remove('form-errors');
    items.push({
      task: newTask.value,
      done: false
    }),
    saveList(),
    taskForm.reset();
  } else {
    taskForm.classList.add('form-errors');
  }
}

const createList = function (tasks, taskContent) {
  if (tasks.length === 0) {
    taskContent.innerHTML = "<p class='tasks-none'>Add some tasks to get started!</p>"
    allCompleted.style.display = "none"
    allDone = false;
  } else {    
    allDone = tasks.every(task => task.done);
    allCompleted.style.display = "inline-block";
    allCompleted.textContent = allDone ? "Mark All Incomplete" : "Mark All Completed"
    taskContent.innerHTML = `
        <ul class="task-list">
          ${tasks.map((task, index) => (
            `<li class="task-item ${task.editing ? "task-editing" : ""}" data-index="${index}">
              <input type="checkbox" id="todo${index}" data-index="${index}" ${task.done ? "checked" : ""} />
              <label for="todo${index}">
                <div class="task-text">
                  ${task.task}
                </div>
              </label>
              <input class="task-edit" type="text" placeholder="Task name" name="todo" value="${task.task.trim()}">
              <button class="remove-button">Delete Task</button>
              <button class="edit-button">${task.editing ? "Save Task" : "Edit Task"}</button>
            </li>`
          )).join('')}
        </ul>
        ${allDone ? `<div class="tasks-completed">Congratulations, you have completed all of your tasks!</div>` : ''}
    `
  }
}

const updateList = function (e) {  
  if (e.target.matches('.remove-button')) {
    const indexToRemove = +e.target.parentNode.dataset.index;
    removeItem(indexToRemove);
    saveList();
  }
  if (e.target.matches('.edit-button')) {
    const indexToEdit = +e.target.parentNode.dataset.index;
    const input = [...e.target.parentNode.childNodes].find(el => el.name === "todo");
    editItem(indexToEdit, input);
    saveList();
  }
  if (e.target.matches('input[type="checkbox"]')) {    
    const index = e.target.dataset.index;
    items[index].done = !items[index].done;
    saveList();
  }
}

const editItem = function (indexToEdit, input) {
  items = items.map((item, index) => {
    if (index === indexToEdit) {
      return {
        ...item, 
        editing: !item.editing,
        task: input.value.trim().length > 0 ? input.value : item.task
      };
    }
    return item;
  })
}

const completeAll = function () {
  items = items.map((item, index) => ({
    ...item,
    done: !allDone
  }));
  saveList();
}

const removeItem = function (indexToRemove) {
  items = items.filter((item, index) => index !== indexToRemove);
}

const saveList = function () {
  createList(items, taskContent);
};

taskContent.addEventListener('click', updateList);
taskForm.addEventListener('submit', addTask);
allCompleted.addEventListener('click', completeAll);
taskContent.addEventListener('keyup', e => {
  e.preventDefault();
  if (e.keyCode === 13) {
    const indexToEdit = +e.target.parentNode.dataset.index;
    const input = [...e.target.parentNode.childNodes].find(el => el.name === "todo");    
    editItem(indexToEdit, input);
    saveList();
  }
});

createList(items, taskContent);

