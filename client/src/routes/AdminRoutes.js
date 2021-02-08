import React from "react";
import { Switch, Route } from "react-router-dom";
import FormContainerMainPageSections from "../components/admin/MainPageSections/FormContainer/FormContainer";
import FormContainerAboutUs from "../components/admin/AboutUs/FormContainer/FormContainerAboutUs";
import FormContainerWorkStages from "../components/admin/WorkStages/FormContainer/FormContainerWorkStages";
import FormContainerServicePakages from "../components/admin/ServicePakages/FormContainer/FormContainerServicePackages";
import Page404 from "../pages/Page404/Page404";
import FormContainerReviewCarousel from "../components/admin/ReviewCarousel/FormContainer/FormContainerReviewCarousel";
import AdminNavbar from "../components/admin/AdminNavbar/AdminNavbar";
import AdminLogo from "../components/admin/AdminLogo/AdminLogo";
import AdminSocialNetworks from "../components/admin/AdminSocialNetworks/AdminSocialNetworks";
import FormContainerBlogs from "../components/admin/Blogs/FormContainer/FormContainerBlogs";
import AdminsWrapper from "../components/admin/AdminUsers/AdminsWrapper/AdminsWrapper";
import { decodeUser } from "../utils/functions/decodeUser";

const AdminRoutes = () => {
  const { isOwner } = decodeUser().decoded;

  return (
    <Switch>
      <Route exact path="/admin/" />
      <Route exact path="/admin/navbar" component={AdminNavbar} />
      <Route exact path="/admin/logo" component={AdminLogo} />
      <Route
        exact
        path="/admin/main-page-sections"
        component={FormContainerMainPageSections}
      />
      <Route exact path="/admin/about-us" component={FormContainerAboutUs} />
      <Route
        exact
        path="/admin/work-stages"
        component={FormContainerWorkStages}
      />
      <Route
        exact
        path="/admin/social-networks"
        component={AdminSocialNetworks}
      />
      <Route
        exact
        path="/admin/service-packages"
        component={FormContainerServicePakages}
      />
      <Route
        exact
        path="/admin/reviews"
        component={FormContainerReviewCarousel}
      />
      <Route exact path="/admin/blogs" component={FormContainerBlogs} />
      <Route
        exact
        path="/admin/car-catalog"
        component={FormContainerWorkStages}
      />
      <Route
        exact
        path="/admin/calculator"
        component={FormContainerWorkStages}
      />
      {isOwner && <Route exact path="/admin/users" component={AdminsWrapper} />}
      <Route path="*" component={Page404} />
    </Switch>
  );
};

export default AdminRoutes;
