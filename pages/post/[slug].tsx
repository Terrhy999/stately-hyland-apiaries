import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { Params } from "next/dist/server/router";
import sanityClient from "../../lib/sanity";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import PostImage from "../../components/postTools/PostImage";
import { getFormattedDate } from "../../lib/utils";
import { TypedObject } from "@portabletext/types";

interface IPostSlug {
  slug: {
    _type: "slug";
    current: string;
  };
}

interface ISanityPost {
  _createdAt: string;
  caption: string;
  title: string;
  body: TypedObject[];
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { slug } = context.params as Params;
  const post: ISanityPost = await sanityClient.fetch(
    `*[_type == 'post' && slug.current == '${slug}']{title, caption, _createdAt, body[]{
      ...,
      asset->
    }}[0]`
  );

  if (post.title == null) {
    throw new Error("title prop is null");
  }

  return {
    props: {
      post: post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postSlugs: IPostSlug[] = await sanityClient.fetch(
    `*[_type == 'post']{slug}`
  );

  const paths = postSlugs.map((post) => ({
    params: { slug: post.slug.current },
  }));

  return {
    paths,
    fallback: false,
  };
};

const portableTextComponents: Partial<PortableTextComponents> = {
  types: {
    image: ({ value }) => (
      <PostImage
        src={value.asset.url}
        height={value.asset.metadata.dimensions.height}
        width={value.asset.metadata.dimensions.width}
        caption={value.caption}
        justify="center"
      />
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-shaGreen visited:text-purple-900"
        >
          {children}
        </a>
      );
    },
  },
};

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="prose prose-lg">
      <div className="mb-3">
        <h2 className="mb-1">{post.title}</h2>
        <p className="text-gray-500 mb-0">
          {getFormattedDate(post._createdAt)}
        </p>
      </div>
      <PortableText value={post.body} components={portableTextComponents} />
    </div>
  );
};

export default Post;
