import "@/styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* ✅ Google Site Verification */}
        <meta
          name="google-site-verification"
          content="Rp8ch_A0AdO8zWFIkG7L_o2-h4hyRNeKVn5Vo8EZDwo"
        />
      </Head>
      <Component {...pageProps} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
