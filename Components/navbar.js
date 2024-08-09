const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="css/main.css">
<div class="navbar-container">
  <div class="container">    
    <div class="navbar">
      <div class="navbar-left">
        <button class="menu-button">☰</button>
        <a class="logo-link" href="./"><img src="" alt="Shipt Logo" class="logo"></a>
        <a class="location-link"><span class="location"></span><img class="icon md" src="assets/icons/caret-down.svg" alt="Icon description"></a>
      </div>
      <div class="navbar-center">
        <input type="text" class="search-input" placeholder="What can we help you find?">
      </div>
      <div class="navbar-right">
        <div class="avatar-button">👤</div>
        <div class="cart-button">
          🛒
          <span class="cart-count">21</span>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="navbar-links">
      <div class="navbar-link">
        <div class="store-group">
          <img src="" alt="Target Logo" class="store-logo">
          <span class="store-text"></span>
        </div>
        <img class="icon md" src="assets/icons/caret-down.svg" alt="Icon description">
      </div>
      <a href="#" class="link">Buy Again</a>
      <a href="#" class="link">Deals</a>
      <a href="#" class="link">Explore</a>
      <a href="#" class="link">My Lists</a>
      <a href="#" class="link breakpoint">
        <span class="bp-480">480+</span>
        <span class="bp-768">768+</span>
        <span class="bp-1280">1280+</span>
        <span class="bp-1440">1440+</span>
        <span class="bp-1880">1880+</span>
      </a>
    </div>
  </div>
</div>
`;

class CustomNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const logoSrc = this.getAttribute("logo-src") || "https://object-storage.shipt.com/webassets/headerLogo-new.svg?fio=true&auto=webp&format=pjpg&quality=75%2C75&width=256";
    const logoAlt = this.getAttribute("logo-alt") || "Shipt Logo";
    const location = this.getAttribute("location") || "201 3rd St 94132 ⬇️";
    const storeLogoSrc = this.getAttribute("store-logo-src");
    const storeLogoAlt = this.getAttribute("store-logo-alt") || "Store Logo";
    const storeText = this.getAttribute("store-text");
    const cartCount = this.getAttribute("cart-count") || "21";

    // Set the attributes for the logo and location
    this.shadowRoot.querySelector(".logo").src = logoSrc;
    this.shadowRoot.querySelector(".logo").alt = logoAlt;
    this.shadowRoot.querySelector(".location").textContent = location;
    this.shadowRoot.querySelector(".cart-count").textContent = cartCount;

    // Conditionally display the store group if store-related attributes are provided
    const storeGroup = this.shadowRoot.querySelector(".navbar-link");
    if (storeLogoSrc || storeText) {
      if (storeLogoSrc) {
        this.shadowRoot.querySelector(".store-logo").src = storeLogoSrc;
        this.shadowRoot.querySelector(".store-logo").alt = storeLogoAlt;
      } else {
        this.shadowRoot.querySelector(".store-logo").style.display = "none";
      }
      this.shadowRoot.querySelector(".store-text").textContent = storeText;
    } else {
      storeGroup.style.display = "none";
    }
  }
}

window.customElements.define("custom-navbar", CustomNavbar);
