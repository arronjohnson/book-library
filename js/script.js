const addButton = document.querySelector("main button.add");
const bookContainer = document.querySelector(".book-list");
const formAddButton = document.querySelector("form button.add");
const formCancelButton = document.querySelector("form button.cancel");
const modal = document.querySelector(".modal");

let bookList = [];

//
// Event Listeners
//
addButton.addEventListener("click", toggleModal);
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
  for (const book of bookList) {
    const node = document.createElement("div");

    node.className = "book";
    generateText(book, node);
    bookContainer.appendChild(node);
  }
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

// testing purposes
addBookToLibrary("Harry Potter", "J.K. Rowling", 999, false);
addBookToLibrary("Game of Thrones", "G.R.R. Martin", 999, false);
displayBooks();
