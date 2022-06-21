import { Fragment } from "react";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <Fragment>
      <Navbar />
      <main className={classes.main}>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
