import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import useClick from "../hooks/useClick";
import { FontAwesome } from '@expo/vector-icons';
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import dailyCheckPointStyleSheet from "./styles/dailyCheckPointStyleSheet";
import { DailyCheckPointProps } from "./types/dailyCheckPointTypes";
import Svg, { Path } from "react-native-svg";

export default function DailyCheckPoint({ isOpenDailyCheckPoint, setIsOpenDailyCheckPoint }: DailyCheckPointProps) {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { playSound } = useClick();
    const data = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
    ]

    return (
        <Modal
            isVisible={isOpenDailyCheckPoint}
            onBackdropPress={() => setIsOpenDailyCheckPoint(false)}
            style={dailyCheckPointStyleSheet.modalContainer}
        >
            <View
                style={dailyCheckPointStyleSheet.container}
            >
                {/* Góc nhọn phía trên bên trái */}
                <View style={dailyCheckPointStyleSheet.cornerTopLeft} />

                {/* Góc nhọn phía dưới bên phải */}
                <View style={dailyCheckPointStyleSheet.cornerBottomRight} />

                {/* Hình chữ nhật chính */}
                <View style={dailyCheckPointStyleSheet.mainRectangle}>
                    <TouchableOpacity
                        style={dailyCheckPointStyleSheet.closeBtnContainer}
                        onPress={() => {
                            playSound();
                            setIsOpenDailyCheckPoint(false);
                        }}
                    >
                        <LinearGradient
                            colors={theme === "dark" ? [colors.darkBlue, colors.darkBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={dailyCheckPointStyleSheet.closeBtnLinear}
                        />
                        <FontAwesome name="close" size={24} color={colors.white} />
                    </TouchableOpacity>
                    <View style={{
                        width: ScreenWidth * 0.7,
                        height: ScreenHeight / 3.4,
                    }}>
                        <FlatList
                            data={data}
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={{
                                    width: ScreenWidth / 4.3,
                                    height: ScreenWidth / 3.9,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Svg
                                        height={ScreenWidth / 3.9}
                                        width={ScreenWidth / 3.9}
                                        viewBox="0 0 110 110"
                                        style={{
                                            position: "absolute"
                                        }}
                                    >
                                        <Path
                                            d="M15,10 H80 C85,10,88,10,89,15 V95 L95,110 H25 L20,95 V25 Z"
                                            stroke="black"
                                            fill="white"
                                        />
                                        <Path
                                            d="M20,25 H89"
                                            stroke="black"
                                        />
                                        <Path
                                            d="M20,95 H89"
                                            stroke="black"
                                        />
                                    </Svg>
                                    <View>
                                        <Image
                                            source={require("../../assets/images/ptk-coin.png")}
                                            style={{
                                                width: ScreenWidth * 0.08,
                                                height: ScreenWidth * 0.08,
                                                resizeMode: "stretch",
                                                borderRadius: 25,
                                            }}
                                        />
                                        <Text style={{
                                            textAlign: "center"
                                        }}>200</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={3} // Hiển thị 2 cột
                            columnWrapperStyle={{
                                justifyContent: "space-between", // Giãn đều giữa các cột
                            }}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: "space-evenly", // Giãn đều theo trục dọc
                            }}
                        />

                    </View>
                </View>
            </View>
        </Modal>
    );
};
