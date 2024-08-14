const cpgCardTemplate = document.createElement("template");
cpgCardTemplate.innerHTML = `
    <link rel="stylesheet" href="../css/main.css">

    <div class="box cpg-card ">       
        <div class="content">
            <div class="details">
                <div class="copy">
                <p class="typography headline sm tcp">
                    <slot name="headline" />
                </p>
                <p class="typography body sm">
                    <slot name="description" />
                </p> 
                </div> 
                <div class="details-footer">
                    <p class="typography body md tcp cta">
                        <slot name="cta" />
                    </p>
                </div>  
            </div>
             <img src="" alt="" class="image"/>            
        </div>
    </div>
`;

class cpgCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(cpgCardTemplate.content.cloneNode(true));
  }
  connectedCallback() {
    if (this.getAttribute("image")) {
      this.shadowRoot.querySelector(".image").src = this.getAttribute("image");
    }
  }
}

window.customElements.define("cpg-card", cpgCard);
