// storage.js
// Handles saving and loading from localStorage

export function loadData() {
    const data = localStorage.getItem('projects');
    return data ? JSON.parse(data) : [];
  }
  
  export function saveData(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
  }
  
  // Compatibility alias for old imports
  export const saveProjects = saveData;
  