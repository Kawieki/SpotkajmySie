import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import { Link, useParams } from "react-router-dom";
import BackButton from "../../components/common/buttons/BackButton.jsx";
import UserStatisticsCard from "../../components/common/cards/UserStatisticsCard.jsx";
import OrganizedEventsCard from "../../components/common/cards/OrganizedEventsCard.jsx";
import AttendanceList from "../../components/layout/lists/AttendanceList.jsx";
import { useUser, useUsers } from "../../hooks/users/useUsers.js";
import { USER_ROLES } from "../../config.js";
import Card from "../../components/common/cards/Card.jsx";
import React from "react";
import { getUserBadge, getRoleLabel } from "../../utils/BadgesHelper.js";
import DetailItem from "../../components/common/Items/DetailItem.jsx";
import DeleteButton from "../../components/common/buttons/DeleteButton.jsx";
import LoadingPage from "../LoadingPage.jsx";
import ErrorPage from "../ErrorPage.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import RegistrationsCard from "../../components/common/cards/RegistrationsCard.jsx";

const UserDetails = () => {
  const { id } = useParams();
  const { error, loading, user } = useUser(id);
  const { removeUser } = useUsers();
  const { user: currentUser } = useAuth();

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;

  const isOrganizer = user.role === USER_ROLES.ORGANIZER;
  const isUser = user.role === USER_ROLES.USER;
  const canEdit =
    id === currentUser.id || currentUser.role === USER_ROLES.ADMIN;

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="mb-lg">
            <BackButton />
          </div>

          <div className="grid grid-3">
            <div className="grid-col-span-2">
              <Card
                title={
                  <>
                    <h1 className="card-title">
                      {user.firstName} {user.lastName}
                    </h1>
                    <div className={`mt-sm badge ${getUserBadge(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </div>
                  </>
                }
                footer={
                  <>
                    {canEdit && (
                      <>
                        <Link
                          to={`/users/edit/${user.id}`}
                          className="btn btn-outline"
                        >
                          Edytuj profile
                        </Link>
                        <DeleteButton
                          itemId={user.id}
                          onDelete={removeUser}
                          confirmMessage={`Czy na pewno chcesz usunac konto: ${user.firstName} ${user.lastName} (${user.email})?`}
                        />
                      </>
                    )}
                  </>
                }
              >
                <h3>Informacje osobiste</h3>
                <div className="grid grid-2">
                  <DetailItem label="Imię" value={user.firstName} />
                  <DetailItem label="Nazwisko" value={user.lastName} />
                  <DetailItem label="Email" value={user.email} />
                  <DetailItem label="Rola" value={getRoleLabel(user.role)} />
                </div>

                {user.description && (
                  <>
                    <h3 className="mt-lg">O mnie</h3>
                    <p>{user.description}</p>
                  </>
                )}
              </Card>

              {user.totalAttendanceCount > 0 && (
                <AttendanceList
                  registrations={user.registrations}
                  totalAttendance={user.totalAttendeesCount}
                />
              )}
            </div>

            <div>
              {isOrganizer ? (
                <OrganizedEventsCard user={user} />
              ) : isUser ? (
                <RegistrationsCard user={user} />
              ) : (
                <UserStatisticsCard user={user} />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserDetails;
