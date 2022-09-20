import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loader = () => {
  return (
    <div className="loader">
      <div className="load-ico">
        <FontAwesomeIcon icon={faSpinner} />
      </div>
      <div className="load-name">Fetch Pokemon...</div>
    </div>
  );
};

export default Loader;
