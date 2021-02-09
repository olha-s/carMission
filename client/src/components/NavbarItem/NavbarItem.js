import React from "react";
import PropTypes from "prop-types";
import { HashLink } from "react-router-hash-link";
import "./NavbarItem.scss";
import { useDispatch } from "react-redux";
import { showFeedbackFormAction } from "../../store/FeedbackForm/actions";
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation } from "react-router-dom";

const NavbarItem = ({
  className,
  textContent,
  contacts,
  sectionId,
  id,
  isFooter,
}) => {
  const dispatch = useDispatch();
  const showFeedbackModal = () => {
    dispatch(showFeedbackFormAction);
  };
  const contanctsInfo = contacts
    .split(/[/]/)
    .map((e) => <p key={uuidv4()}>{e}</p>);

  const { pathname } = useLocation();
  const mainPage = pathname === "/"

  const hashlinkItem = <HashLink
                        smooth
                        to={`#${sectionId}`}
                        className={`${className}--link`}
                        id={id}
                        data-testid="navbarItemHashLink"
                      >
                        {isFooter && contacts ? contanctsInfo : textContent}
                      </HashLink>

  const linkItem = <Link
                    to={`/#${sectionId}`}
                    className={`${className}--link`}
                    id={id}
                    data-testid="navbarItemHashLink"
                  >
                    {isFooter ? contanctsInfo : textContent}
                  </Link>

  const simpleItem = <div
                      className={`${className}--link`}
                      id={id}
                      onClick={showFeedbackModal}
                      data-testid="navbarItemHashLink"
                    >
                      {isFooter && contacts ? contanctsInfo : textContent}
                    </div>

  const renderItem = sectionId ? mainPage ? hashlinkItem : linkItem : simpleItem;

  return (
    <li className={`${className}--item`}>
      {renderItem}
    </li>
  );
};

NavbarItem.propTypes = {
  className: PropTypes.string,
  textContent: PropTypes.string,
  contacts: PropTypes.string,
  sectionId: PropTypes.string,
  id: PropTypes.string,
  isFooter: PropTypes.bool,
};

NavbarItem.defaultProps = {
  className: "",
  textContent: "",
  contacts: "",
  sectionId: "",
  id: "",
  isFooter: false,
};

export default NavbarItem;
