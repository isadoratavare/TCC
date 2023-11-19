import useAutoCompleteAPI from "../api/autoComplete";

function useAutoCompleteService() {
  const { getAutoComplete } = useAutoCompleteAPI();

  async function getAutoCompleteList({ input }: { input: string }) {
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
  return { getAutoCompleteList };
}

export default useAutoCompleteService;
