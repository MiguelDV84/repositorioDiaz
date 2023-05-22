import React from "react";
import { Route , Navigate} from "react-router-dom";

import { useAuth } from "../customHook/Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authTokens } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        authTokens ? (
          <Component {...props} />
        ) : (
            <Navigate to="/login" replace />
        )
      }
    />
  );
};

export default PrivateRoute;
