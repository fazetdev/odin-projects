import createHomePage from './modules/home';
import createMenuPage from './modules/menu';
import createContactPage from './modules/contact';
import './style.css';

// Select the content container
const contentDiv = document.querySelector('#content');

// Function to clear the page before loading a new one
function loadPage(pageFunction) {
  contentDiv.textContent = ''; // Clear old content
  contentDiv.appendChild(pageFunction());
}

// Load home page by default
loadPage(createHomePage);

// Add event listeners to buttons
document.querySelector('#home-btn').addEventListener('click', () => {
  loadPage(createHomePage);
});

document.querySelector('#menu-btn').addEventListener('click', () => {
  loadPage(createMenuPage);
});

document.querySelector('#contact-btn').addEventListener('click', () => {
  loadPage(createContactPage);
});
