// index.js
import './styles.css';
import { createProject, createTodo } from './modules/project.js';
import { renderProjects, renderTodos, updateProjectOptions, updateLatestTodo } from './modules/dom.js';
import { loadData, saveData } from './modules/storage.js';

// Initialize application state
let projects = loadData();
let currentProjectName = projects.length > 0 ? projects[0].name : null;

// Create default project if none exists
if (projects.length === 0) {
  const defaultProject = createProject('Default Project');
  const sampleTodo = createTodo(
    'Example Todo',
    'This is a sample todo item',
    '2025-08-20',
    'medium',
    'Default Project'
  );
  defaultProject.todos.push(sampleTodo);
  projects.push(defaultProject);
  saveData(projects);
  currentProjectName = 'Default Project';
}

// Get current project
function getCurrentProject() {
  return projects.find(project => project.name === currentProjectName);
}

// Initial render
function initializeUI() {
  renderProjects(projects);
  updateProjectOptions(projects);
  
  const currentProject = getCurrentProject();
  if (currentProject) {
    renderTodos(currentProject.todos, currentProject.name);
    updateLatestTodo(currentProject.todos);
  }
}

initializeUI();

// Handle todo form submission
document.getElementById('todo-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const titleInput = document.getElementById('todo-title');
  const descriptionInput = document.getElementById('todo-description');
  const dueDateInput = document.getElementById('todo-dueDate');
  const prioritySelect = document.getElementById('todo-priority');
  const projectSelect = document.getElementById('todo-project');

  if (!titleInput.value.trim()) {
    alert('Todo title is required!');
    return;
  }

  const selectedProjectName = projectSelect.value || 'Default Project';
  const selectedProject = projects.find(p => p.name === selectedProjectName);
  
  if (!selectedProject) {
    console.error('Project not found');
    return;
  }

  const newTodo = createTodo(
    titleInput.value.trim(),
    descriptionInput.value.trim(),
    dueDateInput.value,
    prioritySelect.value,
    selectedProjectName
  );

  selectedProject.todos.push(newTodo);
  saveData(projects);

  // Update UI
  if (selectedProjectName === currentProjectName) {
    renderTodos(selectedProject.todos, selectedProjectName);
    updateLatestTodo(selectedProject.todos);
  }

  // Reset form
  e.target.reset();
});

// Handle project form submission
document.getElementById('project-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const projectNameInput = document.getElementById('project-name');
  const projectName = projectNameInput.value.trim();
  
  if (!projectName) {
    alert('Project name is required!');
    return;
  }

  if (projects.some(p => p.name === projectName)) {
    alert('Project already exists!');
    return;
  }

  const newProject = createProject(projectName);
  projects.push(newProject);
  saveData(projects);

  // Update UI
  renderProjects(projects);
  updateProjectOptions(projects);
  projectNameInput.value = '';
});