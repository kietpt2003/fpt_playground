import { Album } from "expo-media-library";
import { Dispatch, SetStateAction } from "react";

export type BottomSheetGalleryProps = {
    selectedAlbum: Album | null;
    handleOpenAlbumBottomSheetFilter: () => void;
    handleCloseAlbumBottomSheetFilter: () => void;
    bottomSheetHeight: number;
    setBottomSheetHeight: Dispatch<SetStateAction<number>>;
    showAlbumsList: boolean;
    setShowAlbumsList: Dispatch<SetStateAction<boolean>>;
}
