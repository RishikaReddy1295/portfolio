const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

function renderTasks(filter = "all") {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (filter === "active") {

        filteredTasks = tasks.filter(
            task => !task.completed
        );

    }

    if (filter === "completed") {

        filteredTasks = tasks.filter(
            task => task.completed
        );

    }

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `

            <span onclick="toggleComplete(${index})">
                ${task.text}
            </span>

            <div class="task-buttons">

                <button onclick="editTask(${index})">
                    Edit
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

    saveTasks();

}

addBtn.addEventListener("click", function () {

    const text = taskInput.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    renderTasks();

});

function deleteTask(index) {

    tasks.splice(index, 1);

    renderTasks();

}

function editTask(index) {

    const updatedText = prompt(
        "Edit your task",
        tasks[index].text
    );

    if (
        updatedText !== null &&
        updatedText.trim() !== ""
    ) {

        tasks[index].text = updatedText;

        renderTasks();

    }

}

function toggleComplete(index) {

    tasks[index].completed =
        !tasks[index].completed;

    renderTasks();

}

function filterTasks(type) {

    renderTasks(type);

}

renderTasks();