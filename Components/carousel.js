class CustomCarousel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        const template = document.createElement("template");
        template.innerHTML = `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
            <link rel="stylesheet" href="../css/main.css">            
            <section>
                <div class="container">
                    <div class="swiper">
                        <section-header>
                            <span slot="headline"></span>
                            <span slot="subheadline"></span>
                            <button class="icon-button wb-prev pagination" slot="prev-button">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2852 4.38128C12.6269 4.72299 12.6269 5.27701 12.2852 5.61872L7.90394 10L12.2852 14.3813C12.6269 14.723 12.6269 15.277 12.2852 15.6187C11.9435 15.9604 11.3895 15.9604 11.0478 15.6187L6.04779 10.6187C5.70608 10.277 5.70608 9.72299 6.04779 9.38128L11.0478 4.38128C11.3895 4.03957 11.9435 4.03957 12.2852 4.38128Z" fill="#302638"/>
                                </svg>
                            </button>
                            <button class="icon-button wb-next pagination" slot="next-button">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.71478 4.38128C7.37307 4.72299 7.37307 5.27701 7.71478 5.61872L12.0961 10L7.71478 14.3813C7.37307 14.723 7.37307 15.277 7.71478 15.6187C8.05649 15.9604 8.61051 15.9604 8.95221 15.6187L13.9522 10.6187C14.2939 10.277 14.2939 9.72299 13.9522 9.38128L8.95221 4.38128C8.61051 4.03957 8.05649 4.03957 7.71478 4.38128Z" fill="#302638"/>
                                </svg>
                            </button>
                        </section-header>
                        <div class="swiper-wrapper">
                            <!-- Slides will be dynamically inserted here -->
                        </div>
                    </div>
                </div>
            </section>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["headline", "subheadline", "data-source", "component-type"];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        const headline = this.getAttribute("headline") || "Default Headline";
        
        const headerImage = this.getAttribute("header-image") || "";
        this.shadowRoot.querySelector("section-header").setAttribute("header-image", headerImage);
        
        const subheadline = this.getAttribute("subheadline") || "Default Subheadline";
        const dataSource = this.getAttribute("data-source");
        const componentType = this.getAttribute("component-type") || "product-card";

        this.shadowRoot.querySelector("section-header span[slot='headline']").textContent = headline;
        this.shadowRoot.querySelector("section-header span[slot='subheadline']").textContent = subheadline;

        if (dataSource) {
            this.loadData(dataSource, componentType);
        }
    }

    loadData(dataSource, componentType) {
        fetch(dataSource)
            .then(response => response.json())
            .then(products => {
                const swiperWrapper = this.shadowRoot.querySelector(".swiper-wrapper");
                swiperWrapper.innerHTML = ''; // Clear existing content

                products.forEach(product => {
                    const slide = document.createElement("div");
                    slide.classList.add("swiper-slide");

                    let productComponent = document.createElement(componentType);
                    if (product.productImage) productComponent.setAttribute("image", product.productImage);
                    if (product.productMessaging) productComponent.innerHTML += `<span slot="productMessaging">${product.productMessaging}</span>`;
                    if (product.productName) productComponent.innerHTML += `<span slot="productName">${product.productName}</span>`;
                    if (product.productSize) productComponent.innerHTML += `<span slot="line2">${product.productSize}</span>`;
                    if (product.productPrice) productComponent.innerHTML += `<span slot="price">${product.productPrice}</span>`;
                    if (product.productPriceOriginal) productComponent.innerHTML += `<span slot="priceOriginal">${product.productPriceOriginal}</span>`;
                    if (product.productPricePercentOff) productComponent.innerHTML += `<span slot="productPricePercentOff">${product.productPricePercentOff}</span>`;

                    slide.appendChild(productComponent);
                    swiperWrapper.appendChild(slide);
                });

                this.initializeSwiper();
            })
            .catch(error => console.error('Error fetching product data:', error));
    }

    initializeSwiper() {
        const swiper = new Swiper(this.shadowRoot.querySelector(".swiper"), {
            slidesPerView: 2.1,
            spaceBetween: 8,
            freeMode: true,
            navigation: {
                nextEl: this.shadowRoot.querySelector(".wb-next"),
                prevEl: this.shadowRoot.querySelector(".wb-prev"),
            },
            breakpoints: {
                480: { slidesPerView: 3.25, slidesPerGroup: 3.25, freeMode: true },
                768: { slidesPerView: 5, slidesPerGroup: 5, freeMode: true },
                1280: { slidesPerView: 5, slidesPerGroup: 5, freeMode: false },
                1440: { slidesPerView: 7, slidesPerGroup: 7, freeMode: false },
                1880: { slidesPerView: 8, slidesPerGroup: 8, freeMode: false },
            },
        });
    }
}

window.customElements.define("custom-carousel", CustomCarousel);
