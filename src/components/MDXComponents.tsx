import Image from 'next/image';
import { generateBlurDataForImage, getImageSize } from '@/lib/images';

interface MDXImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

const MDXImage = async ({ src, alt = 'image' }: MDXImageProps) => {
  const [imageBlur, imageSize] = await Promise.all([
    generateBlurDataForImage(src),
    getImageSize(src),
  ]);

  return (
    <Image
      src={src}
      alt={alt}
      width={imageSize.width}
      height={imageSize.height}
      className='max-w-full h-auto object-cover rounded-lg'
      placeholder='blur'
      blurDataURL={imageBlur}
    />
  );
};

const MDXComponents = {
  img: MDXImage,
};

export default MDXComponents;
