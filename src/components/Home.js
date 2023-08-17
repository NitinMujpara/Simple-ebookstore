import React from "react";
import "./css/page.css";
import Head from "./head";
import Footer from "./Footer";

function Home() {
  return (
    <div>
      <Head />
      <div className="page">
        <div className="page-body">🏡 Home Page</div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
