const container = document.querySelector(".book-list");

let bookList = [];

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

function displayBooks() {
  for (const book of bookList) {
    const node = document.createElement("div");

    node.className = "book";
    generateText(book, node);
    container.appendChild(node);
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
