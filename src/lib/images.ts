import fs from 'fs';
import path from 'path';
import { getPlaiceholder } from 'plaiceholder';

export const generateBlurDataForImage = async (imagePath: string) => {
  const fullPath = path.join(process.cwd(), 'public', imagePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(fullPath);
  }

  const fileBuffer = fs.readFileSync(fullPath);
  const { base64 } = await getPlaiceholder(fileBuffer, { size: 32 });

  return base64;
};
