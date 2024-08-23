"use client";
import React, { useContext, useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { CountriesContext } from "../../CountriesContext";
import CountryList from "../../components/CountryList";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import Img from "next/image";

const Buttons = styled.button`
  background-color: #204764;
  color: white;
  text-style: none;
  padding: 0.25em 1em;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Loading = styled.p`
  margin: 30px auto;
  color: #e6ae05;
  font-size: xx-large;
  font-weight: bolder;
  text-align: center;
`;
export default function About({ params }) {
  const { countries } = useContext(CountriesContext); //tar fetch data
  let { countryName } = params;

  countryName = decodeURIComponent(countryName).trim().toLowerCase(); //tar bort % mellan ord
  const Country = countries.find(
    (country) => country.name.common.trim().toLowerCase() === countryName
  );

  //BILDER
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${countryName}`,
          {
            headers: {
              Authorization:
                "Client-ID YXkvGz4I8Jzxgr9QCjb3uCZC7y4_wyYabGwGEtXUJJg",
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();
        // Spara första trebilder
        const imageUrls = data.results
          .slice(0, 3)
          .map((result) => result.urls.regular);
        setImageUrls(imageUrls);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (countryName) {
      fetchImage();
    }
  }, [countryName]);

  const Cards = {
    width: "30rem",
    margin: "30px auto",
    backgroundColor: "rgb(244, 237, 215)",
    fontSize: "0.9rem",
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset`,
  };
  const Vertical = {
    display: " inline-block",
    margin: "10px",
    verticalAlign: "sub",
  };

  return (
    <React.Fragment>
      {Country === null ? (
        <Loading>Loading...</Loading>
      ) : (
        <Div>
          {Country && (
            <Card style={Cards} key={Country.translations.swe.common}>
              <Carousel>
                {imageUrls.map((url, index) => (
                  <Carousel.Item key={index} style={{ maxHeight: 300 }}>
                    <Img
                      src={url}
                      alt={`Image of ${countryName} ${index + 1}`}
                      width={500}
                      height={250}
                      priority
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
              <Link href='/countries' passHref>
                <Buttons style={{ position: "absolute", top: 0, right: 0 }}>
                  X
                </Buttons>
              </Link>
              <Card.Body style={{ padding: 30 }}>
                <Img
                  src={Country.flags.svg}
                  alt='Flag of {country.translations.swe.common}'
                  width={30}
                  height={20}
                  priority={true}
                />
                <Card.Title style={Vertical}>
                  <h4>
                    <strong>Om {Country.translations.swe.common}</strong>
                  </h4>
                </Card.Title>
                <div>
                  <h5>
                    <strong> Region: </strong> {Country.region}
                  </h5>
                  <h5>
                    <strong> Subregion: </strong> {Country.subregion}
                  </h5>
                  <h4>Detaljer</h4>
                  <ul>
                    <li>Official Namn: {Country.name.official}</li>
                    <li>Huvudstad: {Country.capital[0]}</li>
                    <li>
                      Språk:
                      <ul>
                        {Country.languages &&
                          Object.values(Country.languages).map(
                            (language, index) => (
                              <li key={index}>
                                <span> {language} </span>
                              </li>
                            )
                          )}
                      </ul>
                    </li>
                    <li>
                      {Country.currencies &&
                        Object.entries(Country.currencies).map(
                          ([currencyCode, currency]) => (
                            <span key={currency}>
                              Valuta: {currencyCode} : {currency.symbol} -{" "}
                              {currency.name}
                            </span>
                          )
                        )}
                    </li>
                    <li>Befolkning: {Country.population}</li>
                    <li>Yta: {Country.area} km²</li>
                    <li>
                      {Country.car.side === "right"
                        ? "Traffik: Höger"
                        : "Traffik: Vänster"}
                    </li>
                  </ul>
                  <h4>Kartor</h4>
                  <ul>
                    <li>
                      Google Maps : {""}
                      <a href={Country.maps.googleMaps} target='_blank'>
                        Link
                      </a>
                    </li>
                    <li>
                      OpenStreetMaps : {""}
                      <a href={Country.maps.openStreetMaps} target='_blank'>
                        Link
                      </a>
                    </li>
                  </ul>
                </div>
                <Div>
                  <Link href='/countries' passHref>
                    <Buttons>Alla länder</Buttons>
                  </Link>
                  <Link href='/' passHref>
                    <Buttons>Gå hemsida</Buttons>
                  </Link>
                </Div>
              </Card.Body>
            </Card>
          )}
          <CountryList />
        </Div>
      )}
    </React.Fragment>
  );
}
