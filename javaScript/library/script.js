
const myLibrary = [];

function Book(title, author, pages, read, id) {
  this.title = title
  this.author = author 
  this.pages =pages 
  this.read = read
  this.id = crypto.randomUUID();
  // the constructor...
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Rich Dad Poor Dad", "Robert Kiyosaki", 250, false);
addBookToLibrary("Atomic Habits", "James Clear", 320, true);
addBookToLibrary("Think and Grow Rich", "Napoleon Hill", 370, false);
addBookToLibrary("The Lean Startup", "Eric Ries", 280, true);

// quick check
console.log(myLibrary)
