import React, { useState } from "react";
import { Camera, CameraCapturedPicture } from "expo-camera";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
} from "react-native";
import CameraPreview from "./components/CameraPreview";
import {
  ImageGalleryContextProps,
  useImageGallery,
} from "../../hooks/useImageGallery";

const CameraView: React.FC<{ onClose?: () => void; placeId: string }> = ({
  onClose,
  placeId,
}) => {
  let camera: Camera | null;

  const [showPreview, setShowPreview] = useState(false);
  const [photo, setPhoto] = useState<CameraCapturedPicture>();

  const { addImageByCamera } = useImageGallery() as ImageGalleryContextProps;

  async function takePicture() {
    if (!camera) return;
     await camera
      .takePictureAsync()
      .then((e) => setPhoto(e))
      .catch((e) => console.log(e));

    setShowPreview(true);
  }

  if (showPreview && photo) {
    return (
      <CameraPreview
        photo={photo}
        confirmPhoto={() => {
          if (photo) {
            addImageByCamera(placeId, photo);
          }
          setShowPreview(false);
          onClose && onClose()
          console.log("Photo has been added");
        }}
        cancelPhoto={() => {
          setShowPreview(false);
        }}
      />
    );
  }

  return (
    <Modal visible={true} transparent animationType="slide">
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
    </Modal>
  );
};

export default CameraView;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
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
