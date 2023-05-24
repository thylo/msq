const { format, formatISO, getYear } = require("date-fns");
const { fr, en } = require("date-fns/locale");

module.exports.dateIso = (date) => {
  return formatISO(new Date(date));
};

module.exports.dateYear = (date) => {
  return getYear(new Date(date));
};

module.exports.dateMed = (date, locale = "en") => {
  if (date) {
    return format(new Date(date), "dd MMMM, kk:ss");
  }
  return "...";
};
