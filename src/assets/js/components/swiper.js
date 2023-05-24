// core version + navigation, pagination modules:
import Swiper, { Navigation } from "swiper";
// import Swiper and modules styles

// init Swiper:
const init = () => {
  const swiper = new Swiper(".js-swiper", {
    modules: [Navigation],
    slidesPerView: "auto",
    spaceBetween: 32,
    navigation: {
      nextEl: ".js-swiper-button-next",
      prevEl: ".js-swiper-button-prev",
    },
  });
};

export default init;
