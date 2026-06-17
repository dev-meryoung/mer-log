import { load } from 'js-yaml';

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

export const parseMdxFrontmatter = (
  source: string
): { data: unknown; content: string } => {
  const match = source.match(FRONTMATTER_PATTERN);

  if (!match) {
    return {
      data: {},
      content: source,
    };
  }

  return {
    data: load(match[1]) ?? {},
    content: source.slice(match[0].length),
  };
};
