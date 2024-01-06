import { useState } from "react";
import * as Location from "expo-location";
import { MetricsContextProps, useMetrics } from "./useMetrics";

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
  const { getTimeData, addNewValueToJSON } =
    useMetrics() as MetricsContextProps;

  async function getLocaleAsync() {
    const timeInMilliseconds = getTimeData(
      "getLocationPermission",
      async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permissão para acessar a localização negada");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    );

    const content = JSON.stringify(timeInMilliseconds, null, 2);

    addNewValueToJSON(content, "location");
  }

  return {
    location,
    errorMsg,
    getLocaleAsync,
  };
}
