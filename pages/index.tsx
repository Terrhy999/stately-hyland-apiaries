import Head from "next/head";
import sanityClient from "../lib/sanity";
import PostCard from "../components/PostCard";
import { InferGetStaticPropsType } from "next";
import type { ISanityPost } from "../types";

export const getStaticProps = async () => {
  const posts: ISanityPost[] = await sanityClient.fetch(
    `*[_type == 'post']{title, _createdAt, caption, mainImage{..., asset->}, slug}`
  );
  return { props: { posts } };
};

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Home - SHA</title>
      </Head>
      <div className="w-full">
        <h2 className="text-3xl font-lato font-bold pb-5">Blog Posts</h2>
        <div className="w-full h-min grid grid-cols sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <PostCard
              title={post.title}
              imageAsset={post.mainImage.asset}
              caption={post.caption}
              slug={post.slug.current}
              date={post._createdAt}
              key={i}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
