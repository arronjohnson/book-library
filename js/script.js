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
  const container = document.createElement("div");

  const deleteButton = document.createElement("button");
  const deleteSpan = document.createElement("span");
  deleteSpan.className = "iconify";
  deleteSpan.setAttribute("data-icon", "mdi:delete");
  deleteButton.className = "delete";
  deleteButton.appendChild(deleteSpan);
  deleteButton.addEventListener("click", (e) => deleteBook(e));

  container.className = "buttons-container";
  container.appendChild(deleteButton);
  node.appendChild(container);
}

function deleteBook(e) {
  const bookElement = e.target.parentNode.parentNode;
  const bookIdx = bookElement.getAttribute("data-index");
  bookList.splice(bookIdx, 1);
  displayBooks();
}

// testing purposes
addBookToLibrary("Harry Potter", "J.K. Rowling", 999, false);
addBookToLibrary("Game of Thrones", "G.R.R. Martin", 999, false);
displayBooks();
