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

// window.customElements.define("list-info", ListInfo);

// const cardTemplate = document.createElement("template");
// cardTemplate.innerHTML = `
// <div style="min-height: 120px;">
//     <div class="modal-card-body" style="width: 725px;">
//         <h3>Default List</h3>
//         <h5 id="budget-label">Budget $</h5>
//         <hr />
//         <div>
//             <h5 style="float:left"> <u>Produce</u></h5>
//             <h5 id="notes-label">Notes</h5>
//         </div>
//         <ul class = "list">
//             <li class="item"><input type="checkbox" name="itemCheckBox"></li>
//         </ul>
//         <hr />
//         <button type="button" class="btn btn-secondary" id="btn-outline-add-item" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="Item">Add Item</button>
//     </div>
// </div>
`

// class CardInfo extends HTMLElement {
//     constructor() {
//         super();
//
//         this.attachShadow({ mode: "open" });
//         this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
//         this.shadowRoot.innerHTML = `
//             <link href={"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"} rel={stylesheet}>
//             <link href={"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"} rel={stylesheet}>
//         `;
//     }
//
//     connectedCallback() {
//         this.shadowRoot.querySelector("li").innerText = this.getAttribute("item");
//         // this.shadowRoot.querySelector(".budget").innerText = this.getAttribute("budget");
//         // this.shadowRoot.querySelector(".total").innerText = this.getAttribute("total");
//         // this.shadowRoot.querySelector(".creator").innerText = this.getAttribute("creator");
//     }
// }
//
// window.customElements.define("card-info", CardInfo);

// const modalTemplate = document.createElement("template");
// modalTemplate.innerHTML = `
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

// class ModalInfo extends HTMLElement {
//     constructor() {
//         super();
//
//         this.attachShadow({ mode: "open" });
//         this.shadowRoot.appendChild(modalTemplate.content.cloneNode(true));
//         this.shadowRoot.innerHTML = `
//             <link href={"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"} rel={stylesheet}>
//             <link href={"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"} rel={stylesheet}>
//         `;
//     }
//
//     connectedCallback() {
//         this.shadowRoot.querySelector("li").innerText = this.getAttribute("item");
//     }
// }
//
// window.customElements.define("modal-info", ModalInfo);