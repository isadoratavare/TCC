/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { FlatList, View, Image, Modal } from 'react-native';
import GalleryButton from '../GalleryButton';
import {
    ImageGalleryContextProps,
    useImageGallery,
} from '../../hooks/useImageGallery';

const ImageGallery: React.FC<{ placeId: string }> = ({ placeId }) => {
    const [cameraOrGalleryModalOpen, setCameraOrGalleryModalOpen] =
        useState<boolean>(false);
    const [photosData, setPhotoData] = useState<{ id: string; uris: string[]; }>()
    const { addImageByGallery, photos, addImageByCamera } =
        useImageGallery() as ImageGalleryContextProps;

    useEffect(() => {
        setPhotoData(photos.filter((photo) => photo.id === placeId)[0]);
    }, [photos, placeId]);

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <FlatList
                data={photosData?.uris}
                ListHeaderComponent={() => (
                    <GalleryButton
                        icon="add-photo-alternate"
                        name="Adicionar lembrança"
                        onPress={() => {
                            setCameraOrGalleryModalOpen(true);
                        }}
                    />
                )}
                renderItem={({ item }: any) => {
                    console.log(item)
                    return (
                        <View>
                            {item && (
                                <Image
                                    source={{ uri: item }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 10,
                                        marginHorizontal: 5,
                                    }}
                                />
                            )}
                        </View>
                    );
                }}
                horizontal
            />

            {cameraOrGalleryModalOpen && (
                <Modal transparent={true} visible={cameraOrGalleryModalOpen}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#3A3A3A4D',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: 'white',
                                width: 250,
                                height: 130,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <GalleryButton
                                icon="insert-photo"
                                name="Galeria"
                                onPress={async () => {
                                    await addImageByGallery(placeId);
                                    setCameraOrGalleryModalOpen(false);
                                }}
                            />
                            <GalleryButton
                                icon="camera-alt"
                                name="Câmera"
                                onPress={async () => {
                                    await addImageByCamera(placeId);
                                    setCameraOrGalleryModalOpen(false);
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default ImageGallery;
