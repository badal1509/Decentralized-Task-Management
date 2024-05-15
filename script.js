document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskName = document.getElementById('taskName').value.trim();
    const taskDescription = document.getElementById('taskDescription').value.trim();
    const taskAssignee = document.getElementById('taskAssignee').value.trim();
    const taskStatus = document.getElementById('taskStatus').value;
    const taskDeadline = document.getElementById('taskDeadline').value;

    // Check if any field is empty
    if (taskName === "" || taskDescription === "" || taskAssignee === "" || taskDeadline === "") {
        alert("Please fill in all fields!");
        return;
    }

    // Check if task with same name already exists
    if (isTaskNameDuplicate(taskName)) {
        alert("A task with the same name already exists!");
        return;
    }

    // Check if deadline is in the past
    const deadlineDate = new Date(taskDeadline);
    if (deadlineDate < new Date()) {
        alert("Deadline must be a future date!");
        return;
    }

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
        <h3>${taskName}</h3>
        <p><strong>Description:</strong> ${taskDescription}</p>
        <p><strong>Assignee:</strong> ${taskAssignee}</p>
        <p><strong>Status:</strong> <select class="status-select">
            <option value="Incomplete"${taskStatus === 'Incomplete' ? ' selected' : ''}>Incomplete</option>
            <option value="Complete"${taskStatus === 'Complete' ? ' selected' : ''}>Complete</option>
        </select></p>
        <p><strong>Deadline:</strong> ${taskDeadline}</p>
    `;

    const statusSelect = taskItem.querySelector('.status-select');
    statusSelect.addEventListener('change', updateTaskStatus);

    if (taskStatus === 'Complete') {
        statusSelect.disabled = true;
        document.getElementById('completedTasks').appendChild(taskItem);
    } else {
        document.getElementById('createdTasks').appendChild(taskItem);
    }

    document.getElementById('taskForm').reset();
});

function updateTaskStatus(event) {
    const taskItem = event.target.closest('.task-item');
    const selectedStatus = event.target.value;

    if (selectedStatus === 'Complete') {
        event.target.disabled = true;
        document.getElementById('completedTasks').appendChild(taskItem);
    } else {
        document.getElementById('createdTasks').appendChild(taskItem);
    }
}

function isTaskNameDuplicate(name) {
    const taskNames = document.querySelectorAll('.task-item h3');
    for (let i = 0; i < taskNames.length; i++) {
        if (taskNames[i].textContent === name) {
            return true;
        }
    }
    return false;
}

