import { getPlacesApi } from '../helpers/index.js';

const loadPlaces = async (place) => {
  try {
    const result = await getPlacesApi(place);
    if (result.data.results.length) {
      const results = result.data.results.map((item) => {
        const place = {
          placeId: item.place_id,
          placeName: item.formatted,
          lat: item.lat,
          lon: item.lon,
        };
        return place;
      });
      return results;
    }

    return result.data.results;
  } catch (error) {
    console.log(error.message);
  }
};

export { loadPlaces };
