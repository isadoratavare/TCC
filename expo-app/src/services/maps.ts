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
    return  response?.result?.geometry?.location;
  }
  return { getAutoCompleteList, getPlaceGeometry };
}

export default useMapsService;
