import * as path from "path";
import { globSync } from "glob";
import { rimrafSync } from "rimraf";
import * as fs from "fs";
import sharp from "sharp";
const { nanoid } = require("nanoid/async");

interface Transform {
  glob: string;
  sizes: sharp.ResizeOptions[];
}

const config = {
  allowedFormats: ["jpg", "jpeg", "webp", "avif", "png", "gif"],
  defaultInputDir: path.resolve("./src/assets/img"),
  defaultOutputDir: path.resolve("./dist/assets/img"),
  defaultFormats: ["jpg", "webp"],
};

const transforms: Transform[] = [
  {
    glob: "./src/assets/img/backgrounds/*",
    sizes: [
      { width: 1920 },
      { width: 1280 },
      { width: 1024 },
      { width: 800 },
      { width: 600 },
      { width: 350 },
    ],
  },

  {
    glob: "./src/assets/img/statics/*",
    sizes: [
      { width: 1280 },
      { width: 1024 },
      { width: 800 },
      { width: 600 },
      { width: 350 },
    ],
  },
  {
    glob: "./src/content/videos/*",
    sizes: [
      { width: 625, height: Math.floor((625 * 9) / 16) },
      { width: 320, height: Math.floor((320 * 9) / 16) },
    ],
  },
  {
    glob: "./src/content/gallery/*",
    sizes: [
      { width: 1280, height: Math.floor((1280 * 9) / 16), fit: "inside" },
      { width: 1024, height: Math.floor((1024 * 9) / 16), fit: "inside" },
      { width: 800, height: Math.floor((800 * 9) / 16), fit: "inside" },
      { width: 600, height: Math.floor((600 * 9) / 16), fit: "inside" },
      { width: 350, height: Math.floor((350 * 9) / 16), fit: "inside" },
    ],
  },
];

async function resizeFile(
  file: string,
  outputDir: string,
  size: sharp.ResizeOptions
) {
  const inputFileName = path.parse(file).name;
  const file_name = `${inputFileName}_${await nanoid(4)}_${size.width || ""}x${
    size.height || ""
  }.jpg`;
  const outputPath = path.join(outputDir, file_name);
  //Resize image
  await sharp(file).resize(size).toFile(outputPath);

  return { ...size, full_path: outputPath, file_name };
}

async function processFile(
  file: string,
  outputDir: string,
  transform: Transform
) {
  // get input image name
  const file_name = path.parse(file).name;
  const raw_file_name = path.parse(file).base;
  fs.copyFileSync(file, path.join(outputDir, raw_file_name));
  return {
    file,
    file_name,
    original: raw_file_name,
    sizes: await Promise.all(
      transform.sizes.map((size: sharp.ResizeOptions) =>
        resizeFile(file, outputDir, size)
      )
    ),
  };
}

function processTransform(transform: Transform, outputDir: string) {
  const files = globSync(transform.glob);
  return Promise.all(
    files.map((file: string) => processFile(file, outputDir, transform))
  );
}

async function init() {
  const outputDir = config.defaultOutputDir;
  if (fs.existsSync(outputDir)) {
    rimrafSync(outputDir);
  }
  fs.mkdirSync(outputDir, { recursive: true });

  const files = await Promise.all(
    transforms.map((transform) => processTransform(transform, outputDir))
  );
  fs.writeFileSync(
    path.resolve("./assets-manifest.json"),
    JSON.stringify(files.flat(), null, 2),
    "utf-8"
  );
}

export default init();
