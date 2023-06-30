const fs = require("fs");

function readManifest(manifestLocation) {
  if (!fs.existsSync(manifestLocation)) {
    throw new Error(`Assets manifests was not found at: ${manifestLocation}`);
  }

  const rawContent = fs.readFileSync(manifestLocation, "utf-8");
  return JSON.parse(rawContent);
}

function getFile(fileName, manifest) {
  const fileAsset = manifest.find((fileAsset) => fileAsset.file === fileName);
  if (!fileAsset) {
    throw new Error(`${fileName} was not found in manifest.`);
  }
  return fileAsset;
}

const srcSetFilter = (manifestLocation, assetsDir) => {
  const manifest = readManifest(manifestLocation);
  return (fileName) => {
    try {
      const file = getFile(fileName, manifest);
      return file.sizes
        .map((size) => `${assetsDir}/${size.file_name} ${size.width}w`)
        .join(", ");
    } catch (e) {
      console.warn(e);
      return "";
    }
  };
};

const originalFilter = (manifestLocation, assetsDir) => {
  const manifest = readManifest(manifestLocation);
  return (fileName) => {
    try {
      const file = getFile(fileName, manifest);
      return `${assetsDir}/${file.original}`;
    } catch (e) {
      console.warn(e);
      return "";
    }
  };
};

const largestFilter = (manifestLocation, assetsDir) => {
  const manifest = readManifest(manifestLocation);
  return (fileName) => {
    try {
      const file = getFile(fileName, manifest);
      const biggestFile = file.sizes.sort((a,b) => {
        if (a.width === b.width) return 0;
        return a.width > b.width ? 1 : -1;
      }).reverse()[0];
      return `${assetsDir}/${biggestFile.file_name}`;
    } catch (e) {
      console.warn(e);
      return "";
    }
  };
};

module.exports = {
  imageSrcset: srcSetFilter,
  imagePath: originalFilter,
  imageBiggestPath: largestFilter,
};
