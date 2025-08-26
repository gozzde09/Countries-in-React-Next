"use client";
import React, { createContext, useState, useEffect } from "react";
export const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/region/europe")
      .then((response) => response.json())
      .then((data) => {
        // Tar bort länder som inte har ett huvudstad
        let filteredData = data.filter(
          (country) => country.capital !== undefined
        );
        // Sorterar alfabetiskt
        filteredData = filteredData.sort((a, b) =>
          a.name.common.localeCompare(b.name.common, "sv", {
            sensitivity: "base",
          })
        );
        setCountries(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  return (
    <CountriesContext.Provider value={{ countries }}>
      {children}
    </CountriesContext.Provider>
  );
};
