import { CameraCapturedPicture } from "expo-camera";
import React from "react";
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  Modal,
} from "react-native";

const CameraPreview: React.FC<{
  photo: CameraCapturedPicture;
  confirmPhoto: () => void;
  cancelPhoto: () => void;
}> = ({ photo, confirmPhoto, cancelPhoto }) => {
  return (
    <Modal>
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
          <TouchableOpacity onPress={confirmPhoto}>
            <Text>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancelPhoto}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CameraPreview;
