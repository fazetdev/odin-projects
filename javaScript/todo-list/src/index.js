import './styles.css'; // import CSS
import { createTodo } from './todo.js';
import { createProject } from './project.js';
import { renderProjects } from './dom.js';

// ----------------------
// Projects array
// ----------------------
const projects = [];
const defaultProject = createProject("Default Project");
projects.push(defaultProject);

// Example todo
const todo1 = createTodo({
  title: "Buy groceries",
  description: "Milk, eggs, bread",
  dueDate: "2025-08-20",
  priority: "high"
});
projects[0].todos.push(todo1);

// ----------------------
// DOM elements
// ----------------------
const projectForm = document.querySelector('#project-form');
const projectNameInput = document.querySelector('#project-name');

const todoForm = document.querySelector('#todo-form');
const todoTitle = document.querySelector('#todo-title');
const todoDescription = document.querySelector('#todo-description');
const todoDueDate = document.querySelector('#todo-dueDate');
const todoPriority = document.querySelector('#todo-priority');
const todoProjectSelect = document.querySelector('#todo-project');

const currentProjectName = document.querySelector('#current-project-name');
const projectsContainer = document.querySelector('#projects-container');

// ----------------------
// Functions
// ----------------------
function updateProjectOptions() {
  todoProjectSelect.innerHTML = '';
  projects.forEach((project, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = project.name;
    todoProjectSelect.appendChild(option);
  });
}

function refreshUI() {
  renderProjects(projects);      // render sidebar + todos
  updateProjectOptions();        // update dropdown for new todos
}

// ----------------------
// Initial render
// ----------------------
refreshUI();

// ----------------------
// Handle adding new projects
// ----------------------
projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = projectNameInput.value.trim();
  if (!name) return;

  const newProject = createProject(name);
  projects.push(newProject);

  projectForm.reset();
  refreshUI();
});

// ----------------------
// Handle adding new todos
// ----------------------
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = todoTitle.value.trim();
  const description = todoDescription.value.trim();
  const dueDate = todoDueDate.value;
  const priority = todoPriority.value;
  const projectIndex = parseInt(todoProjectSelect.value);

  if (!title || isNaN(projectIndex)) return;

  const newTodo = createTodo({ title, description, dueDate, priority });
  projects[projectIndex].todos.push(newTodo);

  todoForm.reset();
  refreshUI();
});
