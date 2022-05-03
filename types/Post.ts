export interface Post {
  frontmatter: Frontmatter;
  content: string;
  slug: string;
}

export interface Frontmatter {
  title: string;
  date: string;
  thumbnail: string;
}
