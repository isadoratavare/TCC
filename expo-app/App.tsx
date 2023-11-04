import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import Map from "./src/components/Map";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getLocationAsync() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permissão para acessar a localização negada");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getLocationAsync();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  } else if (location) {
    return (
      <View style={styles.container}>
        <Map
          initialLocation={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: " 100%",
  },
});
