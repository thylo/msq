module.exports = (collection) => {
  console.log(collection.getFilteredByGlob("./src/content/gallery/*"))
  return collection
    .getFilteredByGlob("./src/content/gallery/*.jpg")
};
