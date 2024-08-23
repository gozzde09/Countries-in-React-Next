"use client";
import React, { useContext, useState, useMemo, useEffect } from "react";
import { CountriesContext } from "../CountriesContext";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import Img from "next/image";
import PageKontrol from "../components/PageKontrol";

const Buttons = styled.button`
  background-color: #204764;
  color: white;
  text-style: none;
  padding: 0.25em 1em;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;
const Divs = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
const Loading = styled.p`
  margin: 30px auto;
  color: #e6ae05;
  font-size: xx-large;
  font-weight: bolder;
  text-align: center;
`;
const AlphabetButtons = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;

  button {
    background-color: #198754;
    color: white;
    text-style: none;
    margin: 0;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    cursor: pointer;
  }
`;
export default function Countries() {
  const { countries } = useContext(CountriesContext); //tar fetch data
  const [searchInput, setSearchInput] = useState("");
  const [searchLetter, setSearchLetter] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  //Sök efter ord och sätter page 1
  const handleSearch = (query) => {
    console.log("Sök resultat:", query);
    setSearchInput(query);
    setPage(1);
  };
  const handleLetterClick = (letter) => {
    setSearchLetter(letter);
    setPage(1);
  };

  //Filtrera länder via SearchInput, SearchLetter + räknar sidan
  const filteredCountries = useMemo(() => {
    let filtered = countries;
    //Sök bokstav
    if (searchLetter) {
      setSearchInput("");
      filtered = filtered.filter((country) =>
        country.translations.swe.common
          .toLowerCase()
          .startsWith(searchLetter.toLowerCase())
      );
    }
    // Sök text
   if (searchInput) {
    setSearchLetter("");
      filtered = filtered.filter((country) =>
        country.translations.swe.common
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    }
    const itemsPerPage = 20;
    const start = (page - 1) * 20;
    const end = start + 20;
    const lastPage = Math.ceil(filtered.length / itemsPerPage);
    setLastPage(lastPage);
    return filtered.slice(start, end);
  }, [countries, searchInput, searchLetter, page]);

  const next = () => {
    setPage(page + 1);
  };
  const previous = () => {
    setPage(page - 1);
  };
  const first = () => {
    setPage(1);
  };
  const last = () => {
    setPage(lastPage);
  };

  // GET IMAGES
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    filteredCountries.forEach((country) => {
      fetch(
        `https://api.unsplash.com/search/photos?query=${country.name.common}`,
        {
          headers: {
            Authorization:
              "Client-ID YXkvGz4I8Jzxgr9QCjb3uCZC7y4_wyYabGwGEtXUJJg",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results.length > 0) {
            const imageUrl = data.results[0].urls.regular;
            setImageUrls((prevImages) => ({
              ...prevImages,
              [country.name.common]: imageUrl,
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    });
  }, [filteredCountries]);

  const Cards = {
    maxWidth: "20rem",
    marginBottom: 30,
    fontSize: "0.9rem",
    backgroundColor: "rgb(244, 237, 215)",
    maxHeight: "max-content",
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset`,
  };
  const Vertical = {
    display: " inline-block",
    margin: "10px",
    verticalAlign: "sub",
    fontSize: "1rem",
  };
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <React.Fragment>
      <h2 className='mx-auto mt-4'>Alla Länder</h2>
      {/* SÖKRUTA */}
      <div
        style={{ width: "50%" }}
        className='d-flex mx-auto input-group justify-content-center align-items-center'>
        <input
          type='text'
          placeholder='Sök efter ett land...'
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          className='mx-auto form-control my-4'
          style={{ width: "50%", border: "1px solid #28a745" }}
        />
        <button
          type='button'
          id='search'
          className='btn btn-success btn-lg align-items-center'
          style={{ height: 42 }}>
          <i className='bi bi-search'></i>
        </button>
      </div>
      <AlphabetButtons>
        {alphabet.map((letter) => (
          <button key={letter} onClick={() => handleLetterClick(letter)}>
            {letter}
          </button>
        ))}
      </AlphabetButtons>
      {/*  SIDA KONTROLL med props*/}
      {/* Sidanummer inte om det inte finns ett result */}
      {filteredCountries.length > 0 && (
        <PageKontrol
          countryAntal={filteredCountries.length}
          page={page}
          lastPage={lastPage}
          next={next}
          previous={previous}
          first={first}
          last={last}
          setPage={setPage}
        />
      )}

      {/* CARDS */}
      {filteredCountries.length == 0 ? (
        <Loading>Inget land hittades! Försök igen.</Loading>
      ) : (
        <Divs>
          {filteredCountries.map((country) => (
            <Card style={Cards} key={country.translations.swe.common}>
              <Card.Img
                //src={`https://source.unsplash.com/random/?${country.name.common}`}
                src={imageUrls[country.name.common]}
                alt={`Picture of ${country.name.common}`}
                style={{ height: 200 }}
                loading='lazy'
              />
              <Card.Body>
                <Img
                  src={country.flags.svg}
                  alt={`Flag of ${country.translations.swe.common}`}
                  width={30}
                  height={20}
                />
                <Card.Title style={Vertical}>
                  {country.translations.swe.common}
                </Card.Title>
                <Card.Text>
                  Landets huvudstad är {country.capital}, och det officiella
                  språket är{" "}
                  {country.languages && Object.values(country.languages)[0]}.
                </Card.Text>
                <Link href={`/countries/${country.name.common}`} passHref>
                  <Buttons>Läs mer</Buttons>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </Divs>
      )}
    </React.Fragment>
  );
}
