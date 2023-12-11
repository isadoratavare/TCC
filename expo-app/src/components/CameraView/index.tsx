import React, { useState } from "react";
import { Camera, CameraCapturedPicture } from "expo-camera";
import {
  GestureResponderEvent,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import CameraPreview from "./components/CameraPreview";

const CameraView: React.FC = () => {
  let camera: Camera | null;
  const [showPreview, setShowPreview] = useState(false);
  const [photo, setPhoto] = useState<CameraCapturedPicture>();

  async function takePicture(event: GestureResponderEvent) {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setShowPreview(true);
    setPhoto(photo);
  }

  if (showPreview && photo) {
    return <CameraPreview photo={photo} />;
  }

  return (
    <Camera
      style={styles.container}
      ref={(r) => {
        camera = r;
      }}
    >
      <View style={styles.button}>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={takePicture} style={styles.btn} />
        </View>
      </View>
    </Camera>
  );
};

export default CameraView;

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  button: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
  },
  btnContainer: {
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
  },
  btn: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
});
