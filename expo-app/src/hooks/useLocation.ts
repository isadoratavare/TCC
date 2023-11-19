import { useState } from "react";
import * as Location from "expo-location";

export type LocationHook = {
  location: Location.LocationObject | null,
  errorMsg: string,
  getLocationAsync
  : () => void,
}

export default function useLocation(): LocationHook {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function getLocationAsync() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permissão para acessar a localização negada");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  return {
    location,
    errorMsg,
    getLocationAsync
  }
}
