import { Animated } from "react-native";
import { Message } from "../../constants/entities/Message"
import { User } from "../../constants/entities/User"

interface FriendMessageData extends Message {
    sender: User;
    receiver: User;
}

export interface FriendItemData {
    item: FriendMessageData;
}

export interface FriendItemProps extends FriendItemData {
    item: FriendMessageData;
    opacity: Animated.AnimatedInterpolation<string | number>;
    AVATAR_SIZE: number;
    scale: Animated.AnimatedInterpolation<string | number>;
}