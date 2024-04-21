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

  async function getLocaleAsync() {
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
    getLocaleAsync,
  };
}
