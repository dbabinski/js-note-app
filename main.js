const addBtn = document.querySelector(".add");

const notes = JSON.parse(localStorage.getItem("notes"));


if (notes) {
    notes.forEach((note)=>{
        addNewNote(note);
    });
}

addBtn.addEventListener('click', ()=>{
    addNewNote();
    console.log("test");
    
});



function addNewNote(text = "") {
    const note = document.createElement('div');
    
    note.innerHTML = `
        <div class="note">
            <div class="toolbar">
                    <button class="edit"><i class="fas fa-edit"></i></button>
                    <button class="del"><i class="fas fa-times"></i></button>
            </div>
            <div class="main hidden"></div>
            <textarea></textarea>
        </div>
        `;

        const editBtn = note.querySelector(".edit");
        const delBtn = note.querySelector(".del");
        
        const main = note.querySelector(".main");
        const textArea = note.querySelector("textarea");

        textArea.value = text;
        main.innerHTML = marked(text);

        editBtn.addEventListener("click", ()=> {
            main.classList.toggle("hidden");
            textArea.classList.toggle("hidden");
            updateLS();
            howManyItems();
        });

        delBtn.addEventListener("click", () => {
            note.remove();

            updateLS();
            howManyItems();
        
        });

        

        textArea.addEventListener("input", (e) => {
            const { value } = e.target;
    
            main.innerHTML = marked(value);
            howManyItems();
            updateLS();
        });

    
    document.body.appendChild(note);
}

function updateLS() {
    const notesTxt = document.querySelectorAll("textarea");

    const notes = [];

    notesTxt.forEach((note) => {
        notes.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}

function howManyItems(){
    var itemNumb = JSON.parse(localStorage.notes).length;
    var numbOfItem = document.getElementById("itemsOfStorage");

    numbOfItem.innerHTML = "Number of Notes " + itemNumb;
}