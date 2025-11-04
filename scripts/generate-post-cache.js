const fs = require('fs/promises');
const path = require('path');
const matter = require('gray-matter');
const { getPlaiceholder } = require('plaiceholder');
const { Document } = require('flexsearch');

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

async function stripMarkdown(mdContent) {
  try {
    const { remark } = await import('remark');
    const { default: strip } = await import('strip-markdown');
    const file = await remark().use(strip).process(mdContent);

    return String(file);
  } catch (error) {
    console.error(error);

    return '';
  }
}

async function generatePostCache() {
  const postsDir = path.join(process.cwd(), 'public', 'posts');
  const dataDir = path.join(process.cwd(), 'public', 'data');
  const searchIndexDir = path.join(dataDir, 'search');

  const searchIndex = new Document({
    charset: 'utf-8',
    document: {
      id: 'id',
      index: ['title', 'description', 'tags', 'content'],
      store: ['slug'],
    },
  });
  let postCounter = 0;

  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.mkdir(searchIndexDir, { recursive: true });

    const postFolders = await fs.readdir(postsDir);

    const allPostsData = await Promise.all(
      postFolders.map(async (folderName) => {
        const itemPath = path.join(postsDir, folderName);
        let stats;

        try {
          stats = await fs.stat(itemPath);
        } catch (error) {
          return null;
        }

        try {
          stats = await fs.stat(itemPath);
        } catch (error) {
          return null;
        }

        if (stats.isDirectory()) {
          const filePath = path.join(itemPath, 'index.mdx');

          try {
            const fileContents = await fs.readFile(filePath, 'utf8');
            const { data, content } = matter(fileContents);
            const { thumbnailURL, blurDataURL } = await getThumbnailAndBlur(
              data.thumbnail
            );

            const strippedContent = await stripMarkdown(content);
            const tagsString = (data.tags || []).join(' ');

            searchIndex.add({
              id: postCounter++,
              slug: folderName,
              title: data.title,
              description: data.description,
              tags: tagsString,
              content: strippedContent,
            });

            return {
              slug: folderName,
              title: data.title,
              description: data.description,
              date: data.date,
              tags: data.tags,
              thumbnail: thumbnailURL,
              blurDataURL: blurDataURL,
            };
          } catch (error) {
            console.log(error);

            return null;
          }
        }
        return null;
      })
    );

    const validPosts = allPostsData
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    const listCachePath = path.join(dataDir, 'post-cache.json');
    await fs.writeFile(listCachePath, JSON.stringify(validPosts));

    const exportPromises = [];
    searchIndex.export((key, data) => {
      if (!data) return;
      const filePath = path.join(searchIndexDir, key);
      exportPromises.push(fs.writeFile(filePath, data, 'utf-8'));
    });

    await Promise.all(exportPromises);
  } catch (error) {
    console.error(error);
  }
}

generatePostCache();
