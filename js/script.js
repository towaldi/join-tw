/* ==========================================================================
   General functions that don't belong to other js files
   ========================================================================== */

/**
 * Initializes the web application.
 *
 * @function init
 */

async function init() {
    checkLogin();
    if (isLoggedIn()) {
        await includeHTML();
        setActiveLink();
        await displayUserSVG();
        showMenu();
    }
}

let selectedOption;

/**
 * Displays a message with an icon for a limited duration.
 * @param {string} icon - The path to the message icon image.
 * @param {string} text - The text content of the message.
 */
function showMessage(icon, text) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = `
        <img src="${icon}">
        <br>
        ${text}
    `;
    messageDiv.classList.remove('d-none');

    setTimeout(() => {
        messageDiv.classList.add('d-none');
    }, 6000); // Display the message for 6 seconds
}


/**
 * Shows or hides an HTML element by adding or removing a CSS class.
 *
 * @function showContent
 * @param {string} showOrHide -> The action to show or hide the element ('show' or 'hide').
 * @param {string} classId -> The ID of the HTML element to modify.
 * @param {string} actualClass -> The CSS class to add or remove.
 */

function showContent(showOrHide, classId, actualClass) {
    if (showOrHide == 'show') {
        document.getElementById(classId).classList.remove(actualClass);
    }
    if (showOrHide == 'hide') {
        document.getElementById(classId).classList.add(actualClass);
    }
}


/**
 * Toggles the visibility of the account navigation menu based on mouse events.
 */
function showMenu() {
    const menu = document.getElementById('accountnav');
    const monogram = document.getElementById('account-img-container');
    
    monogram.onmouseenter = () => menu.classList.add('open');
    monogram.onmouseleave = () => menu.classList.remove('open');
}

/**
 * Checks if a user is logged in and redirects to the index page if not.
 * @function checkLogin
 */
function checkLogin() {
    const allowedPaths = [
        '/join/index.html',
        '/join/privacy-policy.html',
        '/join/legal-notice.html'
    ];

    if (!allowedPaths.includes(window.location.pathname) && !isLoggedIn()) {
        window.location.href = "index.html";
    }
}

/**
 * Checks if the user is logged in.
 * @returns {boolean} Returns true if the user is logged in, otherwise false.
 */
function isLoggedIn() {
    return localStorage.getItem('actualUser') || sessionStorage.getItem('actualUser');
}

/**
 * Adds active class(es) to the specified element.
 *
 * @param {string} id - The element ID.
 * @param {string[]} classes - An array of class names to add.
 */
function addClassesToElement(id, classes) {
    const element = document.getElementById(id);
    if (element) {
        classes.forEach(className => element.classList.add(className));
    }
}

/**
 * Sets the active state for menu links based on the current page URL.
 *
 * @function setActiveLink
 */
function setActiveLink() {
    const links = [
        { keyword: 'summary', elementClasses: { 'summaryMenu': ['active'], 'summaryNavMobile': ['active'] } },
        { keyword: 'board', elementClasses: { 'boardMenu': ['active'], 'boardNavMobile': ['active'] } },
        { keyword: 'add_task', elementClasses: { 'addTaskMenu': ['active'], 'addTaskNavMobile': ['active'] } },
        { keyword: 'contacts', elementClasses: { 'contactsMenu': ['active'], 'contactsNavMobile': ['active'] } },
        { keyword: 'privacy-policy', elementClasses: { 'privacyMenu': ['active', 'active-undernav'] } },
        { keyword: 'legal-notice', elementClasses: { 'legalMenu': ['active', 'active-undernav'] } }
    ];

    links.forEach(link => {
        if (window.location.href.includes(link.keyword)) {
            for (let [id, classes] of Object.entries(link.elementClasses)) {
                addClassesToElement(id, classes);
            }
        }
    });
}

/**
 * Adds the 'active' class to the menu item corresponding to the current page.
 */
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.href.split('/').pop();
    const menuItems = document.querySelectorAll('.menuitem');
    
    menuItems.forEach(menuItem => {
        const link = menuItem.getAttribute('href');
        if (link === currentPage) {
            menuItem.classList.add('active');
        }
    });
});

/* ==========================================================================
   W3 HTML include
   ========================================================================== */

/**
 * Loads and includes HTML content from external files into specified elements.
 * Elements that wish to include external HTML should use the attribute `w3-include-html`.
 *
 * @function
 * @async
 */
async function includeHTML() {
    const includeElements = document.querySelectorAll('[w3-include-html]');
    
    for (const element of includeElements) {
        const file = element.getAttribute("w3-include-html");
        try {
            const response = await fetch(file);
            element.innerHTML = await response.text();
        } catch (error) {
            element.innerHTML = 'Page not found';
        }
    }
}

/**
 * Redirects the user based on their login status.
 * If the user is logged in, it will navigate them back to the previous page.
 * If not, it redirects them to the login page.
 *
 * @function
 */
function chooseNav() {
    if (isLoggedIn()) {
        window.history.back();
    } else {
        window.location.href = "/join/index.html";
    }
}

/**
 * Sets up event listeners after the DOM has been fully loaded.
 * This script checks for clicks on the background ('cardBgr') and closes specified card elements if the background is clicked.
 */
document.addEventListener('DOMContentLoaded', function () {
    /** @type {HTMLElement} */
    const cardBgr = document.getElementById('cardBgr');

    /** @type {string[]} List of card element IDs that should be closed when the background is clicked. */
    const cardsToClose = ['addTaskBox', 'editTaskBox', 'cardTaskDetails'];

    if (cardBgr) {
        /**
         * Event handler for click events on the background.
         * @param {Event} event - The click event.
         */
        cardBgr.addEventListener('click', function (event) {
            if (event.target === cardBgr) {
                cardsToClose.forEach(card => closeCard(card));
            }
        });
    }
});