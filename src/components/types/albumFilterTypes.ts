import { Album } from "expo-media-library";
import { Dispatch, SetStateAction } from "react"
import { SharedValue } from "react-native-reanimated";

export type AlbumFilterProps = {
    setSelectedAlbum: Dispatch<SetStateAction<Album | null>>;
    topAnimation: SharedValue<number>;
    isPanEnabled: boolean;
    setIsPanEnabled: Dispatch<SetStateAction<boolean>>;
    enableScroll: boolean;
    setEnableScroll: Dispatch<SetStateAction<boolean>>;
    isTop: boolean;
    setIsTop: Dispatch<SetStateAction<boolean>>;
    openHeight: number;
    setShowAlbumsList: Dispatch<SetStateAction<boolean>>;
}

export type AlbumHeaderFilterProps = {
    setSelectedAlbum: Dispatch<SetStateAction<Album | null>>;
    handleCloseAlbumFilter: () => void;
}

export interface AlbumFilterMethods {
    handleOpenAlbumFilter: () => void;
    handleCloseAlbumFilter: () => void;
}
