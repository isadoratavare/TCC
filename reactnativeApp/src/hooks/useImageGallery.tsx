/* eslint-disable prettier/prettier */
import React, { ReactNode, createContext, useContext, useState } from "react";

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

    }
    async function hasPermissionCamera() {

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
    async function addImageByGallery(_placeId: string) {
        await hasPermissionGallery();
        if (permission) {
        }
    }
    async function addImageByCamera(placeId: string) {
        let photoUri: any;
        await hasPermissionCamera()
        if (permissionCamera) {
        }
        if (photoUri) {
            addImage(placeId, photoUri?.assets[0]?.uri);
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