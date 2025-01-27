import { Dispatch, SetStateAction } from "react"

export type ConfirmModalProps = {
    stringConfirm: string;
    isConfirm: boolean;
    setIsConfirm: Dispatch<SetStateAction<boolean>>;
    handleConfirmFunction: () => void;
}