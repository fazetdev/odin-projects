// dom.js
export function renderProjects(projects) {
  const projectList = document.querySelector('#project-list');
  const projectsContainer = document.querySelector('#projects-container');
  const currentProjectName = document.querySelector('#current-project-name');

  // Clear previous content
  projectList.innerHTML = '';
  projectsContainer.innerHTML = '';

  // Track currently selected project
  let activeProjectIndex = 0;

  // --- Render sidebar projects ---
  projects.forEach((project, index) => {
    const projectItem = document.createElement('div');
    projectItem.classList.add('project-item');
    if (index === activeProjectIndex) projectItem.classList.add('active');

    const title = document.createElement('h3');
    title.textContent = project.name;

    projectItem.appendChild(title);
    projectList.appendChild(projectItem);

    // Clicking a project sets it as active
    projectItem.addEventListener('click', () => {
      activeProjectIndex = index;
      renderProjects(projects); // re-render to update active state
    });
  });

  // --- Render todos of active project ---
  const activeProject = projects[activeProjectIndex];
  currentProjectName.textContent = activeProject.name;

  activeProject.todos.forEach((todo, todoIndex) => {
    const card = document.createElement('div');
    card.classList.add('card');

    // Title + due date
    const meta = document.createElement('div');
    meta.classList.add('meta');

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = todo.title;

    const dueDate = document.createElement('div');
    dueDate.classList.add('date');
    dueDate.textContent = todo.dueDate;

    meta.appendChild(title);
    meta.appendChild(dueDate);

    // Description
    const desc = document.createElement('div');
    desc.classList.add('desc');
    desc.textContent = todo.description;

    // Priority badge
    const priority = document.createElement('div');
    priority.classList.add('priority', todo.priority);
    priority.textContent = todo.priority;

    // Actions
    const actions = document.createElement('div');
    actions.classList.add('actions');

    const editBtn = document.createElement('button');
    editBtn.classList.add('action-btn');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      const newTitle = prompt('Edit title:', todo.title);
      const newDesc = prompt('Edit description:', todo.description);
      const newDue = prompt('Edit due date:', todo.dueDate);
      const newPriority = prompt('Edit priority (low, medium, high):', todo.priority);

      if (newTitle) todo.title = newTitle;
      if (newDesc) todo.description = newDesc;
      if (newDue) todo.dueDate = newDue;
      if (['low','medium','high'].includes(newPriority)) todo.priority = newPriority;

      renderProjects(projects); // re-render after editing
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('action-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      activeProject.todos.splice(todoIndex, 1);
      renderProjects(projects); // re-render after deletion
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    // Assemble card
    card.appendChild(meta);
    card.appendChild(desc);
    card.appendChild(priority);
    card.appendChild(actions);

    projectsContainer.appendChild(card);
  });
}
