import React from "react";
import Header from "../header/Header";
// import Footer from "../footer/Footer";
import "./_layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />

      {children}

      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
