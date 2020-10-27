import React from "react";
import Dashboard from "../../../pages/header/dashboard.component";

const Layout = ({ children }) => {
   return (
      <>
         <Dashboard />
         {children}
      </>
   );
};

export default Layout;
