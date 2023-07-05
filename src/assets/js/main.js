import videoplayer from "./components/videoplayer";
import videoSelector from "./components/videos";
import swiper from "./components/swiper";
import repertoires from "./components/repertoires";
import {gallery} from "./components/gallery";

document.addEventListener("DOMContentLoaded", () => {
  videoplayer();
  swiper();
  videoSelector();
  repertoires();
  gallery();
});
