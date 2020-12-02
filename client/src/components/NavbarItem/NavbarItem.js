import React from "react";
import PropTypes from "prop-types";
import { HashLink } from "react-router-hash-link";
import "./NavbarItem.scss";
import { useDispatch } from "react-redux";
import { showFeedbackFormAction } from "../../store/FeedbackForm/actions";

const NavbarItem = ({ className, textContent, contacts, sectionId, id }) => {
  const dispatch = useDispatch();
  const showFeedbackModal = () => {
    dispatch(showFeedbackFormAction);
  };

  return (
    <li className={`${className}--item`}>
      <HashLink
        to={sectionId}
        className={`${className}--link`}
        id={id}
        onClick={contacts ? showFeedbackModal : null}
      >
        {/* {sectionId === "#footer" ? contacts : textContent} */}
        {textContent}
      </HashLink>
    </li>
  );
};

NavbarItem.propTypes = {
  className: PropTypes.string,
  textContent: PropTypes.string,
  contacts: PropTypes.string,
  sectionId: PropTypes.string,
};

NavbarItem.defaultProps = {
  className: "",
  textContent: "",
  contacts: "",
  sectionId: "",
};

export default NavbarItem;
