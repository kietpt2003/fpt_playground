import { View, Text, ImageBackground, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import dailyCheckPointScreenStyleSheet from './styles/dailyCheckPointScreenStyleSheet';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import useClick from '../hooks/useClick';
import { useNavigation } from '@react-navigation/native';
import StarSVGLinear from '../components/starSVGLinear';
import { ScreenHeight } from '@rneui/base';
import { useTranslation } from 'react-i18next';
import { DailyCheckPointItemProps } from '../components/types/dailyCheckPointTypes';
import CheckPointItem from '../components/CheckPointItem';

export default function DailyCheckPointScreen() {
    const theme = useSelector((state: RootState) => state.theme.theme);

    const { t } = useTranslation();

    const { playSound } = useClick();

    const navigation = useNavigation();

    const [data, setData] = useState<DailyCheckPointItemProps[]>([]);
    const [sundayCheckPoint, setSundayCheckPoint] = useState<DailyCheckPointItemProps | null>(null);

    useEffect(() => {
        // Gọi API
        const fetchDailyCheckPoint = async () => {
            const response: DailyCheckPointItemProps[] = [
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
        <>
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
                            <Text style={dailyCheckPointScreenStyleSheet.moneyValueTxt}>12K</Text>
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
                            <Text style={dailyCheckPointScreenStyleSheet.moneyValueTxt}>22K</Text>
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
                        2000
                    </Text>
                </View>

                {/* Checkpoint + Deposit button */}
                <View style={dailyCheckPointScreenStyleSheet.coinButtonContainer}>
                    {/* Checkpoint button */}
                    <TouchableOpacity style={dailyCheckPointScreenStyleSheet.coinButtonItem}>
                        <LinearGradient
                            colors={theme === "dark" ? [colors.lighterBlue, colors.lightBlue] : [colors.lighterOrange, colors.lightOrange]}
                            style={dailyCheckPointScreenStyleSheet.coinButtonItemLinear}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        />
                        <Text style={dailyCheckPointScreenStyleSheet.coinButtonTxt}>
                            {t("unclaimed")}
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
                        {sundayCheckPoint?.value} {t("coin")}
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
                                date={item.date}
                                value={item.value}
                                dayStatus={item.dayStatus}
                                status={item.status}
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
                    disabled={sundayCheckPoint?.status === "Checked" || sundayCheckPoint?.dayStatus !== "Today"}
                    touchSoundDisabled={true}
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
                                +{sundayCheckPoint?.value} {t("coin")}
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
                                +{sundayCheckPoint?.value} {t("diamond")}
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
                    size={28}
                    color={colors.grey}
                    style={dailyCheckPointScreenStyleSheet.functionRightIcon}
                />
            </View>

            {/* Trò chơi */}
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
                    size={28}
                    color={colors.grey}
                    style={dailyCheckPointScreenStyleSheet.functionRightIcon}
                />
            </View>
        </>
    )
}