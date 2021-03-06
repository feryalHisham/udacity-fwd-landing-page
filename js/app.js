let scrollEventOccurred = false;
let pageJustLoaded = true;
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
    handlePageLoadedWithHash();
    window.addEventListener('popstate', handlePageLoadedWithHash);
    listenToNavigationMenuClick(navigationMenu);
    listenToScrollEvent();
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
        const navigationItem = document.createElement('li');
        navigationLink.appendChild(navigationItem);
        navigationMenu.appendChild(navigationLink);
    }
}

/**
 * Called at the first page load and whenever the url changes to handle activating sections and events when the user manulally enters the hash of the section on the url for example:
 * [PATH_TO_PROJECT]/index.html#section10
 */
function handlePageLoadedWithHash() {
    if(window.location.hash) {
        const activeSection = document.getElementById(window.location.hash.substring(1));
        activeSection.scrollIntoView();
        activateSectionsAndNavLinks(activeSection);

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
        pageJustLoaded = false;
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

/**
 * Adds event listeners for `wheel` event and `keydown` event for 'ArrowDown' and 'ArrowUp' keys since theses events represent scrolling other than the `scroll` event that also is fired due to anchors. 
 */
function listenToScrollEvent() {
    document.addEventListener('wheel', handleScrollEvent);
    document.addEventListener('keydown', checkForArrowKeys);

}

/**
 * Activates the currently active section and navigation link on user scrolling through the page.
 * 
 * Handles display or hide navigation menu.
 */
function handleScrollEvent() {
    const activeSection = getSectionNearViewPort();
    if(activeSection) {
       activateSectionsAndNavLinks(activeSection);
    }
    pageJustLoaded = false;
    if(scrollEventOccurred){
        return;
    }
    scrollEventOccurred = true;
    displayNavigationMenu(true);
    setTimeout(() => scrollEventOccurred = false, 500);
    setTimeout(hideNavigationMenuIfPossible, 3000);

}

/**
 * Calls functions that sets the css styles for active sections and navigation links.
 * @param {*} activeSection 
 */
function activateSectionsAndNavLinks(activeSection) {
    addActiveStyleClassToSection(activeSection);
    const activeLink = getNavLinkOfActiveSection(activeSection.id);
    addActiveStyleClassToNavigationLink(activeLink);
    activeLink.firstElementChild.scrollIntoView();
}

/**
 * Call handleScrollEvent() of the key pressed is `ArrowDown` or `ArrowUp`. 
 * @param {*} keydownEvent the `keydown` event captured
 */
function checkForArrowKeys(keydownEvent) {
    if(keydownEvent.key === 'ArrowDown' || keydownEvent.key === 'ArrowUp') {
        handleScrollEvent();
    }
}

/**
 * Returns the navigation link anchor element corresponding to the currently viewed section.
 * @param {*} sectionId the section id of the currently viewed section
 * @returns the active anchor element
 */
function getNavLinkOfActiveSection(sectionId) {
    const navigationLinks = document.querySelectorAll('a');
    return (Array.from(navigationLinks)).find(navLink => navLink.getAttribute('href').includes(sectionId));
}

/**
 * Sets the display value for the navigation menu
 * @param {*} display is true when the nav menu needs to appear and false otherwise.
 */
 function displayNavigationMenu(display) {
    const navigationMenu =  document.getElementById('navbar__list');
    navigationMenu.style = display ? 'display:flex': 'display: none;';
}

function hideNavigationMenuIfPossible() {
    const navigationMenu =  document.getElementById('navbar__list');
    if(!scrollEventOccurred && !pageJustLoaded  && window.pageYOffset > navigationMenu.clientHeight) {
        displayNavigationMenu(false);
    }
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

/**
 * Loops through the sectionsList and gets the offset between each section and the top of the viewport 
 * @returns the section near the top of the viewport
 */
 function getSectionNearViewPort() {
    let activeSection;
    const sections = document.querySelectorAll('section'); 
    for (const section of sections) {
        const offsetYFromViewPort = section.getBoundingClientRect().y;
        if ( offsetYFromViewPort > 0 && offsetYFromViewPort < 500 || offsetYFromViewPort < 0 && offsetYFromViewPort > -150) {
            activeSection = section;
            break;
        }
    }
    return activeSection;
}
