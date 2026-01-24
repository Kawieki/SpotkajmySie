import React from "react";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import UsersList from "../../components/layout/lists/UsersList.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";

const Users = () => {
  return (
    <>
      <Header />
      <PageHeader
        title={"Użytkownicy"}
        description={"Zarządzaj użytkownikami systemu"}
        action={"+ Dodaj Użytkownika"}
        address="/users/add"
        hasPermission={true}
      />
      <UsersList />
      <Footer />
    </>
  );
};

export default Users;
