# Stately Hyland Apiaries

[statelyhylandapiaries.com](https://statelyhylandapiaries.com)

Stately Hyland Apiaries LLC is a small beekeeping business located in Northeastern New Jersey. This site is the businesses online presence to sell their products and keep customers up to date with periodic blog posts.

- Written in [Typescript](https://www.typescriptlang.org/) for improved tooling and error handling.
- A website built using [Next.Js](https://nextjs.org/), utilizing static generation render each page at build time.
- Leverages the [Stripe](https://stripe.com/) API to manage product information including images, prices, descriptions, categories and more, along with handling payment processing and invoicing.
- Uses [MDX](https://mdxjs.com/) to author blog posts allowing the use of **JSX** inside **Markdown** to create dynamic content.
- Styled using [TailwindCSS](https://tailwindcss.com/) with a mobile-first design approach using almost entirely custom built components.
- Boasts a shopping cart whose contents persist across sessions, using the browsers local storage and React Context to manage global state.
