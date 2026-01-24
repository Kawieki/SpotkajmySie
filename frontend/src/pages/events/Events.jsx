import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import EventsList from "../../components/layout/lists/EventsList.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { USER_ROLES } from "../../config.js";
import EventsManagementList from "../../components/layout/lists/EventsManagementList.jsx";

const Events = () => {
  const { user } = useAuth();
  const isAdminOrOrganizer =
    user == null ? false : user.role !== USER_ROLES.USER;

  const pageTitle = isAdminOrOrganizer
    ? "Zarządzaj wydarzeniami"
    : "Nadchodzące wydarzenia";
  const pageDescription = isAdminOrOrganizer
    ? "Edytuj, usuwaj i dodawaj wydarzenia"
    : "Przeglądaj i zapisuj się na wydarzenia w Twojej okolicy";

  return (
    <>
      <Header />
      <PageHeader
        title={pageTitle}
        description={pageDescription}
        action={"+ Dodaj wydarzenie"}
        address={"/events/add"}
        hasPermission={isAdminOrOrganizer}
      />
      <main className="main-content">
        <div className="container">
          <div className="grid"></div>
          {isAdminOrOrganizer ? <EventsManagementList /> : <EventsList />}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Events;
