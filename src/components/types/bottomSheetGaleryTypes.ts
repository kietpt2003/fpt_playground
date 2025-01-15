import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Album } from "expo-media-library";
import { Dispatch, RefObject, SetStateAction } from "react";
import { Animated } from "react-native";

export type BottomSheetGalleryProps = {
    selectedAlbum: Album | null;
    bottomSheetHeight: number;
    setBottomSheetHeight: Dispatch<SetStateAction<number>>;
    showAlbumsList: boolean;

    translateY: Animated.Value;
    setSelectedAlbum: Dispatch<SetStateAction<Album | null>>;
    handleOpenAlbumFilter: () => void;
    handleCloseAlbumFilter: () => void;
    snapPointIndex: number;
    setSnapPointIndex: Dispatch<SetStateAction<number>>;
}
