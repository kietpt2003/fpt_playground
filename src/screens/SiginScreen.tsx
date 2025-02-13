import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image, Keyboard, Platform, PermissionsAndroid, Permission, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react'
import signinStyleSheet from './styles/signinStyleSheet';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import { Menu, MenuItem } from 'react-native-material-menu';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import LanguageModal from '../components/LanguageModal';
import VolumeModal from '../components/VolumeModal';
import getVolumeIcon from '../utils/getVolumeIcon';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AudioPlayer from '../components/AudioPlayer';
import useAudio from '../hooks/useAudio';
import { useDispatch, useSelector } from 'react-redux';
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
import api from '../services/api';
import { PaginatedResponse } from '../constants/Paginations/PaginationResponse';
import { ErrorResponse } from '../constants/Errors/ErrorResponse';
import { isPaginationResponse } from '../utils/isPaginationResponse';
import ServerModal from '../components/ServerModal';
import useNotification from '../hooks/useNotification';
import { handleValidEmail } from '../utils/handleValidEmail';
import { handleValidPassword } from '../utils/handleValidPassword';
import { env } from '../constants/environmentVariables';
import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { login, logout } from '../store/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ServerResponse } from '../constants/models/ServerResponse';
import { UserResponse } from '../constants/models/UserResponse';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { NODE_ENV, DEV_API, PROD_API } = env;
const url =
    NODE_ENV == "development"
        ? DEV_API
        : PROD_API;

