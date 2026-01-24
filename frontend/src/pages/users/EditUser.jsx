import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../LoadingPage.jsx";
import ErrorPage from "../ErrorPage.jsx";
import { fetchUser, updateUser } from "../../services/userService.js";
import { mapUserData } from "../../utils/BackendMapper.js";
import UserForm from "../../components/layout/form/UserForm.jsx";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser(id)
      .then((user) => {
        const mappedData = mapUserData(user);
        setUser(mappedData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const [backendErrors, setBackendErrors] = useState(null);

  const handleSubmit = async (formData) => {
    setBackendErrors(null);
    try {
      const userData = { ...formData };
      await updateUser(id, userData);
      navigate(`/users/${id}`);
    } catch (error) {
      console.error("Failed to update user:", error);
      setBackendErrors(error);
      window.scrollTo({ top: 0 });
    }
  };

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;

  return (
    <>
      <Header />
      <UserForm
        initialData={user}
        onSubmit={handleSubmit}
        isEdit={true}
        backendErrors={backendErrors}
      />
      <Footer />
    </>
  );
};

export default EditUser;
