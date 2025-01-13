import { ReactNode } from "react";
import * as MediaLibrary from 'expo-media-library';

interface PhotoContextProps {
    photos: Record<string, MediaLibrary.Asset[]>;
    loadPhotos: (album: MediaLibrary.Album, after?: MediaLibrary.AssetRef | undefined) => Promise<boolean>;
    requestPermission: boolean;
    albums: MediaLibrary.Album[];
    loadAlbums: () => Promise<void>;
    pagination: Record<string, Pagination>;
}

interface PhotoProviderProps {
    children: ReactNode; // Định nghĩa children là ReactNode
}

interface Pagination {
    hasNextPage: boolean; // Có thêm dữ liệu không?
    endCursor: string | null; // Cursor để lấy dữ liệu tiếp theo
}

export { PhotoContextProps, PhotoProviderProps, Pagination }
