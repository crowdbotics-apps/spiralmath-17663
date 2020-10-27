import React from "react";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
   const localUser =
      localStorage.getItem("user") !== "undefined"
         ? JSON.parse(localStorage.getItem("user"))
         : undefined;
   return (
      <Route
         {...rest}
         render={(props) => {
            if (localUser && localUser.userObj.role === "Admin") {
               return <Component {...props} />;
            } else if (
               localUser &&
               localUser.userObj &&
               localUser.userObj.createQuestions
            ) {
               return (
                  <Redirect
                     to={{
                        pathname: "/my-questions",
                        state: { from: props.location },
                     }}
                  />
               );
            } else if (
               localUser &&
               localUser.userObj &&
               localUser.userObj.reviewQuestions
            ) {
               return (
                  <Redirect
                     to={{
                        pathname: "/my-reviews",
                        state: { from: props.location },
                     }}
                  />
               );
            } else {
               return (
                  <Redirect
                     to={{
                        pathname: "/login",
                        state: { from: props.location },
                     }}
                  />
               );
            }
         }}
      />
   );
};

export default AdminRoute;
