module.exports = (collection) => {
  return collection.getFilteredByGlob("./src/content/concerts/*.md").reverse();
};
