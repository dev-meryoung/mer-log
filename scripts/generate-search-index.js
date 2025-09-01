const fs = require('fs/promises');
const path = require('path');
const matter = require('gray-matter');
const { getPlaiceholder } = require('plaiceholder');

async function generateBlurDataForImage(imagePath) {
  const fullPath = path.join(process.cwd(), 'public', imagePath);

  try {
    const fileBuffer = await fs.readFile(fullPath);
    const { base64 } = await getPlaiceholder(fileBuffer, { size: 64 });

    return base64;
  } catch (error) {
    console.error(error);

    const defaultImagePath = path.join(
      process.cwd(),
      'public',
      '/images/thumbnail.png'
    );
    const defaultFileBuffer = await fs.readFile(defaultImagePath);
    const { base64 } = await getPlaiceholder(defaultFileBuffer, { size: 64 });

    return base64;
  }
}

async function getThumbnailAndBlur(thumbnail) {
  const defaultThumbnail = '/images/thumbnail.png';
  const isValid = typeof thumbnail === 'string' && thumbnail.trim() !== '';
  const thumbnailURL = isValid ? thumbnail : defaultThumbnail;
  const blurDataURL = await generateBlurDataForImage(thumbnailURL);

  return { thumbnailURL, blurDataURL };
}

async function generateSearchIndex() {
  const postsDir = path.join(process.cwd(), 'public', 'posts');

  try {
    const postFolders = await fs.readdir(postsDir);

    const allPostsData = await Promise.all(
      postFolders.map(async (folderName) => {
        const itemPath = path.join(postsDir, folderName);
        const stats = await fs.stat(itemPath);

        if (stats.isDirectory()) {
          const filePath = path.join(itemPath, 'index.mdx');

          try {
            const fileContents = await fs.readFile(filePath, 'utf8');
            const { data } = matter(fileContents);
            const { thumbnailURL, blurDataURL } = await getThumbnailAndBlur(
              data.thumbnail
            );

            return {
              slug: folderName,
              title: data.title,
              description: data.description,
              date: data.date,
              tags: data.tags,
              thumbnail: thumbnailURL,
              blurDataURL: blurDataURL,
            };
          } catch (e) {
            return null;
          }
        }
        return null;
      })
    );

    const validPosts = allPostsData
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const outputPath = path.join(process.cwd(), 'public', 'search-data.json');
    await fs.writeFile(outputPath, JSON.stringify(validPosts));
  } catch (error) {
    console.error(error);
  }
}

generateSearchIndex();
