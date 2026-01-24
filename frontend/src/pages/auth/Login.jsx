import React from "react";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import LoginForm from "../../components/layout/form/LoginForm.jsx";

const Login = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="mb-lg">
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
