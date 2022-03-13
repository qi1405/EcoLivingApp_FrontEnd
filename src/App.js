// import './App.css';
import React, { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

import AllClients from './components/pages/AllClients';
import ClientDetails from "./components/pages/ClientDetails";
import NewClient from "./components/pages/NewClient";
import NotFound from "./components/pages/NotFound";
import ClientCart from "./components/Clients/ClientCart";

function App() {
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
          <Route
            path="/"
            element={<AllClients />}
          />
          <Route
            path="/clients"
            element={<AllClients />}
          />
          <Route
            path="/clients/:pid/*"
            element={<ClientDetails />}
          />
          <Route path="/new-client" element={<NewClient />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
