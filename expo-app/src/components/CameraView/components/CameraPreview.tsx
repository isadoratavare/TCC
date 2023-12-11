import { CameraCapturedPicture } from "expo-camera";
import React from "react";
import { ImageBackground, TouchableOpacity, View, Text } from "react-native";

const CameraPreview: React.FC<{ photo: CameraCapturedPicture }> = ({
  photo,
}) => {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity>
          <Text>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraPreview;
