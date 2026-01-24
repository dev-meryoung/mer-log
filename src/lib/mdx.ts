import fs from 'fs/promises';
import path from 'path';
import { ReactElement } from 'react';
import matter from 'gray-matter';
import type { Element, Root, Text } from 'hast';
import { notFound } from 'next/navigation';
import { compileMDX, MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import { visit } from 'unist-util-visit';
import MDXComponents from '@/components/MDXComponents';
import type { PostData, Heading } from '@/types/post';
import { getAllPosts } from './posts';

function rehypeExtractHeadings(options: { headings: Heading[] }) {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (['h1', 'h2', 'h3'].includes(node.tagName)) {
        const textContent = node.children
          .filter((child): child is Text => child.type === 'text')
          .map((child) => child.value)
          .join('');

        const id = textContent.trim().replace(/\s+/g, '-').toLowerCase();

        node.properties = node.properties || {};
        node.properties.id = id;

        options.headings.push({
          level: parseInt(node.tagName.substring(1), 10),
          text: textContent,
          id,
        });
      }
    });
  };
}

export const getPost = async (slug: string): Promise<PostData> => {
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const cachedPost = allPosts[currentIndex];
  const previousPost = allPosts[currentIndex + 1] || null;
  const nextPost = allPosts[currentIndex - 1] || null;

  const postDirectory = path.join(process.cwd(), 'public', 'posts', slug);
  const filePath = path.join(postDirectory, 'index.mdx');

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { content } = matter(fileContents);
    const headings: Heading[] = [];

    const { content: mdxSource } = await compileMDX<MDXRemoteProps>({
      source: content,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          rehypePlugins: [
            [rehypeExtractHeadings, { headings }],
            [
              rehypePrettyCode,
              {
                theme: {
                  light: 'github-light',
                  dark: 'one-dark-pro',
                },
                keepBackground: false,
                lineNumbers: true,
              },
            ],
          ],
        },
      },
      components: MDXComponents,
    });

    return {
      postInfo: cachedPost,
      mdxSource: mdxSource as ReactElement<MDXRemoteProps>,
      headings,
      summary: cachedPost.summary,
      previousPost,
      nextPost,
    };
  } catch {
    notFound();
  }
};
