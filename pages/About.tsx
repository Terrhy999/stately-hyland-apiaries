import Head from "next/head";

const About = () => {
  return (
    <>
      <Head>
        <title>About - SHA</title>
      </Head>
      <div className="w-full prose prose-lg prose-blockquote:border-gray-500 prose-blockquote:bg-gray-300 prose-blockquote:overflow-auto font-lato">
        <h2>Stately Hyland Apiaries LLC</h2>
      </div>
    </>
  );
};

export default About;
