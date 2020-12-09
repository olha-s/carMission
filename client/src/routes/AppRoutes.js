import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import Page404 from "../pages/Page404/Page404";
import MainPage from "../pages/MainPage/MainPage";
import AdminPage from "../pages/AdminPage/AdminPage";

const AppRoutes = () => {
  const isAuth = true;

  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/catalog-usa" render={() => <p>cars from usa</p>} />
      <Route
        exact
        path="/catalog-in-stock"
        render={() => <p>cars in stock</p>}
      />
      <Route exact path="/blog/:id" render={() => <p>chosen full blog</p>} />
      <Route
        exact
        path="/catalog-usa/:carId"
        render={() => <p>full info for car from usa</p>}
      />
      <Route
        exact
        path="/catalog-in-stock/:carId"
        render={() => <p>full info for car in stock</p>}
      />
      <Route
        exact
        path="/admin/login"
        render={() => <p>full info for car in stock</p>}
      />
      <ProtectedRoute
        authenticated={isAuth}
        exact
        path="/admin"
        component={AdminPage}
      />
      <Route path="*" component={Page404} />
    </Switch>
  );
};

export default AppRoutes;

const ProtectedRoute = ({ authenticated, ...props }) =>
  authenticated ? <Route {...props} /> : <Redirect to="/" />;
