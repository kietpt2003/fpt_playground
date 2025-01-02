import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';
import React, { useCallback, useState } from 'react'
import signupStyleSheet from './styles/signupStyleSheet';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import { Menu, MenuItem } from 'react-native-material-menu';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import LanguageModal from '../components/LanguageModal';
import VolumeModal from '../components/VolumeModal';
import getVolumeIcon from '../utils/getVolumeIcon';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types/types';
import AudioPlayer from '../components/AudioPlayer';
import useAudio from '../hooks/useAudio';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ThemeModal from '../components/ThemeModal';
import ErrorModal from '../components/ErrorModal';
import useClick from '../hooks/useClick';

type SigninScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signin'>;

export default function SignupScreen() {

    const [menuVisible, setMenuVisible] = useState(false);

    const navigation = useNavigation<SigninScreenNavigationProp>();

    const { t, i18n } = useTranslation();
    const [openChooseLanguage, setOpenChooseLanguage] = useState(false);

    const [openChangeVolume, setOpenChangeVolume] = useState(false);
    const { volume } = useAudio();

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
        <ImageBackground
            source={
                theme === "dark" ?
                    require('../../assets/images/login-dark-background.webp') :
                    require('../../assets/images/login-light-background.webp')
            }
            style={signupStyleSheet.backgroundImage}
        >
            <View style={signupStyleSheet.container}>
                <View style={signupStyleSheet.header}>
                    <LinearGradient
                        colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                        style={signupStyleSheet.settingIcon}
                    />
                    <Menu
                        visible={menuVisible}
                        anchor={
                            <TouchableOpacity onPress={showMenu}>
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

                <Text style={signupStyleSheet.title}>
                    {t("signup-title")}
                </Text>

                <TextInput
                    style={signupStyleSheet.input}
                    placeholder={t("emil-username-signin")}
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    style={signupStyleSheet.input}
                    placeholder={t("password-input-signin")}
                    placeholderTextColor="#aaa"
                    secureTextEntry
                />

                <TouchableOpacity
                    style={signupStyleSheet.button}
                    onPress={() => {
                        navigation.replace("Signup");
                    }}
                >
                    <LinearGradient
                        colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                        style={signupStyleSheet.signinBtnLinear}
                    />
                    <Text style={signupStyleSheet.buttonText}>
                        {t("signup-btn")}
                    </Text>
                </TouchableOpacity>

                <View style={signupStyleSheet.signinForgotPassContainer}>
                    {/* Signin */}
                    <TouchableOpacity
                        style={signupStyleSheet.signinForgotPassBtn}
                        onPress={() => {
                            navigation.goBack();
                        }}
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
        </ImageBackground >
    )
}