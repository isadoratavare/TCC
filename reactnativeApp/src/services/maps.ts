/* eslint-disable prettier/prettier */
import useMapsAPI from "../api/maps";

function useMapsService() {
  const { getAutoComplete, getPlaceById } = useMapsAPI();

  async function getAutoCompleteList(input: string) {
    const response = await getAutoComplete(input);
    const places = response?.predictions?.map(
      (prediction: {
        place_id: string;
        structured_formatting: { main_text: string };
        description: string;
      }) => {
        return {
          id: prediction.place_id,
          name: prediction.structured_formatting.main_text,
          description: prediction.description,
        };
      }
    );

    return places;
  }

  async function getPlaceGeometry(id: string) {
    const response = await getPlaceById(id);

    const { location, viewport } = response?.result?.geometry;
    return {
      id: id,
      name: response.result.address_components[0].long_name,
      latitude: location?.lat,
      longitude: location?.lng,
      latitudeDelta: Math.abs(viewport.northeast.lat - viewport.southwest.lat),
      longitudeDelta: Math.abs(viewport.northeast.lng - viewport.southwest.lng),
    };
  }
  return { getAutoCompleteList, getPlaceGeometry };
}

export default useMapsService;
