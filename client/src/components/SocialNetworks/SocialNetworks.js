import React, { useState, useEffect } from "react";
import SocialNetworksItem from "../SocialNetworksItem/SocialNetworksItem";
import PropTypes from "prop-types";
import axios from "axios";
import "./SocialNetworks.scss";

const SocialNetworks = ({ className }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios("/api/social-networks");
    const data = response.data.map(async item => {
        const icon = await import(`./SocialNetworksIcons/${item.name}`);
        const newItem = {
            ...item,
            src: icon.default
        };
        return  newItem;
    });
    const snCollection = await Promise.all(data);
    setItems(snCollection);
}

  const linkItems = items.map((e) =>
    e.isEnabled ? (
      <SocialNetworksItem
        src={e.src}
        listClassName={`${className}-item`}
        className={`${className}--${e.name}`}
        url={e.url}
        id={`${e.name}-link`}
        key={e._id || e.id}
      />
    ) : null
  );
  return <ul className={className}>{linkItems}</ul>;
};

SocialNetworks.propTypes = {
  className: PropTypes.string
};

SocialNetworks.defaultTypes = {
  className: ""
}

export default SocialNetworks;
