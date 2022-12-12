const template = document.createElement("template");
template.innerHTML = `
<div class="list-info">
    <h3></h3>
    <ul>
        <li class="budget"></li>
        <li class="total"></li>
        <li class="creator"></li>
    </ul>
</div>
`;

class ListInfo extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
        this.shadowRoot.querySelector(".budget").innerText = this.getAttribute("budget");
        this.shadowRoot.querySelector(".total").innerText = this.getAttribute("total");
        this.shadowRoot.querySelector(".creator").innerText = this.getAttribute("creator");
    }
}

window.customElements.define("list-info", ListInfo);

const cardTemplate = document.createElement("template");
cardTemplate.innerHTML = `
<style>
    @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css");
</style>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" async></script>
<style>
    .modal-card-body{
         /* Enable \`flex-grow: 1\` for decks and groups so that card blocks take up */
         /* as much space as possible, ensuring footers are aligned to the bottom. */
        flex: 1 1 auto;
        padding: 2px;
     }
    
    .list{
        padding: 0 !important;
        width: 200px;
    }
    .list li{
        list-style: none;
        margin-right: 10px;
        margin-top: 75px;
        margin-bottom: 30px;
    }
    .list input{
        margin-right: 10px;
    
    }
    hr{
        border: 1px solid black;
        margin-top: 40px;
        margin-bottom: 20px;
        margin-right: 112px;
    }
    #notes-label{
        float:right;
        margin-right: 322px;
    }
    #budget-label{
        float:left;
        margin-left: 450px;
    }
    #btn-outline-add-item{
        color: black;
        border-color: #3ECAC1;
        font-family: 'Baloo Da 2', sans-serif;
        font-style: normal;
        width: 95px;
        background-color: white;
    }
</style>
<div style="min-height: 120px;">
    <div class="modal-card-body" style="width: 725px;">
        <h3>Default List</h3>
        <h5 id="budget-label">Budget $</h5>
        <hr />
        <div>
            <h5 style="float:left"> <u>Produce</u></h5>
            <h5 id="notes-label">Notes</h5>
        </div>
        <ul class = "list">
            <li class="item"><input type="checkbox" name="itemCheckBox"></li>
        </ul>
        <hr />
        <button type="button" class="btn btn-secondary" id="btn-outline-add-item" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="Item">Add Item</button>
    </div>
</div>
<a class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add Item to List</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">Category:</label>
                        <input type="text" class="form-control" >
                        <label for="recipient-name" class="col-form-label">Item:</label>
                        <input type="text" class="form-control">
                        <label for="message-text" class="col-form-label">Notes:</label>
                        <textarea class="form-control" id="message-text"></textarea>
                        <label for="recipient-name" class="col-form-label">Cost:</label>
                        <input type="text" class="form-control" >
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary">Add</button>
            </div>
        </div>
    </div>
</a>
`;

class CardInfo extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
        // const script = document.createElement("script");
        // script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
        // script.integrity = "sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4";
        // script.crossOrigin = "anonymous";
        //
        // script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css";
        // script.integrity = "sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65";
        // script.crossOrigin = "anonymous";

        const exampleModal = document.getElementById('exampleModal');
        if (exampleModal != null ) {
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
            });
        }
        else {
            console.log("error it is me");
        }

    }

    connectedCallback() {
        // const exampleModal = document.getElementById('exampleModal');
        // if (exampleModal != null ) {
        //     exampleModal.addEventListener('show.bs.modal', (e) => {
        //         // Button that triggered the modal
        //         const buttonforadditem = e.relatedTarget;
        //         // Extract info from data-mdb-* attributes
        //         const recipient = buttonforadditem.getAttribute('data-bs-whatever');
        //         // If necessary, you could initiate an AJAX request here
        //         // and then do the updating in a callback.
        //         //
        //         // Update the modal's content.
        //         const modalTitle = exampleModal.querySelector('.modal-title');
        //         const modalBodyInput = exampleModal.querySelector('.modal-body input');
        //
        //         modalTitle.textContent = `Add to List ${recipient}`;
        //         modalBodyInput.value = recipient;
        //     });
        // }
        // else {
        //     console.log("error it is me");
        // }
    }
}

window.customElements.define("card-info", CardInfo);

// const modalTemplate = document.createElement("template");
// modalTemplate.innerHTML = `
// <style>
//     @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css");
// </style>
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
// <a class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     <div class="modal-dialog">
//         <div class="modal-content">
//             <div class="modal-header">
//                 <h3>Add Item to List</h3>
//                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div class="modal-body">
//                 <form>
//                     <div class="mb-3">
//                         <label for="recipient-name" class="col-form-label">Category:</label>
//                         <input type="text" class="form-control" >
//                         <label for="recipient-name" class="col-form-label">Item:</label>
//                         <input type="text" class="form-control">
//                         <label for="message-text" class="col-form-label">Notes:</label>
//                         <textarea class="form-control" id="message-text"></textarea>
//                         <label for="recipient-name" class="col-form-label">Cost:</label>
//                         <input type="text" class="form-control" >
//                     </div>
//                 </form>
//             </div>
//             <div class="modal-footer">
//                 <button type="button" class="btn btn-secondary">Add</button>
//             </div>
//         </div>
//     </div>
// </a>
// `
//
// class ModalInfo extends HTMLElement {
//     constructor() {
//         super();
//
//         this.attachShadow({ mode: "open" });
//         this.shadowRoot.appendChild(modalTemplate.content.cloneNode(true));
//         const script = document.createElement("script");
//         script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
//         script.integrity = "sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4";
//         script.crossOrigin = "anonymous";
//
//         // this.shadowRoot.innerHTML = `
//         //     <link href={"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"} rel={stylesheet}>
//         //     <link href={"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"} rel={stylesheet}>
//         // `;
//     }
//
//     connectedCallback() {
//         // this.shadowRoot.querySelector("li").innerText = this.getAttribute("item");
//     }
// }
//
// window.customElements.define("modal-info", ModalInfo);
//
// //// <script>
// // //     const exampleModal = document.getElementById('exampleModal');
// // //     exampleModal.addEventListener('show.bs.modal', (e) => {
// // //       // Button that triggered the modal
// // //       const buttonforadditem = e.relatedTarget;
// // //       // Extract info from data-mdb-* attributes
// // //       const recipient = buttonforadditem.getAttribute('data-bs-whatever');
// // //       // If necessary, you could initiate an AJAX request here
// // //       // and then do the updating in a callback.
// // //       //
// // //       // Update the modal's content.
// // //       const modalTitle = exampleModal.querySelector('.modal-title');
// // //       const modalBodyInput = exampleModal.querySelector('.modal-body input');
// // //
// // //       modalTitle.textContent = \`Add to List ${recipient}\`;
// // //       modalBodyInput.value = recipient;
// // //     });
// // // </script>