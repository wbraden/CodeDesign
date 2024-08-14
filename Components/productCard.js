const productCardTemplate = document.createElement("template");
    productCardTemplate.innerHTML = `
    <link rel="stylesheet" href="../css/main.css">

    <div class="box">
        <div class="product-image-wrapper">
            <img
                src=""
                alt=""
                class="product-image"
            />
        </div>
        <div class="content product-content">
            <div class="product-details">
                <p class="product-messaging typography body md lb-em tcpromo">
                    <slot name="productMessaging" />
                </p>
                <p class="product-name typography body lb-med tcp">
                    <slot name="productName" />
                </p>
                <p class="typography body lb-reg tcs">
                    <slot name="line2" />
                </p>
                <p class="typography body lb-reg tcs">
                    <slot name="line3" />
                </p>
                <p class="typography body lb-med link">
                    <slot name="line4" />
                </p>
            </div>
            <div class="product-footer">                
                    <div class="price-wrapper">
                        <span class="product-price typography body lg lb-med tcp"><slot name="price" /></span>
                        <span class="product-price-original typography body lg lb-reg tcs strike"><slot name="priceOriginal" /></span>
                    </div>
                    <span class="product-price-percent-off typography body lg lb-em tcs positive"><slot name="productPricePercentOff" /></span>                
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