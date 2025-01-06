import { Dispatch, RefObject, SetStateAction } from "react";
import { ScrollView } from "react-native";

export type NPCGuidelineProps = {
    scrollViewRef: RefObject<ScrollView>;
    onScrolling: boolean;
    setOnScrolling: Dispatch<SetStateAction<boolean>>;
}