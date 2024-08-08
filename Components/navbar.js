const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="css/main.css">
<div class="navbar-container">
    <div class="navbar">
        <div class="navbar-left">
            <button class="menu-button">☰</button>
            <a href="/"><img src="" alt="Shipt Logo" class="logo"></a>
            <span class="location"></span><img class="icon md" src="/assets/icons/caret-down.svg" alt="Icon description">
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

    <div class="navbar-links">
        <div class="navbar-link">
            <div class="store-group">
                <img src="" alt="Target Logo" class="store-logo">
                <span class="store-text"></span>
            </div>
            <img class="icon md" src="/assets/icons/caret-down.svg" alt="Icon description">
        </div>
        <a href="#" class="link">Buy Again</a>
        <a href="#" class="link">Deals</a>
        <a href="#" class="link">Explore</a>
        <a href="#" class="link">My Lists</a>
    </div>
</div>
`;

class CustomNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.logo').src = this.getAttribute('logo-src');
        this.shadowRoot.querySelector('.logo').alt = this.getAttribute('logo-alt') || 'Shipt Logo';
        this.shadowRoot.querySelector('.location').textContent = this.getAttribute('location') || '201 3rd St 94132 ⬇️';
        this.shadowRoot.querySelector('.store-logo').src = this.getAttribute('store-logo-src');
        this.shadowRoot.querySelector('.store-logo').alt = this.getAttribute('store-logo-alt') || 'Store Logo';
        this.shadowRoot.querySelector('.store-text').textContent = this.getAttribute('store-text') || 'Store ⬇️';
        this.shadowRoot.querySelector('.cart-count').textContent = this.getAttribute('cart-count') || '21';
    }
}

window.customElements.define('custom-navbar', CustomNavbar);
