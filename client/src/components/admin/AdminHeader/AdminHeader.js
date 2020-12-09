import React from "react";
import Button from "../../generalComponents/Button/Button";
import "./AdminHeader.scss";

const AdminHeader = () => {
  return (
    <div className="admin-header">
      <h3 className="admin-header__head">Admin Page</h3>
      <Button className="button2-send-request" text="Logout" />
    </div>
  );
};

export default AdminHeader;
