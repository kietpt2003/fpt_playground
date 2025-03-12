import { Animated } from "react-native";
import { Message } from "../../constants/entities/Message"
import { User } from "../../constants/entities/User"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types/types";
import { RouteProp } from "@react-navigation/native";

interface FriendMessageData extends Message {
    sender: User;
    receiver: User;
}

export interface FriendItemData {
    item: FriendMessageData;
}

export interface FriendItemProps extends FriendItemData {
    opacity: Animated.AnimatedInterpolation<string | number>;
    AVATAR_SIZE: number;
    scale: Animated.AnimatedInterpolation<string | number>;
}

export type FriendChatDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FriendChatDetail'>;
export type FriendChatDetailRouteProp = RouteProp<RootStackParamList, "FriendChatDetail">;

