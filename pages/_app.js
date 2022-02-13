import React from "react";
import PropTypes from "prop-types";

import "../styles/globals.css";
import Layout from "../components/Layout";

const propTypes = {
  Component: PropTypes.elementType.isRequired,
};
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
MyApp.propTypes = propTypes;
export default MyApp;
