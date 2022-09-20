import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import Loader from "../components/Loader";
import pokeLogo from "../assets/Pokédex_logo.png";

const TypePage = () => {
  const { id } = useParams();
  const [typeList, setTypeList] = useState();
  const [loading, setLoading] = useState(true);

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const getType = async (id) => {
    const details = await getTypeData(id);
    setTypeList(details.data);
    setLoading(false);
  };

  const getTypeData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/type/${id}`);
    return res;
  };

  useEffect(() => {
    getType(id);
  }, [id]);

  return (
    <>
      <header>
        <div className="head-content">
          <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
            <img src={pokeLogo} alt="poke" />
          </a>
          <nav ref={navRef}>
            <h1>
              <Link to="/">Poke List</Link>
            </h1>
            <h1>
              <Link to="/type">Type</Link>
            </h1>
            <div id="nav-btn">
              <FontAwesomeIcon
                icon={faXmark}
                id="nav-close-btn"
                onClick={showNavbar}
              />
            </div>
          </nav>
          <FontAwesomeIcon icon={faBars} id="nav-btn" onClick={showNavbar} />
        </div>
      </header>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Link to="/type">
            <button className="back-btn">
              <FontAwesomeIcon icon={faLeftLong} />
            </button>
          </Link>
          <div className="type-name">
            <div className={`${typeList.name} type-border`}>
              <Link to={`/type/${typeList.name}`} className="link-name">
                <div className="type">
                  {typeList.name.charAt(0).toUpperCase() +
                    typeList.name.slice(1)}
                </div>
              </Link>
            </div>
            <div className="type-content">
              {typeList.pokemon.map((p) => (
                <Link to={`/pokemon/${p.pokemon.name}`}>
                  <div className="type-card">#{p.pokemon.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TypePage;
