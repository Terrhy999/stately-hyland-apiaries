import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "pm1b5ur3",
  dataset: "production",
  apiVersion: "2022-06-27",
  useCdn: true,
});
