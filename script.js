const books = document.querySelector(".books");
const inTitle = document.getElementById("title");
const inAuthor = document.getElementById("author");
const inPages = document.getElementById("pages");
const inFinished = document.getElementById("finished");
const submitButton = document.getElementById("submit");
const template = document.getElementById("card-template");


const library = [];
let dataId = 0;

function book(title, author, pages, finished, id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.finished = finished;
    this.dataId = id
}


function addBookToLibrary(){
    const clone = template.content.cloneNode(true);

    const card = clone.querySelector(".card");
    const title = clone.querySelector(".title");
    const author = clone.querySelector(".author");
    const pages = clone.querySelector(".pages");
    const finished = clone.querySelector(".finished");
    const buttons = clone.querySelector(".buttons");
    const status = clone.querySelector(".status");

    const userInput = [inTitle.value, inAuthor.value, inPages.value, inFinished.checked]
    resetInput()

    card.dataset.dataId = dataId;
    title.textContent = userInput[0];
    author.textContent = userInput[1];
    pages.textContent = userInput[2];
    if(userInput[3] === true){
        toggleRead(finished, status);
    };

    library.push(new book(userInput[0], userInput[1], userInput[2], userInput[3], dataId))

    buttons.addEventListener("click", (e) => {
        if(e.target.className === "delete") {
            deleteBook(card);
        }
        else if (e.target.className === "toggle-read") {
            toggleRead(finished, status, parseInt(card.dataset.dataId));
        }
    });
    books.appendChild(clone);
};         

function deleteBook(card) {
    for(let i=0; i<library.length; i++){
        if(library[i].dataId === parseInt(card.dataset.dataId)){
            library.splice(i, 1);
        };
    };
    books.removeChild(card);
};

function toggleRead(finished, status, cardId){
    finished.textContent = finished.textContent === "true" ? false : true;
    status.classList.toggle("true", finished.textContent === "true");
    for(let i=0; i<library.length; i++){
        if(library[i].dataId === cardId){
            library[i].finished = finished.textContent;
        };
    };
};

function resetInput() {
    inTitle.value = "";
    inAuthor.value = "";
    inPages.value = "";
    inFinished.checked = false;
}

submitButton.addEventListener("click", (e)=> {
    e.preventDefault();
    if (inTitle.value.length > 0 && inAuthor.value.length > 0 && inPages.value.length > 0){
        addBookToLibrary();
        dataId++;
    };
});

