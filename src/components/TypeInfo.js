import React from "react";
import { Link } from "react-router-dom";

import Loader from "./Loader";

const TypeInfo = ({ type, loading }) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        type.map((item) => {
          return (
            <>
              <div
                className={`${item.name}-linear list-ty-card`}
                key={item.name}
              >
                <Link to={`/type/${item.id}`}>
                  <div className="card-ty">
                    <h2>
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </h2>
                  </div>
                </Link>
              </div>
            </>
          );
        })
      )}
    </>
  );
};

export default TypeInfo;
