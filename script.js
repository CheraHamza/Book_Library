class Book {
	constructor(title, author, pages, readStatus) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		if (readStatus) {
			this.readstatus = "✅";
		} else {
			this.readstatus = "❌";
		}
	}

	toggleReadStatus() {
		if (this.readstatus === "✅") {
			this.readstatus = "❌";
		} else {
			this.readstatus = "✅";
		}
	}
}

let tempLibrary = retrieveLocalLibrary();

// Dom elements
const booksContainer = document.querySelector(".books-container");
const addBookBtn = document.querySelector("#add-book");
const addBookDialog = document.querySelector("#add-book-dialog");
const bookForm = document.querySelector("#new-book-form");
const confirmBtn = addBookDialog.querySelector("#confirmBtn");
const cancelBtn = addBookDialog.querySelector("#cancelBtn");
const titleInputField = addBookDialog.querySelector(".add-title");
const authorInputField = addBookDialog.querySelector(".add-author");
const pagesInputField = addBookDialog.querySelector(".add-pages");
const readstatusChkbx = addBookDialog.querySelector(".add-read");

function formValidation() {
	if (bookForm.checkValidity()) {
		tempLibrary.push(
			new Book(
				titleInputField.value,
				authorInputField.value,
				pagesInputField.value,
				readstatusChkbx.checked
			)
		);
		addBookDialog.close();
		bookForm.reset();
		renderBooks();
	}
}

function renderBooks() {
	const books = document.querySelectorAll(".book");
	books.forEach((book) => {
		book.remove();
	});

	tempLibrary.forEach((book, index) => {
		const container = document.createElement("div");
		container.classList.add("book");

		const title = document.createElement("div");
		title.textContent = `Title: ${book.title}`;
		title.className = "book-title";

		const author = document.createElement("div");
		author.textContent = `Author: ${book.author}`;
		author.className = "book-author";

		const page_count = document.createElement("div");
		page_count.textContent = `Pages: ${book.pages}`;
		page_count.className = "book-pages";

		const read_status = document.createElement("div");
		read_status.textContent = `Read: ${book.readstatus}`;
		read_status.className = "book-read";

		const btnsContainer = document.createElement("div");

		const toggleStatus = document.createElement("button");
		toggleStatus.textContent = "Read-status";
		toggleStatus.className = "read-change";

		toggleStatus.addEventListener("click", () => {
			tempLibrary[index].toggleReadStatus();
			renderBooks();
		});

		const removeBook = document.createElement("button");
		removeBook.textContent = "Remove";
		removeBook.className = "book-remove";

		removeBook.addEventListener("click", () => {
			tempLibrary.splice(index, 1);
			renderBooks();
		});

		btnsContainer.appendChild(toggleStatus);
		btnsContainer.appendChild(removeBook);

		container.appendChild(title);
		container.appendChild(author);
		container.appendChild(page_count);
		container.appendChild(read_status);
		container.appendChild(btnsContainer);

		booksContainer.insertBefore(container, addBookBtn);
	});
}

function saveLocalLibrary() {
	let serializedLibrary = [];
	tempLibrary.forEach((book) => {
		serializedLibrary.push(
			JSON.stringify({
				__type__: "Book",
				data: {
					title: book.title,
					author: book.author,
					pages: book.pages,
					readstatus: book.readstatus,
				},
			})
		);
	});

	localStorage.setItem("library", JSON.stringify(serializedLibrary));
}

function retrieveLocalLibrary() {
	let library = JSON.parse(localStorage.getItem("library"));
	if (library) {
		library = library.map((book) => {
			let bookObj = JSON.parse(book);
			let newBook = new Book(
				bookObj.data.title,
				bookObj.data.author,
				bookObj.data.pages,
				bookObj.data.readStatus
			);
			return newBook;
		});
	} else {
		library = [];
	}

	return library;
}

// Event listeners

window.addEventListener("beforeunload", () => {
	saveLocalLibrary();
});

addBookBtn.addEventListener("click", () => {
	addBookDialog.showModal();
});

confirmBtn.addEventListener("click", () => {
	formValidation();
});

cancelBtn.addEventListener("click", () => {
	bookForm.reset();
	addBookDialog.close();
});

renderBooks();
