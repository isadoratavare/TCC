import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import Device from "expo-device";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";

export default function UserLocation() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg("Error, try in your phone!");
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      console.log(status)
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  if (location) {
    return (
      <Marker
        coordinate={location?.coords}
      ></Marker>
    );
  }

  return <></>
}
