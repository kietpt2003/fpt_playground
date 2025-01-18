import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image, Keyboard, Platform, PermissionsAndroid, Permission } from 'react-native';
import React, { useCallback, useState } from 'react'
import signinStyleSheet from './styles/signinStyleSheet';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import { Menu, MenuItem } from 'react-native-material-menu';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import LanguageModal from '../components/LanguageModal';
import VolumeModal from '../components/VolumeModal';
import getVolumeIcon from '../utils/getVolumeIcon';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AudioPlayer from '../components/AudioPlayer';
import useAudio from '../hooks/useAudio';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ThemeModal from '../components/ThemeModal';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import LottieView from 'lottie-react-native';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { AppError } from '../components/types/errorModalTypes';
import { handleError } from '../utils/handleError';
import ErrorModal from '../components/ErrorModal';
import useClick from '../hooks/useClick';
import { SigninScreenNavigationProp } from './types/signinScreenTypes';
import * as Location from "expo-location";
import usePhoto from '../hooks/usePhoto';
import useCamera from '../hooks/useCamera';

export default function SiginScreen() {
    GoogleSignin.configure({
        webClientId: "10405435021-tn8n8j1vii065u1e9h4509glmaam12j5.apps.googleusercontent.com",
    })

    const [menuVisible, setMenuVisible] = useState(false);

    const navigation = useNavigation<SigninScreenNavigationProp>();

    const { t, i18n } = useTranslation();
    const [openChooseLanguage, setOpenChooseLanguage] = useState(false);

    const [openChangeVolume, setOpenChangeVolume] = useState(false);
    const { volume } = useAudio();

    const theme = useSelector((state: RootState) => state.theme.theme); // Lấy theme từ store
    const [openChooseTheme, setOpenChooseTheme] = useState(false);

    const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);

    const { playSound } = useClick();

    const showMenu = () => {
        playSound(); // Phát âm thanh khi bấm
        setMenuVisible(true);
    };
    const hideMenu = () => {
        playSound(); // Phát âm thanh khi bấm
        setMenuVisible(false);
    };

    const [stringErr, setStringErr] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    const { requestMediaLibPermissionWithoutLinking } = usePhoto();
    const { requestCameraPermissionWithoutLinking } = useCamera();

    // const handleLoginGoogle = async (accessToken) => {
    //     try {
    //       const url =
    //         NODE_ENV == "development"
    //           ? DEV_API
    //           : PROD_API;
    //       const response = await axios.post(`${url}/auth/google/${accessToken}`, {
    //         deviceToken
    //       });
    //       const { token: apiToken, refreshToken } = response.data;

    //       const decodedToken = jwtDecode(apiToken);
    //       console.log('Decoded Token:', decodedToken);
    //       const userInfo = JSON.parse(decodedToken.UserInfo);
    //       console.log('User Info là:', userInfo);
    //       await AsyncStorage.setItem("refreshToken", refreshToken);
    //       await AsyncStorage.setItem("token", apiToken);

    //       await login();

    //       navigation.replace('StackBuyerHome');
    //     } catch (error) {
    //       console.log('API call error:', error?.response?.data);
    //       setStringErr(
    //         error.response?.data?.reasons[0]?.message ?
    //           error.response.data.reasons[0].message
    //           :
    //           "Lỗi mạng vui lòng thử lại sau"
    //       );
    //       setIsError(true);
    //       setIsRecentPushed(false);
    //       await GoogleSignin.signOut();
    //     }
    //   };

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);

            if (!userInfo.data) {
                return;
            }

            const token = await GoogleSignin.getTokens();
            console.log('Access Token:', token.accessToken);

            //   await handleLoginGoogle(token.accessToken);
        } catch (error: unknown) {
            console.log(error);

            if (error instanceof Error) {
                handleError(error as AppError, setStringErr, setIsError);
            } else {
                console.log("Unexpected error:", error);
                setStringErr("Lỗi không xác định. Vui lòng thử lại.");
                setIsError(true);
            }
        }
    };

    const checkAndRequestPermission = async (permission: Permission) => {
        const granted = await PermissionsAndroid.check(permission);
        if (!granted) {
            return await PermissionsAndroid.request(permission);
        }
        return granted;
    };

    const getPermissionAndroid = async () => {
        try {
            const version = parseInt(Platform.Version.toString(), 10);

            // Android 13 trở lên
            if (version >= 33) {
                await checkAndRequestPermission(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
            } else {
                // Android dưới 13
                await checkAndRequestPermission(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            }

            // Các quyền khác (tuỳ chọn)
            await checkAndRequestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION);
        } catch (err) {
            console.warn('Error requesting permissions: ', err);
        }
    };

    //Check user permissions
    useFocusEffect(
        useCallback(() => {
            (async () => {
                await Location.requestForegroundPermissionsAsync();
                await requestMediaLibPermissionWithoutLinking();
                await requestCameraPermissionWithoutLinking();
                if (Platform.OS === "android") {
                    await getPermissionAndroid();
                }
            })();
        }, [])
    );

    //Check keyboard open
    useFocusEffect(
        useCallback(() => {
            const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
                setIsOpenKeyboard(true);
            });
            const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
                setIsOpenKeyboard(false);
            });

            // Cleanup các listener khi component unmount
            return () => {
                keyboardDidShowListener.remove();
                keyboardDidHideListener.remove();
            };
        }, [])
    );

    return (
        <ImageBackground
            source={
                theme === "dark" ?
                    require('../../assets/images/login-dark-background.webp') :
                    require('../../assets/images/login-light-background.webp')
            }
            style={signinStyleSheet.backgroundImage}
        >
            <View style={signinStyleSheet.container}>
                <View style={signinStyleSheet.header}>
                    <LinearGradient
                        colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                        style={signinStyleSheet.settingIcon}
                    />
                    <Menu
                        visible={menuVisible}
                        anchor={
                            <TouchableOpacity
                                onPress={showMenu}
                                touchSoundDisabled={true}
                            >
                                <MaterialIcons name="settings" size={24} color={colors.white} />
                            </TouchableOpacity>
                        }
                        onRequestClose={hideMenu}
                        style={{
                            position: "absolute",
                            top: 45,
                            borderRadius: 10,
                            width: i18n.language === "vi" ? 170 : 190,
                            backgroundColor: colors.milkyWhite,
                        }}
                    >
                        {/* Background */}
                        <MenuItem
                            onPress={() => {
                                hideMenu();
                                setOpenChooseTheme(true);
                            }}
                        >
                            <View style={signinStyleSheet.menuItem}>
                                <Ionicons name={theme === "dark" ?
                                    "moon-outline" :
                                    "sunny-outline"
                                } size={theme === "dark" ? 19 : 21} color={"black"} />
                                <Text style={signinStyleSheet.menuItemTxt}>
                                    {t("menu-item-background")}
                                </Text>
                            </View>
                        </MenuItem>

                        {/* Sound */}
                        <MenuItem
                            onPress={() => {
                                hideMenu();
                                setOpenChangeVolume(true);
                            }}
                        >
                            <View style={signinStyleSheet.menuItem}>
                                <Ionicons name={getVolumeIcon(volume * 10)} size={20} color={"black"} />
                                <Text style={signinStyleSheet.menuItemTxt}>
                                    {t("menu-item-sound")}
                                </Text>
                            </View>
                        </MenuItem>

                        {/* Language */}
                        <MenuItem
                            onPress={() => {
                                hideMenu();
                                setOpenChooseLanguage(true);
                            }}
                        >
                            <View style={signinStyleSheet.menuItem}>
                                <Image
                                    style={{
                                        width: i18n.language === "vi" ? 19 : 18,
                                        height: i18n.language === "vi" ? 19 : 18,
                                    }}
                                    source={i18n.language === "vi" ? require("../../assets/images/vn-flag.png") : require("../../assets/images/us-flag.png")}
                                />
                                <Text style={signinStyleSheet.menuItemTxt}>
                                    {t("menu-item-language")}
                                </Text>
                            </View>
                        </MenuItem>
                    </Menu>
                </View>

                <Text style={signinStyleSheet.title}>
                    {t("welcome-txt")}
                </Text>

                <TextInput
                    style={signinStyleSheet.input}
                    placeholder={t("emil-username-signin")}
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    style={signinStyleSheet.input}
                    placeholder={t("password-input-signin")}
                    placeholderTextColor="#aaa"
                    secureTextEntry
                />

                <TouchableOpacity
                    style={signinStyleSheet.button}
                    onPress={() => {
                        navigation.navigate("HomeScreen");
                    }}
                    touchSoundDisabled={true}
                >
                    <LinearGradient
                        colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                        style={signinStyleSheet.signinBtnLinear}
                    />
                    <Text style={signinStyleSheet.buttonText}>
                        {t("signin-btn")}
                    </Text>
                </TouchableOpacity>

                <GoogleSignInButton onPress={() => {
                    handleGoogleSignIn();
                }} />

                <View style={signinStyleSheet.signupForgotPassContainer}>
                    {/* Signup */}
                    <TouchableOpacity
                        style={signinStyleSheet.signupForgotPassBtn}
                        onPress={() => {
                            navigation.navigate("Signup");
                        }}
                        touchSoundDisabled={true}
                    >
                        <Text style={signinStyleSheet.signupTxt}>
                            {t("signup-txt")}
                        </Text>
                    </TouchableOpacity>

                    {/* Forgot password */}
                    <TouchableOpacity
                        style={signinStyleSheet.signupForgotPassBtn}
                        onPress={() => {
                            navigation.navigate("ForgotPassword");
                        }}
                        touchSoundDisabled={true}
                    >
                        <Text style={signinStyleSheet.forgotPasswordTxt}>
                            {t("forgot-password")}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Version control */}
                {
                    !isOpenKeyboard &&
                    <Text style={signinStyleSheet.versionControl}>
                        {t("app-version")}
                    </Text>
                }

                <AudioPlayer />
            </View>

            {/* Change background */}
            <ThemeModal
                openChooseTheme={openChooseTheme}
                setOpenChooseTheme={setOpenChooseTheme}
            />

            {/* Change sound setting */}
            <VolumeModal
                openChangeVolume={openChangeVolume}
                setOpenChangeVolume={setOpenChangeVolume}
            />

            {/* Choose language */}
            <LanguageModal
                openChooseLanguage={openChooseLanguage}
                setOpenChooseLanguage={setOpenChooseLanguage}
            />

            <ErrorModal
                stringErr={stringErr}
                isError={isError}
                setIsError={setIsError}
            />
        </ImageBackground >
    )
}
