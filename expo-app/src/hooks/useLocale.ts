import { useState } from "react";
import * as Location from "expo-location";
import performance from "react-native-performance";
import { LocationContextProps, useLocation } from "./useLocation";

export type LocaleHook = {
  location: Location.LocationObject | null;
  errorMsg: string;
  getLocaleAsync: () => void;
};

export default function useLocale(): LocaleHook {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState("");
  const { appendDataToJsonArray } = useLocation() as LocationContextProps; 
  
  async function getLocaleAsync() {
    performance.mark("getLocationPermission");

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permissão para acessar a localização negada");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    performance.measure("myMeasure", "getLocationPermission");
    
    const data = performance.getEntriesByName("myMeasure");
    const content = JSON.stringify(data[0].duration , null, 2);
    appendDataToJsonArray(content)
  }

  return {
    location,
    errorMsg,
    getLocaleAsync,
  };
}
