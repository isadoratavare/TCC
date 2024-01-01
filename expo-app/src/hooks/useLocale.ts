import { useState } from "react";
import * as Location from "expo-location";
import performance from 'react-native-performance';
import * as FileSystem from 'expo-file-system';

export type LocaleHook = {
  location: Location.LocationObject | null,
  errorMsg: string,
  getLocaleAsync: () => void,
}

export default function useLocale(): LocaleHook {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function getLocaleAsync() {
    performance.mark('getLocationPermission');
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permissão para acessar a localização negada");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    performance.measure('myMeasure', 'getLocationPermission');
    const data = performance.getEntriesByName('myMeasure');
    console.log(data)
    const content = JSON.stringify(data, null, 2);

    try {
      const fileUri = `${FileSystem.documentDirectory}performance_data.json`;
      await FileSystem.writeAsStringAsync(fileUri, content);
      console.log('Dados de performance foram escritos em:', fileUri);
    } catch (error) {
      console.error('Erro ao escrever dados em arquivo:', error);
    }
  }

  return {
    location,
    errorMsg,
    getLocaleAsync
  }
}
