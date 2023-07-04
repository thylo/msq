const { format, formatISO, getYear } = require("date-fns");
const { fr, en, de } = require("date-fns/locale");

module.exports.dateIso = (date) => {
  return formatISO(new Date(date));
};

module.exports.dateYear = (date) => {
  return getYear(new Date(date));
};

module.exports.dateMed = (date, lng = "en") => {
  let locale = fr;
  let dateFormat = "dd MMMM yyyy, kk:ss";
  if (lng === "en"){
    locale = en
  }
  if (lng === "lu"){
    dateFormat = "dd/LL/yyyy, kk:ss"
  }
  if (date) {
    return format(new Date(date), dateFormat , {locale});
  }
  return "...";
};
