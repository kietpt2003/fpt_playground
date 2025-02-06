import React, { useEffect } from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
    useAnimatedProps,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { WaveAnimationProps } from "./types/waveAnimationTypes";
import { colors } from "../constants/colors";
import waveAnimationStyleSheet from "./styles/waveAnimationStyleSheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const WaveAnimation = ({ children }: WaveAnimationProps) => {
    const theme = useSelector((state: RootState) => state.theme.theme);

    // Shared value để điều khiển chuyển động sóng
    const waveOffset = useSharedValue(0);

    const waveOffset2 = useSharedValue(0);

    // Animate wave offset
    useEffect(() => {
        waveOffset.value = withRepeat(
            withTiming(100, { duration: 1000 }), // Di chuyển trong 1 giây
            -1, // Lặp vô hạn
            true // Đảo ngược chiều mỗi lần lặp
        );
        waveOffset2.value = withRepeat(
            withTiming(200, { duration: 1500 }), // Lớp sóng thứ hai (chậm hơn)
            -1,
            true
        );
    }, []);

    // Tạo thuộc tính animated cho Path
    const animatedProps = useAnimatedProps(() => {
        const offset = waveOffset.value;

        const d = `
        M0,50
        C${ScreenWidth / 4},${70 - 10 + offset / 5}, ${ScreenWidth / 2},${70 + 10 - offset / 5}, ${ScreenWidth},50
        L${ScreenWidth},${ScreenHeight / 1.2}
        L0,${ScreenHeight / 1.2}
        Z
      `;
        return { d };
    });

    const animatedProps2 = useAnimatedProps(() => {
        const offset = waveOffset2.value;

        const d = `
          M0,60
          C${ScreenWidth / 4},${30 - 30 + offset / 5}, ${ScreenWidth / 2},${30 + 30 - offset / 5}, ${ScreenWidth},60
          L${ScreenWidth},${ScreenHeight / 1.2}
          L0,${ScreenHeight / 1.2}
          Z
        `;
        return { d };
    });
    return (
        <SafeAreaView
            style={waveAnimationStyleSheet.container}
        >
            <View style={[
                waveAnimationStyleSheet.bgContainer,
                {
                    backgroundColor: theme == "dark" ? colors.darkBlue : colors.mediumOrange
                }
            ]}>
                <Svg
                    width={ScreenWidth} // Chiều rộng SVG bằng chiều rộng màn hình
                    height={ScreenHeight / 1.2} // Chiều cao cố định
                    viewBox={`0 0 ${ScreenWidth} ${ScreenHeight / 1.2}`}
                    style={waveAnimationStyleSheet.svg}>
                    <AnimatedPath
                        animatedProps={animatedProps}
                        fill={colors.white} // Màu sóng
                    />

                    {/* Lớp sóng thứ hai */}
                    <AnimatedPath
                        animatedProps={animatedProps2}
                        fill={colors.blurWhite}
                    />
                </Svg>

                {children}
            </View>
        </SafeAreaView>
    );
};

export default WaveAnimation;