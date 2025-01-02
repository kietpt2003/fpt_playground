import React, { useEffect, useState } from "react";
import { View, Animated } from "react-native";
import { HorizontalLevelBarProps } from "./types/horizontalLevelBarTypes";
import horizontalLevelBarStyleSheet from "./styles/horizontalLevelBarStyleSheet";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { colors } from "../constants/colors";

export default function HorizontalLevelBar({ percentage, totalDuration }: HorizontalLevelBarProps) {
    const [progress, setProgress] = useState(new Animated.Value(0)); // Giá trị tiến độ

    const theme = useSelector((state: RootState) => state.theme.theme);

    useEffect(() => {
        // Tạo hiệu ứng tăng tiến độ
        Animated.timing(progress, {
            toValue: percentage, // Đến bao nhiêu thì ngưng
            duration: totalDuration, // 5 giây
            useNativeDriver: false, // Không cần Native Driver (vì làm việc với width)
        }).start();
    }, [percentage])

    // Chiều rộng thanh loading được tính theo phần trăm tiến độ
    const widthInterpolated = progress.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
    });

    return (
        <View style={horizontalLevelBarStyleSheet.container}>
            {/* Nền của thanh loading */}
            <View style={[
                horizontalLevelBarStyleSheet.loadingBackground,
                {
                    backgroundColor: theme === "dark" ? colors.lighterBlue : colors.brown
                }
            ]}>
                {/* Thanh loading */}
                <Animated.View
                    style={[
                        horizontalLevelBarStyleSheet.loadingBar,
                        {
                            width: widthInterpolated, // Thay đổi chiều rộng dựa trên tiến độ
                        },
                    ]}
                />
            </View>
        </View>
    );
}
