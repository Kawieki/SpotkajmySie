import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = ({ error }) => {
  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message || "Wystąpił nieoczekiwany błąd";

  return (
    <>
      <main className="main-content">
        <div className="container text-center">
          <p className="text-danger">{errorMessage}</p>
          <Link to="/" className="btn btn-outline">
            Wróć do strony głównej
          </Link>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
