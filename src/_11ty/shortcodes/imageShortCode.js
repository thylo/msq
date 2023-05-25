const Image = require("@11ty/eleventy-img");
const path = require("path");
function imageShortcode(src, alt, sizes = "(min-width: 1024px) 100vw, 50vw", className) {
  //console.log(`Generating image(s) from:  ${src}`);
  let options = {
    widths: [600, 900, 1500],
    formats: ["webp", "jpeg"],
    urlPath: "/images/",
    outputDir: "./dist/images/",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    },
  };

  // generate images
  Image(src, options);

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
    class: className
  };
  // get metadata
  metadata = Image.statsSync(src, options);
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = imageShortcode;
