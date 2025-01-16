import { Album } from "expo-media-library";
import { Dispatch, SetStateAction } from "react"
import { Animated } from "react-native";

export type AlbumFilterProps = {
    albumFilterHeight: number;
    setSelectedAlbum: Dispatch<SetStateAction<Album | null>>;
    handleCloseAlbumFilter: () => void;
    translateY: Animated.Value;
    enableScrolling: boolean;
}

export type AlbumHeaderFilterProps = {
    setSelectedAlbum: Dispatch<SetStateAction<Album | null>>;
    handleCloseAlbumFilter: () => void;
}
