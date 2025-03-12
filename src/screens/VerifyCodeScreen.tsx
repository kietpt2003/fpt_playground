import { View, Text, StyleSheet, Pressable, Keyboard, NativeSyntheticEvent, TextInputKeyPressEventData, ImageBackground, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { TextInput } from "react-native";
import { Snackbar } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { env } from "../constants/environmentVariables";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ErrorResponse } from "../constants/Errors/ErrorResponse";
import { useTranslation } from "react-i18next";
import ErrorModal from "../components/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { loginWithoutUser, logout } from "../store/reducers/authReducer";
import { RootState } from "../store/store";
import { colors } from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import useClick from "../hooks/useClick";
import useAudio from "../hooks/useAudio";
import ThemeModal from "../components/ThemeModal";
import VolumeModal from "../components/VolumeModal";
import LanguageModal from "../components/LanguageModal";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Menu, MenuItem } from "react-native-material-menu";
import getVolumeIcon from "../utils/getVolumeIcon";
import AudioPlayer from "../components/AudioPlayer";
import { TokenResponse } from "../constants/Tokens/TokenResponse";
import { jwtDecode } from "jwt-decode";
import { TokenDecoded } from "../constants/Tokens/TokenDecoded";

const { NODE_ENV, DEV_API, PROD_API } = env;
const url =
    NODE_ENV == "development"
        ? DEV_API
        : PROD_API;

type VerifyCodeScreenRouteProp = RouteProp<RootStackParamList, "VerifyCodeScreen">;
type VerifyCodeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VerifyCodeScreen'>;

