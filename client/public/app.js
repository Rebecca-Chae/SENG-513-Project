// client-side JS code
const socket = io();

let addListButton = document.getElementById('add-list-button');
addListButton.addEventListener('click', function () {
    // Gets all list buttons created
    let buttonsCreated = document.getElementsByClassName("btn btn-primary");
    let lastButtonCreated = document.getElementsByClassName("btn btn-primary")[buttonsCreated.length-1];
    lastButtonCreated.style.marginBottom = "10px";

    // Gets all card components created
    let cardsCreated = document.getElementsByClassName("card card-body");
    let lastCardCreated = document.getElementsByClassName("card card-body")[cardsCreated.length-1];
    lastCardCreated.style.marginBottom = "10px";

    console.log(cardsCreated);
    console.log(lastCardCreated);

    // Position this newly created list button after the last created list button
    lastButtonCreated.insertAdjacentHTML("afterend",
    "<p>" +
            "<button class='btn btn-primary' type='button' data-bs-toggle='collapse' " +
                "data-bs-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample' contenteditable='true'>" +
                "myList" +
            "</button>" +
        "</p>"
    );

    // Position this newly created card after the last card created
    // TODO change when implementing toggle of lists (changes which cards show up based on which list is toggled)
    lastCardCreated.insertAdjacentHTML("afterend",
    "<div style='min-height: 120px;'> " +
            "<div class='collapse show' id='collapseExample'> " +
                "<div class='card card-body' style='width: 700px;'>" +
                    "This is some placeholder content for a vertical collapse. It's hidden by default and shown when triggered. " +
                "</div> " +
            "</div> " +
        "</div>"
    );
})

console.log("hello from client");
