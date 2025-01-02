import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
} from "react-native";
import React, { useState } from "react";
import LottieView from "lottie-react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import useClick from "../hooks/useClick";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import dailyCheckPointStyleSheet from "./styles/dailyCheckPointStyleSheet";
import { DailyCheckPointProps, DailyCheckPointItem } from "./types/dailyCheckPointTypes";
import { useTranslation } from "react-i18next";

export default function DailyCheckPoint({ isOpenDailyCheckPoint, setIsOpenDailyCheckPoint }: DailyCheckPointProps) {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { playSound } = useClick();
    const { t } = useTranslation();
    // const data = [
    //     "1",
    //     "2",
    //     "3",
    //     "4",
    //     "5",
    //     "6",
    // ]
    const [data, setData] = useState<DailyCheckPointItem[]>([
        {
            date: t("monday"),
            dayStatus: "Past",
            status: "Not checked",
            value: 200
        },
        {
            date: t("tuesday"),
            dayStatus: "Past",
            status: "Not checked",
            value: 200
        },
        {
            date: t("wednesday"),
            dayStatus: "Past",
            status: "Checked",
            value: 200
        },
        {
            date: t("thursday"),
            dayStatus: "Today",
            status: "Not checked",
            value: 200
        },
        {
            date: t("friday"),
            dayStatus: "Future",
            status: "Not checked",
            value: 200
        },
        {
            date: t("saturday"),
            dayStatus: "Future",
            status: "Not checked",
            value: 200
        },
    ]);

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
                <View style={[
                    dailyCheckPointStyleSheet.cornerTopLeft,
                    {
                        borderColor: theme === "dark" ? colors.darkBlue : colors.darkOrange, // Viền đen
                    }
                ]} />

                {/* Góc nhọn phía dưới bên phải */}
                <View style={[
                    dailyCheckPointStyleSheet.cornerBottomRight,
                    {
                        borderColor: theme === "dark" ? colors.darkBlue : colors.darkOrange, // Viền đen
                    }
                ]} />

                {/* Hình chữ nhật chính */}
                <View style={[
                    dailyCheckPointStyleSheet.mainRectangle,
                    {
                        borderColor: theme === "dark" ? colors.darkBlue : colors.darkOrange, // Viền đen
                    }
                ]}>
                    {/* Close button */}
                    <TouchableOpacity
                        style={dailyCheckPointStyleSheet.closeBtnContainer}
                        onPress={() => {
                            playSound();
                            setIsOpenDailyCheckPoint(false);
                        }}
                    >
                        <LinearGradient
                            colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={dailyCheckPointStyleSheet.closeBtnLinear}
                        />
                        <FontAwesome name="close" size={24} color={colors.white} />
                    </TouchableOpacity>

                    <View style={dailyCheckPointStyleSheet.flatListContainer}>
                        <FlatList<DailyCheckPointItem>
                            data={data}
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View>
                                    <View style={dailyCheckPointStyleSheet.dateItemContainer}>
                                        <LinearGradient
                                            colors={[colors.icyWhite, colors.white]} // Hiệu ứng chuyển màu
                                            style={dailyCheckPointStyleSheet.dateItemContainerLinear}
                                        />
                                        <Text style={dailyCheckPointStyleSheet.dateItemTxt}>
                                            {item.date}
                                        </Text>
                                    </View>
                                    <View style={dailyCheckPointStyleSheet.checkPointItemContainer}>
                                        <LinearGradient
                                            colors={[colors.lightYellow, colors.darkYellow]} // Hiệu ứng chuyển màu
                                            style={dailyCheckPointStyleSheet.checkPointItemBgLinear}
                                        />

                                        {/* Hết hạn ở quá khứ */}
                                        {
                                            (item.dayStatus !== "Future" && item.dayStatus !== "Today" && item.status === "Not checked") &&
                                            <View style={dailyCheckPointStyleSheet.notCheckedContainer}>
                                                <Text style={dailyCheckPointStyleSheet.notCheckedTxt}>
                                                    {t("daily-expired")}
                                                </Text>
                                            </View>
                                        }

                                        {/* Đã nhận ở quá khứ và hiện tại */}
                                        {
                                            (item.dayStatus !== "Future" && item.status === "Checked") &&
                                            <View style={dailyCheckPointStyleSheet.checkedContainer}>
                                                <Text style={dailyCheckPointStyleSheet.checkedTxt}>
                                                    {t("daily-checked")}
                                                </Text>
                                            </View>
                                        }

                                        {/* Hôm nay mà chưa nhận thì hiện linear */}
                                        {/* {
                                            (item.dayStatus === "Today" && item.status === "Not checked") &&
                                            <LinearGradient
                                                colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.mediumOrange, colors.lightYellow]} // Hiệu ứng chuyển màu
                                                style={dailyCheckPointStyleSheet.checkPointItemBgLinear}
                                            />
                                        } */}

                                        {/* Tương lai thì khóa */}
                                        {
                                            (item.dayStatus !== "Today") &&
                                            <View style={dailyCheckPointStyleSheet.lockContainer}>
                                                {
                                                    (item.dayStatus === "Future") &&
                                                    <MaterialCommunityIcons name="lock" size={50} color={colors.brown} />
                                                }
                                            </View>
                                        }

                                        <Image
                                            source={require("../../assets/images/ptk-coin.png")}
                                            style={dailyCheckPointStyleSheet.coinImage}
                                        />
                                        <Text style={
                                            [
                                                dailyCheckPointStyleSheet.valueTxt,
                                                {
                                                    color: colors.black,
                                                }
                                            ]
                                        }>
                                            +{item.value} {t("coin")}
                                        </Text>
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

                    <View>

                    </View>
                </View>
            </View>
        </Modal>
    );
};
