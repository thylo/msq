import breakpoints from "../breakpoints";

const onBtnClick = (evt) => {
  if (window.matchMedia(breakpoints.medium).matches) {
    evt.preventDefault();
    document.querySelectorAll(".js-video-player").forEach((el, index) => {
      const active = el.dataset.videoId === evt.currentTarget.dataset.videoId;
      el.classList.toggle("u-hidden", !active);
      if (!active) {
        el.querySelector('iframe')?.remove();
      }
    });
    document.querySelectorAll(".js-video-btn").forEach((el, index) => {
      const active = el.dataset.videoId === evt.currentTarget.dataset.videoId;
      el.classList.toggle("active", active);
    });
  }
};

const videoSelector = () => {
  document.querySelectorAll(".js-video-btn").forEach((el, index) => {
    el.addEventListener("click", onBtnClick);
    el.classList.toggle("active", index === 0);
  });

  document.querySelectorAll(".js-video-player").forEach((el, index) => {
    el.classList.toggle("u-hidden", index !== 0);
  });
};

export default videoSelector;
