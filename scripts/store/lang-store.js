const state = { lang: 'ua' };

const useLangStore = () => {
  const setLanguage = (lang) => {
    state.lang = lang;
  };

  return {
    setLanguage,
    state,
  };
};

export { useLangStore };
