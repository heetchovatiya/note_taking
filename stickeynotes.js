
// on click of add button we are storing data in local storage and if already present then we are retriving data from local storage.

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesarr = [];
    } else {
        notesarr = JSON.parse(notes);
    };
    tltVal = addTitle.value.toUpperCase();
    txtVal = addTxt.value
    const Obj = {
        title: tltVal,
        note: txtVal
    }

    notesarr.push(Obj);
    localStorage.setItem("notes", JSON.stringify(notesarr));
    addTitle.value = '';
    addTxt.value = '';
    displayNotes();
});




// this is logic for search notes using title and notes text 
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let searchTxt = search.value.trim().toLowerCase();
    let noteSlot = document.getElementsByClassName('note-slot');

    temp = 0;
    Array.from(noteSlot).forEach(function (element) {
        noteTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        noteTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (noteTxt.includes(searchTxt) || noteTitle.includes(searchTxt)) {
            element.style.display = 'block';

        }
        else {
            element.style.display = 'none';
            temp++;
        }
        if (this.temp == noteSlot.length) {
            document.getElementById('notes').innerHTML = '<h4>No Match Found</h4>';
            setInterval(function () {
                if (search.value == '') {
                    displayNotes();
                }
            }, 100)
        }

    });


});


// this function is used to display data to user in readable form 
function displayNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesarr = [];
    } else {
        notesarr = JSON.parse(notes);
    }
    let html = '';

    notesarr.forEach(function (element, index) {

        html += `<div class="card my-2 mx-2 note-slot" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text ">${element.note}</p>
                        <button id="${index}"class="btn btn-primary btn-sm" onclick="deleteNote(this.id)">Delete</button>
                    </div>
                </div>`
    });
    notesElem = document.getElementById('notes');

    if (notesarr.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = '<h1>No Notes  Add Now.......</h1>';
    }
}


displayNotes();

// this function is used to deleteNote notes and then display notes to user after deletation 
function deleteNote(index) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesarr = [];
    } else {
        notesarr = JSON.parse(notes);
    }
    notesarr.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesarr));
    displayNotes();
}



