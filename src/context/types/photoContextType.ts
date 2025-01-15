import { ReactNode } from "react";
import * as MediaLibrary from 'expo-media-library';

interface PhotoContextProps {
    photos: Record<string, MediaLibrary.Asset[]>;
    loadPhotos: (album: MediaLibrary.Album, numberPhotoToLoad: number, after?: MediaLibrary.AssetRef | undefined) => Promise<boolean>;
    requestPermission: boolean;
    albums: MediaLibrary.Album[];
    loadAlbums: () => Promise<void>;
    pagination: Record<string, Pagination>;
    canAskAgain: boolean;
    requestMediaLibPermissionWithoutLinking: () => Promise<{
        status: MediaLibrary.PermissionStatus,
        canAskAgain: boolean
    }>;
    requestMediaLibPermission: () => Promise<string>;
    fullPhotos: MediaLibrary.Asset[];
    fullPhotoPagination: Pagination | undefined;
    loadPhotosSortByCreationTime: (numberPhotoToLoad: number, after?: MediaLibrary.AssetRef | undefined) => Promise<boolean>;
    totalImages: number;
    changeStateFriendsScreen: () => void;
}

interface PhotoProviderProps {
    children: ReactNode; // Định nghĩa children là ReactNode
}

interface Pagination {
    hasNextPage: boolean; // Có thêm dữ liệu không?
    endCursor: string | undefined; // Cursor để lấy dữ liệu tiếp theo
}

export { PhotoContextProps, PhotoProviderProps, Pagination }
