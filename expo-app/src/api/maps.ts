import { GOOGLE_MAPS_KEY } from "@env";
import api from "../utils/api";

function useMapsAPI() {
  async function getAutoComplete(input: string) {
    const res = await api
    .get("/autocomplete/json", {
      params: {
        input: input || "",
        key: GOOGLE_MAPS_KEY || process.env.GOOGLE_MAPS_KEY
      },
    })
    .then(response => response.data)
    .catch((e) => alert(e.message))
    
    return res
  }

  async function getPlaceById(input: string) {
    const res = await api
   .get("/details/json", {
    params: {
      place_id: input || "",
      key: GOOGLE_MAPS_KEY
    }
    })
    .then(response => response.data)
    .catch((e) => alert(e.error_message))

    return res;
   }
  
  return { getAutoComplete, getPlaceById };

}

export default useMapsAPI;