import React from "react";
import PropTypes from "prop-types";

const Links = (props) => {
  const { text, href } = props;
  return (
    <a target="_blank" rel="noopener noreferrer" href={href}>
      {" "}
      {text}{" "}
    </a>
  );
};

export default Links;

Links.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
};
