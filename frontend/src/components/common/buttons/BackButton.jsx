import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ fallback, title }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button type="button" onClick={handleBack} className={"btn btn-primary"}>
      ← {title || "Powrót"}
    </button>
  );
};

export default BackButton;
