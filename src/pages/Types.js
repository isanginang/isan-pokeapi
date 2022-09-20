import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import TypeInfo from "../components/TypeInfo";
import pokeLogo from "../assets/Pokédex_logo.png";

const Types = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url] = useState("https://pokeapi.co/api/v2/type/");

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const getTypes = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setTypes((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(url, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        getTypes(res.data.results);
        setLoading(false);
      });
    return () => {
      cancel();
    };
  }, [url]);

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
      <div className="container-type">
        <div className="type-list">
          <TypeInfo type={types} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default Types;
