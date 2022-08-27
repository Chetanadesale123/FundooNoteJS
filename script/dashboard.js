//window.addEventListener('DOMContentLoaded', () => {

//console.log("=> Connected to Dashboard.js");
let token = localStorage.getItem('token');
console.log(token);
getAllNotes();

//declaration of variable
let navbar = document.querySelector(".side-navbar");
let btn = document.querySelector('#btn');
let title = document.getElementById('title');
let description = document.getElementById('description');
let colours = 'Blue';
// let IsArchived = 'true';
let Reminder = '2022-08-24T03:25:40.112Z';
let Image = 'string';
//let IsPinned = 'true';
//let isDeleted = 'true';
let CreatedAt = '2022-08-24T03:25:40.112Z';
let editedAt = '2022-08-24T03:25:40.112Z';
console.log(title.value);

let createnote = document.querySelector('.create-note');
let closebtn = document.querySelector('.close-btn');
let oncreate = document.querySelector('.create1');
let desc = document.querySelector('.create2');

let display_notes = document.querySelector('.notes');
const Archivenotes = document.querySelector('.Archivenotes');
//const Remindernotes = document.querySelector('.Remindernotes');
//const Trashnotes = document.querySelector('.Trashnotes');

var noteArray;
//toggle sidenav method
btn.onclick = function () {
    navbar.classList.toggle("opened");
}
//when we click on create note dialoge box then toggleNoteFields fun called and event happened. 
oncreate.addEventListener('click', () => {
    toggleNOteFields();
})

//if if click close button of dia box then it will hitt create note api and close create note dia box by using toggleNoteField fun. 
closebtn.addEventListener('click', () => {
    let notedata = {
        title: title.value,
        description: description.value,
        colour: colours,
        reminder: Reminder,
        image: Image,
        // isArchived: IsArchived,
        // isPinned: IsPinned,
        // isDeleted: isDeleted,
        createdAt: CreatedAt,
        editedAt: editedAt
    }
    console.log(notedata);
    $.ajax({
        url: 'https://localhost:44371/api/Note/Add',
        type: 'POST',
        data: JSON.stringify(notedata),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            console.log(result);
            resetNoteFields();
            toggleNOteFields();
            getAllNotes();
        },
        error: function (error) {
            console.log(error);
            toggleNOteFields();
        }
    })

})
//reset create note dia box fields
function resetNoteFields() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}

//create not dia box expand and shrink
function toggleNOteFields() {
    createnote.classList.toggle('expand');
    if (createnote.classList.contains('expand')) {
        document.getElementById('title').placeholder = 'Title';
        document.getElementById('pin').classList.add('show');
    }
    else {
        document.getElementById('title').placeholder = 'Take a note...';
        document.getElementById('pin').classList.remove('show');
        resetNoteFields();
    }
}

// => function for sidenav bar item Selection
var links = document.querySelectorAll("ul li");
links.forEach(li => {
    li.addEventListener('click', () => {
        resetLinks();
        li.classList.add("active");
    })
})
function resetLinks() {
    links.forEach(li => {
        li.classList.remove("active");
    })
}

//hitting get all note API and store notedata into noteArray
function getAllNotes() {
    $.ajax({
        url: 'https://localhost:44371/api/Note/AllNotes',
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            noteArray = result;
            noteArray.reverse();
            console.log(result);
            display_notes.click();
        },
        error: function (error) {
            console.log(error);
        }
    })
}

// Event Listens when clicked on Notes in sidenav menu and calls displayAllNotes() to display All notes (Not Trashed,Archived)
display_notes.addEventListener('click', () => {

    console.log(noteArray);
    notes = noteArray.filter((x) => {
        return x.isDeleted === false && x.isArchived === false;
        // return x.isArchived === false;

    });
    console.log(notes);
    displayAllNotes(notes);
})

Archivenotes.addEventListener('click', () => {

    notes = noteArray.filter((x) => {
        // return x.isTrash === false && x.isArchive === true;
        return x.isArchived === true;
    });
    console.log(notes);
    displayAllNotes(notes);
})

//function which call Archive note API
function archiveNote(noteid){
    $.ajax({
        url: `https://localhost:44371/api/Note/Archive/${noteid}`,
        type: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            console.log(result);
            getAllNotes();
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//fun display noteArray by filtering and here we are using template literals to pass code dynamically. 
function displayAllNotes(Notesdata) {
    console.log(Notesdata);
    document.getElementById('Notes').innerHTML = Notesdata.map((note) =>
        `<div class="display-div">
            <div>
            <p class="p1">${note.title}</p>
            <P class="p2">${note.description}</P>
            </div>
            <div class="card-footer">
            <img src="../assets/add_reminder.png" />
            <img src="../assets/add_person.png" />
            <img src="../assets/color.png" />
            <img src="../assets/add_image.png" />
            <img onclick="archiveNote(${note.noteid})" src="../assets/archive.png" />
            <img src="../assets/more.png" />
            </div>
        </div>
       `
    ).join(' ');
};
//})