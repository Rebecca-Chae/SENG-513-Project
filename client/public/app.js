// client-side JS code
const socket = io();

let addListButton = document.getElementById('add-list-button');
addListButton.addEventListener('click', function () {

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

    // Get the id count after "-" . Ex: #lst-0. Only want to get the 0 (int)
    let buttonId = parseInt(lastButtonCreated.getAttribute("data-bs-target").split("-")[1]);
    console.log("The button Id: " + buttonId);

    // Position this newly created list button after the last created list button (sibling)
    lastButtonCreated.insertAdjacentHTML("afterend",
            "<button class='btn btn-primary' type='button' data-bs-toggle='collapse' " +
                "aria-expanded='false' contenteditable='true'> myList" +
            "</button>"
    );

    // We have added one more button
    lengthOfButtons++;
    let buttonCreated = document.getElementsByClassName("btn btn-primary")[lengthOfButtons-1];
    buttonId++;
    console.log(buttonId);
    // Here changing data-bs-target value to increase by 1.
    buttonCreated.setAttribute("data-bs-target", "#lst-" + buttonId.toString())
    buttonCreated.setAttribute("aria-controls", "lst-" + buttonId.toString())
    buttonCreated.innerText = "myList " + buttonId;

    // Position this newly created card after the last card created
    lastInnerCardCreated.insertAdjacentHTML("afterend",
    "<div class='inner-card' style='min-height: 120px;'> " +
            "<div class='collapse show'> " +
                "<div class='card card-body' style='width: 650px;'>" +
                "<div style='min-height: 120px;'>"+
                "<div class='modal-card-body' style='width: 650px;'>" +
                "<h3>Default List</h3>" +
                "<h5 id='budget-label'>Budget $</h5>" +
                "<hr class='new1'>" +
                "<div style='clear: both'>" +
                "<h5 style='float:left'> <u>Produce</u></h5>" +
                "<h5 id='notes-label'>Notes</h5>" +
                "</div>" +
                "<ul class = 'list'>" +
                "<li><input type='checkbox' name='item'>Apple <a href='#'>&#10006</a></li>" +
                "</ul>" +
                "<hr />" +
                "<button type='button' class='btn btn-secondary' id='btn-outline-add-item' data-bs-toggle='modal' data-bs-target='#exampleModal' data-bs-whatever='Item'>Add Item</button>" +
                "<a class='modal fade' id='exampleModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>" +
                "<div class='modal-dialog'>" +
                "<div class='modal-content'>" +
                "<div class='modal-header'>" +
                "<h3>Add Item to List</h3>" +
                "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>" +
                "</div>" +
                "<div class='modal-body'>" +
                "<form>" +
                "<div class='mb-3'>" +
                "<label for='recipient-name' class='col-form-label'>Category:</label>" +
                "<input type='text' class='form-control'>" +
                "<label for='recipient-name' class='col-form-label'>Item:</label>" +
                "<input type='text' class='form-control'>" +
                "<label for='message-text' class='col-form-label'>Notes:</label>" +
                "<textarea class='form-control' id='message-text'></textarea>" +
                "<label for='recipient-name' class='col-form-label'>Cost:</label>" +
                "<input type='text' class='form-control'>" +
                "</div>" +
                "</form>" +
                "</div>" +
                "<div class='modal-footer'>" +
                "<button type='button' class='btn btn-secondary'>Add</button>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</a>" +
                "</div>" +
                "</div> " +
                "</div> " +
                "</div>"                
    );

    // We have added one more card
    lengthOfCards++;
    let cardCreated = document.getElementsByClassName("collapse")[lengthOfCards-1];

    // Idea is for each button to have its own collapse element. Do that by linking data-bs-target with id
    cardCreated.setAttribute("id", "lst-" + buttonId.toString())
});

const exampleModal = document.getElementById('exampleModal');
exampleModal.addEventListener('show.bs.modal', (e) => {
  // Button that triggered the modal
  const buttonforadditem = e.relatedTarget;
  // Extract info from data-mdb-* attributes
  const recipient = buttonforadditem.getAttribute('data-bs-whatever');
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  const modalTitle = exampleModal.querySelector('.modal-title');
  const modalBodyInput = exampleModal.querySelector('.modal-body input');

  modalTitle.textContent = `Add to List ${recipient}`;
  modalBodyInput.value = recipient;
})

console.log("hello from client");

const username = localStorage.getItem("username");
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
    const listInfos = document.getElementById('list-infos');

    let listsProcessed = 0;
    await lists.forEach(list => {
        console.log(list._id);
        getListItems(list._id).then(listItems => {
            list["items"] = listItems;

            const listInfo = document.createElement("list-info");
            listInfo.setAttribute("name", list.name);
            listInfo.setAttribute("budget", list.budget);
            listInfo.setAttribute("total", list.total);
            listInfo.setAttribute("creator", list.creator);
            listInfos.appendChild(listInfo);

            listsProcessed++;
            if (listsProcessed === lists.length) {
                console.log(`my lists with items: ${JSON.stringify(lists)}`);
            }
        });
    });
});