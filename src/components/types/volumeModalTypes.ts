import { Dispatch, SetStateAction } from "react";
import { Audio } from 'expo-av';

export interface VolumeModalProps {
    openChangeVolume: boolean; // Boolean để kiểm soát trạng thái mở modal
    setOpenChangeVolume: Dispatch<SetStateAction<boolean>>; // Hàm để cập nhật trạng thái modal;
}