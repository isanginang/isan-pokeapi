import React, { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faXmark } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  const [filterData, setFilterData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [pokemonName, setPokemonName] = useState([]);
  const searchBar = useState(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154"
  );

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setSearchName(searchWord);
    const newFilter = pokemonName.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  };

  const clearInput = () => {
    setFilterData([]);
    setSearchName("");
  };

  const getSearchPoke = async (res) => {
    setPokemonName(res.results);
  };

  useEffect(() => {
    let cancel;

    axios
      .get(searchBar, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        getSearchPoke(res.data);
      });

    return () => {
      cancel();
    };
  }, [searchName]);

  return (
    <div className="search-content">
      <div className="search-input">
        <input
          type="text"
          placeholder="Search"
          value={searchName}
          onChange={handleFilter}
        />
        {filterData.length === 0 ? (
          <FontAwesomeIcon icon={faKeyboard} id="write-ico" />
        ) : (
          <FontAwesomeIcon icon={faXmark} id="clear-btn" onClick={clearInput} />
        )}
      </div>
      {filterData.length !== 0 && (
        <div className="data-result">
          {filterData.slice(0, 15).map((value) => {
            return (
              <a className="data-item" href={`/pokemon/${value.name}`}>
                <p>{value.name}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
