import Head from "next/head";

interface INextHeader {
  title?: string;
  description?: string;
  image?: string;
  author?: string;
}

const SiteHeader: React.FC<INextHeader> = ({
  title,
  description,
  image,
  author,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/logo.png" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      <meta property="title" content={title} />
      <meta property="description" content={description} />
      <meta property="image" content={image} />

      <meta charSet="UTF-8" />

      <meta name="author" content={author} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image:url" content={image} />
      <meta property="og:image" content={image} />

      {/* <meta property="og:url" content="https://dig.af/" /> */}

      <meta property="og:type" content="website" />

      {/* <meta property="og:locale" content="fa_GB" />
      <meta property="og:site_name" content="DIG" /> */}

      {/* <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" /> */}

      {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" /> */}
    </Head>
  );
};

export default SiteHeader;
