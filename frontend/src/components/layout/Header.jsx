import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { USER_ROLES } from "../../config.js";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user && user.role === USER_ROLES.ADMIN;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className="header-title">SpotkajmySie</div>
          <ul className="nav-menu">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Wydarzenia
              </NavLink>
            </li>

            {isAdmin && (
              <li>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Użytkownicy
                </NavLink>
              </li>
            )}

            {user && (
              <>
                <li>
                  <NavLink
                    to="/registrations"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Rejestracje
                  </NavLink>
                </li>
              </>
            )}

            {!user ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Zaloguj się
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Zarejestruj się
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to={`/users/${user.id}`}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Moje konto ({user.email})
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="nav-link nav-logout"
                    title="Wyloguj się"
                  >
                    <FiLogOut />
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
