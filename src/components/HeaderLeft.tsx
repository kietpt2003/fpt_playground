import { View, Text, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import homeScreenStyleSheet from '../screens/styles/homeScreenStyleSheet'
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { colors } from '../constants/colors';
import CircularProgress from './CircularProgress';
import { calculateProgressPercentage } from '../utils/calculateProgressPercentage';
import { ScreenHeight } from '@rneui/base';
import HorizontalLevelBar from './HorizontalLevelBar';
import headerLeftStyleSheet from './styles/headerLeftStyleSheet';
import { useTranslation } from 'react-i18next';

const defaultLevel = 50;
const totalLevel = 120;
const totalDuration = 5000; // Tổng thời gian hiệu ứng (5 giây)
const defaultUserName = "default_user123"
const defaultYear = 2025;

export default function HeaderLeft() {
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.auth.user);

    const translateX = useRef(new Animated.Value(-200)).current;

    const currentLevelPercent = calculateProgressPercentage(defaultLevel, totalLevel);

    const theme = useSelector((state: RootState) => state.theme.theme);

    useEffect(() => {
        // Chạy animation khi component được mount
        Animated.timing(translateX, {
            toValue: 0, // Dịch chuyển đến vị trí ban đầu
            duration: 800, // Thời gian chạy animation (ms)
            useNativeDriver: true, // Sử dụng native driver để tăng hiệu suất
        }).start();
    }, []);


    return (
        <Animated.View
            style={[
                headerLeftStyleSheet.container,
                { transform: [{ translateX }] }, // Thêm animation dịch chuyển
            ]}
        >
            <LinearGradient
                colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                style={headerLeftStyleSheet.containerLinear}
            />
            <View style={headerLeftStyleSheet.topContentContainer}>
                <CircularProgress
                    currentLevelPercent={user ? user.userLevelPass.percentage : 0}
                    totalDuration={totalDuration}
                    targetLevel={user ? user.userLevelPass.level : defaultLevel}
                />
                <View style={headerLeftStyleSheet.nameContainer}>
                    <Text
                        style={headerLeftStyleSheet.nameTxt}
                        numberOfLines={1}
                    >
                        {user ? user.userName : defaultUserName}
                    </Text>
                    <Text
                        style={headerLeftStyleSheet.yearTxt}
                        numberOfLines={1}
                    >{t("member-since")}{user ? user.createdAt.split("-")[0] : defaultYear}</Text>
                </View>
            </View>
            <View style={headerLeftStyleSheet.levelContainer}>
                <Text style={headerLeftStyleSheet.levelTxt}>Exp:</Text>
                <HorizontalLevelBar
                    percentage={user ? user.userLevelPass.percentage : 0}
                    totalDuration={totalDuration}
                />
            </View>
        </Animated.View>
    )
}