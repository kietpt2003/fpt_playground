import { Dispatch, SetStateAction } from "react";

export interface ThemeModalProps {
    openChooseTheme: boolean; // Boolean để kiểm soát trạng thái mở modal
    setOpenChooseTheme: Dispatch<SetStateAction<boolean>>; // Hàm để cập nhật trạng thái modal
}