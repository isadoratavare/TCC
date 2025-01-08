/* eslint-disable prettier/prettier */
import { TouchableOpacity, Text } from 'react-native';


const GalleryButton: React.FC<{
  icon: 'insert-photo' | 'add-photo-alternate' | 'camera-alt';
  name: string;
  onPress: () => void;
}> = ({ name, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 5,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <Text style={{ textAlign: 'center', color: "black" }}>{name}</Text>
    </TouchableOpacity>
  );
};

export default GalleryButton;
