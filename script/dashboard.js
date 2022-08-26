window.addEventListener('DOMContentLoaded', () => {

    console.log("=> Connected to Dashboard.js");
    let token = localStorage.getItem('token');
    console.log(token);
    getAllNotes();

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
    let closeIcon = document.querySelector('.close-icon');
    let serchbox = document.querySelector('.search-input');

    let displaytnotes = document.querySelector('.notes');

    var noteArray;

    btn.onclick = function () {
        navbar.classList.toggle("opened");
    }

    serchbox.addEventListener('focus', () => {
        closeIcon.classList.remove('hide')
    })
    serchbox.addEventListener('blur', () => {
        closeIcon.classList.add('hide');
    })

    oncreate.addEventListener('click', () => {
        toggleNOteFields();
    })

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
    function resetNoteFields() {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
    }
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
    $(function () {
        $("ul li a").click(function () {
            $("ul li a").removeClass("active");
            $("ul li a").removeClass("buttonDisabled");
            $(this).addClass('active');
            $(this).addClass('buttonDisabled');
        });

    });
    function getAllNotes() {
        $.ajax({
            url: 'https://localhost:44371/api/Note/AllNotes',
            type: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            success: function (result) {
                noteArray = result.response;
                //noteArray.reverse();
                console.log(result);
                displaytnotes.click();
            },
            error: function (error) {
                console.log(error);
            }
        })
    }
})