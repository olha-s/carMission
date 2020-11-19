import React from "react";
import { Switch, Route } from "react-router-dom";
import Page404 from "../pages/Page404/Page404";

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <p>home page</p>} />
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
      <Route exact path="/admin" render={() => <p>admin page</p>} />
      <Route path="*" component={Page404} />
    </Switch>
  );
};

export default AppRoutes;
