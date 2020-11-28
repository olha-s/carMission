import React, { useState, useEffect } from "react";
import "./Loader.scss";
import Image from "../Image/Image";
import axios from "axios";
import PropTypes from "prop-types";

const Loader = ({ className }) => {
  const [loaderData, setLoaderData] = useState([]);

  useEffect(() => {
    getLoaderData();
  }, []);

  const getLoaderData = async () => {
    setLoaderData(
      await axios("/api/loader")
        .then((res) => res.data)
        .catch((err) => console.error(err))
    );
  };

  const loaderImages = loaderData.map((e) => (
    <Image
      className={e.className}
      id={e._id}
      alt={e.className}
      src={e.path}
      key={e._id}
    />
  ));

  return <div className={className}>{loaderImages}</div>;
};

Loader.propTypes = {
  className: PropTypes.string,
};

Loader.defaultProps = {
  className: "loader-window",
};

export default Loader;
