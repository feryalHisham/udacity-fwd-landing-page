
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