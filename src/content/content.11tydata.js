const isPast = require("date-fns/isPast");
const isBefore = require("date-fns/isBefore");

function compareFn(a, b) {
  return isBefore(new Date(a.date), new Date(b.date)) ? -1 : 1;
}

module.exports = {
  eleventyComputed: {
    past_concerts: (data) => {
      return data.concerts
        .filter((concert) => isPast(new Date(concert.date)))
        .sort(compareFn);
    },
    future_concerts: (data) => {
      return data.concerts
        .filter((concert) => !isPast(new Date(concert.date)))
        .sort(compareFn);
    },
    gallery: (data) => {
      return data.gallery.map((pic) => ({
        ...pic,
        url: `src/content/gallery/${pic.file}`,
        alt: pic.alt || pic.file,
      }));
    },
    videos: (data) => {
      return data.videos.map((pic) => ({
        ...pic,
        url: `src/content/videos/${pic.image}`,
      }));
    },
  },
};
