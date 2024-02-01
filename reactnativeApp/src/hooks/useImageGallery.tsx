/* eslint-disable prettier/prettier */
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export interface ImageGalleryContextProps {
    photos: { id: string; uris: string[] }[];
    addImageByGallery: (placeId: string) => void;
    addImageByCamera: (placeId: string) => void;
}

const ImageGalleryContext = createContext<ImageGalleryContextProps | undefined>(
    undefined
);

export const ImageGalleryProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [photoUri, setPhotoUri] = useState<{ id: string; uris: string[] }[]>(
        []
    );
    const [permission, setPermission] = useState<boolean>(false);
    const [permissionCamera, setPermissionCamera] = useState(false);

    async function hasPermissionGallery() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );
        setPermission(granted === 'granted');
    }
    async function hasPermissionCamera() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        setPermissionCamera(granted === 'granted');
    }
    async function addImage(placeId: string, uri: string) {
        const existingIndex = photoUri.findIndex((item) => item.id === placeId);

        if (existingIndex !== -1) {
            setPhotoUri((prevImageData) => {
                const updatedImageData = [...prevImageData];
                updatedImageData[existingIndex].uris.push(uri);
                return updatedImageData;
            });
        } else {
            setPhotoUri((prevImageData) => [
                ...prevImageData,
                { id: placeId, uris: [uri] },
            ]);
        }
    }
    async function addImageByGallery(placeId: string) {
        let photoUri: any;
        await hasPermissionGallery();
        if (permission) {
            const result = await launchImageLibrary({
                mediaType: 'photo',
            }) as any;
            photoUri = result.assets[0].uri;
            if (photoUri) {
                addImage(placeId, photoUri);
            }

        }
    }
    async function addImageByCamera(placeId: string) {
        let photoUri: any;
        await hasPermissionCamera();
        if (permissionCamera) {
            const result = await launchCamera({
                mediaType: 'photo',
            }) as any;
            photoUri = result.assets[0].uri;
            if (photoUri) {
                addImage(placeId, photoUri);
            }
        }
    }

    return (
        <ImageGalleryContext.Provider
            value={{ addImageByGallery, photos: photoUri, addImageByCamera }}
        >
            {children}
        </ImageGalleryContext.Provider>
    );

};

export const useImageGallery = () => {
    return useContext(ImageGalleryContext);
};