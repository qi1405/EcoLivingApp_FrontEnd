// import './App.css';
import React, { Suspense, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import BoardAdmin from "./components/pages/BoardAdmin";
import BoardModerator from "./components/pages/BoardModerator";
import BoardUser from "./components/pages/BoardUser";
import AllClients from "./components/pages/AllClients";
import ClientDetails from "./components/pages/ClientDetails";
import NewClient from "./components/pages/NewClient";
import NotFound from "./components/pages/NotFound";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
import Invoicing from "./components/pages/Invoicing";
import AuthService from "./components/services/auth.service";
import EventBus from "./components/common/EventBus";

// import ClientCart from "./components/Clients/ClientCart";

function App() {
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
  };

  // const [cartIsShown, setCartIsShown] = useState(false);

  // const showCartHandler = () => {
  //    setCartIsShown(true);
  // };

  // const hideCartHandler = () => {
  //   setCartIsShown(false);
  // };

  return (
    <Layout>
      {/* {cartIsShown && <ClientCart onClose={hideCartHandler} />} */}
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/clients" element={<AllClients />} />
          <Route path="/clients/:pid/*" element={<ClientDetails />} />
          {(showAdminBoard || showModeratorBoard) && (
          <Route path="/new-client" element={<NewClient />} />
          )}
          <Route path="*" element={<NotFound />} />
          {(!showUserBoard || !showAdminBoard || !showModeratorBoard) && (
            <Route path="/login" element={<Login />} />
          )}
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
          {(showUserBoard || showAdminBoard || showModeratorBoard) && (
            <Route path="/invoicing" element={<Invoicing />} />
          )}
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
