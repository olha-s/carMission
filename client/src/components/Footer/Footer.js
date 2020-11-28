import React from "react";
import "./Footer.scss";
import Navbar from "../Navbar/Navbar";
import Image from "../Image/Image";
import { useSelector } from "react-redux";
import { getLogoData } from "../../store/selectors/logoSelectors";
import { getNavbarData } from "../../store/selectors/navbarSelectors";
import { Link } from "react-router-dom";

const Footer = () => {
  const logoInfo = useSelector(getLogoData);
  const navbarItems = useSelector(getNavbarData);
  const quantOfNavbaItems = navbarItems.filter((e) => !e.disabled);
  const leftSideItems =
    quantOfNavbaItems.length > 6
      ? quantOfNavbaItems.slice(0, 4)
      : quantOfNavbaItems.slice(0, 3);
  const rightSideItems =
    quantOfNavbaItems.length > 6
      ? quantOfNavbaItems.slice(4)
      : quantOfNavbaItems.slice(3);

  return (
    <div className="footer__bg">
      <div className="footer__container">
        <div className="footer__block" id="footer">
          <Navbar className="footer--left-side footer" items={leftSideItems} />
          <div className="footer__info-block">
            <Link to="/">
              <Image
                className="logo"
                src={logoInfo.path}
                id={logoInfo.id}
                alt={logoInfo.alt}
              />
            </Link>
            <div className="footer__line"></div>
            <div className="footer__social-networks">
              facebook instagram telegram youtube
            </div>
          </div>
          <Navbar
            className="footer--right-side footer"
            items={rightSideItems}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
