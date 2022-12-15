// client-side JS code
const socket = io();
const username = localStorage.getItem("username");
document.getElementById("title-name").innerHTML = username + "'s grocery list";

let addListButton = document.getElementById('add-list-button');
addListButton.addEventListener('click', function () {
    createList(username, "List").then(listInfo => {
        console.log(listInfo);
        addList(listInfo);
    });
});

function addItemToList(listId) {
    console.log("trigerrred");
    console.log(`${listId}`)

    let category = document.getElementById('category-text-' + listId).value;
    let notes = document.getElementById('notes-text-' + listId).value;
    let item = document.getElementById('item-text-' + listId).value;
    let cost = Number(document.getElementById('cost-text-' + listId).value);

    let body = {
        "itemName": item,
        "category": category,
        "notes": notes,
        "price": cost,
        "listID": listId
    }

    createItem(body, listId).then(itemInfo => {
        console.log(itemInfo);
        addList(listInfo);
    })
}

const createItem = async (body, listId) => {
    let url = `http://localhost:3000/items/add-item`;
    console.log("item for " +listId)

    console.log("body: " + JSON.stringify(body));

    let response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    });

    //console.log(response);
    if (response.ok) {
        let newItem = await response.json();
        console.log(`New item: ${JSON.stringify(newItem)}`);
        return newItem.itemInfo;
    }
    else {
        console.log("Failed to create new item");
    }
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
    buttonCreated.innerText = listInfo.name;

    // const addItemToListId = addItemToList.bind(`${listInfo._id}`);

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
            "<input type='text' class='form-control' id='category-text-" +listInfo._id+ "'>" +
            "<button type='button' class='btn btn-secondary' id='btn-outline-add-item'  onclick='addItemToList(\"" + listInfo._id + "\")'>Add Item</button>" +
            "</div>" +
            "<div id='smaller-items-section'>" +
            "<label id='form-labels'>Item:</label>" +
            "<input type='text' class='form-control' id ='item-text-" +listInfo._id+ "'>" +
            "<label id='form-labels'>Notes:</label>" +
            "<input type='text' class='form-control' id='notes-text-" +listInfo._id+ "'>"+
            "<label id='form-labels'>Cost:</label>" +
            "<input type='text' class='form-control' id ='cost-text-" +listInfo._id+ "'>" +
            "</div>" +
            "</div>" +
            "<hr class='new1'>" +
            // "<h3>Default List</h3>" +
            "<div id='items-container'></div>" +
            "<div id='list-name-container'></div>" +
            // "<h5 id='budget-label'>Budget $</h5>" +
            // "<div style='clear: both'>" +
            // "<h5 style='float:left'> <u>Produce</u></h5>" +
            // "<h5 id='notes-label'>Notes</h5>" +
            // "</div>" +
            "</div>" +
            "</div> " +
            "</div> " +
            "</div>"
    );

    let addItemButton = document.getElementById("btn-outline-add-item");
    // addItemButton.click(addItemToList(listInfo._id));

    addItemButton.addEventListener("click", function () {
        console.log("heeleloeowiepwieopwi"); // default

        let categoryInput = document.getElementById('category-text').value;
        console.log("** " + categoryInput);
        let notesInput = document.getElementById('notes-text').value;
        let costInput = document.getElementById('cost-text').value;
        let itemInput = document.getElementById('item-text').value;

        let category = document.getElementById('category');
        let notes = document.getElementById('notes');
        let cost = document.getElementById('cost');
        let item = document.getElementById('item-name');

        category.innerText = categoryInput;
        notes.innerText = notesInput;
        cost.innerText = costInput;
        item.innerText = itemInput;
    });    

    // let categoryText = document.getElementById("category-text");
    // categoryText.setAttribute("id", "category-text-" + listInfo._id);
    //
    // let itemText = document.getElementById("item-text");
    // itemText.setAttribute("id", "item-text-" + listInfo._id);

    // We have added one more card
    lengthOfCards++;
    let cardCreated = document.getElementsByClassName("collapse")[lengthOfCards-1];

    // Idea is for each button to have its own collapse element. Do that by linking data-bs-target with id
    cardCreated.setAttribute("id", "lst-" + listInfo._id)

    let itemContainer = document.getElementById("items-container" );
    itemContainer.setAttribute("id", "items-container-" + listInfo._id);

    let listNameContainer = document.getElementById("list-name-container");
    listNameContainer.setAttribute("id", "list-name-container-" + listInfo._id);

    let budget = document.getElementById("budget-label")
    budget.innerText = "Budget $ " + listInfo.budget;

    let budgetCustom = document.createElement("h5");
    budgetCustom.innerText = "Budget $ " + listInfo.budget;
    budgetCustom.style.float = "left";
    budgetCustom.style.marginLeft = "477px";

    listNameContainer.appendChild(budgetCustom);

    let listName = document.createElement("h3");
    listName.innerText = listInfo.name;
    itemContainer.appendChild(listName);

    console.log("lsit info " + JSON.stringify(listInfo));
    console.log("name: "+ listInfo.name);
    console.log("budget: " + listInfo.budget);

    listInfo.items.forEach(item => {

        console.log("my item " + JSON.stringify(item));

        let itemInfo = document.createElement("div");
        let category = document.createElement("p");
        let itemName = document.createElement("p");
        let notes = document.createElement("p");
        let price = document.createElement("p");
        let edit = document.createElement('button');
        
        category.innerText = item.category;
        itemName.innerText = item.itemName;
        notes.innerText = item.notes;
        price.innerText = item.price;
        itemInfo.appendChild(category);
        itemInfo.appendChild(itemName);
        itemInfo.appendChild(notes);
        itemInfo.appendChild(price);
        itemInfo.appendChild(edit);
        
        edit.innerText = "Edit";
        edit.addEventListener("click", function(e){
            let updated = e.target.parentElement; // === itemInfo
            updated.innerHTML = "<label id='form-labels'>" + item.category + ":</label>" +
            "<input type='text' class='form-control' id ='newCategory' placeholder = '" + item.category + "'>" +
            "<div id='smaller-items-section'>" +
            "<label id='form-labels'>" + item.itemName + ":</label>" +
            "<input type='text' class='form-control' id ='newItemName' placeholder = '" + item.itemName + "'>" +
            "<label id='form-labels'>" + item.notes + ":</label>" +
            "<input type='text' class='form-control' id ='newNotes' placeholder = '" + item.notes + "'>"+
            "<label id='form-labels'>" + item.price + ":</label>" +
            "<input type='text' class='form-control' id ='newPrice' placeholder = '" + item.price + "'>" + "</div>";
            let update = document.createElement('button');    // Button to update
            updated.appendChild(update);

            update.innerText = "Update";
            update.addEventListener("click", function(){
                let newCategory = document.getElementById('newCategory').value;
                if (newCategory != ""){
                    changeCategory(newCategory, item._id).then(results => {
                        console.log(results);
                    });
                }

                let newItemName = document.getElementById('newItemName').value;
                if (newItemName != ""){
                    changeItem(newItemName, item._id).then(results => {
                        console.log(results);
                    });
                }

                let newNotes = document.getElementById('newNotes').value;
                if (newNotes != ""){
                    changeNotes(newNotes, item._id).then(results => {
                        console.log(results);
                    });
                }

                let newPrice = document.getElementById('newPrice').value;
                if (newPrice != ""){
                    changePrice(newPrice, item._id).then(results => {
                        console.log(results);
                    });  
                }
                location.reload(); // Although there's a better way to show the changed value...
            });
        });

        itemContainer.appendChild(itemInfo);

        itemInfo.style.display = "flex";
        itemInfo.style.columnGap = "20px";
    });
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
            addList(list);
        });
        socket.emit("join-list", list._id);
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

