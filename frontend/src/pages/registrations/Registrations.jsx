import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { USER_ROLES } from "../../config.js";
import RegistrationsManagementList from "../../components/layout/lists/RegistrationsManagementList.jsx";

const Registrations = () => {
  const { user } = useAuth();
  const isAdminOrOrganizer =
    user == null ? false : user.role !== USER_ROLES.USER;

  const pageTitle = isAdminOrOrganizer
    ? "Zarządzaj rejestracjami"
    : "Moje rejestracje";
  const pageDescription = isAdminOrOrganizer
    ? "Edytuj, usuwaj i dodawaj rejestracje"
    : "Przeglądaj swoje rejestracje na wydarzenia";

  return (
    <>
      <Header />
      <PageHeader
        title={pageTitle}
        description={pageDescription}
        action={"+ Dodaj rejestrację"}
        address={"/registrations/add"}
        hasPermission={user?.role === USER_ROLES.ADMIN}
      />
      <main className="main-content">
        <div className="container">
          <div className="grid"></div>
          <RegistrationsManagementList />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Registrations;
