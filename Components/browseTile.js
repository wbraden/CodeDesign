const browseTileTemplate = document.createElement("template");
browseTileTemplate.innerHTML = `
    <link rel="stylesheet" href="../css/main.css">
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
    const imageSrc = this.getAttribute("image");
    const videoSrc = this.getAttribute("video");
    const link = this.getAttribute("link");

    const imageElement = this.shadowRoot.querySelector(".browse-tile-image");

    if (imageSrc) {
      imageElement.src = imageSrc;
    }

    if (link) {
      this.shadowRoot.querySelector(".browse-tile-link").href = link;
    }

    if (videoSrc) {
      this.addVideoElement(videoSrc, imageElement);
    }

    this.setAspectRatio();
  }

  addVideoElement(videoSrc, imageElement) {
    const videoElement = document.createElement('video');
    videoElement.src = videoSrc;
    videoElement.classList.add('browse-tile-video');
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.style.display = 'none';

    this.shadowRoot.querySelector(".media").appendChild(videoElement);

    // Add hover events for playing and pausing the video
    this.shadowRoot.querySelector(".media").addEventListener("mouseenter", () => {
      imageElement.style.display = "none"; // Hide the image
      videoElement.style.display = "block"; // Show the video
      videoElement.play();
    });

    this.shadowRoot.querySelector(".media").addEventListener("mouseleave", () => {
      videoElement.pause();
      videoElement.currentTime = 0;
      videoElement.style.display = "none"; // Hide the video
      imageElement.style.display = "block"; // Show the image
    });
  }

  setAspectRatio() {
    const aspect = this.getAttribute("aspect") || "16-9";
    const mediaElement = this.shadowRoot.querySelector(".media");
    mediaElement.classList.remove("ar169", "ar43", "ar11", "ar916");

    switch (aspect) {
      case "4-3":
        mediaElement.classList.add("ar43");
        break;
      case "9-16":
        mediaElement.classList.add("ar916");
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
