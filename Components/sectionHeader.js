const sectionHeaderTemplate = document.createElement('template');
sectionHeaderTemplate.innerHTML = `
<link rel="stylesheet" href="css/main.css">
<div class="section-header">
    <div class="headline fc">
        <slot name="header-image"></slot>
        <h2 class="typography headline lg tcp">
            <slot name="headline"></slot>
        </h2>
        <p class="typography subheadline lg tcs">
            <slot name="subheadline"></slot>
        </p>
    </div>
    <div class="right-slot fr">
        <div class="link">Explore more  &nbsp;&rsaquo;</div>
        <slot name="prev-button"></slot>
        <slot name="next-button"></slot>
    </div>
</div>
`;

class SectionHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(sectionHeaderTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        const avatar = this.getAttribute('avatar');
        const alt = this.getAttribute('alt') || 'Avatar';
        
        if (avatar) {
            const leftSlot = document.createElement('div');
            leftSlot.classList.add('left-slot', 'fr');
            const img = document.createElement('img');
            img.src = avatar;
            img.alt = alt;
            img.classList.add('avatar');
            leftSlot.appendChild(img);
            this.shadowRoot.querySelector('.section-header').insertBefore(leftSlot, this.shadowRoot.querySelector('.headline'));
        } else {
            console.warn('Avatar attribute is missing or incorrect.');
        }
    }
}

window.customElements.define('section-header', SectionHeader);
