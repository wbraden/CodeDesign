const productCardTemplate = document.createElement("template");
    productCardTemplate.innerHTML = `
    <link rel="stylesheet" href="css/main.css">

    <div class="box">
        <img
            src=""
            alt=""
            class="product-image"
        />
        <div class="content">
            <div class="product-details">
                <p class="typography body md tcp">
                    <slot name="productName" />
                </p>
                <p class="typography body sm">
                    <slot name="line2" />
                </p>
                <p class="typography body sm tcs">
                    <slot name="line3" />
                </p>
                <p class="typography body sm link">
                    <slot name="line4" />
                </p>
            </div>
            <div class="product-footer">
                <p class="typography body md tcp">
                    <slot name="price" />
                </p>
            </div>
        </div>
    </div>
`;

class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(productCardTemplate.content.cloneNode(true));
    }
    connectedCallback() {
        if(this.getAttribute('image')) {
             this.shadowRoot.querySelector('.product-image').src = this.getAttribute('image');
        }
       
       }
}

window.customElements.define('product-card', ProductCard)        