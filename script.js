
class Book {
    constructor(title,author,pages,readStatus)
    {
        this.title = title;
        this.author = author;
        this.pages = pages;
        if(readStatus)
        {
            this.readstatus = "✅"
        }
        else
        {
            this.readstatus = "❌"
        }
    }

    toggleReadStatus()
    {
        if(this.readstatus === "✅")
        {
            this.readstatus = "❌"
        }
        else
        {
            this.readstatus = "✅"
        }
        
    }
}

const library = {

    books: [new Book("Confessions of a mask","Yukio Mishima","224",true)],

    addBook: function(book){
        this.books.push(book);
    }
}



class domHandler {

    constructor()
    {
        this.OnloadEventListeners()
        this.renderBooks()
    }

    booksContainer = document.querySelector(".books-container")
    addBookBtn = document.querySelector("#add-book")
    addBookDialog = document.querySelector("#add-book-dialog")
    bookForm = document.querySelector("#new-book-form")
    confirmBtn = this.addBookDialog.querySelector("#confirmBtn")
    cancelBtn = this.addBookDialog.querySelector("#cancelBtn")
    titleInputField = this.addBookDialog.querySelector(".add-title")
    authorInputField = this.addBookDialog.querySelector(".add-author")
    pagesInputField = this.addBookDialog.querySelector(".add-pages")
    readstatusChkbx = this.addBookDialog.querySelector(".add-read")

    OnloadEventListeners(){
        this.addBookBtn.addEventListener("click",()=>{
            this.addBookDialog.showModal();
        })

        this.confirmBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            if(this.titleInputField.value === "" || this.authorInputField.value === "" || this.pagesInputField === "")
            {
                alert("Error: empty input field!")
            }
            else
            {
                library.addBook(new Book(this.titleInputField.value,this.authorInputField.value,this.pagesInputField.value,this.readstatusChkbx.checked))
                this.bookForm.reset();
                this.renderBooks();
                this.addBookDialog.close();
            }
        })

        this.cancelBtn.addEventListener("click",()=>{
            this.bookForm.reset();
        })
    }

    renderBooks(){
        const books = document.querySelectorAll(".book")
        books.forEach(book => {
            book.remove();
        });

        library.books.forEach((book,index)=> {
            const div = document.createElement("div")
            div.classList.add("book")
            div.innerHTML = `<div class="book-title">
                                Title: ${book.title}
                            </div>
                            <div class="book-author">
                                Author: ${book.author}
                            </div>
                            <div class="book-pages">
                                Pages: ${book.pages}
                            </div>
                            <div class="book-read">
                                Read: ${book.readstatus}
                            </div>
                            <div>
                                <button data-position="${index}"    class="read-change">Read-status</button>
                                <button data-position="${index}" class="book-remove">Remove</button>
                            </div>`;
            this.booksContainer.insertBefore(div,this.addBookBtn)
        });

        this.onRenderEventListeners();
    }

    onRenderEventListeners(){
        const removeBookBtns = document.querySelectorAll(".book-remove")
        const toggleReadBtns = document.querySelectorAll(".read-change")

        removeBookBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                library.books.splice(btn.dataset.position,1)
                this.renderBooks();
            })
        })

        toggleReadBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                library.books[btn.dataset.position].toggleReadStatus();
                this.renderBooks();
            })
        })
    }

}

let Run = new domHandler();

