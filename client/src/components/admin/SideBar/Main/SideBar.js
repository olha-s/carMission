import React from "react";
import { useSelector } from "react-redux";
import { getNavbarData } from "../../../../store/navbar/selectors";
import SideBarItem from "../SideBarItem/SideBarItem";
import "./SideBar.scss";

const SideBar = () => {
  const navFromDB = useSelector(getNavbarData)
    .map((nav) => nav.sectionId)
    .filter((i) => !!i !== false);
  const linksId = ["main-page-sections"];
  navFromDB.forEach((link) => {
    const normalLink = link
      .split("")
      .filter((c) => c !== "#")
      .join("");
    linksId.push(normalLink);
  });

  const linksList = linksId.map((id, index) => {
    return <SideBarItem id={id} key={index} />;
  });

  return (
    <nav className="admin-sidebar">
      <ul className="admin-sidebar__list">{linksList}</ul>
    </nav>
  );
};

export default SideBar;
