const myLibrary = [new Book("Confessions of a mask","Yukio Mishima","224",true)];
const booksContainer = document.querySelector(".books-container");




// add-book dialog

const showButton = document.querySelector("#add-book");
const addBookDialog = document.querySelector("#add-book-dialog");
const newBookForm = document.querySelector("#new-book-form");
const confirmBtn = addBookDialog.querySelector("#confirmBtn");
const cancelBtn = addBookDialog.querySelector("#cancelBtn");
const addTitle = addBookDialog.querySelector(".add-title");
const addAuthor = addBookDialog.querySelector(".add-author");
const addPages = addBookDialog.querySelector(".add-pages");
const readStatus = addBookDialog.querySelector(".add-read");

showButton.addEventListener("click", () => {
    addBookDialog.showModal();
});

confirmBtn.addEventListener("click",(e) =>{
    e.preventDefault();
    if(addTitle.value === "" || addAuthor.value === "" || addPages.value === "")
    {
        alert("Error: empty input field!");
    }
    else
    {
        
        myLibrary.push(new Book(addTitle.value,addAuthor.value,addPages.value,readStatus.checked));
        newBookForm.reset();
        displayBooks();
        addBookDialog.close();
    }
    
})

cancelBtn.addEventListener("click", () =>{
    newBookForm.reset();
})


// book constructor
function Book(title, author, pages, read)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    if(read)
    {
        this.read = "✅";
    }
    else
    {
        this.read = "❌";
    }
    
    this.info = function()
    {
        return (title + " by " + author + ", " +pages + "pages, " + read);
    }
}

// reading-status toggle function
Book.prototype.readToggle = function(){
    if(this.read === "✅")
    {
        this.read = "❌";
    }
    else
    {
        this.read = "✅";
    }
}

// book-display function
function displayBooks()
{
    const books = document.querySelectorAll(".book");
    for(let i = 0; i < books.length; i++)
    {
        books[i].remove();
    }
    for(let i = 0; i < myLibrary.length; i++)
    { 
            const newDiv = document.createElement("div");
            newDiv.classList.add("book");
            newDiv.innerHTML = `<div class="book-title">
                                    Title: ${myLibrary[i].title}
                                </div>
                                <div class="book-author">
                                    Author: ${myLibrary[i].author}
                                </div>
                                <div class="book-pages">
                                    Pages: ${myLibrary[i].pages}
                                </div>
                                <div class="book-read">
                                    Read: ${myLibrary[i].read}
                                </div>
                                <div><button data-position="${i}" class="read-change">Read-status</button>
                                <button data-position="${i}" class="book-remove">Remove</button></div>`
                                

            booksContainer.insertBefore(newDiv, showButton);
            
        
    }
            //remove book
            const removeBook = document.querySelectorAll(".book-remove");
            removeBook.forEach((item) => {
                item.addEventListener("click", () =>{
                myLibrary.splice(item.dataset.position,1);
                displayBooks();
            });
            })


            // change read status
            const toggleReadBtn = document.querySelectorAll(".read-change");
            toggleReadBtn.forEach((item) => {
                item.addEventListener("click", () =>{
                    myLibrary[item.dataset.position].readToggle();
                    displayBooks(); 
                })
            })
    
}


displayBooks()



