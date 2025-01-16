import { Album } from "expo-media-library";
import { Dispatch, SetStateAction } from "react"
import { Animated } from "react-native";
import { NativeGesture, PanGesture } from "react-native-gesture-handler";
import { SharedValue } from "react-native-reanimated";

export type AlbumFilterProps = {
    setSelectedAlbum: Dispatch<SetStateAction<Album | null>>;
    handleCloseAlbumFilter: () => void;
    translateY: Animated.Value;

    topAnimation: SharedValue<number>;
    isPanEnabled: boolean;
    setIsPanEnabled: Dispatch<SetStateAction<boolean>>;
    enableScroll: boolean;
    setEnableScroll: Dispatch<SetStateAction<boolean>>;
    isTop: boolean;
    setIsTop: Dispatch<SetStateAction<boolean>>;
    openHeight: number;
}

export type AlbumHeaderFilterProps = {
    setSelectedAlbum: Dispatch<SetStateAction<Album | null>>;
    handleCloseAlbumFilter: () => void;
}
