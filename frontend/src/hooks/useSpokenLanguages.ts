import axios from "axios";
import { useEffect, useState } from "react";

function useSpokenLanguages() {
  const [spokenLanguages, setSpokenLanguages] = useState<string[]>([]);
  const [isLoadingSpokenLanguages, setIsLoadingSpokenLanguages] =
    useState(true);
  const [errorSpokenLanguages, setErrorSpokenLanguages] = useState(null);
  useEffect(() => {
    setErrorSpokenLanguages(null);
    const fetchSpokenLanguages = async () => {
      axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => {
          const languages = new Set<string>();

          response.data.forEach(
            (country: { languages?: { [key: string]: string } }) => {
              if (country.languages) {
                Object.values(country.languages).forEach((language) => {
                  languages.add(language);
                });
              }
            },
          );

          const sortedLanguages = [...languages].sort((a, b) =>
            a.localeCompare(b),
          );
          setSpokenLanguages(sortedLanguages);
        })
        .catch((error) => {
          console.error("Error fetching countries data:", error);
          setErrorSpokenLanguages(error);
        })
        .finally(() => {
          setIsLoadingSpokenLanguages(false);
        });
    };
    fetchSpokenLanguages();
  }, []);

  return { spokenLanguages, isLoadingSpokenLanguages, errorSpokenLanguages };
}

export default useSpokenLanguages;
