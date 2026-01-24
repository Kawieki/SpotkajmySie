import React from "react";
import { useEvents } from "../../../hooks/events/useEvents.js";
import EventItemManagement from "../../common/Items/EventItemManagement.jsx";
import Pagination from "../../common/Pagination.jsx";
import LoadingPage from "../../../pages/LoadingPage.jsx";
import ErrorPage from "../../../pages/ErrorPage.jsx";

const EventsManagementList = () => {
  const { events, page, totalPages, setPage, loading, error, removeEvent } =
    useEvents();

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
                  <th>Tytuł</th>
                  <th>Data rozpoczęcia</th>
                  <th>Lokalizacja</th>
                  <th>Typ</th>
                  <th>Organizator</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <EventItemManagement
                    event={event}
                    key={event.id}
                    onDelete={removeEvent}
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

export default EventsManagementList;
