import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { Reorder } from "@material-ui/icons";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowUserBoard(user.roles.includes("ROLE_USER"));
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowUserBoard(false);
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
    // window.location.reload(false);
  };

  return (
    <div className="Navbar">
      <div className="leftSide">
        <div className="links">
          <Link to="/">The-App</Link>
        </div>
      </div>
      <div className="rightSide">
        <div className="links" id={showLinks ? "hidden" : ""}>
          {(showUserBoard || showAdminBoard || showModeratorBoard) && (
            <NavLink
              to="/clients"
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "#e6fcfc",
                    }
                  : { color: "" }
              }
            >
              All Clients
            </NavLink>
          )}
          {(showAdminBoard || showModeratorBoard) && (
            <NavLink
              to="/new-client"
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "#e6fcfc",
                    }
                  : { color: "" }
              }
            >
              Add a Client
            </NavLink>
          )}
          {(showUserBoard || showAdminBoard || showModeratorBoard) && (
            <NavLink
              to="/invoicing"
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "#e6fcfc",
                    }
                  : { color: "" }
              }
            >
              Invoicing
            </NavLink>
          )}
          {currentUser ? (
            <Fragment>
              <NavLink
                to="/profile"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#e6fcfc",
                      }
                    : { color: "" }
                }
              >
                {currentUser.username}
              </NavLink>

              <NavLink
                to="/login"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#e6fcfc",
                      }
                    : { color: "" }
                }
                onClick={() => {logOut(); window.location.href="/#/login"; window.location.reload()}}
              >
                LogOut
              </NavLink>
            </Fragment>
          ) : (
            <Fragment>
              <NavLink
                to="/login"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#e6fcfc",
                      }
                    : { color: "" }
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#e6fcfc",
                      }
                    : { color: "" }
                }
              >
                Sign Up
              </NavLink>
            </Fragment>
          )}
        </div>
        <button onClick={() => setShowLinks(!showLinks)}>
          {" "}
          <Reorder />{" "}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
