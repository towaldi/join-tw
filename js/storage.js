/**
 * @fileoverview This script defines global variables and constants related to user management, tasks, and storage configuration.
 */

/** 
 * @type {Object[]} users - An array that stores all users.
 */
let users = [];

/** 
 * @type {?Object} user - Represents the currently active user object.
 */
let user;

/** 
 * @type {?Object[]} tasks - Represents the list of tasks for the active user.
 */
let tasks;

/** 
 * @type {?Object} loggedInUser - Represents the user currently logged in.
 */
let loggedInUser;

/** 
 * @type {string} actualUser - Retrieves the 'actualUser' value from local or session storage.
 */
let actualUser = localStorage.getItem('actualUser') ? localStorage.getItem('actualUser') : sessionStorage.getItem('actualUser');

/** 
 * @type {Object[]} contacts - An array that stores all contacts for the active user.
 */
let contacts = [];

/** 
 * @type {number} baseId - Generates a unique base ID based on the current timestamp.
 */
let baseId = Date.now();

/** 
 * @const {string} STORAGE_TOKEN - The authentication token for accessing the storage service.
 */
const STORAGE_TOKEN = 'YGV8W30OHKT9BSLYRD0IGYMXRUXZRH2PGHK92WOG';

/** 
 * @const {string} STORAGE_URL - The URL endpoint for the storage service.
 */
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Sets a key-value pair in storage using a POST request.
 *
 * This asynchronous function sends a POST request to a specified storage URL with a payload
 * containing a key and value to set in storage. It uses a predefined token for authentication.
 *
 * @function setItem
 * @param {string} key - The key to set in storage.
 * @param {any} value - The value associated with the key to set in storage.
 */

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    let res = await fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) });
}


/**
 * Retrieves a value from storage based on a key.
 *
 * @function getItem
 * @param {string} key - The key to retrieve a value from storage.
 * @returns {Promise<any>} A promise that resolves to the retrieved value.
 */

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    let res = await fetch(url);
    jsonRes = await res.json();
    return jsonRes;
}


/**
 * Collects user data from input fields and registers a new user.
 *
 * @function collectUserData
 */

async function collectUserData() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let passwordConfirm = document.getElementById('passwordConfirm').value;
    let id = users.length;
    let svg = await createSVGForUser(name);
    comparePasswords(password, passwordConfirm);
    registerUser(name, email, password, register, id, svg);
}


/**
 * Compares two passwords and updates the registration status.
 *
 * @function comparePasswords
 * @param {string} password -> The user's password.
 * @param {string} passwordConfirm -> The confirmation of the user's password.
 */

function comparePasswords(password, passwordConfirm) {
    if (password == passwordConfirm) {
        document.getElementById('supportingText').classList.add('d-none');
        register = true;
    } else {
        document.getElementById('supportingText').classList.remove('d-none');
        register = false;
    }
}


/**
 * Registers a new user if the registration flag is true.
 *
 * @function registerUser
 * @param {string} name -> The user's name.
 * @param {string} email -> The user's email address.
 * @param {string} password -> The user's password.
 * @param {boolean} register -> A flag indicating whether to register the user.
 * @param {number} id -> The user's unique identifier.
 * @param {string} svg -> The user's SVG avatar as a string.
 */

