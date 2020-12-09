import React from "react";
import AdminHeader from "../../components/admin/AdminHeader/AdminHeader";
import SideBar from "../../components/admin/SideBar/SideBar";
import FormContainerWorkStages from "../../components/admin/WorkStages/FormContainer/FormContainerWorkStages";
import FormContainerMainPageSections from "../../components/admin/MainPageSections/FormContainer/FormContainer";
import FormContainerAboutUs from "../../components/admin/AboutUs/FormContainer/FormContainerAboutUs";

const AdminPage = () => {
  return (
    <>
      <AdminHeader />
      <SideBar />
      <FormContainerMainPageSections/>
      <FormContainerAboutUs />
      <FormContainerWorkStages />
    </>
  );
};

export default AdminPage;
