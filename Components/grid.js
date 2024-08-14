const gridTemplate = document.createElement("template");
gridTemplate.innerHTML = `
<link rel="stylesheet" href="css/main.css">
  <section>
    <div class="container">
      <div class="wrapper"></div>
    </div>
  </section>
`;

class CustomGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(gridTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const dataSource = this.getAttribute("data-source");

    // Debug: Check the data-source attribute
    console.log('Data source:', dataSource);

    fetch(dataSource)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const wrapper = this.shadowRoot.querySelector(".wrapper");
        wrapper.innerHTML = ""; // Clear any existing content

        // Debug: Check the data received
        console.log('Data received:', data);

        data.forEach((product) => {
          const productCard = document.createElement("product-card");

          // Set attributes for the product-card component
          if (product.productImage) {
            productCard.setAttribute("image", product.productImage);
          }

          // Create and assign the content slots
          const productMessaging = document.createElement("span");
          productMessaging.slot = "productMessaging";
          productMessaging.textContent = product.productMessaging || "";

          const productName = document.createElement("span");
          productName.slot = "productName";
          productName.textContent = product.productName;

          const productSize = document.createElement("span");
          productSize.slot = "line2";
          productSize.textContent = product.productSize;

          const productPrice = document.createElement("span");
          productPrice.slot = "price";
          productPrice.textContent = product.productPrice;

          const productPriceOriginal = document.createElement("span");
          productPriceOriginal.slot = "priceOriginal";
          productPriceOriginal.textContent = product.productPriceOriginal || "";

          const productPricePercentOff = document.createElement("span");
          productPricePercentOff.slot = "productPricePercentOff";
          productPricePercentOff.textContent = product.productPricePercentOff || "";

          // Append the content slots to the product-card
          productCard.appendChild(productMessaging);
          productCard.appendChild(productName);
          productCard.appendChild(productSize);
          productCard.appendChild(productPrice);
          productCard.appendChild(productPriceOriginal);
          productCard.appendChild(productPricePercentOff);

          // Debug: Check the productCard before appending
          console.log('Appending productCard:', productCard);

          // Append the product-card to the wrapper
          wrapper.appendChild(productCard);
        });
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }
}

window.customElements.define("custom-grid", CustomGrid);
