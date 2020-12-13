import React from "react";
import { NavLink } from "react-router-dom";

const SideBarItem = ({ id }) => {
  return (
    <li className="admin-sidebar__item">
      <NavLink
        to={`/admin/${id}`}
        activeClassName="admin-sidebar__link--active"
        className="admin-sidebar__link"
      >
        {id}
      </NavLink>
    </li>
  );
};

export default SideBarItem;
