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

function checkoffItem(itemId){
    let box = document.getElementById("check-" + itemId);
    console.log(box);
    let body = {};
    if(box.checked == true){
        body = {"checked": true};
        console.log(body);
    }else{
        body = {"checked": false};
        console.log(body);
    };

    check(body,itemId).then(results => {
        console.log(results);
    })
};

const check = async (body, itemId) => {
    let url = `http://localhost:3000/items/checked/${itemId}`;
    console.log("body: " + JSON.stringify(body));
    
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
        console.log("Failed to create new list");
    }
};

function displayItem(listId, item) {
    // merge these together to get the item container that this list belongs to
    let itemContainer = document.getElementById("items-container-" + listId);

    let itemInfo = document.createElement("div");
    itemInfo.setAttribute("id", "item-info-" + item._id);

    //Checkbox
    let checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", "check-" + item._id);
    
    checkBox.addEventListener('click', function(){
        console.log(item._id);
        checkoffItem(item._id);
    });

    let category = document.createElement("p");
    let itemName = document.createElement("p");
    let notes = document.createElement("p");
    let price = document.createElement("p");
    let edit = document.createElement('button');

    if(item.checked){
        checkBox.checked = true;
    }else{
        checkBox.checked = false;
    }

    let deleteButton = document.createElement("p");
    deleteButton.setAttribute("id", "delete-item-" + item._id);
    deleteButton.setAttribute("class", "delete-item-button");
    deleteButton.onclick = function () { deleteItem(listId, item._id); };

    category.innerText = item.category;
    itemName.innerText = item.itemName;
    notes.innerText = item.notes;
    price.innerText = item.price;
    deleteButton.innerText = "\u00d7";

    itemInfo.appendChild(checkBox);
    itemInfo.appendChild(category);
    itemInfo.appendChild(itemName);
    itemInfo.appendChild(notes);
    itemInfo.appendChild(price);
    itemInfo.appendChild(edit);
    itemInfo.appendChild(deleteButton);

    edit.innerText = "Edit";
    edit.style.color = "white";
    edit.style.backgroundColor = "#186368";
    edit.style.border = "none";
    edit.style.borderRadius = "5px";
    edit.style.height = "30px";
    edit.addEventListener("click", function(e){
        let updated = e.target.parentElement; // === itemInfo
        updated.innerHTML = "<label id='form-labels' style = 'color: #186368;'><b>Category:</b></label>" +
            "<input type='text' id ='newCategory' style = 'width: 50px; border-radius: 5px; border: none; padding-left: 10px;' placeholder = '" + item.category + "'>" +
            "<label id='form-labels' style = 'color: #186368;'><b>Item:</b></label>" +
            "<input type='text' id ='newItemName' style = 'width: 50px; border-radius: 5px; border: none; padding-left: 10px;' placeholder = '" + item.itemName + "'>" +
            "<label id='form-labels' style = 'color: #186368;'><b>Notes:</b></label>" +
            "<input type='text' id ='newNotes' style = 'width: 50px; border-radius: 5px; border: none; padding-left: 10px;' placeholder = '" + item.notes + "'>"+
            "<label id='form-labels' style = 'color: #186368;'><b>Price:</b></label>" +
            "<input type='text' id ='newPrice' style = 'width: 50px; border-radius: 5px; border: none; padding-left: 10px;' placeholder = '" + item.price + "'>";
        let update = document.createElement('button');    // Button to update
        updated.appendChild(update);

        update.innerText = "Update";
        update.style.color = "white";
        update.style.backgroundColor = "#186368";
        update.style.border = "none";
        update.style.borderRadius = "5px";
        update.style.height = "30px";
        update.style.width = "100px";
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
}

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
        displayItem(listId, itemInfo);
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

    // Gets all card components created
    let cardsCreated = document.getElementsByClassName("card card-body");
    let lengthOfCards = cardsCreated.length;
    let lastCardCreated = document.getElementsByClassName("card card-body")[lengthOfCards-1];

    let lastInnerCardCreated = document.getElementsByClassName('inner-card')[lengthOfCards-1]
    lastCardCreated.style.marginBottom = "10px";

    let spanContainer = document.getElementById("span-container");
    let buttonList = document.createElement("button");
    buttonList.setAttribute("class", "btn btn-primary");
    buttonList.setAttribute("type", "button");
    buttonList.setAttribute("data-bs-toggle", "collapse");
    buttonList.setAttribute("aria-expanded", "false");
    buttonList.setAttribute("data-bs-target", "#lst-" + listInfo._id)
    buttonList.setAttribute("aria-controls", "lst-" +  listInfo._id)
    buttonList.setAttribute("id", "lstDel-" +  listInfo._id)

    buttonList.style.marginTop = "10px";
    buttonList.style.marginRight = "5px";
    buttonList.innerText = listInfo.name;

    spanContainer.appendChild(buttonList);
    buttonList.insertAdjacentHTML("afterend", "<button class='btn btn-light btn-sm' id='delete-list' " +
        "onclick='deleteList()'>Delete list</button>");
    let deleteList = document.getElementById('delete-list');
    deleteList.setAttribute("id", listInfo._id);


    // Position this newly created card after the last card created
    lastInnerCardCreated.insertAdjacentHTML("afterend",
    "<div class='inner-card' style='min-height: 120px;' id='cardToDel-" +listInfo._id+ "'> " +
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

    listInfo.items.forEach(item => displayItem(listInfo._id, item));
}

function deleteList() {
    let spanContainer = document.getElementById("span-container");
    spanContainer.addEventListener("click", function (e) {

        let listId = e.target.id;

        let url = `http://localhost:3000/lists/delete-list/${listId}`;
        fetch(url, {
            method: 'DELETE'
        }).then(() => {
            // remove list, card and delete button from UI
            let listToDelete = document.getElementById("lstDel-" + listId);
            let cardToDelete = document.getElementById("cardToDel-" + listId);

            listToDelete.parentNode.removeChild(listToDelete);
            cardToDelete.parentNode.removeChild(cardToDelete);

            let buttonDel = document.getElementById(listId);
            buttonDel.style.display = "none";
        });
    });
}

function deleteDefaultList() {
    // remove list, card and delete button from UI
    let listToDelete = document.getElementById("del-list-0");
    let cardToDelete = document.getElementById("del-card-0");

    listToDelete.parentNode.removeChild(listToDelete);
    cardToDelete.parentNode.removeChild(cardToDelete);

    let buttonDel = document.getElementById("del-button");
    buttonDel.style.display = "none";
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

function deleteItem(listId, itemId) {
    let url = `http://localhost:3000/items/${itemId}`;
    fetch(url, {
        method: 'DELETE'
    }).then(() => {
        // remove item from display
        const itemInfo = document.getElementById("item-info-" + itemId);
        itemInfo.parentNode.removeChild((itemInfo));
        // remove item from lists array
        removeItemFromListsArr(listId, itemId);
    });
}

function removeItemFromListsArr(listId, itemId) {
    lists.forEach(list => {
       if (list._id === listId) {
           list.items.filter(item => item._id !== itemId);
       }
    });
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