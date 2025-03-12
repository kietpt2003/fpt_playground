import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import useClick from "../hooks/useClick";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import dailyCheckPointStyleSheet from "./styles/dailyCheckPointStyleSheet";
import { DailyCheckPointProps, DailyCheckPointItemProps } from "./types/dailyCheckPointTypes";
import { useTranslation } from "react-i18next";
import { setIsOpenDailyCheckPoint } from "../store/reducers/homeReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DailyCheckPointItem from "./DailyCheckPointItem";
import { useApiServer } from "../hooks/useApiServer";
import { useApiClient } from "../hooks/useApiClient";
import { PaginatedResponse } from "../constants/Paginations/PaginationResponse";
import axios from "axios";
import { ErrorResponse } from "../constants/Errors/ErrorResponse";
import { convertItemsToDailyCheckpointItems } from "../utils/dailyCheckpointUtils";
import { handleLogout } from "../utils/authorizationUtils";

const sortOrder = "ASC";
const sortColumn = "checkInDate";
const page = 1;
const pageSize = 7;

export default function DailyCheckPoint({ setStringErr, setIsError }: DailyCheckPointProps) {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { playSound } = useClick();
    const { t } = useTranslation();
    const [data, setData] = useState<DailyCheckPointItemProps[]>([]);
    const [sundayCheckPoint, setSundayCheckPoint] = useState<DailyCheckPointItemProps | null>(null);
    const isOpenDailyCheckPoint = useSelector((state: RootState) => state.home.isOpenDailyCheckPoint);
    const [isFetching, setFetching] = useState<boolean>(false);

    const { apiUrl } = useApiServer();
    const apiClient = useApiClient();

    const dispatch = useDispatch();

    async function handleCheckin(dailyCheckpointId: string) {
        try {
            setFetching(true);
            await apiClient.put(`${apiUrl}/daily-checkpoint`, {
                dailyCheckpointId: dailyCheckpointId
            })

            if (sundayCheckPoint != null && sundayCheckPoint.id == dailyCheckpointId) {
                setSundayCheckPoint(prev => prev ? {
                    ...prev,
                    status: "Checked"
                } : null)
            } else {
                setData((prevData) =>
                    prevData.map((item) =>
                        item.id === dailyCheckpointId ? { ...item, status: "Checked" } : item
                    )
                );
            }
            setFetching(false);
        } catch (error: unknown) {
            // Kiểm tra nếu error là AxiosError
            if (axios.isAxiosError(error)) {
                const errorData: ErrorResponse = error.response?.data;
                console.log("API call error:", error.response?.data);
                if (error.status == 503) {
                    setStringErr(t("server-maintenance"));
                    setIsError(true);
                    setFetching(false);
                    await handleLogout(dispatch, navigation);
                } else {
                    console.log(errorData?.reasons?.[0]?.message ??
                        "Lỗi mạng, vui lòng thử lại sau");
                    setStringErr(errorData?.reasons?.[0]?.message ??
                        "Lỗi mạng, vui lòng thử lại sau");
                    setIsError(true);
                }
            } else {
                console.log("Unexpected error:", error);
            }
            setFetching(false);
        }
    }

    const fetchDailyCheckPoint = async () => {
        try {
            setFetching(true);
            const response = await apiClient.get(`${apiUrl}/daily-checkpoint/current-week?SortOrder=${sortOrder}&SortColumn=${sortColumn}&Page=${page}&PageSize=${pageSize}`)
            const data: PaginatedResponse<DailyCheckPointItemProps> = response.data;

            if (data.items.length > 6) {
                // Lưu 4 phần tử đầu tiên vào state `firstFourItems`
                const convertedItems: DailyCheckPointItemProps[] = convertItemsToDailyCheckpointItems(data.items, t);
                setData(convertedItems.slice(0, 6));
                // Lưu phần tử cuối cùng vào state `lastItem`
                setSundayCheckPoint(convertedItems[convertedItems.length - 1]);

                const filteredDailys: DailyCheckPointItemProps[] = convertedItems.filter(i => i.dayStatus == "Today");
                if (filteredDailys.length > 0 && filteredDailys[0].status == "Unchecked") {
                    dispatch(setIsOpenDailyCheckPoint(true));
                } else {
                    dispatch(setIsOpenDailyCheckPoint(false));
                }
            }
            setFetching(false);
        } catch (error: unknown) {
            // Kiểm tra nếu error là AxiosError
            if (axios.isAxiosError(error)) {
                const errorData: ErrorResponse = error.response?.data;
                console.log("API call error:", error.response?.data);
                if (error.status == 503) {
                    setStringErr(t("server-maintenance"));
                    setIsError(true);
                    setFetching(false);
                    await handleLogout(dispatch, navigation);
                } else {
                    console.log(errorData?.reasons?.[0]?.message ??
                        "Lỗi mạng, vui lòng thử lại sau");
                }
            } else {
                console.log("Unexpected error:", error);
            }
            setFetching(false);
        }
    };

    // fetchDailyCheckPoint
    useEffect(() => {
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
                            dispatch(setIsOpenDailyCheckPoint(false));
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
                        <FlatList<DailyCheckPointItemProps>
                            data={data}
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <DailyCheckPointItem
                                    isFetching={isFetching}
                                    item={item}
                                    handleCheckin={handleCheckin}
                                />
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
                        disabled={isFetching || sundayCheckPoint?.status === "Checked" || sundayCheckPoint?.dayStatus !== "Today" || sundayCheckPoint == null}
                        touchSoundDisabled={true}
                        onPress={() => {
                            handleCheckin(sundayCheckPoint!.id);
                        }}
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
                            +{sundayCheckPoint?.coinValue} {t("coin")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
