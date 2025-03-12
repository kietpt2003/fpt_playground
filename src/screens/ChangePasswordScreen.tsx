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
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ErrorModal from "../components/ErrorModal";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Snackbar } from "react-native-paper";
import { env } from "../constants/environmentVariables";
import { NavigationProps } from "../navigation/types/types";
import { ChangePasswordScreenRouteProp } from "./types/changePasswordTypes";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import changePasswordScreenStyleSheet from "./styles/changePasswordScreenStyleSheet";
import AudioPlayer from "../components/AudioPlayer";
import ThemeModal from "../components/ThemeModal";
import VolumeModal from "../components/VolumeModal";
import LanguageModal from "../components/LanguageModal";
import useAudio from "../hooks/useAudio";
import { colors } from "../constants/colors";
import { Menu, MenuItem } from "react-native-material-menu";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import getVolumeIcon from "../utils/getVolumeIcon";
import useClick from "../hooks/useClick";

const ChangePasswordScreen = () => {
    const { NODE_ENV, DEV_API, PROD_API } = env;

    const theme = useSelector((state: RootState) => state.theme.theme); // Lấy theme từ store

    const navigation = useNavigation<NavigationProps>();
    const route = useRoute<ChangePasswordScreenRouteProp>();

    const params = route.params;

    const [isRecentPushed, setIsRecentPushed] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(true);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    const [code, setCode] = useState("");

    const [stringErr, setStringErr] = useState("");
    const [isError, setIsError] = useState(false);

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");


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

    const handleChangePassword = async () => {
        const url =
            NODE_ENV == "development"
                ? (DEV_API + "/auth/forgot-password")
                : (PROD_API + "/auth/forgot-password");
        setIsRecentPushed(true);
        try {
            await axios.post(url, {
                email: params ? params.userEmail : "",
                newPassword: newPassword,
                code: code
            });
            setIsRecentPushed(false);
            setSnackbarMessage("Cập nhật thành công");
            setSnackbarVisible(true);
            await delay(500);

            // navigation.replace("Login");
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

    const handleResendCode = async () => {
        const url =
            NODE_ENV == "development"
                ? (DEV_API + "/auth/resend")
                : (PROD_API + "/auth/resend");
        setIsRecentPushed(true);
        try {
            await axios.post(url, {
                email: params ? params.userEmail : ""
            });
            setIsRecentPushed(false);
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

    function delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

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

    //Reset to default state
    useFocusEffect(
        useCallback(() => {
            setNewPassword("");
            setShowNewPassword(true);
            setConfirmPassword("");
            setShowConfirmPassword(true);
            setCode("");
        }, [])
    );

    return (
        <ImageBackground
            source={
                theme === "dark" ?
                    require('../../assets/images/login-dark-background.webp') :
                    require('../../assets/images/login-light-background.webp')
            } // Đường dẫn tới file hình nền trong thư mục dự án
            style={changePasswordScreenStyleSheet.backgroundImage}
        >
            <View style={changePasswordScreenStyleSheet.container}>
                <View style={changePasswordScreenStyleSheet.header}>
                    <LinearGradient
                        colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                        style={changePasswordScreenStyleSheet.settingIcon}
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
                            <View style={changePasswordScreenStyleSheet.menuItem}>
                                <Ionicons name={theme === "dark" ?
                                    "moon-outline" :
                                    "sunny-outline"
                                } size={theme === "dark" ? 19 : 21} color={"black"} />
                                <Text style={changePasswordScreenStyleSheet.menuItemTxt}>
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
                            <View style={changePasswordScreenStyleSheet.menuItem}>
                                <Ionicons name={getVolumeIcon(volume * 10)} size={20} color={"black"} />
                                <Text style={changePasswordScreenStyleSheet.menuItemTxt}>
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
                            <View style={changePasswordScreenStyleSheet.menuItem}>
                                <Image
                                    style={{
                                        width: i18n.language === "vi" ? 19 : 18,
                                        height: i18n.language === "vi" ? 19 : 18,
                                    }}
                                    source={i18n.language === "vi" ? require("../../assets/images/vn-flag.png") : require("../../assets/images/us-flag.png")}
                                />
                                <Text style={changePasswordScreenStyleSheet.menuItemTxt}>
                                    {t("menu-item-language")}
                                </Text>
                            </View>
                        </MenuItem>
                    </Menu>
                </View>

                <View style={changePasswordScreenStyleSheet.formContainer}>
                    <Text style={[
                        changePasswordScreenStyleSheet.formTitlte,
                        {
                            fontSize: i18n.language === "vi" ? 24 : 21,
                        }
                    ]}>
                        {t("forgot-pass-title")}
                    </Text>

                    <View>
                        <Text style={changePasswordScreenStyleSheet.formGuide}>
                            {t("change-pass-guide")}
                        </Text>
                        <Text style={[
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.darkOrange,
                            },
                            changePasswordScreenStyleSheet.formGuideMail
                        ]}>
                            {params!.userEmail}
                        </Text>
                    </View>

                    {/* New password */}
                    <View style={changePasswordScreenStyleSheet.inputContainer}>
                        <TextInput
                            style={changePasswordScreenStyleSheet.input}
                            placeholder={t("new-password")}
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text)}
                            secureTextEntry={showNewPassword}
                        />
                        {newPassword?.length > 0 && (
                            <TouchableOpacity
                                style={changePasswordScreenStyleSheet.showHidePass}
                                onPress={() => setShowNewPassword(!showNewPassword)}
                                touchSoundDisabled={true}
                            >
                                <Icon
                                    name={showNewPassword ? "eye-off-sharp" : "eye-sharp"}
                                    size={20}
                                    color={colors.grey}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Confirm password */}
                    <View style={changePasswordScreenStyleSheet.inputContainer}>
                        <TextInput
                            style={changePasswordScreenStyleSheet.input}
                            placeholder={t("retype-password")}
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            secureTextEntry={showConfirmPassword}
                        />
                        {confirmPassword?.length > 0 && (
                            <TouchableOpacity
                                style={changePasswordScreenStyleSheet.showHidePass}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                touchSoundDisabled={true}
                            >
                                <Icon
                                    name={showConfirmPassword ? "eye-off-sharp" : "eye-sharp"}
                                    size={20}
                                    color={colors.grey}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Code */}
                    <View>
                        <TextInput
                            style={changePasswordScreenStyleSheet.input}
                            placeholder={t("verify-code-input")}
                            value={code}
                            onChangeText={(text) => setCode(text)}
                        />
                        <TouchableOpacity
                            onPress={() => handleResendCode()}
                            disabled={isRecentPushed}
                            style={changePasswordScreenStyleSheet.resendCodeContainer}
                            touchSoundDisabled={true}
                        >
                            <Text
                                style={changePasswordScreenStyleSheet.resendCodeTxt}
                            >
                                {t("resend-code")}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[
                            changePasswordScreenStyleSheet.changePassBtnContainer,
                            (isRecentPushed ||
                                (newPassword === "" && confirmPassword === "") ||
                                (newPassword !== confirmPassword) ||
                                code === "") && {
                                backgroundColor: colors.grey
                            },
                        ]}
                        onPress={() => handleChangePassword()}
                        disabled={isRecentPushed ||
                            (newPassword === "" && confirmPassword === "") ||
                            (newPassword !== confirmPassword) ||
                            code === ""}
                        touchSoundDisabled={true}
                    >
                        {
                            !(isRecentPushed ||
                                (newPassword === "" && confirmPassword === "") ||
                                (newPassword !== confirmPassword) ||
                                code === "") &&
                            <LinearGradient
                                colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                                style={changePasswordScreenStyleSheet.changePassBtnLinear}
                            />
                        }
                        <Text
                            style={changePasswordScreenStyleSheet.changePassTxt}
                        >
                            {t("change-pass-txt")}
                        </Text>
                        {
                            isRecentPushed &&
                            <ActivityIndicator color={colors.white} />
                        }
                    </TouchableOpacity>

                    {/* Back button */}
                    <TouchableOpacity
                        style={changePasswordScreenStyleSheet.backBtnContainer}
                        onPress={() => {
                            navigation.replace("Signin");
                        }}
                        touchSoundDisabled={true}
                    >
                        <Text style={changePasswordScreenStyleSheet.backBtnTxt}>
                            {t("back-login-btn")}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Version control */}
                {
                    !isOpenKeyboard &&
                    <Text style={changePasswordScreenStyleSheet.versionControl}>
                        {t("app-version")}
                    </Text>
                }
            </View>

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

            <ErrorModal
                stringErr={stringErr}
                isError={isError}
                setIsError={setIsError}
            />

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={1500}
                wrapperStyle={{ bottom: 0, zIndex: 1 }}
            >
                {snackbarMessage}
            </Snackbar>
        </ImageBackground >
    );
};

export default ChangePasswordScreen;
