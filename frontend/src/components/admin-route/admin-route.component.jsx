import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  const localUser = useSelector((state) => state.authentication.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        localUser && localUser.userObj.role === "Admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default AdminRoute;
