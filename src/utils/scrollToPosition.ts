import { RefObject } from "react";
import { ScrollView } from "react-native";

export const scrollToPosition = (scrollViewRef: RefObject<ScrollView>, x: number, y: number) => {
    scrollViewRef.current?.scrollTo({
        x: x, // Vị trí theo chiều ngang
        y: y, // Vị trí theo chiều dọc
        animated: true, // Có hiệu ứng cuộn hay không
    });
};
