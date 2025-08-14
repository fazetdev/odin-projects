// project.js
// Responsible for creating projects and todos

export function createProject(name) {
  return {
    name,
    todos: []
  };
}



// In project.js
export function createTodo(title, description, dueDate, priority, project) {
  return {
    title,
    description,
    dueDate,
    priority,
    project,
    completed: false,
    id: Date.now().toString()
  };
}