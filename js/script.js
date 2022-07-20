const addButton = document.querySelector("main button.add");
const bookContainer = document.querySelector(".book-list");
const form = document.querySelector("form");
const formAddButton = form.querySelector("button.add");
const formCancelButton = form.querySelector("button.cancel");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const inputStatus = document.getElementById("status");
const inputTitle = document.getElementById("title");
const modal = document.querySelector(".modal");

let bookList = [];

//
// Event Listeners
//
addButton.addEventListener("click", toggleModal);
form.addEventListener("submit", (e) => submitForm(e));
formCancelButton.addEventListener("click", toggleModal);

function toggleModal() {
  if (modal.classList.contains("active")) {
    modal.classList.remove("active");
    modal.style.display = "none";
  } else {
    modal.classList.add("active");
    modal.style.display = "block";
  }
}

function submitForm(e) {
  e.preventDefault();

  addBookToLibrary(
    inputTitle.value,
    inputAuthor.value,
    inputPages.value,
    inputStatus.value === "read"
  );
  displayBooks();

  form.reset();
  toggleModal();
}

//
// Book Objects
//
function Book(title, author, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, numPages, isRead) {
  const newBook = new Book(title, author, numPages, isRead);
  bookList.push(newBook);
}

//
// DOM Manipulation
//
function displayBooks() {
  bookContainer.innerHTML = "";
  for (let i = 0; i < bookList.length; i++) {
    generateBook(bookList[i], i);
  }
}

function generateBook(book, index) {
  const node = document.createElement("div");

  node.className = "book";
  node.setAttribute("data-index", index);
  generateText(book, node);
  generateButtons(node);
  bookContainer.appendChild(node);
}

function generateText(book, node) {
  for (const property in book) {
    if (!book.hasOwnProperty(property)) {
      continue;
    }

    let value = book[property];
    if (property === "isRead") {
      value = value ? "Read" : "Unread";
    }

    const paragraph = document.createElement("p");
    paragraph.className = property;
    paragraph.textContent = value;
    node.appendChild(paragraph);
  }
}

function generateButtons(node) {
  const readSpan = document.createElement("span");
  readSpan.className = "iconify";
  readSpan.setAttribute("data-icon", "mdi:check-bold");

  const readButton = document.createElement("button");
  readButton.className = "read";
  readButton.appendChild(readSpan);
  readButton.addEventListener("click", (e) => toggleStatus(e));

  const deleteSpan = document.createElement("span");
  deleteSpan.className = "iconify";
  deleteSpan.setAttribute("data-icon", "mdi:delete");

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.appendChild(deleteSpan);
  deleteButton.addEventListener("click", (e) => deleteBook(e));

  const container = document.createElement("div");
  container.className = "buttons-container";
  container.appendChild(readButton);
  container.appendChild(deleteButton);
  node.appendChild(container);
}

function deleteBook(e) {
  const index = getBookIndex(e);
  bookList.splice(index, 1);
  displayBooks();
}

function toggleStatus(e) {
  const index = getBookIndex(e);
  bookList[index].toggleRead();
  displayBooks();
}

function getBookIndex(e) {
  const bookElement = e.target.parentNode.parentNode;
  return bookElement.getAttribute("data-index");
}

// Example entries
addBookToLibrary("Harry Potter", "J.K. Rowling", 999, false);
addBookToLibrary("Game of Thrones", "G.R.R. Martin", 999, false);
displayBooks();
