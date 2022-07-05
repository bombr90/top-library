// Global Variables
let indexNum = 0;

// Book Constructor
function Book(title, author, pages, read)  {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = indexNum++;
};

let myLibrary = [
    new Book('The Hobbit', 'J.R.R Tolkien', 310, false),
    new Book('LOTR: The Fellowship of the Ring', 'J.R.R Tolkien', 423, false),
    new Book('LOTR: The Two Towers', 'J.R.R Tolkien', 352, true),
    new Book('LOTR: Return of the King', 'J.R.R Tolkien', 416, true),
    new Book("Harry Potter and the Philosopher's Stone", 'J.K Rowling', 223, true),
];

Book.prototype.info = function()    {
    let string = `${this.title} by ${this.author}. ${this.pages} pages. `;
        return (string += (this.read===true) ? "has read" : "not read yet");
};

Book.prototype.toggleRead = function()  {
    this.read = !this.read;
    return (this.read) ? 'Read Status: Has Been Read' : 'Read Status: Has Not Been Read';
}

// Prepopulate library card display with dummy cards
displayLibrary();

// Functions
function addBookToLibrary() {
    console.log("addBookToLibrary()");
    const popupForm = document.getElementById('popupForm');
    const tmp = new Book(
        popupForm.bookTitle.value,
        popupForm.bookAuthor.value,
        +popupForm.bookPages.value,
        popupForm.bookRead.value==='true',
        );
    let len = myLibrary.push(tmp);
    popupForm.reset();
    newCard(myLibrary[len-1]);
    return false;
};

function displayLibrary()   {
    console.log('displayLibrary');
    console.log(myLibrary);
    for(let el of myLibrary)    {
        newCard(myLibrary[el.index]);
    }
};

function popupForm()    {
    const popupForm = document.getElementById('popupForm');
    popupForm.classList.add('show');
    const logoDiv = document.getElementById('logoDiv');
    logoDiv.classList.add('hide');
};

function closeForm()    {
    const popupForm = document.getElementById('popupForm');
    popupForm.classList.remove('show');
    const logoDiv = document.getElementById('logoDiv');
    logoDiv.classList.remove('hide');
};

function newCard(book)  {
    const cards = document.getElementById('cards');
    const card = document.createElement('div');
    let readStatus = (book.read) ? 'Has Been Read' : 'Has Not Been Read';
    card.classList = 'card';
    card.setAttribute('data-indexnumber', book.index);
    const content =
    `   <h3>${book.title}</h3>
        <p>
            Author: ${book.author}<br>
            Pages: ${book.pages}<br>
            <span>Read Status: ${readStatus}</span>
        </p>
        <div>
            <button class="readBtn" data-indexnumber='${book.index}'>Read</button>
            <button class="editBtn" data-indexnumber='${book.index}' disabled>Edit</button>
            <button class="deleteBtn" data-indexnumber='${book.index}'>Delete</button>
        </div>
    </div>`
    card.innerHTML+=content;
    cards.appendChild(card);
    addEvents(book.index);
};

function deleteCard(index)  {
    const card = document.querySelector(`.card[data-indexnumber='${index}']`);
    card.remove();
    let libIndex = myLibrary.findIndex(el => el.index==index);
    myLibrary.splice(libIndex, 1);
}

function toggleCardRead(index)  {
    const oldSpan = document.querySelector(`.card[data-indexnumber='${index}'] span`);
    const newSpan = document.createElement('span');
    const p = document.querySelector(`.card[data-indexnumber='${index}'] p`);
    oldSpan.remove();
    let libIndex = myLibrary.findIndex(el => el.index==index);
    newSpan.append(myLibrary[libIndex].toggleRead());
    p.append(newSpan);
}

function editCard(index)    {
    console.log(editcard);
}

function addEvents(index)    {
    const deleteBtn = document.querySelector(`.deleteBtn[data-indexnumber='${index}']`);
    deleteBtn.addEventListener('click', function()    {
        deleteCard(this.dataset.indexnumber);
    });

    const readBtn = document.querySelector(`.readBtn[data-indexnumber='${index}']`);
    readBtn.addEventListener('click', function()    {
        toggleCardRead(this.dataset.indexnumber);
    });
}