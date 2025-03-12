import fs from 'fs';
import path from 'path';
import imageSize from 'image-size';
import { getPlaiceholder } from 'plaiceholder';

const computeDimensions = (buffer: Buffer) => {
  const dimensions = imageSize(buffer);

  return {
    width: dimensions.width || 1280,
    height: dimensions.height || 720,
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
    const res = await fetch(src);

    if (!res.ok) {
      throw new Error(src);
    }

    buffer = Buffer.from(await res.arrayBuffer());
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
