import React from "react";
import PropTypes from "prop-types";
import { HashLink } from "react-router-hash-link";
import "./NavbarItem.scss";
import { useDispatch } from "react-redux";
import { showFeedbackFormAction } from "../../store/FeedbackForm/actions";

const NavbarItem = ({ className, textContent, contacts, sectionId, id, isFooter }) => {
  const dispatch = useDispatch();
  const showFeedbackModal = () => {
    dispatch(showFeedbackFormAction);
  };

  const contanctsInfo = contacts.split(/[\\\/]/).map((e) => <p>{e}</p>)

  return (
    <li className={`${className}--item`}>
      <HashLink
        smooth
        to={sectionId}
        className={`${className}--link`}
        id={id}
        onClick={contacts ? showFeedbackModal : null}
      >
        {isFooter ? contanctsInfo : textContent}
      </HashLink>
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
  isFooter: false
};

export default NavbarItem;
