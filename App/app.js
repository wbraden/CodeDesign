document.addEventListener("DOMContentLoaded", function () {
    const model = new CarouselModel();
    const viewModel = new CarouselViewModel(model);
  
    // Initialize all carousels
    viewModel.initializeCarousel('wbSwiper1');
    viewModel.initializeCarousel('wbSwiper2');
    viewModel.initializeCarousel('wbSwiper4');
    viewModel.initializeCarousel('wbSwiper5');
  
    // Parallax for retailer banner
    window.addEventListener("scroll", function () {
      const scrollPosition = window.pageYOffset;
      const parallaxImage = document.querySelector(".parallax-image");
      if (parallaxImage) {
        parallaxImage.style.transform = `translate(-50%, calc(-50% + ${
          scrollPosition * 0.5
        }px))`;
      }
    });
  });
  