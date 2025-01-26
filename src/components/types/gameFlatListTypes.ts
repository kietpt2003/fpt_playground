import { Animated } from "react-native";
import { GameDataItem } from "../../screens/types/gameListTypes"

export type GameFlatListItemProps = {
    item: GameDataItem,
    ITEM_SIZE: number,
    SPACING: number,
    opacity: Animated.AnimatedInterpolation<string | number>;
    scale: Animated.AnimatedInterpolation<string | number>;
    index: number;
}
