const translate = (value, locale) => {
  if (value[locale]){
    return value[locale];
  }
  return value;
};

module.exports = {
  translate,
};