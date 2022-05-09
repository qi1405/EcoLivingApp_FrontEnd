<div>
  <nav className="navbar navbar-expand navbar-dark bg-dark">
    <Link to={"/"} className="navbar-brand">
      bezKoder
    </Link>
    <div className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to={"/home"} className="nav-link">
          Home
        </Link>
      </li>
      {showModeratorBoard && (
        <li className="nav-item">
          <Link to={"/mod"} className="nav-link">
            Moderator Board
          </Link>
        </li>
      )}
      {showAdminBoard && (
        <li className="nav-item">
          <Link to={"/admin"} className="nav-link">
            Admin Board
          </Link>
        </li>
      )}
      {currentUser && (
        <li className="nav-item">
          <Link to={"/user"} className="nav-link">
            User
          </Link>
        </li>
      )}
    </div>

    {currentUser ? (
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
        <li className="nav-item">
          <a
            href="/login"
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
          </a>
        </li>
      </div>
    ) : (
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
    )}
  </nav>
  <div className="container mt-3">
    <Switch>
      <Route exact path={["/", "/home"]} component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/profile" component={Profile} />
      <Route path="/user" component={BoardUser} />
      <Route path="/mod" component={BoardModerator} />
      <Route path="/admin" component={BoardAdmin} />
    </Switch>
  </div>
</div>;
