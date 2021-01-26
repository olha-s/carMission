import React from "react";
import { useSelector } from "react-redux";
import SideBarItem from "../SideBarItem/SideBarItem";
import "./SideBar.scss";
import { getMainSections } from "../../../../store/appMainSections/selectors";

const SideBar = () => {
  const navFromDB = useSelector(getMainSections)
    .filter((i) => i.disabled === false)
    .filter((i) => i.name !== "auto-offer")
    .map(({ name, heading }) => {
      return {
        route: name,
        heading,
      };
    });

  const links = [
    {
      route: "users",
      heading: "Администраторы",
    },
    {
      route: "main-page-sections",
      heading: "Секции главной страницы",
    },
    {
      route: "navbar",
      heading: "Пункты меню",
    },
    
    ...navFromDB,
    {
      route: "social-networks",
      heading: "Социальные сети",
    },
    {
      route: "Logo",
      heading: "Главное Лого",
    },
  ];

  const linksList = links.map(({ route, heading }, index) => {
    return <SideBarItem route={route} heading={heading} key={index} />;
  });

  return (
    <nav className="admin-sidebar">
      <ul className="admin-sidebar__list">{linksList}</ul>
    </nav>
  );
};

export default SideBar;
