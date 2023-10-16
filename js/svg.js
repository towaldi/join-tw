/**
 * Creates an SVG element representing a user's initials with a random background color.
 *
 * @param {string} name - The name of the user for which the SVG avatar is generated.
 * @returns {SVGElement} An SVG element representing the user's initials with a background circle.
 */
function createSVGForUser(name) {
    /**
     * Namespace for SVG elements.
     * @type {string}
     */
    const svgNS = "http://www.w3.org/2000/svg";

    /**
     * Width of the SVG element.
     * @type {string}
     */
    const svgWidth = "100%";

    /**
     * Height of the SVG element.
     * @type {string}
     */
    const svgHeight = "100%";

    /**
     * ViewBox attribute of the SVG element.
     * @type {string}
     */
    const viewBox = "0 0 100 100";

    /**
     * Radius of the background circle.
     * @type {string}
     */
    const circleRadius = "40";

    /**
     * Font size of the initials text.
     * @type {string}
     */
    const fontSize = "24";
    
    // Extract the initials from the user's name
    const initials = getInitials(name).toUpperCase();

    // Generate a random background color
    const randomColor = getRandomColor();

    // Create a new SVG element
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);
    svg.setAttribute("viewBox", viewBox);

    // Add a circle for the background
    const circle = createCircle(svgNS, circleRadius, randomColor);
    svg.appendChild(circle);

    // Add text (initials)
    const text = createText(svgNS, initials, fontSize);
    svg.appendChild(text);

    // Return the SVG element
    return svg;
}

/**
 * Extracts the initials from a user's name.
 *
 * @param {string} name - The user's name.
 * @returns {string} The initials extracted from the name.
 */
function getInitials(name) {
    return name.split(' ').map(word => word[0]).join('');
}

/**
 * Generates a random background color.
 *
 * @returns {string} A random color in hexadecimal format.
 */
function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

/**
 * Creates an SVG circle element.
 *
 * @param {string} svgNS - The SVG namespace.
 * @param {string} radius - The radius of the circle.
 * @param {string} fillColor - The fill color of the circle.
 * @returns {SVGElement} An SVG circle element.
 */
function createCircle(svgNS, radius, fillColor) {
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", fillColor);
    return circle;
}

/**
 * Creates an SVG text element.
 *
 * @param {string} svgNS - The SVG namespace.
 * @param {string} content - The text content.
 * @param {string} fontSize - The font size of the text.
 * @returns {SVGElement} An SVG text element.
 */
function createText(svgNS, content, fontSize) {
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", "50");
    text.setAttribute("y", "60");  // These values can be adjusted to center the text
    text.setAttribute("font-family", "Arial");
    text.setAttribute("font-size", fontSize);
    text.setAttribute("fill", "white");
    text.setAttribute("text-anchor", "middle");
    text.textContent = content;
    return text;
}

/**
 * Displays a user's SVG avatar within an HTML container.
 *
 * This asynchronous function retrieves the user's data using `getActualUserData`, and if the user data
 * includes an SVG avatar, it adds the SVG to the specified HTML container with the ID 'account-img-container'.
 * The function is designed to handle errors gracefully and logs any encountered errors to the console.
 *
 * @function displayUserSVG
 * @throws {Error} Throws an error if there is an issue with retrieving user data or adding the SVG to the container.
 */
async function displayUserSVG() {
    try {
        await getActualUserData();
        if (user && user.svg) {
            const container = document.getElementById('account-img-container');
            container.innerHTML = user.svg + container.innerHTML;
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}