import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DecentralizedButton: React.FC<{ openZoomMap: () => void }> = ({
  openZoomMap,
}) => {
  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        backgroundColor: "white",
        margin: 20,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "gray",
      }}
      onPress={() => openZoomMap()}
    >
      <MaterialCommunityIcons name="fullscreen-exit" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default DecentralizedButton;
