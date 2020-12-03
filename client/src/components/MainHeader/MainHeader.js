import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UseWinSize from "../../utils/hooks/UseWinSize";
import Navbar from "../Navbar/Navbar";
import Logo from "../Logo/Logo";
import Button from "../generalComponents/Button/Button";
import "./MainHeader.scss";
import { getLogoData } from "../../store/selectors/logoSelectors";
import { getNavbarData } from "../../store/selectors/navbarSelectors";

const MainHeader = () => {
  const logoInfo = useSelector(getLogoData);
  const navbarData = useSelector(getNavbarData);
  const { width: winWidth } = UseWinSize();
  const [isMobileNavbar, setIsMobileNavbar] = useState(false);

  const firstMobileSize = 768;
  const isMobileWindowSize = winWidth <= firstMobileSize;
  const quantOfNavbaItems = navbarData.filter((e) => !e.disabled);
  const leftSideItems =
    quantOfNavbaItems.length > 6
      ? quantOfNavbaItems.slice(0, 5)
      : quantOfNavbaItems.slice(0, 3);
  const rightSideItems =
    quantOfNavbaItems.length > 6
      ? quantOfNavbaItems.slice(5)
      : quantOfNavbaItems.slice(3);

  const checkClick = () => {
    setIsMobileNavbar(!isMobileNavbar);
  };

  const header = !isMobileWindowSize ? (
      <>
        <Navbar className="navbar" items={leftSideItems} />
          <div className="logo__block">
            <Link to="/">
              <Logo
                className="logo"
                src={logoInfo.path}
                id={logoInfo.id}
                alt={logoInfo.alt}
              />
            </Link>
          </div>
        <Navbar className="navbar" items={rightSideItems} />
      </>
    ) : (
      <>
        <div className="logo__block">
          <Link to="/">
            <Logo
              className="logo"
              src={logoInfo.path}
              id={logoInfo.id}
              alt={logoInfo.alt}
            />
          </Link>
        </div>
        {isMobileNavbar ?
          <Navbar
            className="navbar"
            items={navbarData}
            id="navbar"
            mobileNavbar={true}
            onClick={() => checkClick()}
          />
        :
          <Button
            className="open-navbar"
            onClick={setIsMobileNavbar}
            text=""
          />
        }
      </>
    )


  return (
    <div className="header__bg">
      <div className="header__container">
        <div className="navbar__block">{header}</div>
      </div>
    </div>
  );
};

export default MainHeader;
