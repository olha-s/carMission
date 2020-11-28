import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UseWinSize from "../../utils/hooks/UseWinSize";
import Navbar from "../Navbar/Navbar";
import Image from "../Image/Image";
import Button from "../generalComponents/Button/Button";
import "./MainHeader.scss";
import { getLogoData } from "../../store/selectors/logoSelectors";
import { getNavbarData } from "../../store/selectors/navbarSelectors";

const MainHeader = () => {
  const location = useLocation();
  const logoInfo = useSelector(getLogoData);
  const navbarData = useSelector(getNavbarData);
  const { width: winWidth } = UseWinSize();
  const [isMobileNavbar, setIsMobileNavbar] = useState(false);

  const firstMobileSize = 640;
  const isMobileWindowSize = winWidth <= firstMobileSize;
  const sectionsLinks = navbarData
    .filter((e) => e.sectionId !== undefined)
    .map((e) => {
      return "/" + e.sectionId;
    })
    .concat("/");
  const quantOfNavbaItems = navbarData.filter((e) => !e.disabled);
  const mainPage = sectionsLinks.includes(location.pathname);
  const headerBgClassName = mainPage ? "header__bg-main" : "header__bg-minor";
  const leftSideItems =
    quantOfNavbaItems.length > 6
      ? quantOfNavbaItems.slice(0, 5)
      : quantOfNavbaItems.slice(0, 3);
  const rightSideItems =
    quantOfNavbaItems.length > 6
      ? quantOfNavbaItems.slice(5)
      : quantOfNavbaItems.slice(3);

  const checkClick = (e) => {
    setIsMobileNavbar(!isMobileNavbar);
  };

  return (
    <div className={headerBgClassName}>
      <div className="header__container">
        <div className="navbar__block">
          {!isMobileWindowSize && (
            <Navbar className="navbar" items={leftSideItems} />
          )}
          {!isMobileWindowSize && (
            <div className="logo__block">
              <Link to="/">
                <Image
                  className="logo"
                  src={logoInfo.path}
                  id={logoInfo.id}
                  alt={logoInfo.alt}
                />
              </Link>
            </div>
          )}
          {!isMobileWindowSize && (
            <Navbar className="navbar" items={rightSideItems} />
          )}

          {/* Conditional rendering for device window size less 640 px */}

          {isMobileWindowSize && isMobileNavbar ? (
            <Navbar
              className="navbar"
              items={navbarData}
              id="navbar"
              mobileNavbar={true}
              onClick={(e) => checkClick(e)}
            />
          ) : null}
          {isMobileWindowSize && !isMobileNavbar ? (
            <Button
              className="open-navbar"
              onClick={setIsMobileNavbar}
              text=""
            />
          ) : null}
          {isMobileWindowSize && (
            <div className="logo__block">
              <Link to="/">
                <Image
                  className="logo"
                  src={logoInfo.path}
                  id={logoInfo.id}
                  alt={logoInfo.alt}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
