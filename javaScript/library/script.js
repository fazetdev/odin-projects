// === Book Array ===
let myLibrary = [];

// === Book Constructor ===
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// === Add Book to Library Function ===
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// === Display Books Function ===
function displayBooks() {
  const libraryContainer = document.querySelector('.library');
  libraryContainer.innerHTML = ''; // Clear previous entries

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
    `;

    // Toggle Read Button
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = "Toggle Read";
    toggleBtn.addEventListener('click', () => {
      book.read = !book.read;
      displayBooks();
    });

    // Remove Book Button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove Book";
    removeBtn.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      displayBooks();
    });

    bookCard.appendChild(toggleBtn);
    bookCard.appendChild(removeBtn);
    libraryContainer.appendChild(bookCard);
  });
}

// === Form Submission Handling ===
const form = document.getElementById('book-form');
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page reload

  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const pages = parseInt(document.getElementById('pages').value);
  const read = document.getElementById('read').checked;

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  displayBooks(); // Refresh library view

  form.reset(); // Clear form
});

// === Add Starter Book ===
const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary(book1);
displayBooks();
