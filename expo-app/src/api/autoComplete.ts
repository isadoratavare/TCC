import { GOOGLE_MAPS_KEY } from "@env";
import api from "../utils/api";

function useAutoCompleteAPI() {
  async function getAutoComplete(input: string) {
    const res = await api
    .get("", {
      params: {
        input: input || "",
        key: GOOGLE_MAPS_KEY
      },
    })
    .then(response => response.data)
    .catch((e) => alert(e.message))
    
    return res
  }

  return { getAutoComplete };

}

export default useAutoCompleteAPI;