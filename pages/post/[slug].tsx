import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { Params } from "next/dist/server/router";
import sanityClient from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import PostImage from "../../components/postTools/PostImage";

interface IPostSlug {
  slug: {
    _type: "slug";
    current: string;
  };
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { slug } = context.params as Params;
  const post = await sanityClient.fetch(
    `*[_type == 'post' && slug.current == '${slug}']{title, caption, _createdAt, mainImage->, }[0]`
  );

  return {
    props: {
      post: post,
    },
  };
};

export const getStaticPaths = async () => {
  const postSlugs: IPostSlug[] = await sanityClient.fetch(
    `*[_type == 'post']{slug}`
  );

  const paths = postSlugs.map((post) => ({
    params: { slug: post.slug.current },
  }));

  return {
    paths,
    fallback: true,
  };
};

const portableTextComponents = {
  types: {
    image: ({ value }) => <PostImage src="" height={} width={} alt={} justify={} caption={}/>,
  },
};

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="prose">
      <PortableText value={post.body} components={portableTextComponents} />
    </div>
  );
};

export default Post;
