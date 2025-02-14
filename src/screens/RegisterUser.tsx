import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image, Keyboard, StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react'
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
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';

type RegisterUserNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RegisterUser'>;

export default function RegisterUser() {

    const [menuVisible, setMenuVisible] = useState(false);

    const navigation = useNavigation<RegisterUserNavigationProp>();

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
        <SafeAreaView>
            <ImageBackground
                source={
                    theme === "dark" ?
                        require('../../assets/images/login-dark-background.webp') :
                        require('../../assets/images/login-light-background.webp')
                }
                style={styles.backgroundImage}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <LinearGradient
                            colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={styles.settingIcon}
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
                                <View style={styles.menuItem}>
                                    <Ionicons name={theme === "dark" ?
                                        "moon-outline" :
                                        "sunny-outline"
                                    } size={theme === "dark" ? 19 : 21} color={"black"} />
                                    <Text style={styles.menuItemTxt}>
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
                                <View style={styles.menuItem}>
                                    <Ionicons name={getVolumeIcon(volume * 10)} size={20} color={"black"} />
                                    <Text style={styles.menuItemTxt}>
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
                                <View style={styles.menuItem}>
                                    <Image
                                        style={{
                                            width: i18n.language === "vi" ? 19 : 18,
                                            height: i18n.language === "vi" ? 19 : 18,
                                        }}
                                        source={i18n.language === "vi" ? require("../../assets/images/vn-flag.png") : require("../../assets/images/us-flag.png")}
                                    />
                                    <Text style={styles.menuItemTxt}>
                                        {t("menu-item-language")}
                                    </Text>
                                </View>
                            </MenuItem>
                        </Menu>
                    </View>

                    <Text style={styles.title}>
                        Register Screen
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder={t("emil-username-signin")}
                        placeholderTextColor="#aaa"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={t("password-input-signin")}
                        placeholderTextColor="#aaa"
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.replace("Signup");
                        }}
                        touchSoundDisabled={true}
                    >
                        <LinearGradient
                            colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={styles.signinBtnLinear}
                        />
                        <Text style={styles.buttonText}>
                            {t("signup-btn")}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.signinForgotPassContainer}>
                        {/* Signin */}
                        <TouchableOpacity
                            style={styles.signinForgotPassBtn}
                            onPress={() => {
                                navigation.goBack();
                            }}
                            touchSoundDisabled={true}
                        >
                            <Text style={styles.signinTxt}>
                                {t("signin-txt")}
                            </Text>
                        </TouchableOpacity>

                        {/* Forgot password */}
                        <TouchableOpacity
                            style={styles.signinForgotPassBtn}
                            onPress={() => {
                                navigation.navigate("ForgotPassword");
                            }}
                            touchSoundDisabled={true}
                        >
                            <Text style={styles.forgotPasswordTxt}>
                                {t("forgot-password")}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Version control */}
                    {
                        !isOpenKeyboard &&
                        <Text style={styles.versionControl}>
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

const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover', // Đảm bảo hình nền che toàn bộ màn hình
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.grey, // Lớp overlay để làm mờ hình nền
    },
    header: {
        position: 'absolute',
        top: 50,
        right: 20,
        width: ScreenHeight / 22,
        height: ScreenHeight / 22,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        borderColor: colors.white,
        borderWidth: 2.8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    settingIcon: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingVertical: 6, // Giảm padding dọc
        backgroundColor: colors.milkyWhite,
        height: ScreenHeight / 8
    },
    menuItemTxt: {
        fontSize: 16,
        flex: 0.9,
        textAlign: 'left',
        flexWrap: "nowrap", // Ngăn xuống dòng
        overflow: "hidden", // Ngăn tràn nội dung
        fontFamily: "Roboto"
    },
    title: {
        fontSize: ScreenWidth > 350 ? 32 : 30,
        color: colors.white,
        marginBottom: 40,
        fontFamily: "RobotoMedium"
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: ScreenWidth > 350 ? 16 : 14,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "rgba(0,0,0.5)",
        fontFamily: "RobotoLight"
    },
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signinBtnLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    buttonText: {
        fontSize: ScreenWidth > 350 ? 18 : 16,
        color: colors.white,
        fontFamily: "RobotoMedium"
    },
    signinForgotPassBtn: {
        width: '50%',
        padding: 5
    },
    forgotPasswordTxt: {
        alignSelf: "flex-end",
        fontSize: ScreenWidth > 350 ? 14 : 13,
        opacity: 0.9,
        letterSpacing: 1,
        color: colors.white,
        fontFamily: "RobotoMedium"
    },
    versionControl: {
        position: "absolute",
        bottom: 10,
        right: 10,
        color: colors.white,
        fontFamily: "Roboto"
    },
    signinTxt: {
        alignSelf: "flex-start",
        fontSize: ScreenWidth > 350 ? 14 : 13,
        opacity: 0.9,
        letterSpacing: 1,
        color: colors.white,
        fontFamily: "RobotoMedium"
    },
    signinForgotPassContainer: {
        flexDirection: "row",
        width: '100%',
    }
});