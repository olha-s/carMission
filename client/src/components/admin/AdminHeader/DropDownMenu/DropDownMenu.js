import React from "react";
import "./DropDownMenu.scss";
import { decodeUser } from "../../../../utils/functions/decodeUser";
import ChangeCredForm from "./ChangeCredForm/ChangeCredForm";

const DropDownMenu = () => {
  const { firstName, lastName, id } = decodeUser().decoded;

  return (
    <div className="dropdown-wrap">
      <span className="dropdown-wrap__name">{firstName}</span>
      <span className="dropdown-wrap__name">{lastName}</span>
      <ChangeCredForm id={id} isLogin />
      <ChangeCredForm id={id} isPass />
    </div>
  );
};

export default DropDownMenu;
