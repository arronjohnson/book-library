//
// Objects
//
class Library {
  constructor() {
    this.bookList = [];
  }

  addBook(title, author, numPages, isRead) {
    this.bookList.push(new Book(title, author, numPages, isRead));
  }

  deleteBook(index) {
    this.bookList.splice(index, 1);
  }
}

class Book {
  constructor(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
  }

  toggleRead() {
    this.isRead = !this.isRead;
  }
}

const library = new Library();

//
// Event Listeners
//
(function () {
  const addButton = document.querySelector('main button.add');
  const form = document.querySelector('form');
  const formCancelButton = form.querySelector('button.cancel');
  const inputAuthor = document.getElementById('author');
  const inputPages = document.getElementById('pages');
  const inputStatus = document.getElementById('status');
  const inputTitle = document.getElementById('title');
  const modal = document.querySelector('.modal');

  const toggleModal = () => {
    if (modal.classList.contains('active')) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    } else {
      modal.classList.add('active');
      modal.style.display = 'block';
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      const firstInvalid = document.querySelector('input:invalid');
      firstInvalid.focus();
      return;
    }

    library.addBook(
      inputTitle.value,
      inputAuthor.value,
      inputPages.value,
      inputStatus.value === 'read'
    );

    display.drawBooks();
    form.reset();
    toggleModal();
  };

  addButton.addEventListener('click', toggleModal);
  form.addEventListener('submit', (e) => submitForm(e));
  formCancelButton.addEventListener('click', toggleModal);
})();

//
// Form Validation
//
const validation = (() => {
  const form = document.querySelector('.modal-content');
  const inputs = document.querySelectorAll('.modal__input');

  let inputTimer;

  form.addEventListener('submit', () => inputs.forEach((el) => validateInput(el)));
  inputs.forEach((el) => el.addEventListener('blur', (e) => validateInput(e.target), true));
  inputs.forEach((el) => el.addEventListener('input', (e) => setValidationTimer(e.target)));

  function setValidationTimer(el) {
    clearTimeout(inputTimer);
    inputTimer = setTimeout(() => validateInput(el), 1000);
  }

  function toggleValidityClass(el) {
    if (el.validity.valid) {
      el.classList.remove('modal__input--invalid');
    } else {
      el.classList.add('modal__input--invalid');
    }
  }

  function validateInput(el) {
    console.log('validating');
    const message = el.parentNode.querySelector('.modal__validation');

    if (!message) return;

    if (el.validity.valueMissing) {
      message.textContent = 'You must enter a value.';
    } else if (el.validity.rangeUnderflow) {
      message.textContent = 'Value must be greater than 0.';
    } else {
      message.textContent = '';
    }
    toggleValidityClass(el);
  }
})();

//
// DOM Manipulation
//
const display = (() => {
  const bookContainer = document.querySelector('.book-list');

  const drawBooks = () => {
    bookContainer.innerHTML = '';
    for (let i = 0; i < library.bookList.length; i++) {
      generateBook(library.bookList[i], i);
    }
  };

  const generateBook = (book, index) => {
    const node = document.createElement('div');

    node.className = 'book';
    node.setAttribute('data-index', index);
    generateText(book, node);
    generateButtons(node);
    bookContainer.appendChild(node);
  };

  const generateText = (book, node) => {
    for (const property in book) {
      if (!book.hasOwnProperty(property)) {
        continue;
      }

      let value = book[property];
      if (property === 'isRead') {
        value = value ? 'Read' : 'Unread';
      }

      const paragraph = document.createElement('p');
      paragraph.className = property;
      paragraph.textContent = value;
      node.appendChild(paragraph);
    }
  };

  const generateButtons = (node) => {
    const readSpan = document.createElement('span');
    readSpan.className = 'iconify';
    readSpan.setAttribute('data-icon', 'mdi:check-bold');

    const readButton = document.createElement('button');
    readButton.className = 'read';
    readButton.appendChild(readSpan);
    readButton.addEventListener('click', (e) => toggleStatus(e));

    const deleteSpan = document.createElement('span');
    deleteSpan.className = 'iconify';
    deleteSpan.setAttribute('data-icon', 'mdi:delete');

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.appendChild(deleteSpan);
    deleteButton.addEventListener('click', (e) => deleteBook(e));

    const container = document.createElement('div');
    container.className = 'buttons-container';
    container.appendChild(readButton);
    container.appendChild(deleteButton);
    node.appendChild(container);
  };

  const deleteBook = (e) => {
    const index = getBookIndex(e);
    library.deleteBook(index);
    drawBooks();
  };

  const toggleStatus = (e) => {
    const index = getBookIndex(e);
    library.bookList[index].toggleRead();
    drawBooks();
  };

  const getBookIndex = (e) => {
    const bookElement = e.target.parentNode.parentNode;
    return bookElement.getAttribute('data-index');
  };

  return { drawBooks };
})();

// Example entries
library.addBook('Harry Potter', 'J.K. Rowling', 999, false);
library.addBook('Game of Thrones', 'G.R.R. Martin', 999, false);
display.drawBooks();
