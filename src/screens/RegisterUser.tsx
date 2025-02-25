import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image, Keyboard, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import { Menu, MenuItem } from 'react-native-material-menu';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import LanguageModal from '../components/LanguageModal';
import VolumeModal from '../components/VolumeModal';
import getVolumeIcon from '../utils/getVolumeIcon';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types/types';
import AudioPlayer from '../components/AudioPlayer';
import useAudio from '../hooks/useAudio';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ThemeModal from '../components/ThemeModal';
import ErrorModal from '../components/ErrorModal';
import useClick from '../hooks/useClick';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateName } from '../utils/validateName';
import { validateUsername } from '../utils/validateUsername';
import axios from 'axios';
import { ErrorResponse } from '../constants/Errors/ErrorResponse';
import useNotification from '../hooks/useNotification';
import { login } from '../store/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApiServer } from '../hooks/useApiServer';
import { useApiClient } from '../hooks/useApiClient';

type RegisterUserNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RegisterUser'>;
type RegisterUserRouteProp = RouteProp<RootStackParamList, "RegisterUser">;

export default function RegisterUser() {
    const { apiUrl } = useApiServer();
    const apiClient = useApiClient();
    const [menuVisible, setMenuVisible] = useState(false);

    const route = useRoute<RegisterUserRouteProp>();
    const serverId = route.params.serverId;
    const navigation = useNavigation<RegisterUserNavigationProp>();

    const { t, i18n } = useTranslation();
    const [openChooseLanguage, setOpenChooseLanguage] = useState(false);

    const [openChangeVolume, setOpenChangeVolume] = useState(false);
    const { volume } = useAudio();

    const { playSound } = useClick();
    const { deviceToken } = useNotification();

    const theme = useSelector((state: RootState) => state.theme.theme); // Lấy theme từ store
    const [openChooseTheme, setOpenChooseTheme] = useState(false);

    const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);

    const [isNext, setIsNext] = useState(false);
    const [yourName, setYourName] = useState<string>("");
    const [yourNameError, setYourNameError] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [userNameError, setUserNameError] = useState<string>("");
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const dispatch = useDispatch();

    const showMenu = () => {
        playSound(); // Phát âm thanh khi bấm
        setMenuVisible(true);
    };
    const hideMenu = () => {
        playSound(); // Phát âm thanh khi bấm
        setMenuVisible(false);
    };

    const handleValidateUsername = () => {
        if (!validateUsername(userName)) {
            setUserNameError(t("user-name-input-error"));
            return false;
        }
        return true;
    }

    const handleValidateName = () => {
        if (validateName(yourName)) {
            setIsNext(true);
            return true;
        } else {
            setYourNameError(t("name-input-error"));
            return false;
        }
    }

    const postCreateUser = async () => {
        let isError = false;
        if (!handleValidateUsername()) {
            isError = true;
        }

        if (!handleValidateName()) {
            isError = true;
        }

        if (isError) return;

        try {
            setIsFetching(true);
            const response = await apiClient.post(`${apiUrl}/user`, {
                name: yourName,
                userName: userName,
                serverId: serverId,
                deviceToken: deviceToken ? deviceToken : undefined
            });
            const { token: apiToken, refreshToken, userResponse } = response.data;
            await AsyncStorage.setItem("refreshToken", refreshToken);
            await AsyncStorage.setItem("token", apiToken);

            setIsFetching(false);
            dispatch(login(userResponse));
            navigation.replace("HomeScreen");
        } catch (error: unknown) {
            // Kiểm tra nếu error là AxiosError
            if (axios.isAxiosError(error)) {
                const errorData: ErrorResponse = error.response?.data;
                console.log("handleSigninAccount error:", error.response?.data);
                if (error.status == 503) {
                    setStringErr(t("server-maintenance"));
                    setIsError(true);
                } else if (errorData.code == "FPB_01" && errorData.reasons[0].title == "user") { //Nếu userName trùng thì báo lỗi
                    setStringErr(t("user-name-exist-error"));
                    setIsError(true);
                } else {
                    setStringErr(
                        errorData?.reasons?.[0]?.message ??
                        "Lỗi mạng, vui lòng thử lại sau"
                    );
                    setIsError(true);
                }
            } else {
                console.log("Unexpected error:", error);
                setStringErr("Đã xảy ra lỗi không xác định.");
                setIsError(true);
            }
            setIsFetching(false);
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
                            marginTop: isOpenKeyboard ? ScreenHeight / 100 : ScreenHeight / 50
                        }
                    ]}>
                        <Text style={styles.inputTitle}>
                            {isNext ? t("user-name-input-title") : t("name-input-title")}
                        </Text>
                        <Text style={styles.inputDescription}>
                            {isNext ? t("user-name-input-description") : t("name-input-description")}
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: !((yourNameError.length != 0 && !isNext) || (isNext && userNameError.length != 0)) ? colors.white : colors.lightRed,
                                    borderColor: !((yourNameError.length != 0 && !isNext) || (isNext && userNameError.length != 0)) ? "rgba(0,0,0,0.5)" : colors.darkRed,
                                    color: !((yourNameError.length != 0 && !isNext) || (isNext && userNameError.length != 0)) ? colors.black : colors.white,
                                }
                            ]}
                            placeholder={isNext ? t("user-name-input") : t("name-input")}
                            placeholderTextColor={!((yourNameError.length != 0 && !isNext) || (isNext && userNameError.length != 0)) ? "#aaa" : colors.white}
                            value={isNext ? userName : yourName}
                            onChangeText={(text) => {
                                if (isNext) {
                                    setUserName(text);
                                } else {
                                    setYourName(text);
                                }
                            }}
                            onEndEditing={() => {
                                if (isNext) {
                                    handleValidateUsername();
                                } else {
                                    handleValidateName();
                                }
                            }}
                            editable={!isFetching}
                        />
                        {
                            ((yourNameError.length != 0 && !isNext) || (isNext && userNameError.length != 0)) &&
                            <Text
                                style={[
                                    styles.errorInput,
                                    {
                                        height: 40,
                                    }
                                ]}
                                numberOfLines={2}
                            >{isNext ? userNameError : yourNameError}</Text>
                        }

                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: isFetching ? colors.grey : colors.black
                                }
                            ]}
                            onPress={() => {
                                if (isNext) {
                                    postCreateUser();
                                } else {
                                    handleValidateName();
                                }
                            }}
                            touchSoundDisabled={true}
                            disabled={isFetching}
                        >
                            <Text style={styles.buttonText}>
                                {t("next-btn")}
                            </Text>
                            {
                                isFetching &&
                                <ActivityIndicator color={"white"} />
                            }
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
        gap: 10
    },
    inputTitle: {
        fontFamily: "RobotoMedium",
        fontSize: 20
    },
    inputDescription: {
        fontFamily: "Roboto",
        fontSize: 16,
        marginBottom: 10,
        color: colors.grey
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: ScreenWidth > 350 ? 16 : 14,
        borderWidth: 1,
        borderColor: "rgba(0,0,0.5)",
        fontFamily: "RobotoLight"
    },
    errorInput: {
        color: colors.darkRed,
        fontFamily: "RobotoMedium",
        height: 20,
        width: '100%',
        paddingHorizontal: 15,
    },
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: "row",
        gap: 10
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