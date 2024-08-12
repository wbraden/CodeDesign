const browseTileTemplate = document.createElement("template");
browseTileTemplate.innerHTML = `
    <link rel="stylesheet" href="css/main.css">
    <a href="" class="browse-tile-link">
        <div class="browse-tile">
            <div class="media">
                <img
                    src=""
                    alt=""
                    class="browse-tile-image"
                />
                  <div class="overlay"></div>

            </div>
            <div class="content">
                <div class="browse-tile-details">
                    <p class="typography body md lb-med tcp truncate">
                        <slot name="label"></slot>
                    </p>
                    <p class="typography body md lb-reg tcs truncate">
                        <slot name="description"></slot>
                    </p>
                </div>
            </div>
        </div>
    </a>
`;

class BrowseTile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(browseTileTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    if (this.getAttribute("image")) {
      this.shadowRoot.querySelector(".browse-tile-image").src =
        this.getAttribute("image");
    }
    if (this.getAttribute("link")) {
      this.shadowRoot.querySelector(".browse-tile-link").href =
        this.getAttribute("link");
    }
    this.setAspectRatio();
  }

  setAspectRatio() {
    const aspect = this.getAttribute("aspect") || "16-9";
    const mediaElement = this.shadowRoot.querySelector(".media");
    mediaElement.classList.remove("ar169", "ar43", "ar11");

    switch (aspect) {
      case "4-3":
        mediaElement.classList.add("ar43");
        break;
      case "1-1":
        mediaElement.classList.add("ar11");
        break;
      case "16-9":
      default:
        mediaElement.classList.add("ar169");
        break;
    }
  }
}

window.customElements.define("browse-tile", BrowseTile);
