import { Dispatch, RefObject, SetStateAction } from "react";
import { ScrollView } from "react-native";

export type NPCGuidelineProps = {
    scrollViewRef: RefObject<ScrollView>;
    setIsGuideline: Dispatch<SetStateAction<boolean>>;
    onScrolling: boolean;
    setOnScrolling: Dispatch<SetStateAction<boolean>>;
}