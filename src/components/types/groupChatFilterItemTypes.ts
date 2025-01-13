import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export type GroupChatFilterItemProps = {
    onPress: (event: GestureResponderEvent) => void;
    viewStyle: StyleProp<ViewStyle>;
    textColor: string;
    item: string;
}