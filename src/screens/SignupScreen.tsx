import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image, Keyboard, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react'
import signupStyleSheet from './styles/signupStyleSheet';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import { Menu, MenuItem } from 'react-native-material-menu';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import LanguageModal from '../components/LanguageModal';
import VolumeModal from '../components/VolumeModal';
import getVolumeIcon from '../utils/getVolumeIcon';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types/types';
import AudioPlayer from '../components/AudioPlayer';
import useAudio from '../hooks/useAudio';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ThemeModal from '../components/ThemeModal';
import ErrorModal from '../components/ErrorModal';
import useClick from '../hooks/useClick';
import axios from 'axios';
import { ErrorResponse } from '../constants/Errors/ErrorResponse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../store/reducers/authReducer';
import { handleValidEmail } from '../utils/handleValidEmail';
import { handleValidPassword } from '../utils/handleValidPassword';
import useNotification from '../hooks/useNotification';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApiClient } from '../hooks/useApiClient';
import { useApiServer } from '../hooks/useApiServer';

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

export default function SignupScreen() {
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { apiUrl } = useApiServer();
    const apiClient = useApiClient();

    const [menuVisible, setMenuVisible] = useState(false);

    const navigation = useNavigation<SignupScreenNavigationProp>();

    const { t, i18n } = useTranslation();
    const [openChooseLanguage, setOpenChooseLanguage] = useState(false);

    const [openChangeVolume, setOpenChangeVolume] = useState(false);
    const { volume } = useAudio();
    const { deviceToken } = useNotification();

    const { playSound } = useClick();

    const theme = useSelector((state: RootState) => state.theme.theme); // Lấy theme từ store
    const [openChooseTheme, setOpenChooseTheme] = useState(false);

    const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);

    const showMenu = () => {
        playSound(); // Phát âm thanh khi bấm
        setMenuVisible(true);
    };
    const hideMenu = () => {
        playSound(); // Phát âm thanh khi bấm
        setMenuVisible(false);
    };

    const validateEmail = () => {
        if (email.length == 0) {
            setEmailError(t("email-empty-error"));
            return false;
        } else if (!handleValidEmail(email)) {
            setEmailError(t("email-other-error"));
            return false;
        } else {
            setEmailError("");
            return true;
        }
    }

    const validatePassword = () => {
        if (password.length == 0) {
            setPasswordError(t("password-empty-error"));
            return false;
        } else if (!handleValidPassword(password)) {
            setPasswordError(t("password-other-error"));
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    }

    const handleSignUp = async () => {
        try {
            let isError = false;
            if (!validateEmail()) {
                isError = true;
            }

            if (!validatePassword()) {
                isError = true;
            }

            if (isError) return;

            setIsFetching(true);
            await apiClient.post(`${apiUrl}/auth/signup`, {
                email: email,
                password: password,
                role: "User",
                deviceToken: deviceToken ? deviceToken : undefined
            });
            navigation.navigate("VerifyCodeScreen", { email: email });
            setIsFetching(false);
        } catch (error: unknown) {
            // Kiểm tra nếu error là AxiosError
            if (axios.isAxiosError(error)) {
                const errorData: ErrorResponse = error.response?.data;
                console.log("API call error:", error.response?.data);
                if (error.status == 503) {
                    setStringErr(t("server-maintenance"));
                    await AsyncStorage.multiRemove(["token", "refreshToken"], () => {
                        dispatch(logout());
                    });
                } else {
                    setStringErr(
                        errorData?.reasons?.[0]?.message ??
                        "Lỗi mạng, vui lòng thử lại sau"
                    );
                }
            } else {
                console.log("Unexpected error:", error);
                setStringErr("Đã xảy ra lỗi không xác định.");
            }

            setIsFetching(false);
            setIsError(true);
        }
    }

    const [stringErr, setStringErr] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

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
        <SafeAreaView>
            <ImageBackground
                source={
                    theme === "dark" ?
                        require('../../assets/images/login-dark-background.webp') :
                        require('../../assets/images/login-light-background.webp')
                }
                style={signupStyleSheet.backgroundImage}
            >
                <View style={signupStyleSheet.container}>
                    {/* Setting */}
                    <View style={signupStyleSheet.header}>
                        <LinearGradient
                            colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={signupStyleSheet.settingIcon}
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
                                <View style={signupStyleSheet.menuItem}>
                                    <Ionicons name={theme === "dark" ?
                                        "moon-outline" :
                                        "sunny-outline"
                                    } size={theme === "dark" ? 19 : 21} color={"black"} />
                                    <Text style={signupStyleSheet.menuItemTxt}>
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
                                <View style={signupStyleSheet.menuItem}>
                                    <Ionicons name={getVolumeIcon(volume * 10)} size={20} color={"black"} />
                                    <Text style={signupStyleSheet.menuItemTxt}>
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
                                <View style={signupStyleSheet.menuItem}>
                                    <Image
                                        style={{
                                            width: i18n.language === "vi" ? 19 : 18,
                                            height: i18n.language === "vi" ? 19 : 18,
                                        }}
                                        source={i18n.language === "vi" ? require("../../assets/images/vn-flag.png") : require("../../assets/images/us-flag.png")}
                                    />
                                    <Text style={signupStyleSheet.menuItemTxt}>
                                        {t("menu-item-language")}
                                    </Text>
                                </View>
                            </MenuItem>
                        </Menu>
                    </View>

                    {/* Email */}
                    <TextInput
                        style={[
                            signupStyleSheet.input,
                            {
                                backgroundColor: emailError.length == 0 ? colors.white : colors.lightRed,
                                borderColor: emailError.length == 0 ? "rgba(0,0,0,0.5)" : colors.darkRed,
                                marginBottom: emailError.length == 0 ? 20 : 0,
                            }
                        ]}
                        placeholder={t("email-signin")}
                        placeholderTextColor={emailError.length == 0 ? "#aaa" : colors.white}
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                        }}
                        onEndEditing={() => {
                            validateEmail();
                        }}
                        editable={!isFetching}
                    />
                    {
                        emailError.length != 0 &&
                        <Text style={signupStyleSheet.errorInput}>{emailError}</Text>
                    }

                    {/* Password */}
                    <View style={[
                        signupStyleSheet.passwordInputContainer,
                        {
                            marginBottom: passwordError.length == 0 ? 20 : 0,
                        }
                    ]}>
                        <TextInput
                            style={[
                                signupStyleSheet.input,
                                {
                                    backgroundColor: passwordError.length == 0 ? colors.white : colors.lightRed,
                                    borderColor: passwordError.length == 0 ? "rgba(0,0,0,0.5)" : colors.darkRed,
                                    marginBottom: 0,
                                }
                            ]}
                            placeholder={t("password-input-signin")}
                            placeholderTextColor={passwordError.length == 0 ? "#aaa" : colors.white}
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={(text) => {
                                if (text.length >= 0 && text.length <= 15) {
                                    setPassword(text);
                                }
                            }}
                            onEndEditing={() => {
                                validatePassword();
                            }}
                            editable={!isFetching}
                        />
                        <TouchableOpacity
                            style={signupStyleSheet.showHideButton}
                            onPress={() => {
                                setShowPassword(!showPassword);
                            }}
                            touchSoundDisabled={true}
                        >
                            <FontAwesome5 name={showPassword ? "eye" : "eye-slash"} size={18} color={colors.blurBlack} />
                        </TouchableOpacity>
                    </View>
                    {
                        passwordError.length != 0 &&
                        <Text
                            style={[
                                signupStyleSheet.errorInput,
                                {
                                    height: 40
                                }
                            ]}
                            numberOfLines={2}
                        >{passwordError}</Text>
                    }

                    <TouchableOpacity
                        style={signupStyleSheet.button}
                        onPress={() => {
                            handleSignUp();
                        }}
                        touchSoundDisabled={true}
                        disabled={isFetching}
                    >
                        <LinearGradient
                            colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={signupStyleSheet.signinBtnLinear}
                        />
                        <Text style={signupStyleSheet.buttonText}>
                            {t("signup-btn")}
                        </Text>

                        {
                            isFetching &&
                            <ActivityIndicator color={colors.white} size={18} />
                        }
                    </TouchableOpacity>

                    <View style={signupStyleSheet.signinForgotPassContainer}>
                        {/* Signin */}
                        <TouchableOpacity
                            style={signupStyleSheet.signinForgotPassBtn}
                            onPress={() => {
                                navigation.goBack();
                            }}
                            touchSoundDisabled={true}
                        >
                            <Text style={signupStyleSheet.signinTxt}>
                                {t("signin-txt")}
                            </Text>
                        </TouchableOpacity>

                        {/* Forgot password */}
                        <TouchableOpacity
                            style={signupStyleSheet.signinForgotPassBtn}
                            onPress={() => {
                                navigation.navigate("ForgotPassword");
                            }}
                            touchSoundDisabled={true}
                        >
                            <Text style={signupStyleSheet.forgotPasswordTxt}>
                                {t("forgot-password")}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Version control */}
                    {
                        !isOpenKeyboard &&
                        <Text style={signupStyleSheet.versionControl}>
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
            </ImageBackground>
        </SafeAreaView>
    )
}
