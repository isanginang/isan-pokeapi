import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import PokeInfo from "../components/PokeInfo";
import SearchBar from "../components/SearchBar";
import pokeLogo from "../assets/Pokédex_logo.png";

const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokemon((state) => {
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
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
        getPokemon(res.data.results);
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
      <div className="search-section">
        <SearchBar />
      </div>
      <div className="container">
        <div className="poke-list">
          <PokeInfo pokemon={pokemon} loading={loading} />
        </div>
        <div className="btn-group">
          {prevPage && (
            <button
              onClick={() => {
                setPokemon([]);
                setUrl(prevPage);
              }}
            >
              Previous
            </button>
          )}
          {nextPage && (
            <button
              onClick={() => {
                setPokemon([]);
                setUrl(nextPage);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
