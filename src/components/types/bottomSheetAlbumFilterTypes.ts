import { Album } from "expo-media-library";
import { Dispatch, SetStateAction } from "react"

export type BottomSheetAlbumFilterProps = {
    bottomSheetAlbumFilterHeight: number;
    setSelectedAlbum: Dispatch<SetStateAction<Album | null>>;
    handleCloseAlbumBottomSheetFilter: () => void;
    showAlbumsList: boolean;
    setShowAlbumsList: Dispatch<SetStateAction<boolean>>;
}