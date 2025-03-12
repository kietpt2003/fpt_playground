import { AnimationObject } from "lottie-react-native";
import { GestureResponderEvent } from "react-native";

export interface FunctionItemProps {
    linearColors: readonly [string, string, ...string[]];
    lottieSrc: AnimationObject;
    contentTxt: string;
    onPress: (event: GestureResponderEvent) => void;
    isGuideline?: boolean;
}