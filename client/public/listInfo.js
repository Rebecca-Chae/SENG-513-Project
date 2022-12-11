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