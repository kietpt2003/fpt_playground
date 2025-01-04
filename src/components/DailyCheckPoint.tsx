import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import useClick from "../hooks/useClick";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import dailyCheckPointStyleSheet from "./styles/dailyCheckPointStyleSheet";
import { DailyCheckPointProps, DailyCheckPointItem } from "./types/dailyCheckPointTypes";
import { useTranslation } from "react-i18next";

export default function DailyCheckPoint({ isOpenDailyCheckPoint, setIsOpenDailyCheckPoint }: DailyCheckPointProps) {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { playSound } = useClick();
    const { t } = useTranslation();
    const [data, setData] = useState<DailyCheckPointItem[]>([]);
    const [sundayCheckPoint, setSundayCheckPoint] = useState<DailyCheckPointItem | null>(null);

    useEffect(() => {
        // Gọi API
        const fetchDailyCheckPoint = async () => {
            const response: DailyCheckPointItem[] = [
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
                {
                    date: t("sunday"),
                    dayStatus: "Future",
                    status: "Not checked",
                    value: 500
                },
            ];
            if (response.length > 0) {
                // Lưu 4 phần tử đầu tiên vào state `firstFourItems`
                setData(response.slice(0, 6));
                // Lưu phần tử cuối cùng vào state `lastItem`
                setSundayCheckPoint(response[response.length - 1]);
            }
        };

        fetchDailyCheckPoint();
    }, []);

    return (
        <Modal
            isVisible={isOpenDailyCheckPoint}
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
                        touchSoundDisabled={true}
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
                                <TouchableOpacity
                                    style={dailyCheckPointStyleSheet.checkPointItemContainer}
                                    disabled={item.status === "Checked" || item.dayStatus !== "Today"}
                                    touchSoundDisabled={true}
                                >
                                    <LinearGradient
                                        colors={[colors.lightYellow, colors.darkYellow]} // Hiệu ứng chuyển màu
                                        style={dailyCheckPointStyleSheet.checkPointItemBgLinear}
                                    />

                                    <View style={dailyCheckPointStyleSheet.dateItemContainer}>
                                        <LinearGradient
                                            colors={[colors.icyWhite, colors.white]} // Hiệu ứng chuyển màu
                                            style={dailyCheckPointStyleSheet.dateItemContainerLinear}
                                        />
                                        <Text style={dailyCheckPointStyleSheet.dateItemTxt}>
                                            {item.date}
                                        </Text>
                                    </View>

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
                                </TouchableOpacity>
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

                    <TouchableOpacity
                        style={dailyCheckPointStyleSheet.checkPointFinalDateContainer}
                        disabled={sundayCheckPoint?.status === "Checked" || sundayCheckPoint?.dayStatus !== "Today"}
                        touchSoundDisabled={true}
                    >
                        <LinearGradient
                            colors={[colors.lightYellow, colors.darkYellow]} // Hiệu ứng chuyển màu
                            style={dailyCheckPointStyleSheet.checkPointFinalDateBgLinear}
                        />
                        <View style={dailyCheckPointStyleSheet.checkPointDayContainer}>
                            <LinearGradient
                                colors={[colors.icyWhite, colors.white]} // Hiệu ứng chuyển màu
                                style={dailyCheckPointStyleSheet.checkPointDayContainerLinear}
                            />
                            <Text style={dailyCheckPointStyleSheet.dateItemTxt}>
                                {t("sunday")}
                            </Text>
                        </View>

                        {/* Đã nhận ở quá khứ và hiện tại */}
                        {
                            (sundayCheckPoint?.dayStatus !== "Future" && sundayCheckPoint?.status === "Checked") &&
                            <View style={dailyCheckPointStyleSheet.checkedContainer}>
                                <Text style={dailyCheckPointStyleSheet.checkedTxt}>
                                    {t("daily-checked")}
                                </Text>
                            </View>
                        }

                        {/* Tương lai thì khóa */}
                        {
                            (sundayCheckPoint?.dayStatus !== "Today") &&
                            <View style={dailyCheckPointStyleSheet.sundayLockContainer}>
                                {
                                    (sundayCheckPoint?.dayStatus === "Future") &&
                                    <MaterialCommunityIcons name="lock" size={50} color={colors.brown} />
                                }
                            </View>
                        }

                        <Image
                            source={require("../../assets/images/coin-chest.png")}
                            style={dailyCheckPointStyleSheet.finalDateCoinImage}
                        />
                        <Text style={
                            [
                                dailyCheckPointStyleSheet.valueTxt,
                                {
                                    color: colors.black,
                                }
                            ]
                        }>
                            +{sundayCheckPoint?.value} {t("coin")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
