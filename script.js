let myLibrary=[], delBtn, editBtn;
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
    myLibrary.forEach((myLibrary)=> {
        const container=document.createElement("div");
        container.classList.add("container");
        const modify=document.createElement("div");
        modify.classList.add("modify");
        const del=document.createElement("button");
        del.classList.add("delete");
        span=document.createElement("span");
        span.textContent="Delete";
        del.setAttribute("data-attribute", c);
        del.appendChild(span);
        const edit=document.createElement("button");
        span=document.createElement("span");
        edit.classList.add("edit");
        edit.setAttribute("data-attribute", c);
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
    delBtn=document.querySelectorAll(".delete");
    delBtn.forEach((button)=>{
        button.addEventListener('click', delCard);
    });
    editBtn=document.querySelectorAll(".edit");
    editBtn.forEach((button)=>{
        button.addEventListener('click', editCard);
    });
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
    read(form);
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

function title(form, flag) {
    const field=document.createElement("div");
    field.classList.add("field");
    if(flag==undefined) {
        label(field, "title");
        input(field, "text", "title", "The Hobbit");
    }
    else {
        label(field, "title");
        input(field, "text", "title", "The Hobbit", flag);
    }
    form.appendChild(field);
}

function author(form, flag) {
    const field=document.createElement("div");
    field.classList.add("field");
    if(flag==undefined) {
        label(field, "author");
        input(field, "text", "author", "J.R.R. Tolkien");
    }
    else {
        label(field, "author");
        input(field, "text", "author", "J.R.R. Tolkien", flag);
    }
    form.appendChild(field);
}

function pages(form, flag) {
    const field=document.createElement("div");
    field.classList.add("field");
    if(flag==undefined) {
        label(field, "pages");
        input(field, "number", "pages", "");
    }
    else {
        label(field, "pages");
        input(field, "number", "pages", "", flag);
    }
    form.appendChild(field);
}

function read(form, flag) {
    const field=document.createElement("div");
    field.classList.add("field");
    if(flag==undefined) {
        label(field, "read");
        input(field, "text", "read", "Yes/No");
    }
    else {
        label(field, "read");
        input(field, "text", "read", "Yes/No", flag);
    }
    form.appendChild(field);
}

function label(field, s) {
    const label=document.createElement("label");
    label.setAttribute("for", s);
    label.textContent=s.charAt(0).toUpperCase()+s.slice(1)+": ";
    field.appendChild(label);
}

function input(field, type, s, placeholder, flag) {
    const input=document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("name", s);
    input.setAttribute("id", s);
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("required", "");
    if(flag!=undefined) {
        input.setAttribute("value", flag);
    }
    field.appendChild(input);
}

function delCard() {
    myLibrary.splice(this.getAttribute("data-attribute"), 1);
    display();
}

function editCard() {
    let c=document.querySelector(".container[data-attribute='"+this.getAttribute('data-attribute')+"'] .card").children;
    let f=document.querySelector(".container[data-attribute='"+this.getAttribute('data-attribute')+"']");
    const index=this.getAttribute('data-attribute');
    let a=[];
    for (let i = 0; i < c.length; i++) {
        let cc = c[i].textContent;
        a.push(cc.substring(cc.indexOf(" ")+1, cc.length+1));
    }
    while(f.firstChild) {
        f.removeChild(f.lastChild);
    }
    editForm(f, a, index); 
}

function editForm(f, a, index) {
    const form=document.createElement("form");
    form.setAttribute("method","post");
    form.setAttribute("action","#");
    title(form, a[0]);
    author(form, a[1]);
    pages(form, a[2]);
    read(form, a[3]);
    f.appendChild(form);
    const ok=document.createElement("button");
    ok.textContent="Submit";
    ok.addEventListener('click', ()=> {
        myLibrary[index].title=document.querySelector("#title").value;
        myLibrary[index].author=document.querySelector("#author").value;
        myLibrary[index].pages=Number(document.querySelector("#pages").value);
        myLibrary[index].read=document.querySelector("#read").value;
        if(title!=""&&author!=""&&pages!=""&&read!="") {
            form.remove();
            ok.remove();
            display();
        }
    });
    document.querySelector("form").appendChild(ok);
}

display();