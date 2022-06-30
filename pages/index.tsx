import Head from "next/head";
import sanityClient from "../lib/sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import PostCard from "../components/PostCard";
import { InferGetStaticPropsType } from "next";

const builder = imageUrlBuilder(sanityClient);
const getUrlFor = (source: SanityImageSource) => builder.image(source);

interface IPostCard {
  _createdAt: string;
  caption: string;
  slug: {
    _type: "slug";
    current: string;
  };
  title: string;
  mainImage: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
    crop?: {
      _type: string;
      bottom: number;
      left: number;
      right: number;
      top: number;
    };
    hotspot?: {
      _type: string;
      height: number;
      width: number;
      x: number;
      y: number;
    };
  };
}

export const getStaticProps = async () => {
  const posts: IPostCard[] = await sanityClient.fetch(
    `*[_type == 'post']{title, _createdAt, caption, mainImage, slug}`
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
              thumbnail={getUrlFor(post.mainImage).url()}
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
