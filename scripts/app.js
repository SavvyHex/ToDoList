document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
  document
    .querySelector("#add-task-button")
    .addEventListener("click", function () {
      createNewTask();
      saveTasks();
    });
});

function createNewTask(taskName) {
  // To Add Tasks
  const taskText = document.querySelector("input");
  const taskValue = taskName || taskText.value.trim();
  if (taskValue === "") return;
  const newTask = document.createElement("div");
  newTask.classList.add("task-item", "grid-center");
  newTask.innerHTML = `
      <div class="task-text">${taskValue}</div>
      <button class="complete-button">
        <img src="pictures/check-icon.png" />
      </button>
    `;
  document.getElementById("tasks-todo").appendChild(newTask);
  taskText.value = "";

  // To Delete Tasks
  newTask
    .querySelector(".complete-button")
    .addEventListener("click", function () {
      newTask.remove();
      saveTasks();
    });
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll(".task-item .task-text").forEach(function (item) {
    tasks.push(item.textContent.trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(createNewTask);
}
