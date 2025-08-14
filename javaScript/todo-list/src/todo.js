export function createTodo({ title, description, dueDate, priority, notes = "", checklist = [] }) {
  return {
    id: crypto.randomUUID(),  // unique id
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    completed: false,
    toggleComplete() {
      this.completed = !this.completed;
    },
    toggleChecklistItem(index) {
      this.checklist[index].done = !this.checklist[index].done;
    }
  };
}
