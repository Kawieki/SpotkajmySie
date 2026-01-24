import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Events from "./pages/events/Events.jsx";
import Users from "./pages/users/Users";
import Registrations from "./pages/registrations/Registrations";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import CreateUser from "./pages/users/CreateUser.jsx";
import UserDetails from "./pages/users/UserDetails.jsx";
import ScrollToTop from "./utils/ScrollToTop.js";
import EditUser from "./pages/users/EditUser.jsx";
import RegistrationDetails from "./pages/registrations/RegistrationDetails.jsx";
import CreateEvent from "./pages/events/CreateEvent.jsx";
import EditEvent from "./pages/events/EditEvent.jsx";
import EditRegistration from "./pages/registrations/EditRegistration.jsx";
import CreateRegistration from "./pages/registrations/CreateRegistration.jsx";
import EventDetails from "./pages/events/EventDetails.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import { USER_ROLES } from "./config.js";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* EVENT */}
          <Route
            path="/events/add"
            element={
              <ProtectedRoute roles={[USER_ROLES.ADMIN, USER_ROLES.ORGANIZER]}>
                <CreateEvent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/events/edit/:id"
            element={
              <ProtectedRoute roles={[USER_ROLES.ADMIN, USER_ROLES.ORGANIZER]}>
                <EditEvent />
              </ProtectedRoute>
            }
          />

          {/* USERS */}
          <Route
            path="/users"
            element={
              <ProtectedRoute roles={[USER_ROLES.ADMIN]}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route
            path="/users/add"
            element={
              <ProtectedRoute roles={[USER_ROLES.ADMIN]}>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/edit/:id"
            element={
              <ProtectedRoute selfCheck={true}>
                <EditUser />
              </ProtectedRoute>
            }
          />

          {/* REGISTRATIONS */}
          <Route
            path="/registrations"
            element={
              <ProtectedRoute
                roles={[
                  USER_ROLES.ADMIN,
                  USER_ROLES.ORGANIZER,
                  USER_ROLES.USER,
                ]}
              >
                <Registrations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registrations/:id"
            element={
              <ProtectedRoute
                roles={[
                  USER_ROLES.ADMIN,
                  USER_ROLES.ORGANIZER,
                  USER_ROLES.USER,
                ]}
              >
                <RegistrationDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registrations/add"
            element={
              <ProtectedRoute roles={[USER_ROLES.ADMIN, USER_ROLES.USER]}>
                <CreateRegistration />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registrations/edit/:id"
            element={
              <ProtectedRoute
                roles={[
                  USER_ROLES.ADMIN,
                  USER_ROLES.ORGANIZER,
                  USER_ROLES.USER,
                ]}
              >
                <EditRegistration />
              </ProtectedRoute>
            }
          />

          {/* 404 / 401 */}
          <Route
            path="/unauthorized"
            element={<ErrorPage error={"Brak dostępu do zasobu"} />}
          />
          <Route
            path="*"
            element={<ErrorPage error={"Nie znaleziono zasobu"} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
