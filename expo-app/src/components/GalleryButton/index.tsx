import { TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const GalleryButton: React.FC<{
  icon: "insert-photo" | "add-photo-alternate" | "camera-alt";
  name: string;
  onPress: () => void;
}> = ({ icon, name, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 5,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={24} color="black" />
      <Text style={{ textAlign: "center" }}>{name}</Text>
    </TouchableOpacity>
  );
};

export default GalleryButton;