function registerUser(name, email, password, register, id, svg) {
    if (register) {
        let user = {
            id: id,
            name: name,
            email: email,
            password: password,
            svg: svg.outerHTML, //SVG saved as string
            tasks: [
                {
                    "assignedTo": [`<div title= "You" class="contact-initials">${svg.outerHTML}</div>`],
                    "assignedToNames": ['You'],
                    "assignments": [{
                        "name": "You",
                        "svg": `${svg.outerHTML}`
                    }],
                    "category": "development",
                    "description": "Develop a secure user authentication system for our web application. The system should allow users to sign up using an email and password, and also provide options for password recovery. The backend should securely store hashed passwords and ensure that every data transmission happens over an encrypted connection. Integration with third-party authentication providers like Google or Facebook is a plus.",
                    "duedate": "2024-10-05",
                    "id": baseId++,
                    "prio": "Urgent",
                    "status": "toDo",
                    "subtasks": ["Research and Choose a Framework", "Database Integration", "Front-end Development"],
                    "subtasksdone": ["done", "notdone", "notdone"],
                    "title": "Implement User Authentication System"
                },
                {

                    "assignedTo": [`<div title= "You" class="contact-initials">${svg.outerHTML}</div>`],
                    "assignedToNames": ['You'],
                    "assignments": [{
                        "name": "You",
                        "svg": `${svg.outerHTML}`
                    }],
                    "category": "design",
                    "description": "Revamp the current homepage to ensure a seamless experience for mobile users.",
                    "duedate": "2024-10-05",
                    "id": baseId++,
                    "prio": "Medium",
                    "status": "inProgress",
                    "subtasks": ['Identify Key Elements', 'Wireframing', 'Collaboration'],
                    "subtasksdone": ["notdone", "done", "done"],
                    "title": "Redesign Homepage for Mobile Responsiveness"
                },
                {
                    "assignedTo": [`<div title= "You" class="contact-initials">${svg.outerHTML}</div>`],
                    "assignedToNames": ['You'],
                    "assignments": [{
                        "name": "You",
                        "svg": `${svg.outerHTML}`
                    }],
                    "category": "quality",
                    "description": "To ensure our recent application updates align with user expectations, conduct a comprehensive user testing session.",
                    "duedate": "2024-10-05",
                    "id": baseId++,
                    "prio": "Urgent",
                    "status": "awaitingFeedback",
                    "subtasks": ["Recruit Testers", "Prepare Test Scenarios", "Feedback Collection"],
                    "subtasksdone": ["done", "notdone", "notdone"],
                    "title": "Conduct User Testing for New Features"
                }
            ],
            contacts: [
                {
                    "id": baseId++,
                    "email": "guenther@jauch.de",
                    "monogram": '<svg width="100%" height="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#f28034"></circle><text x="50" y="60" font-family="Arial" font-size="24" fill="white" text-anchor="middle">GJ</text></svg>',
                    "name": "Günther Jauch",
                    "phone": "1234"
                },
                {
                    "id": baseId++,
                    "email": "walter@roehrich.de",
                    "monogram": '<svg width="100%" height="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#7e356"></circle><text x="50" y="60" font-family="Arial" font-size="24" fill="white" text-anchor="middle">WR</text></svg>',
                    "name": "Walter Röhrich",
                    "phone": "1454556456"
                },
                {
                    "id": baseId++,
                    "email": "andreas@gmail.com",
                    "monogram": '<svg width="100%" height="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#64f5e0"></circle><text x="50" y="60" font-family="Arial" font-size="24" fill="white" text-anchor="middle">AE</text></svg>',
                    "name": "Andreas Ernst",
                    "phone": "0456456456"
                }
            ]
        }
        users.push(user);
        setItem('users', JSON.stringify(users));
        showMessage('./assets/img/register.png', 'Successfully registered!');
        changeForm('signup', 'login');
    }
}


/**
 * Updates the password for a user.
 *
 * @function updatePassword
 * @param {object} user -> The user object to update.
 * @param {string} password -> The new password to set for the user.
 */

function updatePassword(user, password) {
    user.password = password;
    updateUser();
}


/**
 * Retrieves and loads user data from storage.
 *
 * @function getUsers
 */

async function getUsers() {
    loadedUsers = await getItem('users');
    if (loadedUsers) {
        users = JSON.parse(loadedUsers.data.value);
    }
    else {
        users = [];
    }
}


/**
 * Logs in a user based on provided email and password.
 *
 * @function login
 */

function login() {
    let checkbox = document.getElementById('remember').checked;
    let email = document.getElementById('emailLogin');
    let password = document.getElementById('pwLogin');
    loggedInUser = users.find(user => user.email == email.value && user.password == password.value);
    setLogin(checkbox);
}


/**
 * Sets the login status based on user authentication and checkbox selection.
 *
 * @function setLogin
 * @param {boolean} checkbox -> A flag indicating whether the "Remember Me" checkbox is checked.
 */

function setLogin(checkbox) {
    if (loggedInUser && checkbox) {
        window.location.href = "summary.html";
        localStorage.setItem('actualUser', JSON.stringify(loggedInUser.id));
    }
    else if (loggedInUser) {
        window.location.href = "summary.html";
        sessionStorage.setItem('actualUser', JSON.stringify(loggedInUser.id));
    }
    else {
        showMessage('./assets/img/fail.png', 'Please check user name or password!');
    }
}


/**
 * Performs a guest login using predefined guest user credentials.
 *
 * @function guestLogin
 */

function guestLogin() {
    // you need to create a new user for this to work; name = 'guest', password: 'guest', after signup, change id to 'guest'
    loggedInUser = users.find(user => user.email == 'guest' && user.password == 'guest');
    if (loggedInUser) {
        window.location.href = "summary.html";
        sessionStorage.setItem('actualUser', loggedInUser.id);
    }
}


/**
 * Logs the user out and redirects to the index page.
 *
 * @function logout
 */

function logout() {
    localStorage.removeItem('actualUser');
    sessionStorage.removeItem('actualUser');
    window.location.href = "index.html";
}


/**
 * Retrieves and sets the user data for the currently authenticated user.
 *
 * @function getActualUserData
 */

async function getActualUserData() {
    await getUsers();
    users.forEach(thisUser => {
        if (thisUser.id == actualUser) {
            user = thisUser;
        }
    });
}


/**
 * Updates user data and stores it in storage.
 *
 * @function updateUser
 */

function updateUser() {
    actualUser = localStorage.getItem('actualUser') ? localStorage.getItem('actualUser') : sessionStorage.getItem('actualUser');
    users.forEach(function (user, index) {
        if (user.id == actualUser) {
            users[index] = user;
        }
    });
    setItem('users', users);
}

/* ==========================================================================
   Functions to execute on load
   ========================================================================== */

getUsers();
getActualUserData();