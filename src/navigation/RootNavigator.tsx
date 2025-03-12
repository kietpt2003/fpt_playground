import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect } from 'react'
import IntroScreen from "../screens/IntroScreen";
import SiginScreen from "../screens/SiginScreen";
import SignupScreen from "../screens/SignupScreen";
import { RootNavigatorProps, RootStackParamList } from "./types/types";
import { useColorScheme } from '../../src/hooks/useColorScheme';
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../store/reducers/themeReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import ForgotPassword from "../screens/ForgotPassword";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import { useFocusEffect } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import HomeScreen from "../screens/HomeScreen";
import GroupChat from "../screens/GroupChat";
import { setHomeGuideline, setIsOpenDailyCheckPoint } from "../store/reducers/homeReducer";
import Ranking from "../screens/Ranking";
import RankingRewards from "../screens/RankingRewards";
import DailyCheckPointScreen from "../screens/DailyCheckPointScreen";
import FriendsScreen from "../screens/FriendsScreen";
import FriendChatDetail from "../screens/FriendChatDetail";
import CameraScreen from "../screens/CameraScreen";
import GameList from "../screens/GameList";
import ChineseChessHome from "../screens/ChineseChessHome";
import ChineseChessBoard from "../components/ChineseChessBoard";
import RegisterUser from "../screens/RegisterUser";
import VerifyCodeScreen from "../screens/VerifyCodeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator({ onMount }: RootNavigatorProps) {
    const theme = useColorScheme();
    const dispatch = useDispatch();

    // Theme and language setting
    useEffect(() => {
        // Báo rằng RootNavigator đã mount xong
        (async () => {
            const storageTheme = await AsyncStorage.getItem("theme");
            dispatch(changeTheme(storageTheme ? storageTheme : theme))

            const storageLanguage = await AsyncStorage.getItem("language");
            if (storageLanguage) {
                i18next.changeLanguage(storageLanguage);
            }
            onMount();
        })();
    }, []);

    // registerDeviceForRemoteMessages and getDeviceToken
    useFocusEffect(
        useCallback(() => {
            (async () => {
                await messaging().registerDeviceForRemoteMessages();
                let token = await messaging().getToken();
                console.log(token);

                // await getDeviceToken();
            })();
        }, [])
    );

    //get FCM message
    useFocusEffect(
        useCallback(() => {
            const unsubscribe = messaging().onMessage(async remoteMessage => {
                console.log("nhận đc noti", remoteMessage);
            });

            return unsubscribe;
        }, [])
    );

    // homeGuideline + isOpenDailyCheckPoint
    useEffect(() => {
        (async () => {
            const homeGuideline = await AsyncStorage.getItem("homeGuideline");

            dispatch(setHomeGuideline(homeGuideline === "true" || homeGuideline == null))
        })();
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="Signin" component={SiginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="GroupChat" component={GroupChat} />
            <Stack.Screen name="Ranking" component={Ranking} />
            <Stack.Screen name="RankingReward" component={RankingRewards} />
            <Stack.Screen name="DailyCheckPointScreen" component={DailyCheckPointScreen} />
            <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
            <Stack.Screen name="FriendChatDetail" component={FriendChatDetail} />
            <Stack.Screen name="ChineseChessGame" component={ChineseChessHome} />
            <Stack.Screen name="CameraScreen" component={CameraScreen} />
            <Stack.Screen name="GameList" component={GameList} />
            <Stack.Screen name="ChineseChessBoard" component={ChineseChessBoard} />
            <Stack.Screen name="RegisterUser" component={RegisterUser} />
            <Stack.Screen name="VerifyCodeScreen" component={VerifyCodeScreen} />
        </Stack.Navigator>
    )
}