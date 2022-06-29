import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { Params } from "next/dist/server/router";
import sanityClient from "../../lib/sanity";
import { PortableText } from "@portabletext/react";

// interface ISanityPost {
//   _createdAt: string;
//   _id: string;
//   slug: string;
//   title: string;
// }

type postSlug = {
  slug: {
    _type: "slug";
    current: "string";
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { slug } = context.params as Params;
  const post = await sanityClient.fetch(
    `*[_type == 'post' && slug.current == '${slug}'][0]`
  );

  return {
    props: {
      post: post,
    },
  };
};

export const getStaticPaths = async () => {
  const postSlugs: postSlug[] = await sanityClient.fetch(
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

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="prose">
      <PortableText value={post.body} />
    </div>
  );
};

export default Post;
