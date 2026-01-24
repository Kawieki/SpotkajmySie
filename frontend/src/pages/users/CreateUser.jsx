import React, { useState } from "react";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import UserForm from "../../components/layout/form/userForm.jsx";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/userService.js";

const CreateUser = () => {
  const navigate = useNavigate();
  const [backendErrors, setBackendErrors] = useState(null);

  const handleSubmit = async (formData) => {
    setBackendErrors(null);
    try {
      const user = await createUser(formData);
      navigate(`/users/${user.id}`);
    } catch (error) {
      console.error("Failed to create user:", error);
      setBackendErrors(error);
      window.scrollTo({ top: 0 });
    }
  };
  return (
    <>
      <Header />
      <UserForm onSubmit={handleSubmit} backendErrors={backendErrors} />
      <Footer />
    </>
  );
};

export default CreateUser;
