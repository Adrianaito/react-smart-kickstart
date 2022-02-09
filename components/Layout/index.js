import Navbar from "../Navbar";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Smart Funding</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
