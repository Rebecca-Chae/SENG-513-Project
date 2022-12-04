// client-side JS code
const socket = io();

let addListButton = document.getElementById('add-list-button');
addListButton.addEventListener('click', function () {
    // Gets all list buttons created
    let buttonsCreated = document.getElementsByClassName("btn btn-primary");
    let lastButtonCreated = document.getElementsByClassName("btn btn-primary")[buttonsCreated.length-1];
    lastButtonCreated.style.marginBottom = "10px";
    console.log(lastButtonCreated);

    // Position this newly created list button after the last created list button
    lastButtonCreated.insertAdjacentHTML("afterend",
    "<p>" +
            "<button class='btn btn-primary' type='button' data-bs-toggle='collapse' " +
                "data-bs-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample' contenteditable='true'>" +
                "myList" +
            "</button>" +
        "</p>");
})

console.log("hello from client");
