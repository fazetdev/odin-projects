export function createProject(name) {
  return {
    id: crypto.randomUUID(),
    name,
    todos: []
  };
}
