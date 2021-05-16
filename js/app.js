
/**
 * Any logic runs after the DOM content is loaded.
 * 
 * main() function is the listener function for the `DOMContentLoaded` event which is the start point.
 */
document.addEventListener('DOMContentLoaded', main);

/**
 * The main function which calls other functions
 */
function main () {
    const sections = document.querySelectorAll('section');
    const navigationMenu =  document.getElementById('navbar__list');
    appendNavigationItemsToMenu(sections,navigationMenu);
    listenToNavigationMenuClick(navigationMenu)
}

/**
 * Appends <a> elements (anchors) displaying the name of corresponding section and referencing the section id
 * @param {*} sections 
 * @param {*} navigationMenu 
 */
function appendNavigationItemsToMenu(sections, navigationMenu) {
    for (const section of sections) {
        const navigationLink = document.createElement('a');
        navigationLink.href = '#' + section.id;
        navigationLink.innerText = section.getAttribute('data-nav');
        navigationLink.classList.add('menu__link');
        navigationMenu.appendChild(navigationLink);
    }
}

/**
 * Add event listener to click event on the navigation menu
 * @param {*} navigationMenu 
 */
function listenToNavigationMenuClick(navigationMenu) {
    navigationMenu.addEventListener('click', onClickNavMenu);
}

/**
 * Callback function for click events on the navigation menu. 
 * 
 * Checks whether the user clicked on a link or not. If so, call the functions that add css styles for the active section and link
 * @param {*} clickEvent the click event captured
 */
function onClickNavMenu(clickEvent) {
    const clickedElement = clickEvent.target;
    const navigatedToSection = clickedElement.getAttribute('href');
    if (navigatedToSection) {
        addActiveStyleClassToNavigationLink(clickedElement);
        addActiveStyleClassToSection(document.getElementById(navigatedToSection.substring(1)));
    }
}


/**
 * Sets the active style class for the section passed after removing the active class from any other section to make sure the section passed is the only active element.
 * @param {*} section the section required to be currently active.
 */
function addActiveStyleClassToSection(section) {
    removeClassFromAllElements('section__active');
    section.classList.add('section__active');
}

/**
 * Sets the active style class for the navigationLink passed after removing the active class from any other navigation links to make sure the navigationLink passed is the only active element.
 * @param {*} navigationLink the navigation element required to be currently active.
 */
function addActiveStyleClassToNavigationLink(navigationLink) {
    removeClassFromAllElements('link__active');
    navigationLink.classList.add('link__active');
}

////////////////////////// Utility Functions ///////////////////////////////////////

/**
 * Loops through all nodes with the class className and removes the className from its classList. 
 * @param {*} className 
 */
 function removeClassFromAllElements(className) {
    const elementsWithClass = document.querySelectorAll(`.${className}`);
    elementsWithClass.forEach(element => {
        element.classList.remove(className);
    })
}
