import React from "react";
import { Route, Routes, Switch  } from "react-router-dom";
import { Login } from "../../pages/Login";
function LoginRoutes() {
  return (
    <Switch>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Switch>
  );
}

export default LoginRoutes;
