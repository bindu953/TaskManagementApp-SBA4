const taskList = document.getElementById("task-list")
const itemInputTaskName = document.getElementById("item-inputtask")
const itemInputCategory = document.getElementById("item-inputcategory")
const itemInputDeadline = document.getElementById("item-deadline")
const itemInputStatus = document.getElementById("item-inputstatus")
const addToListBtn = document.getElementById("addTask-btn")
//const filterCategory = document.getElementById("filter-category");
//const filterStatus = document.getElementById("filter-status");

// Empty array to store task objects
let tasksArray = []

// Function to display all tasks
function displayTasks() {

    // Clear the existing list
    taskList.innerHTML = "";

    // Loop through each task in the array
    tasksArray.forEach((task, index) => {

        // Create a new list item
        const li = document.createElement("li");

        // Add task information to the list item
        li.textContent =
            `Task: ${task.TaskName} |
             Category: ${task.Category} |
             Deadline: ${task.Deadline} |
             Update Status: `;

        // Create a status dropdown
        const statusDropdown = document.createElement("select");

        // Option 1: In Progress
        const inProgressOption = document.createElement("option");

        inProgressOption.value = "In Progress";
        inProgressOption.textContent = "In Progress";

        // Option 2: Completed
        const completedOption = document.createElement("option");

        completedOption.value = "Completed";
        completedOption.textContent = "Completed";

        // Add options to dropdown
        statusDropdown.appendChild(inProgressOption);
        statusDropdown.appendChild(completedOption);

        // Show Overdue for overdue tasks
        if (task.Status === "Overdue") {

            const overdueOption = document.createElement("option");

            overdueOption.value = "Overdue";
            overdueOption.textContent = "Overdue";
            overdueOption.disabled = true;

            statusDropdown.appendChild(overdueOption);

        }

        // Set dropdown to current task status
        statusDropdown.value = task.Status;

        // Listen for dropdown changes
        statusDropdown.addEventListener("change", () => {

            updateTaskStatus(index, statusDropdown.value);

        });

        // Add information and dropdown to list item
        //li.appendChild(taskList);

        li.appendChild(statusDropdown);

        // Add list item to the task list
        taskList.appendChild(li);

    });

}

// Function to check overdue tasks
function checkOverdueTasks() {

    // Get today's date
    const today = new Date();

    // Convert today's date to YYYY-MM-DD format
    const currentDate =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    // Loop through each task in the array
    tasksArray.forEach((task) => {

        // Check only tasks that are not completed
        if (task.Status !== "Completed") {

            // Check if deadline has passed
            if (task.Deadline < currentDate) {

                task.Status = "Overdue";

            } else {

                task.Status = "In Progress";

            }
        }

    });

}

function updateTaskStatus(index, newStatus) {


    tasksArray[index].Status = newStatus;

    checkOverdueTasks();

    displayTasks();

    console.log("Updated Tasks:", tasksArray);

}

// Add task button click event
addToListBtn.addEventListener("click", () => {

    // Get input values
    const inputTaskName = itemInputTaskName.value.trim();
    const inputCategory = itemInputCategory.value.trim();
    const inputDeadline = itemInputDeadline.value.trim();
    const inputStatus = itemInputStatus.value.trim();

    // Check for empty fields
    if (
        inputTaskName === "" ||
        inputCategory === "" ||
        inputDeadline === "" ||
        inputStatus === ""
    ) {
        alert("Please fill in all fields.");
        return;
    }

    // Create an object for the new task
    let objInputTask = {

        TaskName: inputTaskName,
        Category: inputCategory,
        Deadline: inputDeadline,
        Status: inputStatus

    };

    // Add the task object to the array
    tasksArray.push(objInputTask)

    // Display the array in the console
    console.log("Task added successfully:", objInputTask);
    console.log("Current Task List:", tasksArray);

    //Display the tasks on the web page
    displayTasks()

    // Clear input fields
    itemInputTaskName.value = "";
    itemInputCategory.value = "";
    itemInputDeadline.value = "";

    // Reset status dropdown
    itemInputStatus.value = "In Progress";

    itemInputTaskName.focus();

})

// Update displayed tasks when category filter changes
// filterCategory.addEventListener("change", () => {

//     displayTasks();

// });

// // Update displayed tasks when status filter changes
// filterStatus.addEventListener("change", () => {

//     displayTasks();

// });


