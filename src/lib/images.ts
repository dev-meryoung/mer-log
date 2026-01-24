import fs from 'fs';
import path from 'path';
import imageSize from 'image-size';
import { getPlaiceholder } from 'plaiceholder';

const DEFAULT_IMAGE_WIDTH = 1280;
const DEFAULT_IMAGE_HEIGHT = 720;

const computeDimensions = (buffer: Buffer) => {
  const dimensions = imageSize(buffer);

  return {
    width: dimensions.width || DEFAULT_IMAGE_WIDTH,
    height: dimensions.height || DEFAULT_IMAGE_HEIGHT,
  };
};

export const getImageSize = async (src: string) => {
  let buffer: Buffer;

  if (src.startsWith('/')) {
    const fullPath = path.join(process.cwd(), 'public', src);

    if (!fs.existsSync(fullPath)) {
      throw new Error(fullPath);
    }

    buffer = fs.readFileSync(fullPath);
  } else {
    const response = await fetch(src);

    if (!response.ok) {
      throw new Error(src);
    }

    buffer = Buffer.from(await response.arrayBuffer());
  }

  return computeDimensions(buffer);
};

export const generateBlurDataForImage = async (imagePath: string) => {
  const fullPath = path.join(process.cwd(), 'public', imagePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(fullPath);
  }

  const fileBuffer = fs.readFileSync(fullPath);
  const { base64 } = await getPlaiceholder(fileBuffer, { size: 64 });

  return base64;
};

export const getThumbnailAndBlur = async (
  thumbnail: unknown,
  defaultThumbnail: string = '/images/thumbnail.png'
) => {
  const isValid = typeof thumbnail === 'string' && thumbnail.trim() !== '';
  const thumbnailURL = isValid ? thumbnail : defaultThumbnail;
  const blurDataURL = await generateBlurDataForImage(thumbnailURL);

  return { thumbnailURL, blurDataURL };
};
