import { Dispatch, SetStateAction } from "react";

export interface LanguageModalProps {
  openChooseLanguage: boolean; // Boolean để kiểm soát trạng thái mở modal
  setOpenChooseLanguage: Dispatch<SetStateAction<boolean>>; // Hàm để cập nhật trạng thái modal
}