// Book constructor function:

const Book = function(title, author, year, read, bookId) {

	this.title = title;
	this.author = author;
	this.year = year;
	this.read = read;
	this.bookId = bookId;
}

let library = [];
const libraryDiv = document.getElementById("library");




// Add books:

function addBook() {

	let title = document.getElementById('title-input').value;
	let author = document.getElementById('author-input').value;
	let year = document.getElementById('year-input').value;

	let newBook = new Book(title, author, year, false, library.length+1);
	library.push(newBook);

	makeBookDiv(newBook);

	refreshScreen();

}


// User interface / display:


function makeBookDiv(book) {

	let bookDiv = document.createElement('div');
	bookDiv.className = 'book-div';
	bookDiv.setAttribute('data-bookId', book.bookId); // this will be index of book in library array
	bookDiv.innerHTML += "<p>Title: " + book.title + "</p>";
	bookDiv.innerHTML += "<p>Author: " + book.author + "</p>";
	bookDiv.innerHTML += "<p>Year: " + book.year + "</p>";

	let readButton = document.createElement('div');
	readButton.addEventListener('click', readBook);

	if (!book.read) {
		readButton.innerHTML = "Not read";
		readButton.className = "read-button unread";
	}
	else {
		readButton.innerHTML = "Read &#10004;";
		readButton.className = "read-button read";
	};
	
	bookDiv.appendChild(readButton);

	let deleteButton = document.createElement('div');
	deleteButton.addEventListener('click', deleteBook);
	deleteButton.innerHTML = "x"
	deleteButton.className = 'delete-button';
	bookDiv.appendChild(deleteButton);

	libraryDiv.appendChild(bookDiv);

}

function refreshScreen() {

	libraryDiv.innerHTML = '';

	for (i=0; i<library.length; i++) {
		makeBookDiv(library[i])
	}
}

function deleteBook() {

	let bookToDelete = this.parentElement;

//remove from library array
	library = library.filter( function(book) {
		return book.bookId != bookToDelete.getAttribute('data-bookId');
	})

//remove div from DOM
//	libraryDiv.removeChild(this.parentElement);

	refreshScreen();

}


function readBook() {

	let thisBook = this.parentElement;

//FIND the book object in library array
	let targetBook = library.find( function(book) {
		return book.bookId == thisBook.getAttribute('data-bookId')
	})  

//change read status
	if (!targetBook.read) {
		library[library.indexOf(targetBook)].read = true;
	//	this.style.backgroundColor = "lightgreen";
	//	this.innerHTML = "Read &#10004;";
	}
	else {
		library[library.indexOf(targetBook)].read = false;
	//	this.style.backgroundColor = "honeydew";
	//	this.innerHTML = "Not read";
	}

	refreshScreen();

}


//submit books with Enter key
document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) { addBook() }
});