const convertTemperature = (kelvin) => {
  return kelvin - 273.15;
};

const calcAvgTemp = (groupObj) => {
  const data = Object.entries(groupObj).map(([key, value]) => {
    const result = value.reduce((obj, item, index, array) => {
      let temp = (obj.temp || 0 + item.temp) / array.length;
      obj.id = item.id;
      obj.date = item.date;
      obj.iconLink = item.iconLink;
      obj.temp = Math.round(temp);
      obj.description = item.description;
      return obj;
    }, {});
    return result;
  });
  return data;
};

export { convertTemperature, calcAvgTemp };
