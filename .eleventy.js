const yaml = require("js-yaml");
const { EleventyI18nPlugin } = require("@11ty/eleventy");
const { dateMed, dateIso, dateYear } = require("./src/_11ty/filters/dates");
const sizeFilter = require("./src/_11ty/filters/sizes");
const { translate } = require("./src/_11ty/filters/translate");
const imageShortCode = require("./src/_11ty/shortcodes/imageShortCode");
const repertoires = require("./src/_11ty/collections/repertoires");
const {imageSrcset, imagePath, imageBiggestPath} = require("./src/_11ty/filters/sizes");

module.exports = (eleventyConfig) => {
  //Plugins
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    // any valid BCP 47-compatible language tag is supported
    defaultLanguage: "en", // Required, this site uses "en"
  });

  eleventyConfig.addDataExtension("yaml, yml", (contents) =>
    yaml.load(contents)
  );

  // collections
  eleventyConfig.addCollection("repertoires", repertoires);

  // filters
  eleventyConfig.addFilter("dateISO", dateIso);
  eleventyConfig.addFilter("dateYear", dateYear);
  eleventyConfig.addFilter("dateMed", dateMed);
  eleventyConfig.addFilter("translate", translate);
  //images
  eleventyConfig.addFilter("imageSrcset", imageSrcset("./assets-manifest.json","/assets/img"));
  eleventyConfig.addFilter("imagePath", imagePath("./assets-manifest.json","/assets/img"));
  eleventyConfig.addFilter("imageBiggestPath", imageBiggestPath("./assets-manifest.json","/assets/img"));

  //shortcode

  // ignores
  eleventyConfig.ignores.add("src/assets/**/*");
  eleventyConfig.watchIgnores.add("src/assets/**/*");
  eleventyConfig.ignores.add("src/content/videos/*");

  // passthrough copy
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPassthroughCopy({ "./src/static": "/" });
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/svg");

  // server config
  eleventyConfig.setServerOptions({
    watch: ["./dist/assets/css/**/*.css", "./dist/assets/js/**/*.js"],
    port: 3000,
  });

  // base config
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "yml"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
