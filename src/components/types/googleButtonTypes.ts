import { GestureResponderEvent } from "react-native";

export interface GoogleSigninButtonProps {
    onPress: (event: GestureResponderEvent) => void,
    isFetching: boolean
}