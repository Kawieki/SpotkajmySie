import React from "react";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";

const LoadingPage = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="container text-center">
          <p>Ładowanie...</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoadingPage;
