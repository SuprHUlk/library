let myLibrary=[];
const main=document.querySelector(".main");
const add=document.querySelector(".add");
const footer=document.querySelector(".footer");
add.addEventListener('click', form);

function Book(title, author, pages, read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

/*Book.prototype.info = function() {
    return this.title+" by "+this.author+", "+this.pages+" pages, "+this.read+" yet";
};*/

addBookToLibrary("ayush", "aayush", 1, "ayush");

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function display() {
    if(document.querySelector(".books")!=null) {
        document.querySelector(".books").remove();
    }
    let c=0, span;
    const books=document.createElement("div");
    books.classList.add("books");
    myLibrary.forEach(myLibrary=> {
        const container=document.createElement("div");
        container.classList.add("container");
        const modify=document.createElement("div");
        modify.classList.add("modify");
        const del=document.createElement("button");
        del.classList.add("delete");
        span=document.createElement("span");
        span.textContent="Delete";
        del.appendChild(span);
        const edit=document.createElement("button");
        span=document.createElement("span");
        edit.classList.add("edit");
        span.textContent="Edit";
        edit.appendChild(span);
        const card=document.createElement("div");
        card.classList.add("card");
        container.setAttribute("data-attribute", c);
        for(let key in myLibrary) {
            const p=document.createElement("p");
            p.textContent=key.charAt(0).toUpperCase()+key.slice(1)+": "+myLibrary[key];
            card.appendChild(p);
        }
        c++;
        const div1=document.createElement("div");
        div1.classList.add("div1");
        div1.appendChild(del);
        const div2=document.createElement("div");
        div2.classList.add("div2");
        div2.appendChild(edit);
        container.appendChild(card);
        container.appendChild(modify);
        modify.appendChild(div1);
        modify.appendChild(div2);
        books.appendChild(container);
    });
    main.appendChild(books);
}

function form() {
    const btn=document.querySelector(".btn");
    btn.remove();
    const form=document.createElement("form");
    form.setAttribute("method","post");
    form.setAttribute("action","#");
    title(form);
    author(form);
    pages(form);
    read(form)
    document.querySelector(".form").appendChild(form);
    const ok=document.createElement("button");
    ok.textContent="Submit";
    ok.addEventListener('click', ()=> {
        let title=document.querySelector("#title").value;
        let author=document.querySelector("#author").value;
        let pages=document.querySelector("#pages").value;
        let read=document.querySelector("#read").value;
        if(title!=""&&author!=""&&pages!=""&&read!="") {
            addBookToLibrary(title, author, pages, read);
            display();
            form.remove();
            ok.remove();
            main.insertBefore(btn, document.querySelector(".books"));
        }
    });
    document.querySelector("form").appendChild(ok);
}

function title(form) {
    const field=document.createElement("div");
    field.classList.add("field");
    label(field, "title");
    input(field, "text", "title", "The Hobbit");
    form.appendChild(field);
}

function author(form) {
    const field=document.createElement("div");
    field.classList.add("field");
    label(field, "author");
    input(field, "text", "author", "J.R.R. Tolkien");
    form.appendChild(field);
}

function pages(form) {
    const field=document.createElement("div");
    field.classList.add("field");
    label(field, "pages");
    input(field, "number", "pages", "");
    form.appendChild(field);
}

function read(form) {
    const field=document.createElement("div");
    field.classList.add("field");
    label(field, "read");
    input(field, "text", "read", "Yes/No");
    form.appendChild(field);
}

function label(field, s) {
    const label=document.createElement("label");
    label.setAttribute("for", s);
    label.textContent=s.charAt(0).toUpperCase()+s.slice(1)+": ";
    field.appendChild(label);
}

function input(field, type, s, placeholder) {
    const input=document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("name", s);
    input.setAttribute("id", s);
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("required", "");
    field.appendChild(input);
}

display();







