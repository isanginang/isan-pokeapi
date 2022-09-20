import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import Loader from "../components/Loader";
import pokeLogo from "../assets/Pokédex_logo.png";

const PokePage = () => {
  const { id } = useParams();
  console.log(id);
  const [pokeDetails, setPokeDetails] = useState();
  const [loading, setLoading] = useState(true);

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const getPokemon = async (id) => {
    const details = await getPokeData(id);
    setPokeDetails(details.data);
    setLoading(false);
  };

  const getPokeData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res;
  };

  useEffect(() => {
    getPokemon(id);
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
          <Link to="/">
            <button className="back-btn">
              <FontAwesomeIcon icon={faLeftLong} />
            </button>
          </Link>
          <div className="poke-content">
            <div className="poke-img">
              <Link to={`/pokemon/${pokeDetails.id}`}>
                <img
                  src={pokeDetails.sprites.other.home.front_default}
                  alt="img poke"
                />
              </Link>
            </div>
            <div className="poke-form">
              <div className="normal-form">
                <img
                  src={pokeDetails.sprites.front_default}
                  alt="normal poke"
                />
                Normal Form
              </div>
              <div className="shiny-form">
                <img src={pokeDetails.sprites.front_shiny} alt="shiny poke" />
                Shiny Form
              </div>
            </div>
            <div
              className={`${pokeDetails.types[0].type.name}-dark name-border`}
            >
              <Link to={`/pokemon/${pokeDetails.name}`} className="link-name">
                <div className="name">
                  {pokeDetails.name.charAt(0).toUpperCase() +
                    pokeDetails.name.slice(1)}
                </div>
              </Link>
            </div>
            <div className="poke-type">
              {pokeDetails.types.map((t) => (
                <Link to={`/type/${t.type.name}`}>
                  <div className={`${t.type.name}-linear types`}>
                    {t.type.name.toUpperCase()}
                  </div>
                </Link>
              ))}
            </div>
            <div className="poke-stats">
              {pokeDetails.stats.map((s) => (
                <div className="stats">
                  {s.stat.name}: {s.base_stat}
                </div>
              ))}
              <div className="stats">weight: {pokeDetails.weight}</div>
              <div className="stats">height: {pokeDetails.height}</div>
            </div>
            <div className="title">
              <h2>ABILITIES</h2>
            </div>
            <div className="poke-abilities">
              {pokeDetails.abilities.map((a) => (
                <div className="abilities">{a.ability.name.toUpperCase()}</div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PokePage;
