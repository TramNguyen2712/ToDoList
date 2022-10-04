// Local Storage is a key-value storage system. 
// It has a limit of 5MB

// setItem(key,value) - to set a new key-value pair
// getItem(key,value) - to get a value of a key
// removeItem(key,value) - to remove a key-value pair 
// clear() - to clear all the key-value pairs

// TO DO LIST
// 1. Load tasks: check tasks, if there is any tasks, display them.
// 2. Add task: when clicking button, it will add the task to the list and store it in localStorage
// 3. Edit task: when clicking on the task, user can edit the task and then the task will be updated in localStorage
// 4. Mark complete: when clicking on the checkbox, the task will be marked as completed and stored in localStorage
// 5. Remove task: when clicking on the trash icon, the task will be removed from the list as well as from the localStorage


// Function to load the tasks from localStorage

// On app load, get all tasks from localStorage 
window.onload = loadTasks;

// On form submit add task
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    addTask();
});

function loadTasks() {
    // check if localStorage has any tasks
    // if not then return
    if (localStorage.getItem("tasks") == null) return;

    // Get tasks from localStorage and convert them into array
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

    tasks.forEach(task => {
        const list = document.querySelector("ul");
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked': ''}>
        <input type="text" value="${task.task}" class="task ${task.completed ? 'completed': ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)" > 
        <i class='fa-solid fa-trash-can' onclick="removeTask(this)"></i>`;
        list.insertBefore(li,list.children[0]);
    });
}

function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");

  // return if task is Empty

  if (task.value === "") {
    alert("Please add something!");
    return false;
  }

  // check if task already exit
  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert("Task already exist!")
    return false;
  }

  // add task to local storage 
  localStorage.setItem("task",JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), {task: task.value, completed: false}]));

  // create list item, add innerHTML and append to ul
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked': ''}>
  <input type="text" value="${task.task}" class="task ${task.completed ? 'completed': ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)" > 
  <i class='fa-solid fa-trash-can' onclick="removeTask(this)"></i>`;
  list.insertBefore(li,list.children[0]);
  // clear input
  task.value = "";
}

function taskComplete(event) {
  let tasks = Array.from(JSON.parse(loadTasks.getItem("tasks")));
  tasks.forEach(task => {
    if(tasks.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
}