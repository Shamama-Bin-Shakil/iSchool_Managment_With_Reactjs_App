import React, { Fragment } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ loading, isAuthenticated }) => {
  return (
    <Fragment>
      {loading && isAuthenticated === false ? (
        <Navigate to="/admin/login" />
      ) : (
        <Outlet />
      )}
    </Fragment>
  );
};

export default ProtectedRouteAdmin;
