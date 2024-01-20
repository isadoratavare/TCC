import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";

export default function UserLocation() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {

    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

  }, []);


  if (location) {
    return (
      <Marker
        coordinate={location?.coords}
      ></Marker>
    );
  }
  if (errorMsg) {
    Alert.alert(errorMsg)
  }
  return <></>
}
