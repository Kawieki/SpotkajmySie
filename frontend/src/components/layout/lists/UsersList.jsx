import React from "react";
import { useUsers } from "../../../hooks/users/useUsers.js";
import UserItem from "../../common/Items/UserItem.jsx";
import Pagination from "../../common/Pagination.jsx";
import LoadingPage from "../../../pages/LoadingPage.jsx";
import ErrorPage from "../../../pages/ErrorPage.jsx";

const UsersList = () => {
  const { users, page, totalPages, setPage, loading, error, removeUser } =
    useUsers();

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
                  <th>Imię i Nazwisko</th>
                  <th>Email</th>
                  <th>Rola</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserItem user={user} key={user.id} onDelete={removeUser} />
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

export default UsersList;
