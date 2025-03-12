import { Dispatch, SetStateAction } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type LoadingBarProps = {
    setPercentage: Dispatch<SetStateAction<number>>;
    bso: boolean;
    styleContainer?: StyleProp<ViewStyle>;
    styleLoading?: StyleProp<ViewStyle>;
}