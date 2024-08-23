"use client";
import React, { useContext } from "react";
import { CountriesContext } from "../CountriesContext";
import styled from "styled-components";
import Link from "next/link";

const Loading = styled.p`
  margin: 30px auto;
  color: #e6ae05;
  font-size: xx-large;
  font-weight: bolder;
  text-align: center;
`;

const ScrollDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  max-height: 750px;
  max-width: 300px;
  overflow-y: auto;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: rgb(244, 237, 215);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const ListItem = styled.li`
  list-style: none;
  color: #204764;
  cursor: pointer;
  &:hover {
    color: #28a745;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;
const FixedHeader = styled.h1`
  position: sticky;
  top: 0;
  background-color: rgb(244, 237, 215);
  margin: 0 5px;
  padding: 0;
  z-index: 1;
  text-align: center;
`;

export default function CountryList() {
  const { countries } = useContext(CountriesContext); //tar fetch data

  return (
    <React.Fragment>
      {countries === null ? (
        <Loading>Loading...</Loading>
      ) : (
        <ScrollDiv>
          <FixedHeader>Välj ett land...</FixedHeader>
          <ul>
            {countries.map((country) => (
              <StyledLink
                key={country.translations.swe.common}
                href={`/countries/${country.name.common}`}
                passHref>
                <ListItem>{country.translations.swe.common}</ListItem>
              </StyledLink>
            ))}
          </ul>
        </ScrollDiv>
      )}
    </React.Fragment>
  );
}