export default function SiginScreen() {
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const user = useSelector((state: RootState) => state.auth.user);

    const [servers, setServers] = useState<ServerResponse[]>([
        { id: "", name: "Xavalo", state: "Solitary", status: "Active" },
        { id: "", name: "Fuda", state: "Solitary", status: "Active" },
        { id: "", name: "Quy Nhơn", state: "Solitary", status: "Active" },
        { id: "", name: "Hola", state: "Solitary", status: "Active" },
        { id: "", name: "Hovilo", state: "Solitary", status: "Active" }
    ]);
    const [selectedServer, setSelectedServer] = useState<ServerResponse | null>(null);
    const [openSelectServer, setOpenSelectServer] = useState(false);

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

    const dispatch = useDispatch();

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
    const { deviceToken } = useNotification();

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

    const getCurrentUser = async () => {
        try {
            const res = await api.get(`${url}/users/current`);
            const data: UserResponse = res.data;
            dispatch(login(data));
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

            setIsError(true);
        }
    }

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

    const handleSigninAccount = async () => {
        let isError = false;
        if (!validateEmail()) {
            isError = true;
        }

        if (!validatePassword()) {
            isError = true;
        }

        if (isError) return;

        try {
            setIsFetching(true);
            const response = await axios.post(`${url}/auth/login`, {
                email: email,
                password: password,
                serverId: selectedServer?.id,
                deviceToken: deviceToken ? deviceToken : undefined
            });
            const { token: apiToken, refreshToken } = response.data;
            await AsyncStorage.setItem("refreshToken", refreshToken);
            await AsyncStorage.setItem("token", apiToken);
            await getCurrentUser();
            setIsFetching(false);
            navigation.replace("HomeScreen");
        } catch (error: unknown) {
            // Kiểm tra nếu error là AxiosError
            if (axios.isAxiosError(error)) {
                const errorData: ErrorResponse = error.response?.data;
                console.log("API call error:", error.response?.data);
                if (error.status == 503) {
                    setStringErr(t("server-maintenance"));
                    setIsError(true);
                } else if (errorData.code == "FPB_00" && errorData.reasons[0].title == "user") { //Nếu lỗi chưa có user ở server này thì chuyển sang trang tạo user
                    navigation.navigate("RegisterUser");
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

    const handleChooseServer = (server: ServerResponse) => {
        setSelectedServer(server);
    }

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

    const handleChangeAccount = async () => {
        setIsFetching(true);
        await AsyncStorage.multiRemove(["token", "refreshToken"], () => {
            dispatch(logout());
        });
        setIsFetching(false);
    }

    const handleChangeServer = async (server: ServerResponse) => {
        try {
            setIsFetching(true);
            const response = await axios.post(`${url}/auth/change-server`, {
                serverId: server.id,
            });
            const { token: apiToken, refreshToken } = response.data;
            await AsyncStorage.setItem("refreshToken", refreshToken);
            await AsyncStorage.setItem("token", apiToken);
            await getCurrentUser();
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
                } else if (errorData.code == "FPB_00" && errorData.reasons[0].title == "user") { //Nếu lỗi chưa có user ở server này thì đăng xuất người dùng ra luôn
                    await AsyncStorage.multiRemove(["token", "refreshToken"], () => {
                        dispatch(logout());
                    });
                    setStringErr(t("change-server"));
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

    //Check token auto login. TH auto này nếu có lỗi do token hết hạn hay ntn đó thì đều Logout hết mà không báo lỗi.
    //Ngoại trừ TH server bảo trì thì mới thông báo server bảo trì thôi
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem("token");

                if (token) {
                    setIsFetching(true);
                    await getCurrentUser();
                    setIsFetching(false);
                }
            } catch (error: unknown) {
                // Kiểm tra nếu error là AxiosError
                if (axios.isAxiosError(error)) {
                    const errorData: ErrorResponse = error.response?.data;
                    console.log("API call error:", error.response?.data);
                    if (error.status == 503) {
                        setStringErr(t("server-maintenance"));
                        setIsError(true);
                    } else {
                        console.log(errorData?.reasons?.[0]?.message ??
                            "Lỗi mạng, vui lòng thử lại sau");
                    }
                } else {
                    console.log("Unexpected error:", error);
                }

                setIsFetching(false);
                await AsyncStorage.multiRemove(["token", "refreshToken"], () => {
                    dispatch(logout());
                });
            }
        }
        fetchUser();
    }, [])

    //Fetch Servers
    useEffect(() => {
        const fetchServers = async () => {
            try {
                const res = await axios.get(`${url}/servers?SortColumn=createdAt`);
                const data: PaginatedResponse<ServerResponse> = res.data;
                setServers(data.items);
                setSelectedServer(data.items[0]);

            } catch (error: unknown) {
                // Kiểm tra nếu error là AxiosError
                if (axios.isAxiosError(error)) {
                    const errorData: ErrorResponse = error.response?.data;
                    console.log("API call error:", error.response?.data);
                    if (error.status == 503) {
                        setStringErr(t("server-maintenance"));
                        setIsError(true);
                    } else {
                        console.log(errorData?.reasons?.[0]?.message ??
                            "Lỗi mạng, vui lòng thử lại sau");
                    }
                } else {
                    console.log("Unexpected error:", error);
                }
            }
        }
        fetchServers();
    }, [])

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
        <SafeAreaView>
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

                    {
                        !isLoggedIn ?
                            <>
                                {/* Email input */}
                                <TextInput
                                    style={[
                                        signinStyleSheet.input,
                                        {
                                            backgroundColor: emailError.length == 0 ? colors.white : colors.lightRed,
                                            borderColor: emailError.length == 0 ? "rgba(0,0,0,0.5)" : colors.darkRed,
                                            marginBottom: emailError.length == 0 ? 20 : 0,
                                        }
                                    ]}
                                    placeholder={t("emil-signin")}
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
                                    <Text style={signinStyleSheet.errorInput}>{emailError}</Text>
                                }

                                {/* Password input */}
                                <View style={[
                                    signinStyleSheet.passwordInputContainer,
                                    {
                                        marginBottom: passwordError.length == 0 ? 20 : 0,
                                    }
                                ]}>
                                    <TextInput
                                        style={[
                                            signinStyleSheet.input,
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
                                        style={signinStyleSheet.showHideButton}
                                        onPress={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                        touchSoundDisabled={true}
                                        disabled={isFetching}
                                    >
                                        <FontAwesome5 name={showPassword ? "eye" : "eye-slash"} size={18} color={passwordError.length == 0 ? colors.blurBlack : colors.darkRed} />
                                    </TouchableOpacity>
                                </View>
                                {
                                    passwordError.length != 0 &&
                                    <Text
                                        style={[
                                            signinStyleSheet.errorInput,
                                            {
                                                height: 40
                                            }
                                        ]}
                                        numberOfLines={2}
                                    >{passwordError}</Text>
                                }
                            </> :
                            <>
                                <TouchableOpacity
                                    style={signinStyleSheet.loggedInButtonContainer}
                                    onPress={() => {
                                        navigation.replace("HomeScreen");
                                    }}
                                    touchSoundDisabled={true}
                                    disabled={isFetching}
                                >
                                    <LinearGradient
                                        colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                                        style={signinStyleSheet.signinBtnLinear}
                                    />
                                    <Text
                                        style={signinStyleSheet.loggedInText}
                                        numberOfLines={1}
                                    >
                                        {t("loggedIn-current")}{user?.account?.email}
                                    </Text>
                                </TouchableOpacity>
                            </>
                    }

                    {/* Change account */}
                    {
                        isLoggedIn &&
                        <TouchableOpacity
                            style={[signinStyleSheet.serverButton]}
                            onPress={() => {
                                handleChangeAccount();
                            }}
                            touchSoundDisabled={true}
                            disabled={isFetching}
                        >
                            <LinearGradient
                                colors={theme === "dark" ? [colors.black, colors.grey] : [colors.milkyWhite, colors.white]} // Hiệu ứng chuyển màu
                                style={signinStyleSheet.serverButtonLinear}
                            />
                            <Text style={[signinStyleSheet.buttonText,
                            {
                                color: colors.black
                            }
                            ]}>
                                {t("change-account")}
                            </Text>
                        </TouchableOpacity>
                    }

                    {/* Choose server */}
                    <TouchableOpacity
                        style={[signinStyleSheet.serverButton]}
                        onPress={() => {
                            setOpenSelectServer(true);
                        }}
                        touchSoundDisabled={true}
                        disabled={isFetching}
                    >
                        <LinearGradient
                            colors={theme === "dark" ? [colors.black, colors.grey] : [colors.milkyWhite, colors.white]} // Hiệu ứng chuyển màu
                            style={signinStyleSheet.serverButtonLinear}
                        />
                        <LinearGradient
                            colors={servers[0].state == "Solitary" ? [colors.darkGreen, colors.lightGreen] :
                                servers[0].state == "Medium" ? [colors.darkYellow, colors.lightYellow] :
                                    [colors.darkRed, colors.lightRed]}
                            style={signinStyleSheet.serverStatus}
                        />
                        <Text style={[signinStyleSheet.buttonText,
                        {
                            color: colors.black
                        }
                        ]}>
                            {t("server")}{selectedServer == null ? servers[0].name : selectedServer.name}
                        </Text>
                    </TouchableOpacity>

                    {
                        !isLoggedIn &&
                        <>
                            {/* Signin button */}
                            <TouchableOpacity
                                style={signinStyleSheet.button}
                                onPress={() => {
                                    handleSigninAccount();
                                }}
                                touchSoundDisabled={true}
                                disabled={isFetching}
                            >
                                <LinearGradient
                                    colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                                    style={signinStyleSheet.signinBtnLinear}
                                />
                                <Text style={signinStyleSheet.buttonText}>
                                    {t("signin-btn")}
                                </Text>
                            </TouchableOpacity>

                            <GoogleSignInButton
                                onPress={() => {
                                    handleGoogleSignIn();
                                }}
                                isFetching={isFetching}
                            />

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
                        </>
                    }

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

                <ServerModal
                    openChooseServer={openSelectServer}
                    setOpenChooseServer={setOpenSelectServer}
                    servers={servers}
                    handleChangeServer={isLoggedIn ? handleChangeServer : handleChooseServer}
                />

                <ErrorModal
                    stringErr={stringErr}
                    isError={isError}
                    setIsError={setIsError}
                />

                {
                    isFetching &&
                    <View style={signinStyleSheet.loadingContainer}>
                        <ActivityIndicator color={colors.grey} size={40} />
                    </View>
                }
            </ImageBackground >
        </SafeAreaView>
    )
}
