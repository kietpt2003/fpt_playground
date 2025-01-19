import { StyleProp, ViewStyle } from "react-native";
import { ComposedGesture, GestureType } from "react-native-gesture-handler";

export type CameraZoomItemProps = {
    viewStyle: StyleProp<ViewStyle>;
    gesture: ComposedGesture | GestureType;
    item: number;
}