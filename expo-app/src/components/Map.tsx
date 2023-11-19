import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useLocation, { LocationHook } from "../hooks/useLocation";

const Map: React.FC = () => {
  const { getLocationAsync, errorMsg, location } = useLocation() as LocationHook;
  useEffect(() => {
    getLocationAsync();

  }, [ ])
  if (errorMsg) {
    return <Text>{errorMsg}</Text>
  }
  if (location) {
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude || 0,
          longitude: location?.coords.longitude || 0 ,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location?.coords.latitude || 0,
            longitude: location?.coords.longitude || 0,
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