const VerifyCodeScreen = () => {
    const route = useRoute<VerifyCodeScreenRouteProp>();
    const navigation = useNavigation<VerifyCodeScreenNavigationProp>();
    const { email } = route.params;

    const dispatch = useDispatch();

    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputs = useRef<{ [key: number]: TextInput | null }>({});

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [stringErr, setStringErr] = useState("");
    const [isError, setIsError] = useState(false);

    const [isFetching, setIsFetching] = useState(false);

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
    const theme = useSelector((state: RootState) => state.theme.theme);

    const handleChange = (value: string, index: number) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (e.nativeEvent.key === "Backspace" && index > 0) {
            const newCode = [...code];

            if (!code[index]) {
                // Nếu ô hiện tại trống, xóa ô trước đó
                newCode[index - 1] = "";
                setCode(newCode);
                inputs.current[index - 1]?.focus();
            } else {
                // Nếu ô hiện tại có giá trị, chỉ xóa giá trị hiện tại
                newCode[index] = "";
                setCode(newCode);
            }
        }
    };

    const handleVerify = async () => {
        try {
            const verificationCode = code.join("").trim();
            setIsFetching(true);
            const response = await axios.post(`${url}/auth/verify`, {
                email: email,
                code: verificationCode,
            });

            const { token: apiToken, refreshToken } = response.data;
            await AsyncStorage.setItem("refreshToken", refreshToken);
            await AsyncStorage.setItem("token", apiToken);

            const tokenDecoded: TokenDecoded = jwtDecode(apiToken);
            const userInfo: TokenResponse = JSON.parse(tokenDecoded.UserInfo);

            dispatch(loginWithoutUser(userInfo.Email));
            setIsFetching(false);
            setSnackbarVisible(true);
            setSnackbarMessage("Xác thực thành công");

            setCode(["", "", "", "", "", ""]);
            Keyboard.dismiss();

            navigation.replace("Signin");
            return;
        } catch (error: unknown) {
            console.log("loi", error);

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

            setIsError(true);
            setIsFetching(false);
            setCode(["", "", "", "", "", ""]);
            Keyboard.dismiss();
        }
    };

    const handleSendAgain = async () => {
        try {
            setCode(["", "", "", "", "", ""]);
            setIsFetching(true);
            const response = await axios.post(`${url}/auth/resend`, {
                email: email,
            });
            setIsFetching(false);
            if (response.status >= 200 && response.status < 300) {
                setSnackbarVisible(true);
                setSnackbarMessage(t("check-mail-msg"));
            }
        } catch (error: unknown) {
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
    };

    //Keyboard linstener
    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });

        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        });

        // Cleanup listeners on component unmount
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    //Auto send verify
    useEffect(() => {
        // Kiểm tra nếu tất cả các phần tử của mảng `code` đều khác ""
        if (code.every((digit) => digit !== "")) {
            handleVerify();
        }
    }, [code]); // Theo dõi mảng `code`

    return (
        <SafeAreaView>
            <ImageBackground
                source={
                    theme === "dark" ?
                        require('../../assets/images/login-dark-background.webp') :
                        require('../../assets/images/login-light-background.webp')
                } // Đường dẫn tới file hình nền trong thư mục dự án
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

                    <View style={[
                        styles.formContainer,
                        {
                            marginTop: keyboardVisible ? ScreenHeight / 100 : ScreenHeight / 50
                        }
                    ]}>
                        <View style={{ alignItems: "center" }}>
                            <Text
                                style={{ fontFamily: "RobotoSemiBold", fontSize: 20 }}
                            >
                                {t("confirm-account")}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "RobotoBold",
                                    fontSize: 15,
                                    color: colors.blurBlack,
                                    paddingHorizontal: 15,
                                    marginTop: 5
                                }}
                            >
                                {t("confirm-account-guideline")}
                            </Text>
                        </View>

                        {/* Tạo ra 6 ô để nhập mã xác nhận */}
                        <View style={styles.codeInputContainer}>
                            {code.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    style={styles.codeInput}
                                    value={digit}
                                    onChangeText={(value) => handleChange(value, index)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    ref={(el) => (inputs.current[index] = el)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                />
                            ))}
                        </View>

                        <View style={{ alignItems: "center" }}>
                            <Pressable
                                style={{
                                    width: ScreenWidth / 1.1 - 100,
                                    alignItems: "center",
                                    backgroundColor: (isFetching || !code.every((digit) => digit !== "")) ? colors.grey : colors.black,
                                    paddingVertical: 10,
                                    borderRadius: 10,
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    gap: 5
                                }}
                                onPress={() => handleVerify()}
                                disabled={isFetching || !code.every((digit) => digit !== "")}
                            >
                                <Text
                                    style={{ color: "white", fontFamily: "RobotoMedium", fontSize: 20 }}
                                >
                                    {t("verify")}
                                </Text>
                                {
                                    isFetching &&
                                    <ActivityIndicator color={"white"} />
                                }
                            </Pressable>

                            <View style={{ flexDirection: "row", gap: 6, marginTop: 10 }}>
                                <Text
                                    style={{
                                        color: "rgba(0,0,0,0.5)",
                                        fontSize: 16,
                                    }}
                                >
                                    {t("not-have-code")}
                                </Text>
                                <Pressable
                                    onPress={() => handleSendAgain()}
                                    disabled={isFetching}
                                >
                                    <Text
                                        style={{ color: "rgba(0,0,0,0.5)", fontSize: 16, fontWeight: "bold" }}
                                    >
                                        {t("resend")}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>

                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={1500}
                    wrapperStyle={{ bottom: 0, zIndex: 1 }}
                >
                    {snackbarMessage}
                </Snackbar>

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
            </ImageBackground >
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.grey, // Lớp overlay để làm mờ hình nền
    },
    header: {
        position: 'absolute',
        top: 30,
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
    formContainer: {
        width: ScreenWidth / 1.1,
        alignSelf: "center",
        backgroundColor: colors.milkyWhite,
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderColor: "rgba(0, 0, 0, 0.3)",
        borderWidth: 0.5,
        borderRadius: 10 + 10,
        shadowColor: '#000', // Màu của bóng
        shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng
        shadowOpacity: 0.25, // Độ mờ của bóng (0-1)
        shadowRadius: 3.84, // Bán kính mờ của bóng
        elevation: 5,
        gap: 20
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover', // Đảm bảo hình nền che toàn bộ màn hình
        justifyContent: 'center'
    },
    codeInputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    codeInput: {
        width: 45,
        height: 45,
        borderColor: colors.blurBlack,
        fontFamily: "RobotoBold",
        borderWidth: 1,
        borderRadius: 5,
        textAlign: "center",
        fontSize: 20,
        backgroundColor: "white",
    },
    linearGradient: {
        height: ScreenHeight
    },
});

export default VerifyCodeScreen;
