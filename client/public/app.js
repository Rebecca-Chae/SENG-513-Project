// client-side JS code
const socket = io();
const username = localStorage.getItem("username");

let addListButton = document.getElementById('add-list-button');
addListButton.addEventListener('click', function () {
    createList(username, "List").then(listInfo => {
        console.log(listInfo);
        addList(listInfo);
    });
});

function addItemToList() {
    let category = document.getElementById('category-text').value;
    console.log(category)
    let notes = document.getElementById('notes-text').value;
    console.log(notes);
    let item = document.getElementById('item-text').value;
    console.log(item);

}
function addList(listInfo) {
    console.log(listInfo.name);

    const allInnerCards = document.querySelectorAll('.inner-card');

    // Checks each inner card based on if it's collapsed or not. If it's collapsed, hide the div. Otherwise, show the div
    allInnerCards.forEach(card => {
        card.addEventListener('hide.bs.collapse', function () {
            card.setAttribute("hidden", "");
        });
        card.addEventListener('show.bs.collapse', function () {
            card.removeAttribute("hidden");
        });
    })

    // Gets all list buttons created
    let buttonsCreated = document.getElementsByClassName("btn btn-primary");
    let lengthOfButtons = buttonsCreated.length;
    let lastButtonCreated = document.getElementsByClassName("btn btn-primary")[lengthOfButtons-1];
    lastButtonCreated.style.marginBottom = "10px";

    // Gets all card components created
    let cardsCreated = document.getElementsByClassName("card card-body");
    let lengthOfCards = cardsCreated.length;
    let lastCardCreated = document.getElementsByClassName("card card-body")[lengthOfCards-1];

    let lastInnerCardCreated = document.getElementsByClassName('inner-card')[lengthOfCards-1]
    lastCardCreated.style.marginBottom = "10px";

    // Position this newly created list button after the last created list button (sibling)
    lastButtonCreated.insertAdjacentHTML("afterend",
            "<button class='btn btn-primary' type='button' data-bs-toggle='collapse' " +
                "aria-expanded='false' contenteditable='true'> myList" +
            "</button>"
    );



    // We have added one more button
    lengthOfButtons++;
    let buttonCreated = document.getElementsByClassName("btn btn-primary")[lengthOfButtons-1];
    // Here changing data-bs-target value to increase by 1.
    buttonCreated.setAttribute("data-bs-target", "#lst-" + listInfo._id)
    buttonCreated.setAttribute("aria-controls", "lst-" +  listInfo._id)
    buttonCreated.innerText = "myList " + listInfo._id;

    // Position this newly created card after the last card created
    lastInnerCardCreated.insertAdjacentHTML("afterend",
    "<div class='inner-card' style='min-height: 120px;'> " +
            "<div class='collapse show'> " +
            "<div class='card card-body' style='width: 650px;'>" +
            "<div style='min-height: 120px;'>"+
            "<div id='add-list-big-div'>" +
            "<label id='title'>Add Item To List</label>" +
            "<div id='category-section'>" +
            "<label id='form-labels'>Category:</label>" +
            "<input type='text' class='form-control' id='category-text'>" +
            "<button type='button' class='btn btn-secondary' id='btn-outline-add-item'  onclick='addItemToList()'>Add Item</button>" +
            "</div>" +
            "<div id='smaller-items-section'>" +
            "<label id='form-labels'>Item:</label>" +
            "<input type='text' class='form-control' id ='item-text'>" +
            "<label id='form-labels'>Notes:</label>" +
            "<input type='text' class='form-control' id='notes-text'>"+
            "<label id='form-labels'>Cost:</label>" +
            "<input type='text' class='form-control' id ='cost-text'>" +
            "</div>" +
            "</div>" +
            "<h3>Default List</h3>" +
            "<h5 id='budget-label'>Budget $</h5>" +
            "<hr class='new1'>" +
            "<div style='clear: both'>" +
            "<h5 style='float:left'> <u>Produce</u></h5>" +
            "<h5 id='notes-label'>Notes</h5>" +
            "</div>" +
            "</div>" +
            "</div> " +
            "</div> " +
            "</div>"
    );

    // We have added one more card
    lengthOfCards++;
    let cardCreated = document.getElementsByClassName("collapse")[lengthOfCards-1];

    // Idea is for each button to have its own collapse element. Do that by linking data-bs-target with id
    cardCreated.setAttribute("id", "lst-" + listInfo._id)
}

// const exampleModal = document.getElementById('exampleModal');
// exampleModal.addEventListener('show.bs.modal', (e) => {
//   // Button that triggered the modal
//   const buttonforadditem = e.relatedTarget;
//   // Extract info from data-mdb-* attributes
//   const recipient = buttonforadditem.getAttribute('data-bs-whatever');
//   // If necessary, you could initiate an AJAX request here
//   // and then do the updating in a callback.
//   //
//   // Update the modal's content.
//   const modalTitle = exampleModal.querySelector('.modal-title');
//   const modalBodyInput = exampleModal.querySelector('.modal-body input');

//   modalTitle.textContent = `Add to List ${recipient}`;
//   modalBodyInput.value = recipient;
// })

console.log("hello from client");

console.log(`username: ${username}`);

let lists = [];

const getLists = async (username) => {
    let url = `http://localhost:3000/lists/get-user-lists/${username}`;
    let response = await fetch(url, {
        method: 'GET'
    });
    if (response.ok) {
        lists = await response.json();
        console.log(`lists: ${JSON.stringify(lists)}`);
    }
    else {
        console.log("Failed to fetch lists");
    }
}

const getListItems = async (listId) => {
    let url = `http://localhost:3000/items/get-items/${listId}`;
    let response = await fetch(url, {
        method: 'GET',
    });
    if (response.ok) {
        let items = await response.json();
        console.log(`items for list ${listId}: ${JSON.stringify(items)}`)
        return items;
    }
    else {
        console.log(`Failed to fetch list items for list ${listId}`);
        return [];
    }
};

getLists(username).then(async () => {
    console.log(`my lists before: ${JSON.stringify(lists)}`);

    let listsProcessed = 0;
    await lists.forEach(list => {
        console.log(list._id);
        getListItems(list._id).then(listItems => {
            list["items"] = listItems;

            listsProcessed++;
            if (listsProcessed === lists.length) {
                console.log(`my lists with items: ${JSON.stringify(lists)}`);
            }
        });
        addList(list);
    });
});

const createList = async (username, listName) => {
    let url = `http://localhost:3000/lists/new-list`;
    console.log("it;s me: " + username)
    let body = {
        "username": username,
        "listName": listName
    }
    console.log("body: " + JSON.stringify(body));
    let response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    });
    if (response.ok) {
        let newList = await response.json();
        console.log(`New list: ${JSON.stringify(newList)}`);
        return newList.listInfo;
    }
    else {
        console.log("Failed to create new list");
    }
}