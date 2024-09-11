import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute() {
  const { currentuser } = useSelector((state) => state.user);

  return (
    Object.keys(currentuser).length !== 0 ? (
      <Outlet />
    ) : (
      <Navigate to="/signin" />
    )
  );
}

export default ProtectedRoute;

// ye chala nhi thaa mane jugar lagaya ha profile m use effect ma chek kia ager current user=={} ha to re direct kr dia signin page pe

