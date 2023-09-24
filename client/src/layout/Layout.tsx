import React from "react";
import NavbarHeader from "./NavbarHeader";
import { Outlet } from "react-router-dom";
import Footer  from "./Footer";
const Layout = (): React.ReactNode => {
  return (
    <>
      <NavbarHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;