import classes from "./MainNavigation.module.css";
import { NavLink, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

const MainNavigation = () => {
    
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
      const user = AuthService.getCurrentUser();

      if (user) {
        setCurrentUser(user);
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
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
      setCurrentUser(undefined);
    };

  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        The-App
      </Link>
      <nav className={classes.nav}>
        <ul>
          {showModeratorBoard && (
            <Fragment>
              <div>
                <li>
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
                </li>
              </div>
              <div>
                <li>
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
                </li>
              </div>
              <div>
                <li>
                  <NavLink
                    to="/mod"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: "#e6fcfc",
                          }
                        : { color: "" }
                    }
                  >
                    Moderator Board
                  </NavLink>
                </li>
              </div>
            </Fragment>
          )}
          {showAdminBoard && (
            <li>
              <NavLink
                to="/admin"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#e6fcfc",
                      }
                    : { color: "" }
                }
              >
                Admin Board
              </NavLink>
            </li>
          )}
          {currentUser && (
            <li>
              <NavLink
                to="/user"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#e6fcfc",
                      }
                    : { color: "" }
                }
              >
                User
              </NavLink>
            </li>
          )}
          {currentUser ? (
            <Fragment>
              <div>
                <li>
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
                </li>
              </div>
              <div>
                <li>
                  <NavLink
                    to="/login"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: "#e6fcfc",
                          }
                        : { color: "" }
                    }
                    onClick={logOut}
                  >
                    LogOut
                  </NavLink>
                </li>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div>
                <li>
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
                </li>
              </div>
              <div>
                <li>
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
                </li>
              </div>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
