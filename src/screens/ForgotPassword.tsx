import {
    ActivityIndicator,
    Image,
    ImageBackground,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useCallback, useState } from "react";
import LottieView from "lottie-react-native";
import axios from "axios";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { useTranslation } from "react-i18next";
import ErrorModal from "../components/ErrorModal";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import forgotPasswordStyleSheet from "./styles/forgotPasswordStyleSheet";
import { Menu, MenuItem } from "react-native-material-menu";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors } from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import useAudio from "../hooks/useAudio";
import getVolumeIcon from "../utils/getVolumeIcon";
import AudioPlayer from "../components/AudioPlayer";
import ThemeModal from "../components/ThemeModal";
import VolumeModal from "../components/VolumeModal";
import LanguageModal from "../components/LanguageModal";
import { env } from "../constants/environmentVariables";
import { NavigationProps } from "../navigation/types/types";
import useClick from "../hooks/useClick";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = () => {
    const { NODE_ENV, DEV_API, PROD_API } = env;

    const theme = useSelector((state: RootState) => state.theme.theme); // Lấy theme từ store

    const navigation = useNavigation<NavigationProps>()
    const [userEmail, setUserEmail] = useState("");
    const [isRecentPushed, setIsRecentPushed] = useState(false);

    const [stringErr, setStringErr] = useState("");
    const [isError, setIsError] = useState(false);

    const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);

    const [openChooseTheme, setOpenChooseTheme] = useState(false);

    const [menuVisible, setMenuVisible] = useState(false);
    const { playSound } = useClick();

    const showMenu = () => {
        playSound(); // Phát âm thanh khi bấm
        setMenuVisible(true);
    };
    const hideMenu = () => {
        playSound(); // Phát âm thanh khi bấm
        setMenuVisible(false);
    };

    const [openChooseLanguage, setOpenChooseLanguage] = useState(false);

    const [openChangeVolume, setOpenChangeVolume] = useState(false);
    const { volume } = useAudio();

    const { t, i18n } = useTranslation();

    const handleRequestCode = async () => {
        const url =
            NODE_ENV == "development"
                ? (DEV_API + "/auth/resend")
                : (PROD_API + "/auth/resend");
        setIsRecentPushed(true);
        try {
            // await axios.post(url, {
            //     email: userEmail
            // });
            // setIsRecentPushed(false);
            navigation.navigate("ChangePasswordScreen", { userEmail: userEmail });
        } catch (error) {
            // console.log(error.response.data);
            // setStringErr(
            //     error.response?.data?.reasons[0]?.message ?
            //         error.response.data.reasons[0].message
            //         :
            //         "Lỗi mạng vui lòng thử lại sau"
            // );
            setIsError(true);
            setIsRecentPushed(false);
        }
    };

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
                } // Đường dẫn tới file hình nền trong thư mục dự án
                style={forgotPasswordStyleSheet.backgroundImage}
            >
                <View style={forgotPasswordStyleSheet.container}>
                    <View style={forgotPasswordStyleSheet.header}>
                        <LinearGradient
                            colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={forgotPasswordStyleSheet.settingIcon}
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
                                <View style={forgotPasswordStyleSheet.menuItem}>
                                    <Ionicons name={theme === "dark" ?
                                        "moon-outline" :
                                        "sunny-outline"
                                    } size={theme === "dark" ? 19 : 21} color={"black"} />
                                    <Text style={forgotPasswordStyleSheet.menuItemTxt}>
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
                                <View style={forgotPasswordStyleSheet.menuItem}>
                                    <Ionicons name={getVolumeIcon(volume * 10)} size={20} color={"black"} />
                                    <Text style={forgotPasswordStyleSheet.menuItemTxt}>
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
                                <View style={forgotPasswordStyleSheet.menuItem}>
                                    <Image
                                        style={{
                                            width: i18n.language === "vi" ? 19 : 18,
                                            height: i18n.language === "vi" ? 19 : 18,
                                        }}
                                        source={i18n.language === "vi" ? require("../../assets/images/vn-flag.png") : require("../../assets/images/us-flag.png")}
                                    />
                                    <Text style={forgotPasswordStyleSheet.menuItemTxt}>
                                        {t("menu-item-language")}
                                    </Text>
                                </View>
                            </MenuItem>
                        </Menu>
                    </View>

                    <View style={forgotPasswordStyleSheet.formContainer}>
                        <Text style={[
                            forgotPasswordStyleSheet.formTitlte,
                            {
                                fontSize: i18n.language === "vi" ? 24 : 21,
                            }
                        ]}>
                            {t("forgot-pass-title")}
                        </Text>

                        <Text style={forgotPasswordStyleSheet.formGuide}>
                            {t("forgot-pass-guide")}
                        </Text>

                        {/* Email */}
                        <TextInput
                            style={forgotPasswordStyleSheet.mailInput}
                            placeholder={t("your-email")}
                            value={userEmail}
                            onChangeText={(text) => setUserEmail(text)}
                        />

                        {/* Request code button */}
                        <TouchableOpacity
                            style={[
                                forgotPasswordStyleSheet.requestCodeBtnContainer,
                                (isRecentPushed || userEmail === "") && {
                                    backgroundColor: colors.grey,
                                },
                            ]}
                            onPress={() => handleRequestCode()}
                            disabled={isRecentPushed || userEmail === ""}
                            touchSoundDisabled={true}
                        >
                            {
                                !(isRecentPushed || userEmail === "") &&
                                <LinearGradient
                                    colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                                    style={forgotPasswordStyleSheet.requestCodeBtnLinear}
                                />
                            }
                            <Text
                                style={forgotPasswordStyleSheet.requestCodeTxt}
                            >
                                {t("request-code-txt")}
                            </Text>
                            {
                                isRecentPushed &&
                                <ActivityIndicator color={colors.white} />
                            }
                        </TouchableOpacity>

                        {/* Back button */}
                        <TouchableOpacity
                            style={forgotPasswordStyleSheet.backBtnContainer}
                            onPress={() => {
                                navigation.goBack();
                            }}
                            touchSoundDisabled={true}
                        >
                            <Text style={forgotPasswordStyleSheet.backBtnTxt}>
                                {t("back-login-btn")}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Version control */}
                    {
                        !isOpenKeyboard &&
                        <Text style={forgotPasswordStyleSheet.versionControl}>
                            {t("app-version")}
                        </Text>
                    }
                </View>

                <ErrorModal
                    stringErr={stringErr}
                    isError={isError}
                    setIsError={setIsError}
                />

                <AudioPlayer />

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
            </ImageBackground >
        </SafeAreaView>
    );
};

export default ForgotPassword;
