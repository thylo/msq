module.exports = (collection) => {
  return collection.getFilteredByGlob("./src/content/**/repertoires/*.md");
};
