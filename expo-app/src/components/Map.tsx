import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LatLng } from "../@types";

const Map: React.FC<{ initialLocation: LatLng }> = ({
  initialLocation,
}: {
  initialLocation: LatLng;
}) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
        }}
        title="Minha Localização"
        description="Estou aqui!"
      />
    </MapView>
  );
};
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: " 100%",
  },
});

export default Map;
