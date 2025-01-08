import { GOOGLE_MAPS_KEY } from "@env";
import  { API_URL } from "../utils/api";
import { Alert } from "react-native";

function useMapsAPI() {
  async function getAutoComplete(input: string) {
    try {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_KEY;
      const url = `${API_URL}/autocomplete/json?input=${encodeURIComponent(input || "")}&key=AIzaSyD1knDAKWnd5-3R-MfZFIqL_vizI3DzkbI`;
  
      const response = await fetch(url);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro na solicitação: ${response.status} - ${errorData.error_message}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      Alert.alert(error?.message || "Erro ao buscar autocomplete");
      return null;
    }
  }

  async function getPlaceById(input: string) {
    try {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_KEY;
      const url = `${API_URL}/details/json?place_id=${encodeURIComponent(
        input || ""
      )}&key=AIzaSyD1knDAKWnd5-3R-MfZFIqL_vizI3DzkbI`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Erro na solicitação: ${response.status} - ${errorData.error_message}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      Alert.alert(error?.message || "Erro ao buscar place by id");
      return null;
    }
  }

  return { getAutoComplete, getPlaceById };
}

export default useMapsAPI;
