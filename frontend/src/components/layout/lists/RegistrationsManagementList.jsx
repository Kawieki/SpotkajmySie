import React from "react";
import { useRegistrations } from "../../../hooks/registrations/useRegistrations.js";
import RegistrationItem from "../../common/Items/RegistrationItem.jsx";
import Pagination from "../../common/Pagination.jsx";
import LoadingPage from "../../../pages/LoadingPage.jsx";
import ErrorPage from "../../../pages/ErrorPage.jsx";

const RegistrationsManagementList = () => {
  const {
    registrations,
    page,
    totalPages,
    setPage,
    loading,
    error,
    removeRegistration,
  } = useRegistrations();

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;

  return (
    <>
      <main className="main-content">
        <div className="container">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Użytkownik</th>
                  <th>Wydarzenie</th>
                  <th>Data rejestracji</th>
                  <th>Status</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration) => (
                  <RegistrationItem
                    registration={registration}
                    key={registration.id}
                    onDelete={removeRegistration}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
};

export default RegistrationsManagementList;
