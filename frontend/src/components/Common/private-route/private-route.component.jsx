import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
   const localUser =
      localStorage.getItem("user") !== "undefined"
         ? JSON.parse(localStorage.getItem("user"))
         : undefined;
   return (
      <Route
         render={(props) =>
            localUser ? (
               <Component {...props} {...rest} />
            ) : (
               <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
               />
            )
         }
      />
   );
};

export default PrivateRoute;
