import React, { useEffect } from "react";
import Svg, { Text, Defs, LinearGradient, Stop } from "react-native-svg";
import { colors } from "../constants/colors";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from "react-native-reanimated";
import { ScreenHeight } from "@rneui/base";
import { statusBarHeight } from "../constants/statusBarHeight";
import { chineseChessRowSize } from "../screens/types/chineseChessTypes";

const CheckmateEnd = ({ onComplete }: { onComplete: () => void }) => {
    const scale = useSharedValue(0); // Bắt đầu với kích thước 0
    const opacity = useSharedValue(0); // Bắt đầu với độ mờ 0

    useEffect(() => {
        scale.value = withSequence(
            withTiming(2, { duration: 0 }), // Zoom to ban đầu 200%
            withTiming(1, { duration: 500 }), // Sau đó nhỏ lại thành 100%
        );

        opacity.value = withSequence(
            withTiming(1, { duration: 200 }), // Hiện ra dần
        );

        setTimeout(onComplete, 1600);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={[
            {
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                alignSelf: "center",
                zIndex: 2,
                top: chineseChessRowSize * 3.5
            },
            animatedStyle
        ]}>
            <Svg height="150" width="300">
                {/* Gradient để tạo hiệu ứng màu chữ */}
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="100%">
                        <Stop offset="0%" stopColor={colors.lightYellow} stopOpacity="0.5" />
                        <Stop offset="50%" stopColor={colors.centerRibbonLinearLeftTop1} stopOpacity="1" />
                        <Stop offset="100%" stopColor={colors.leftRibbonLinearRightTop1} stopOpacity="1" />
                    </LinearGradient>
                </Defs>

                {/* Chữ "Chiếu Tướng" với stroke viền */}
                <Text
                    x="38%"
                    y="45%"
                    fontSize="43"
                    fill="url(#grad)" // Dùng gradient màu
                    stroke="black"
                    strokeWidth="2"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontFamily="DLThuPhap"
                >
                    Hết
                </Text>
                <Text
                    x="67%"
                    y="55%"
                    fontSize="43"
                    fill="url(#grad)" // Dùng gradient màu
                    stroke="black"
                    strokeWidth="2"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontFamily="DLThuPhap"
                >
                    Cờ
                </Text>
            </Svg>
        </Animated.View>
    );
};

export default CheckmateEnd;
