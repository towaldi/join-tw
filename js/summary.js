/**
 * Populates and updates various summary content elements on a web page.
 *
 * This function retrieves elements with specific IDs from the DOM and populates them with
 * summary data related to tasks and user information. It calculates and displays the total
 * number of tasks, tasks in progress, tasks awaiting feedback, tasks with 'Urgent' priority,
 * task deadlines, tasks to do, tasks marked as done, and a greeting message based on the time of day.
 *
 * @function showSummaryContent
 */

function showSummaryContent() {
    const summaryElements = getSummaryElements();

    populateTaskSummary(summaryElements);
    populateUserSummary(summaryElements);
}

/**
 * Retrieves and returns DOM elements related to summary content.
 *
 * @returns {Object} An object containing DOM elements for summary content.
 */
function getSummaryElements() {
    return {
        totalTasks: document.getElementById('tasksInBoard'),
        tasksInProgress: document.getElementById('tasksInProgress'),
        awaitingFeedback: document.getElementById('awaitingFeedback'),
        urgentCount: document.getElementById('urgent'),
        deadlineDate: document.getElementById('deadlineDate'),
        toDo: document.getElementById('toDo'),
        done: document.getElementById('done'),
        greeting: document.getElementById('greeting'),
        name: document.getElementById('name')
    };
}

/**
 * Populates task-related summary elements.
 *
 * @param {Object} summaryElements - DOM elements for summary content.
 */
function populateTaskSummary(summaryElements) {
    summaryElements.deadlineDate.innerText = getDeadlineTask();
    summaryElements.totalTasks.innerText = user.tasks.length;
    summaryElements.tasksInProgress.innerText = taskCounter('status', 'inProgress');
    summaryElements.awaitingFeedback.innerText = taskCounter('status', 'awaitingFeedback');
    summaryElements.toDo.innerText = taskCounter('status', 'toDo');
    summaryElements.done.innerText = taskCounter('status', 'done');
    summaryElements.urgentCount.innerText = taskCounter('prio', 'Urgent');
}

/**
 * Populates user-related summary elements.
 *
 * @param {Object} summaryElements - DOM elements for summary content.
 */
function populateUserSummary(summaryElements) {
    summaryElements.name.innerText = user.name;
    summaryElements.greeting.innerText = getGreetingBasedOnTime();
}

/**
 * Counts the number of tasks that match a specified parameter and value.
 *
 * This function calculates the count of tasks within the user's tasks array that have a specific
 * parameter matching the provided value. It is useful for summarizing tasks based on various criteria,
 * such as their status or priority.
 *
 * @function taskCounter
 * @param {string} param -> The parameter to filter tasks by (e.g., 'status', 'prio').
 * @param {string} value -> The value to match within the specified parameter (e.g., 'inProgress', 'Urgent').
 * @returns {number} -> The count of tasks that match the specified parameter and value.
 */

function taskCounter(param, value) {
    let taskCounterValue = 0;
    user.tasks.forEach(task => {
        if (task[param] == value) {
            taskCounterValue++;
        }
    });
    return taskCounterValue;
}


/**
 * Retrieves the formatted due date of the upcoming task, if any.
 *
 * This function calculates and returns the formatted due date of the upcoming task, if there
 * are tasks with due dates in the user's tasks array. It returns "No" if there are no tasks
 * with due dates.
 *
 * @function getDeadlineTask
 * @returns {string} -> The formatted due date of the upcoming task or "No" if no tasks have due dates.
 */
function getDeadlineTask() {
    const upcomingTask = findUpcomingTask(user.tasks);
    if (!upcomingTask) {
        return "No";
    }
    return formatDate(upcomingTask.duedate);
}

/**
 * Finds and returns the upcoming task with the nearest due date.
 *
 * @param {Array} tasks - The user's tasks array.
 * @returns {Object|null} - The upcoming task or null if no tasks have due dates.
 */
function findUpcomingTask(tasks) {
    const currentDate = new Date();
    let upcomingTask = null;
    let minDays = Infinity;

    tasks.forEach(task => {
        if (task.duedate) {
            const taskDate = new Date(task.duedate);
            const remainingDays = Math.abs(currentDate - taskDate);
            if (remainingDays < minDays) {
                minDays = remainingDays;
                upcomingTask = task;
            }
        }
    });

    return upcomingTask;
}

/**
 * Formats a date string in the "YYYY-MM-DD" format to "MM/DD/YYYY".
 *
 * @param {string} dateStr - The date string in "YYYY-MM-DD" format.
 * @returns {string} - The formatted date string in "MM/DD/YYYY" format.
 */
function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${month}/${day}/${year}`;
}

/**
 * Formats a date string in "YYYY-MM-DD" format into a human-readable format.
 *
 * This function takes a date string in "YYYY-MM-DD" format and converts it into a human-readable
 * format like "DD Month, YYYY". It is useful for presenting dates in a more user-friendly manner.
 *
 * @function formatDate
 * @param {string} dateString -> The date string in "YYYY-MM-DD" format to be formatted.
 * @returns {string} -> The formatted date in "DD Month, YYYY" format.
 */

function formatDate(dateString) {
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // JavaScript-Monate sind 0-indexed
    const day = parseInt(dateParts[2]);

    const formattedDate = `${day} ${months[month]}, ${year}`;
    return formattedDate;
}


/**
 * Generates a greeting based on the current time of day.
 *
 * This function calculates the current hour and returns a greeting based on the time of day,
 * including "Good Morning," "Good Afternoon," "Good Evening," or "Good Night."
 *
 * @function getGreetingBasedOnTime
 * @returns {string} -> A greeting based on the current time of day.
 */

function getGreetingBasedOnTime() {
    const currentHour = new Date().getHours();
    const greetings = {
        morning: 'Good Morning',
        afternoon: 'Good Afternoon',
        evening: 'Good Evening',
        night: 'Good Night',
    };

    if (currentHour >= 4 && currentHour < 12) {
        return greetings.morning;
    } else if (currentHour >= 12 && currentHour < 18) {
        return greetings.afternoon;
    } else if (currentHour >= 18 && currentHour < 24) {
        return greetings.evening;
    } else {
        return greetings.night;
    }
}


/* ==========================================================================
   Functions to execute on load
   ========================================================================== */

/**
 * Initializes and displays the summary content based on user data.
 *
 * This asynchronous function first retrieves the user's data using `getActualUserData`,
 * and then displays the summary content using `showSummaryContent`.
 *
 * @function initSummary
 */
   
async function initSummary() {
    await getActualUserData();
    showSummaryContent();
}