import React from "react";
import { Link } from "react-router-dom";

import Loader from "./Loader";

const PokeInfo = ({ pokemon, loading }) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        pokemon.map((item) => {
          return (
            <>
              <div
                className={`${item.types[0].type.name}-radial list-card`}
                key={item.id}
              >
                <Link to={`/pokemon/${item.id}`}>
                  <div className="card">
                    <h2>#{item.id}</h2>
                    <img
                      src={item.sprites.other.home.front_default}
                      alt={item.name}
                    />
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

export default PokeInfo;
