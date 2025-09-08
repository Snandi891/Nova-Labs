import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ✅ Google Site Verification */}
        <meta
          name="google-site-verification"
          content="Rp8ch_A0AdO8zWFIkG7L_o2-h4hyRNeKVn5Vo8EZDwo"
        />

        {/* ✅ Mobile viewport fix */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
