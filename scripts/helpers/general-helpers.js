import { config } from "../config/config.js";

const createIconUrl = (iconCode) => {
  const url = `${config.iconUrl}${iconCode}.svg`;
  return url;
};

const filterList = (list, value) => {
  const listFiltered = list.filter(item => item !== value);
  return listFiltered;
}

const filterObjectList = (list, prop, value) => {
  const listFiltered = list.filter((item) => item[prop] !== value);
  return listFiltered;
};
export { createIconUrl, filterList, filterObjectList };
