import axios from "axios";
import {GOOGLE_MAPS_KEY} from "@env";

export const API_URL =
  "https://maps.googleapis.com/maps/api/place/autocomplete/json";

const api = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    "key": GOOGLE_MAPS_KEY
  },
});

export default api;
