import fs from 'fs';
import path from 'path';
import imageSize from 'image-size';
import { getPlaiceholder } from 'plaiceholder';

export const generateBlurDataForImage = async (imagePath: string) => {
  const fullPath = path.join(process.cwd(), 'public', imagePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(fullPath);
  }

  const fileBuffer = fs.readFileSync(fullPath);
  const { base64 } = await getPlaiceholder(fileBuffer, { size: 64 });

  return base64;
};

export const getImageSize = async (src: string) => {
  if (src.startsWith('/')) {
    const fullPath = path.join(process.cwd(), 'public', src);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Image not found: ${fullPath}`);
    }

    const fileBuffer = fs.readFileSync(fullPath);
    const dimensions = imageSize(fileBuffer);

    return {
      width: dimensions.width || 1280,
      height: dimensions.height || 720,
    };
  }

  const res = await fetch(src);
  const buffer = await res.arrayBuffer();
  const dimensions = imageSize(Buffer.from(buffer));

  return {
    width: dimensions.width || 1280,
    height: dimensions.height || 720,
  };
};
