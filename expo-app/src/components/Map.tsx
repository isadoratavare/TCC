import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useLocale, { LocaleHook } from "../hooks/useLocale";
import { LocationContextProps, useLocation } from "../hooks/useLocation";

const Map: React.FC = () => {
  const { getLocaleAsync, errorMsg, location } = useLocale() as LocaleHook;
  const { initialLocation } = useLocation() as LocationContextProps;

  useEffect(() => {
    getLocaleAsync();
  }, []);

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }
  if (location) {

    const initial = {
      latitude: location?.coords.latitude || 0,
      longitude: location?.coords.longitude || 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    return (
      <MapView style={styles.map} region={initialLocation || initial}>
        <Marker
          coordinate={{
            latitude: initialLocation?.latitude || location?.coords.latitude || 0,
            longitude: initialLocation?.longitude || location?.coords.longitude || 0,
          }}
          title="Minha Localização"
          description="Estou aqui!"
        />
      </MapView>
    );
  }
};
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: " 100%",
  },
});

export default Map;
