import classes from "./MainNavigation.module.css";
import { NavLink, Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>The-App</Link>
      <nav className={classes.nav}>
        <ul>
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
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
