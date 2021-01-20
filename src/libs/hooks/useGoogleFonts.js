import { useEffect, useState } from 'react';
import config from 'config';
import { delayFor, includesIgnoreCase } from 'libs/specialFuncs';

const { GOOGLE_FONTS_API_KEY } = config;

const GOOGLE_FONTS_API_POINT = `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`;

const getGoogleFonts = async () => {
  try {
    const response = await fetch(GOOGLE_FONTS_API_POINT);
    const googleFonts = await response.json();
    const fontsItems = Array.isArray(googleFonts.items) ? googleFonts.items : [];
    return fontsItems;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default ({ initialSearchKey = '', resultsLimit = 50, delayPeriod = 300 } = {}) => {
  const [fonts, setFonts] = useState([]);
  const [filteredFonts, setFilteredFonts] = useState([]);
  const [searchKey, setSearchKey] = useState(initialSearchKey);
  const [isLoading, setLoading] = useState(false);

  const onSearch = (key) => setSearchKey(key);

  const loadGoogleFonts = async (updateFonts) => {
    setLoading(true);
    const loadedFonts = await getGoogleFonts();
    if (delayPeriod) await delayFor(delayPeriod);
    updateFonts(loadedFonts);
  };

  useEffect(() => {
    loadGoogleFonts((fonts) => {
      setFonts(fonts);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let filteredFonts = fonts;

    if (searchKey) {
      filteredFonts = fonts
        .filter((font) => {
          const isMatch = includesIgnoreCase(font.family, searchKey);
          return searchKey ? isMatch : true;
        });
    }

    const limited = resultsLimit ? filteredFonts.slice(0, resultsLimit) : filteredFonts;
    setFilteredFonts(limited);
  }, [searchKey, fonts]);

  return [
    filteredFonts,
    onSearch,
    { isLoading, searchKey, resultsFound: filteredFonts.length }
  ];
};
