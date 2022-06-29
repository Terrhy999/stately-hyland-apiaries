import Head from "next/head";
import sanityClient from "../lib/sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import PostCard from "../components/PostCard";

const builder = imageUrlBuilder(sanityClient);
const getUrlFor = (source: SanityImageSource) => builder.image(source);

export const getStaticProps = async () => {
  const posts = await sanityClient.fetch(
    `*[_type == 'post']{title, _createdAt, caption, mainImage, slug}`
  );
  return { props: { posts } };
};

const Home = ({ posts }) => {
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
              slug={post.slug}
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