const changeItem = async (itemName, itemId) => {
    let url = `http://localhost:3000/items/${itemId}`;
    let body = {
        "item": itemName,
    }
    let response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    });
    if (response.ok) {
        let result = await response.json();
        console.log(`${JSON.stringify(result)}`);
        return result;
    }
    else {
        console.log("Failed to rename the item");
    }
};

const changeCategory = async (category, itemId) => {
    let url = `http://localhost:3000/items/update-category/${itemId}`;
    let body = {
        "category": category,
    }
    let response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    });
    if (response.ok) {
        let result = await response.json();
        console.log(`${JSON.stringify(result)}`);
        return result;
    }
    else {
        console.log("Failed to rename the item");
    }
};

const changeNotes = async (notes, itemId) => {
    let url = `http://localhost:3000/items/update-notes/${itemId}`;
    let body = {
        "notes": notes,
    }
    let response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    });
    if (response.ok) {
        let result = await response.json();
        console.log(`${JSON.stringify(result)}`);
        return result;
    }
    else {
        console.log("Failed to rename the item");
    }
};

const changePrice = async (price, itemId) => {
    let url = `http://localhost:3000/items/update-price/${itemId}`;
    let body = {
        "price": price,
    }
    let response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    });
    if (response.ok) {
        let result = await response.json();
        console.log(`${JSON.stringify(result)}`);
        return result;
    }
    else {
        console.log("Failed to rename the item");
    }
};