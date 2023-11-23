import { getIPGeoApi } from "../helpers/api-helper.js";

const getGeolocationFromBroweserApi = async () => {
  const coords = await new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        res(coords);
      },
      (err) => {
        rej(err.message);
      }
    );
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {};
    });
  return coords;
};

const geolocationFromIP = async () => {
  const data = await getIPGeoApi();
  return data;
}

const getLocation = async () => {
  const geoResult = await getGeolocationFromBroweserApi();

  if (!Object.keys(geoResult).length) {
    try {
      const geoIP = await geolocationFromIP();
      return {
        lat: geoIP.data.latitude,
        lon: geoIP.data.longitude
      }
    } catch (error) {
      console.log(error.message);
      return {};
    }
  } else {
    return geoResult;
  }
}

export { getLocation };
