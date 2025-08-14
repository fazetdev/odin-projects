// dom.js

// Renders the sidebar list of projects
export function renderProjects(projects) {
  const projectList = document.getElementById('project-list');
  projectList.innerHTML = '';

  projects.forEach((project) => {
    const li = document.createElement('li');
    li.textContent = project.name;
    li.addEventListener('click', () => {
      document.querySelectorAll('#project-list li').forEach(li => li.classList.remove('active'));
      li.classList.add('active');
      renderTodos(project.todos);
      updateLatestTodo(project.todos);
    });
    projectList.appendChild(li);
  });
}

// Updates the <select> dropdown for choosing a project in the todo form
export function updateProjectOptions(projects) {
  const projectSelect = document.getElementById('todo-project');
  projectSelect.innerHTML = '';

  projects.forEach((project) => {
    const option = document.createElement('option');
    option.value = project.name;
    option.textContent = project.name;
    projectSelect.appendChild(option);
  });
}

// Shows the latest todo in the "Latest Todo" panel
export function updateLatestTodo(todos) {
  const latestTodoContainer = document.getElementById('latest-todo');
  latestTodoContainer.innerHTML = '';

  if (todos.length === 0) {
    latestTodoContainer.textContent = 'No todos yet';
    return;
  }

  const latestTodo = todos[todos.length - 1];
  latestTodoContainer.innerHTML = `
    <h3>${latestTodo.title}</h3>
    <p>${latestTodo.description}</p>
    <p><strong>Due:</strong> ${latestTodo.dueDate}</p>
    <p><strong>Priority:</strong> ${latestTodo.priority}</p>
  `;
}

// Renders all todos for the selected project
export function renderTodos(todos) {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  if (todos.length === 0) {
    todoList.textContent = 'No todos yet';
    return;
  }

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${todo.title}</strong> - ${todo.description}
      <br><small>Due: ${todo.dueDate} | Priority: ${todo.priority}</small>
    `;
    todoList.appendChild(li);
  });
}
