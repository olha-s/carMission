import React from "react";
import PropTypes from "prop-types";
import { HashLink } from "react-router-hash-link";
import "./NavbarItem.scss";
import { useDispatch } from "react-redux";
import { showFeedbackFormAction } from "../../store/FeedbackForm/actions";
import { v4 as uuidv4 } from "uuid";

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

  return (
    <li className={`${className}--item`}>
      <HashLink
        smooth
        to={sectionId}
        className={`${className}--link`}
        id={id}
        onClick={contacts ? showFeedbackModal : null}
        data-testid="navbarItemHashLink"
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
  isFooter: false,
};

export default NavbarItem;
