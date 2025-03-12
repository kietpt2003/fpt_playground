import { View, Text, ImageBackground, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import dailyCheckPointScreenStyleSheet from './styles/dailyCheckPointScreenStyleSheet';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import useClick from '../hooks/useClick';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import StarSVGLinear from '../components/StarSVGLinear';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { useTranslation } from 'react-i18next';
import { DailyCheckPointItemProps } from '../components/types/dailyCheckPointTypes';
import CheckPointItem from '../components/CheckPointItem';
import { DailyCheckPointScreenNavigationProp } from './types/dailyCheckPointScreenTypes';
import { useApiServer } from '../hooks/useApiServer';
import { useApiClient } from '../hooks/useApiClient';
import { ErrorResponse } from '../constants/Errors/ErrorResponse';
import axios from 'axios';
import { handleLogout } from '../utils/authorizationUtils';
import { PaginatedResponse } from '../constants/Paginations/PaginationResponse';
import { convertItemsToDailyCheckpointItems } from '../utils/dailyCheckpointUtils';
import { UserResponse } from '../constants/models/users/UserResponse';
import { login } from '../store/reducers/authReducer';
import { formatNumber } from '../utils/formatNumber';
import { SafeAreaView } from 'react-native-safe-area-context';

const sortOrder = "ASC";
const sortColumn = "checkInDate";
const page = 1;
const pageSize = 7;

export default function DailyCheckPointScreen() {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const user = useSelector((state: RootState) => state.auth.user);
    const [tomorrowDaily, setTomorrowDaily] = useState<DailyCheckPointItemProps | null>(null);
    const [todayDaily, setTodayDaily] = useState<DailyCheckPointItemProps | null>(null);

    const { t } = useTranslation();

    const { playSound } = useClick();

    const navigation = useNavigation<DailyCheckPointScreenNavigationProp>();

    const [data, setData] = useState<DailyCheckPointItemProps[]>([]);
    const [sundayCheckPoint, setSundayCheckPoint] = useState<DailyCheckPointItemProps | null>(null);

    const [isFetching, setFetching] = useState<boolean>(false);

    const [stringErr, setStringErr] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    const { apiUrl } = useApiServer();
    const apiClient = useApiClient();

    const dispatch = useDispatch();

    const getCurrentUser = async () => {
        try {
            setFetching(true);
            const res = await apiClient.get(`${apiUrl}/users/current`);
            const data: UserResponse = res.data;
            if (data.account?.role == "Admin") {
                await handleLogout(dispatch, navigation);
                return false;
            }
            dispatch(login(data));
            setFetching(false);
            return true;
        } catch (error: unknown) {
            // Kiểm tra nếu error là AxiosError
            if (axios.isAxiosError(error)) {
                const errorData: ErrorResponse = error.response?.data;
                console.log("getCurrentUser error:", error.response?.data);
                if (error.status == 503) {
                    setStringErr(t("server-maintenance"));
                    setFetching(false);
                    await handleLogout(dispatch, navigation);
                    setIsError(true);
                } else {
                    setStringErr(
                        errorData?.reasons?.[0]?.message ??
                        "Lỗi mạng, vui lòng thử lại sau"
                    );
                }
            } else {
                console.log("Unexpected error:", error);
                setStringErr("Đã xảy ra lỗi không xác định.");
                setIsError(true);
            }

            setFetching(false);
            return false;
        }
    }

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
            setTodayDaily(prev => prev ? {
                ...prev,
                status: "Checked"
            } : null);
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

                const filteredDailys: DailyCheckPointItemProps[] = convertedItems.filter((item) => {
                    return item.dayStatus == "Future" || item.dayStatus == "Today";
                });
                if (filteredDailys.length > 0) {
                    setTodayDaily(filteredDailys[0]);
                    setTomorrowDaily(filteredDailys[1]);
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

    useEffect(() => {
        fetchDailyCheckPoint();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (!isFetching) {
                getCurrentUser();
            }
        }, [isFetching])
    )

    return (
        <SafeAreaView>
            <View style={dailyCheckPointScreenStyleSheet.container}>
                <LinearGradient
                    colors={theme === "dark" ? [colors.lightBlue, colors.lighterBlue] : [colors.mediumOrange, colors.milkyWhite]} // Hiệu ứng chuyển màu
                    style={dailyCheckPointScreenStyleSheet.containerLinear}
                />

                <ImageBackground
                    source={require('../../assets/images/daily-checkpoint-screen.webp')}
                    style={dailyCheckPointScreenStyleSheet.backgroundImage}
                />
                <View style={dailyCheckPointScreenStyleSheet.backgroundImageBlur} />

                {/* Header */}
                <View style={dailyCheckPointScreenStyleSheet.headerContainer}>
                    {/* Back */}
                    <TouchableOpacity
                        style={dailyCheckPointScreenStyleSheet.backIconContainer}
                        onPress={() => {
                            playSound();
                            navigation.goBack()
                        }}
                        touchSoundDisabled={true}
                    >
                        <LinearGradient
                            colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={dailyCheckPointScreenStyleSheet.backIconContainerLinear}
                        />
                        <AntDesign
                            name="left"
                            size={28}
                            color={colors.white}
                        />
                    </TouchableOpacity>

                    {/* Coin + Diamond */}
                    <View style={dailyCheckPointScreenStyleSheet.moneyContainer}>
                        {/* Coin */}
                        <View style={dailyCheckPointScreenStyleSheet.moneyItemContainer}>
                            <Image
                                source={require("../../assets/images/ptk-coin.png")}
                                style={dailyCheckPointScreenStyleSheet.coinImage}
                            />
                            <View style={dailyCheckPointScreenStyleSheet.moneyValueContainer}>
                                <LinearGradient
                                    colors={[colors.darkBrown, colors.mediumBrown]} // Hiệu ứng chuyển màu
                                    style={dailyCheckPointScreenStyleSheet.moneyValueContainerLinear}
                                />
                                <Text style={dailyCheckPointScreenStyleSheet.moneyValueTxt}>{user ? formatNumber(user?.coinWallet!.amount, t) : 0}</Text>
                            </View>

                            <TouchableOpacity
                                style={dailyCheckPointScreenStyleSheet.plusMoneyButton}
                                touchSoundDisabled={true}
                            >
                                <FontAwesome
                                    name="plus"
                                    size={10}
                                    color={colors.white}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Diamond */}
                        <View style={dailyCheckPointScreenStyleSheet.moneyItemContainer}>
                            <Image
                                source={require("../../assets/images/ptk-diamond.png")}
                                style={dailyCheckPointScreenStyleSheet.diamondImage}
                            />
                            <View style={dailyCheckPointScreenStyleSheet.moneyValueContainer}>
                                <LinearGradient
                                    colors={[colors.darkBrown, colors.mediumBrown]} // Hiệu ứng chuyển màu
                                    style={dailyCheckPointScreenStyleSheet.moneyValueContainerLinear}
                                />
                                <Text style={dailyCheckPointScreenStyleSheet.moneyValueTxt}>{user ? formatNumber(user?.diamondWallet!.amount, t) : 0}</Text>
                            </View>

                            <TouchableOpacity
                                style={dailyCheckPointScreenStyleSheet.plusMoneyButton}
                                touchSoundDisabled={true}
                            >
                                <FontAwesome
                                    name="plus"
                                    size={10}
                                    color={colors.white}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Coin container */}
                <View style={dailyCheckPointScreenStyleSheet.coinContainer}>
                    <LinearGradient
                        colors={[colors.white, colors.icyWhite]}
                        style={dailyCheckPointScreenStyleSheet.coinContainerLinear}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    />

                    {/* Star SVG */}
                    <View style={dailyCheckPointScreenStyleSheet.coinStarContainerBg}>
                        <StarSVGLinear
                            width={ScreenHeight / 5.5}
                            height={ScreenHeight / 5.5}
                            leftLinear={colors.superBlurWhite}
                            rightLinear={theme === "dark" ? colors.lighterBlue2 : colors.lightOrange}
                        />
                    </View>

                    {/* My coin */}
                    <View style={dailyCheckPointScreenStyleSheet.myCoinContainer}>
                        <Text style={dailyCheckPointScreenStyleSheet.myCoinTxt}>
                            {t("my-coin")}
                        </Text>
                        <Text style={[
                            dailyCheckPointScreenStyleSheet.coinValueTxt,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.darkOrange
                            }
                        ]}>
                            {user ? user?.coinWallet?.amount : 0}
                        </Text>
                    </View>

                    {/* Checkpoint + Deposit button */}
                    <View style={dailyCheckPointScreenStyleSheet.coinButtonContainer}>
                        {/* Checkpoint button */}
                        <TouchableOpacity
                            style={dailyCheckPointScreenStyleSheet.coinButtonItem}
                            disabled={isFetching || todayDaily?.status === "Checked" || todayDaily?.dayStatus !== "Today" || todayDaily == null}
                            touchSoundDisabled={true}
                            onPress={() => {
                                handleCheckin(todayDaily!.id);
                            }}
                        >
                            {
                                todayDaily?.status != "Checked" ?
                                    <LinearGradient
                                        colors={theme === "dark" ? [colors.lighterBlue, colors.lightBlue] : [colors.lighterOrange, colors.lightOrange]}
                                        style={dailyCheckPointScreenStyleSheet.coinButtonItemLinear}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                    />
                                    :
                                    <LinearGradient
                                        colors={[colors.grey, colors.blurBlack]}
                                        style={dailyCheckPointScreenStyleSheet.coinButtonItemLinear}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                    />
                            }
                            <Text style={dailyCheckPointScreenStyleSheet.coinButtonTxt}>
                                {todayDaily?.status != "Checked" ? t("unclaimed") : t("claimed")}
                            </Text>
                        </TouchableOpacity>

                        {/* Deposit button */}
                        <TouchableOpacity style={dailyCheckPointScreenStyleSheet.coinButtonItem}>
                            <LinearGradient
                                colors={theme === "dark" ? [colors.brown, colors.mediumBrown] : [colors.diamond1, colors.diamond]}
                                style={dailyCheckPointScreenStyleSheet.coinButtonItemLinear}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            />
                            <Text style={dailyCheckPointScreenStyleSheet.coinButtonTxt}>
                                {t("deposit")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Daily checkpoint */}
                <View style={dailyCheckPointScreenStyleSheet.dailyCheckpointContainer}>
                    <LinearGradient
                        colors={[colors.white, colors.icyWhite]}
                        style={dailyCheckPointScreenStyleSheet.dailyCheckpointLinear}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    />

                    <Text style={[
                        dailyCheckPointScreenStyleSheet.dailyCheckpointHeaderTxt,
                        {
                            color: theme === "dark" ? colors.darkBlue : colors.darkOrange
                        }
                    ]}>
                        {t("claim-reward-title")}
                    </Text>

                    <Text style={[
                        dailyCheckPointScreenStyleSheet.dailyCheckpointSubHeaderTxt,
                        {
                            color: theme === "dark" ? colors.lightBlue : colors.lightOrange
                        }
                    ]}>
                        {t("remember-collect-reward")}
                        <Text>
                            {tomorrowDaily != null && tomorrowDaily.coinValue != null ?
                                `${tomorrowDaily.coinValue} ${t("coin")}`
                                : `??? ${t("coin")}`}
                        </Text>
                        <Text>
                            {tomorrowDaily != null && tomorrowDaily.diamondValue != null ?
                                ` + ${tomorrowDaily.diamondValue} ${t("diamond")}`
                                : ""}
                        </Text>
                    </Text>

                    <View style={dailyCheckPointScreenStyleSheet.flatListContainer}>
                        <FlatList<DailyCheckPointItemProps>
                            data={data}
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <CheckPointItem
                                    isFetching={isFetching}
                                    item={item}
                                    handleCheckin={handleCheckin}
                                />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal={true}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: "space-evenly", // Giãn đều theo trục dọc
                            }}
                        />
                    </View>

                    {/* Sunday */}
                    <TouchableOpacity
                        style={dailyCheckPointScreenStyleSheet.checkPointFinalDateContainer}
                        disabled={isFetching || sundayCheckPoint?.status === "Checked" || sundayCheckPoint?.dayStatus !== "Today" || sundayCheckPoint == null}
                        touchSoundDisabled={true}
                        onPress={() => {
                            handleCheckin(sundayCheckPoint!.id);
                        }}
                    >
                        <LinearGradient
                            colors={[colors.lightYellow, colors.darkYellow]} // Hiệu ứng chuyển màu
                            style={dailyCheckPointScreenStyleSheet.checkPointFinalDateBgLinear}
                        />
                        <View style={dailyCheckPointScreenStyleSheet.checkPointDayContainer}>
                            <LinearGradient
                                colors={[colors.icyWhite, colors.white]} // Hiệu ứng chuyển màu
                                style={dailyCheckPointScreenStyleSheet.checkPointDayContainerLinear}
                            />
                            <Text style={dailyCheckPointScreenStyleSheet.dateItemTxt}>
                                {t("sunday")}
                            </Text>
                        </View>

                        {/* Đã nhận ở quá khứ và hiện tại */}
                        {
                            (sundayCheckPoint?.dayStatus !== "Future" && sundayCheckPoint?.status === "Checked") &&
                            <View style={dailyCheckPointScreenStyleSheet.checkedContainer}>
                                <Text style={dailyCheckPointScreenStyleSheet.checkedTxt}>
                                    {t("daily-checked")}
                                </Text>
                            </View>
                        }

                        {/* Tương lai thì khóa */}
                        {
                            (sundayCheckPoint?.dayStatus !== "Today") &&
                            <View style={dailyCheckPointScreenStyleSheet.sundayLockContainer}>
                                {
                                    (sundayCheckPoint?.dayStatus === "Future") &&
                                    <MaterialCommunityIcons name="lock" size={50} color={colors.brown} />
                                }
                            </View>
                        }

                        <View style={dailyCheckPointScreenStyleSheet.finalDateImageContainer}>
                            {/* Coin image */}
                            <View>
                                <Image
                                    source={require("../../assets/images/coin-chest.png")}
                                    style={dailyCheckPointScreenStyleSheet.finalDateCoinImage}
                                />
                                <Text style={
                                    [
                                        dailyCheckPointScreenStyleSheet.valueTxt,
                                        {
                                            color: colors.black,
                                        }
                                    ]
                                }>
                                    {sundayCheckPoint?.coinValue ? `+${sundayCheckPoint?.coinValue} ${t("coin")}` : "???"}
                                </Text>
                            </View>

                            {/* Diamond image */}
                            <View>
                                <Image
                                    source={require("../../assets/images/ptk-diamond-pool.png")}
                                    style={dailyCheckPointScreenStyleSheet.finalDateDiamondImage}
                                />
                                <Text style={
                                    [
                                        dailyCheckPointScreenStyleSheet.valueTxt,
                                        {
                                            color: colors.black,
                                        }
                                    ]
                                }>
                                    {sundayCheckPoint?.diamondValue ? `+${sundayCheckPoint?.diamondValue} ${t("diamond")}` : "???"}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <Text style={[
                    dailyCheckPointScreenStyleSheet.missionReward,
                    {
                        color: theme === "dark" ? colors.white : colors.grey
                    }
                ]}>
                    {t("mission-reward")}
                </Text>

                {/* Thành tựu */}
                <View style={dailyCheckPointScreenStyleSheet.functionContainer}>
                    <LinearGradient
                        colors={[colors.white, colors.icyWhite]}
                        style={dailyCheckPointScreenStyleSheet.functionContainerLinear}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    />

                    <View style={dailyCheckPointScreenStyleSheet.functionLeftContainer}>
                        <View style={dailyCheckPointScreenStyleSheet.iconContainer}>
                            <LinearGradient
                                colors={[colors.diamond, colors.darkBlue]}
                                style={dailyCheckPointScreenStyleSheet.iconContainerLinear}
                            />
                            <Ionicons name="trophy-outline" size={35} color={colors.white} />
                        </View>

                        <View style={dailyCheckPointScreenStyleSheet.functionContentContainer}>
                            <Text style={dailyCheckPointScreenStyleSheet.functionTitle}>
                                {t("achievements")}
                            </Text>
                            <Text
                                style={dailyCheckPointScreenStyleSheet.functionDescription}
                                numberOfLines={2}
                            >
                                {t("achievements-decriptive")}
                            </Text>
                        </View>

                    </View>

                    <Entypo
                        name="chevron-right"
                        size={20}
                        color={colors.grey}
                        style={dailyCheckPointScreenStyleSheet.functionRightIcon}
                    />
                </View>

                {/* Trò chơi */}
                <TouchableOpacity
                    style={dailyCheckPointScreenStyleSheet.functionContainer}
                    onPress={() => {
                        navigation.navigate("GameList");
                    }}
                >
                    <LinearGradient
                        colors={[colors.white, colors.icyWhite]}
                        style={dailyCheckPointScreenStyleSheet.functionContainerLinear}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    />

                    <View style={dailyCheckPointScreenStyleSheet.functionLeftContainer}>
                        <View style={dailyCheckPointScreenStyleSheet.iconContainer}>
                            <LinearGradient
                                colors={[colors.lighterBlue, colors.lightRed]}
                                style={dailyCheckPointScreenStyleSheet.iconContainerLinear}
                            />
                            <Ionicons name="game-controller" size={35} color={colors.white} />
                        </View>

                        <View style={dailyCheckPointScreenStyleSheet.functionContentContainer}>
                            <Text style={dailyCheckPointScreenStyleSheet.functionTitle}>
                                {t("games")}
                            </Text>
                            <Text
                                style={dailyCheckPointScreenStyleSheet.functionDescription}
                                numberOfLines={2}
                            >
                                {t("games-content")}
                            </Text>
                        </View>

                    </View>

                    <Entypo
                        name="chevron-right"
                        size={20}
                        color={colors.grey}
                        style={dailyCheckPointScreenStyleSheet.functionRightIcon}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
