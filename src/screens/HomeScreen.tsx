import { View, Text, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import homeScreenStyleSheet from './styles/homeScreenStyleSheet';
import { EvilIcons, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Menu, MenuItem } from 'react-native-material-menu';
import { useTranslation } from 'react-i18next';
import useClick from '../hooks/useClick';
import FeatureComponent from '../components/FeatureComponent';
import HeaderLeft from '../components/HeaderLeft';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { GroupChatNavigationProp } from './types/groupChatTypes';
import DailyCheckPoint from '../components/DailyCheckPoint';
import NPCGuideline from '../components/NPCGuideline';
import PTKCoinIcon from '../components/PTKCoinIcon';
import { ScreenWidth } from '@rneui/base';
import useAudio from '../hooks/useAudio';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../store/reducers/authReducer';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { useApiClient } from '../hooks/useApiClient';
import { useApiServer } from '../hooks/useApiServer';
import { handleLogout } from '../utils/authorizationUtils';
import axios from 'axios';
import { ErrorResponse } from '../constants/Errors/ErrorResponse';
import ErrorModal from '../components/ErrorModal';
const rnBiometrics = new ReactNativeBiometrics();

export default function HomeScreen() {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { t, i18n } = useTranslation();

    const navigation = useNavigation<GroupChatNavigationProp>();
    const dispatch = useDispatch();

    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    const [qrCodeUrl, setQrCodeUrl] = useState("");

    const [scrollEnabled, setScrollEnabled] = useState(true);

    const { playSound } = useClick();
    const { resumeSong } = useAudio();

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

    const isGuideline = useSelector((state: RootState) => state.home.homeGuideline);
    const scrollViewRef = useRef<ScrollView>(null);
    const [onScrolling, setOnScrolling] = useState(false);

    const apiClient = useApiClient();
    const { apiUrl } = useApiServer();

    const checkBiometrics = async () => {
        const { available, biometryType } = await rnBiometrics.isSensorAvailable();

        if (available && biometryType === BiometryTypes.Biometrics) {
            console.log('Thiết bị hỗ trợ vân tay');
        } else {
            console.log('Không hỗ trợ vân tay');
        }
    };

    const registerBiometricKey = async () => {
        const { publicKey } = await rnBiometrics.createKeys();
        try {
            const res = await apiClient.post(`${apiUrl}/auth/biometrics/register`, {
                publicKey: publicKey,
            });

            console.log("register ok");

        } catch (error) {
            // Kiểm tra nếu error là AxiosError
            if (axios.isAxiosError(error)) {
                const errorData: ErrorResponse = error.response?.data;
                console.log("API call error:", error.response?.data);
                if (error.status == 503) {
                    setStringErr(t("server-maintenance"));
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
            await GoogleSignin.signOut();
        }
    };

    const authenticateWithBiometrics = async () => {
        try {
            // 1️⃣ Lấy challenge từ server
            const res = await apiClient.get(`${apiUrl}/auth/biometrics/challenge`);
            const data: { challenge: string } = res.data;

            // // 2️⃣ Sử dụng private key để ký challenge
            const { signature } = await rnBiometrics.createSignature({
                promptMessage: t("finger-print-validation-msg"),
                payload: data.challenge, // Challenge từ server
            });

            const verifyRes = await apiClient.post(`${apiUrl}/auth/biometrics/verify`, {
                challenge: data.challenge,
                signature: signature
            });

            if (verifyRes.status == 200) {
                console.log("verify ok");
            } else {
                console.log("sth wrong");
            }

        } catch (error) {
            // Kiểm tra nếu error là AxiosError
            if (axios.isAxiosError(error)) {
                const errorData: ErrorResponse = error.response?.data;
                console.log("API call error:", error.response?.data);
                if (error.status == 503) {
                    setStringErr(t("server-maintenance"));
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
        }
    };

    const [otp, setOtp] = useState("");

    const verifyOtp = async () => {
        try {
            console.log("vo day");

            await apiClient.post(`${apiUrl}/auth/authenticator/verify`, {
                otp: otp
            })
            console.log("verify success");

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorData: ErrorResponse = error.response?.data;
                console.log("API call error:", error.response?.data);
                if (error.status == 503) {
                    setStringErr(t("server-maintenance"));
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
        }
    };

    const ggAuthenSetup = async () => {
        try {
            const res = await apiClient.post(`${apiUrl}/auth/authenticator/setup`)
            const data: { qrCodeUrl: string } = res.data;
            setQrCodeUrl(data.qrCodeUrl);

        } catch (error) {
            // Kiểm tra nếu error là AxiosError
            if (axios.isAxiosError(error)) {
                const errorData: ErrorResponse = error.response?.data;
                console.log("API call error:", error.response?.data);
                if (error.status == 503) {
                    setStringErr(t("server-maintenance"));
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
        }
    }

    useFocusEffect(
        useCallback(() => {
            resumeSong();
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
                scrollEnabled={(!isGuideline && scrollEnabled) || scrollEnabled}
                onScrollEndDrag={() => setOnScrolling(false)}
            >
                <LinearGradient
                    colors={theme === "dark" ? [colors.lightBlue, colors.darkBlue] : [colors.mediumOrange, colors.milkyWhite]} // Hiệu ứng chuyển màu
                    style={homeScreenStyleSheet.containerLinear}
                />
                <ImageBackground
                    source={
                        theme === "dark" ?
                            require('../../assets/images/home-dark-header.webp') :
                            require('../../assets/images/home-light-header.webp')
                    }
                    style={homeScreenStyleSheet.backgroundImage}
                />

                {/* Header left */}
                <HeaderLeft />

                {/* Header right */}
                <View style={homeScreenStyleSheet.headerRightContainer}>
                    {/* Notification */}
                    <TouchableOpacity
                        style={homeScreenStyleSheet.headerRightNoti}
                        onPress={() => {
                            playSound();
                        }}
                        touchSoundDisabled={true}
                    >
                        <LinearGradient
                            colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={homeScreenStyleSheet.headerRightIconLinear}
                        />
                        <MaterialCommunityIcons
                            name="bell"
                            size={20}
                            color={colors.white}
                        />
                    </TouchableOpacity>

                    {/* Menu */}
                    <View style={homeScreenStyleSheet.headerRightMenu}>
                        <LinearGradient
                            colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={homeScreenStyleSheet.headerRightIconLinear}
                        />
                        <Menu
                            visible={menuVisible}
                            anchor={
                                <TouchableOpacity
                                    onPress={showMenu}
                                    touchSoundDisabled={true}
                                >
                                    <MaterialCommunityIcons name={menuVisible ? "menu-down" : "menu-left"} size={35} color={colors.white} />
                                </TouchableOpacity>
                            }
                            onRequestClose={hideMenu}
                            style={{
                                position: "absolute",
                                top: 45,
                                borderRadius: 10,
                                width: i18n.language === "vi" ? 170 : 220,
                                backgroundColor: colors.milkyWhite,
                            }}
                        >
                            {/* Profile */}
                            <MenuItem
                                onPress={() => {
                                    hideMenu();
                                }}
                            >
                                <View style={homeScreenStyleSheet.menuItem}>
                                    <Ionicons name={"person-circle-outline"} size={24} color={colors.black} />
                                    <Text style={homeScreenStyleSheet.menuItemTxt}>
                                        {t("profile")}
                                    </Text>
                                </View>
                            </MenuItem>

                            {/* Settings */}
                            <MenuItem
                                onPress={() => {
                                    hideMenu();
                                }}
                            >
                                <View style={homeScreenStyleSheet.menuItem}>
                                    <Ionicons name={"settings-outline"} size={21} color={colors.black} />
                                    <Text style={homeScreenStyleSheet.menuItemTxt}>
                                        {t("settings")}
                                    </Text>
                                </View>
                            </MenuItem>

                            {/* Change Coin */}
                            <MenuItem
                                onPress={() => {
                                    hideMenu();
                                }}
                            >
                                <View style={homeScreenStyleSheet.menuItem}>
                                    <PTKCoinIcon
                                        coinColor={colors.black}
                                        size={20}
                                    />
                                    <Text style={homeScreenStyleSheet.menuItemTxt}>
                                        {t("change-coin")}
                                    </Text>
                                </View>
                            </MenuItem>

                            {/* Signout */}
                            <MenuItem
                                onPress={() => {
                                    hideMenu();
                                    handleLogout(dispatch, navigation);
                                }}
                            >
                                <View style={homeScreenStyleSheet.menuItem}>
                                    <MaterialIcons name={"logout"} size={20} color={colors.black} />
                                    <Text style={homeScreenStyleSheet.menuItemTxt}>
                                        {t("signout")}
                                    </Text>
                                </View>
                            </MenuItem>
                        </Menu>
                    </View>
                </View>

                {/* Hội nhóm */}
                <FeatureComponent
                    sliderContents={[
                        {
                            id: 1,
                            contentTxt: t("group-chat-feature1"),
                            contentImageSrc: require('../../assets/images/frog-with-phone2.png'),
                            backgroundImgSrc: require('../../assets/images/group-chat.webp'),
                            linearColors: [colors.mintDark, colors.mintLight]
                        },
                        {
                            id: 2,
                            contentTxt: t("group-chat-feature2"),
                            contentImageSrc: require('../../assets/images/frog-with-phone.png'),
                            backgroundImgSrc: require('../../assets/images/group-chat.webp'),
                            linearColors: [colors.pastelDark, colors.pastelLight]
                        },
                    ]}
                    functionItems={[
                        {
                            contentTxt: t("study-groups"),
                            lottieSrc: require("../../assets/animations/bookFlying.json"),
                            linearColors: [colors.darkGreen, colors.lightGreen],
                            onPress: () => {
                                navigation.navigate("GroupChat", {
                                    firstFilter: 0
                                });
                            }
                        },
                        {
                            contentTxt: t("curious-groups"),
                            lottieSrc: require("../../assets/animations/penguinSearching.json"),
                            linearColors: [colors.icyWhite, colors.white],
                            onPress: () => {
                                navigation.navigate("GroupChat", {
                                    firstFilter: 1
                                });
                            }
                        },
                        {
                            contentTxt: t("social-groups"),
                            lottieSrc: require("../../assets/animations/coffeeChilling.json"),
                            linearColors: [colors.lightOrange, colors.darkYellow],
                            onPress: () => {
                                navigation.navigate("GroupChat", {
                                    firstFilter: 2
                                });
                            }
                        },
                        {
                            contentTxt: t("dating-groups"),
                            lottieSrc: require("../../assets/animations/heartFlying.json"),
                            linearColors: [colors.darkRed, colors.lightRed],
                            onPress: () => {
                                navigation.navigate("GroupChat", {
                                    firstFilter: 3
                                });
                            }
                        },
                    ]}
                    featureTitle={t("alliances")}
                    isGuideline={isGuideline}
                />

                {/* Điểm danh mỗi ngày */}
                <View style={homeScreenStyleSheet.featureContainer}>
                    <View style={homeScreenStyleSheet.featureHeaderContainer}>
                        <Text style={[
                            homeScreenStyleSheet.featureTilte,
                            {
                                color: theme === "dark" ? colors.white : colors.black
                            }
                        ]}>
                            {t("daily-checkpoint")}
                        </Text>
                        <TouchableOpacity
                            style={homeScreenStyleSheet.featureButton}
                            disabled={isGuideline}
                            touchSoundDisabled={true}
                            onPress={() => {
                                navigation.navigate("DailyCheckPointScreen");
                            }}
                        >
                            <Text style={[
                                homeScreenStyleSheet.findoutTxt,
                                {
                                    color: theme === "dark" ? colors.white : colors.black,
                                },
                            ]}>
                                {t("find-out")}
                            </Text>
                            <EvilIcons
                                name="chevron-right"
                                size={ScreenWidth > 350 ? 24 : 20}
                                color={theme === "dark" ? colors.white : colors.black}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        disabled={isGuideline}
                        touchSoundDisabled={true}
                        onPress={() => {
                            navigation.navigate("DailyCheckPointScreen");
                        }}
                    >
                        <Image
                            source={require("../../assets/images/checkinBg.png")}
                            style={homeScreenStyleSheet.featureImage}
                        />
                    </TouchableOpacity>
                </View>

                {/* Kênh cá nhân */}
                <FeatureComponent
                    sliderContents={[
                        {
                            id: 1,
                            contentTxt: t("personal-feature1"),
                            contentImageSrc: require('../../assets/images/frog-talking.webp'),
                            backgroundImgSrc: require('../../assets/images/group-chat.webp'),
                            linearColors: [colors.lightRed, colors.lightOrange]
                        },
                        {
                            id: 2,
                            contentTxt: t("personal-feature2"),
                            contentImageSrc: require('../../assets/images/frog-talking2.webp'),
                            backgroundImgSrc: require('../../assets/images/group-chat.webp'),
                            linearColors: [colors.pastelLight, colors.lightYellow]
                        },
                    ]}
                    functionItems={[
                        {
                            contentTxt: t("friends"),
                            lottieSrc: require("../../assets/animations/friends.json"),
                            linearColors: [colors.lightOcean, colors.darkGreen],
                            onPress: () => {
                                navigation.navigate("FriendsScreen");
                            }
                        },
                        {
                            contentTxt: t("strangers"),
                            lottieSrc: require("../../assets/animations/stranger.json"),
                            linearColors: [colors.darkBlue, colors.black],
                            onPress: () => {
                                // navigation.navigate("GroupChat");
                            }
                        },
                        {
                            contentTxt: t("invitations"),
                            lottieSrc: require("../../assets/animations/searchUser.json"),
                            linearColors: [colors.icyWhite, colors.white],
                            onPress: () => {
                                // navigation.navigate("GroupChat");
                            }
                        },
                        {
                            contentTxt: t("blacklist"),
                            lottieSrc: require("../../assets/animations/blocking.json"),
                            linearColors: [colors.lightOcean, colors.darkBlue],
                            onPress: () => {
                                // navigation.navigate("GroupChat");
                            }
                        },
                    ]}
                    featureTitle={t("personal-channel")}
                    changePosition={true}
                    isGuideline={isGuideline}
                />

                {/* Bảng xếp hạng */}
                <View style={homeScreenStyleSheet.featureContainer}>
                    <View style={homeScreenStyleSheet.featureHeaderContainer}>
                        <Text style={[
                            homeScreenStyleSheet.featureTilte,
                            {
                                color: theme === "dark" ? colors.white : colors.black
                            }
                        ]}>
                            {t("ranking")}
                        </Text>
                        <TouchableOpacity
                            style={homeScreenStyleSheet.featureButton}
                            disabled={isGuideline}
                            touchSoundDisabled={true}
                            onPress={() => {
                                navigation.navigate("Ranking");
                            }}
                        >
                            <Text style={[
                                homeScreenStyleSheet.findoutTxt,
                                {
                                    color: theme === "dark" ? colors.white : colors.black,
                                },
                            ]}>
                                {t("find-out-now")}
                            </Text>
                            <EvilIcons
                                name="chevron-right"
                                size={ScreenWidth > 350 ? 24 : 20}
                                color={theme === "dark" ? colors.white : colors.black}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        disabled={isGuideline}
                        touchSoundDisabled={true}
                        onPress={() => {
                            navigation.navigate("Ranking");
                        }}
                    >
                        <Image
                            source={require("../../assets/images/rankingBg.webp")}
                            style={homeScreenStyleSheet.featureImage}
                        />
                    </TouchableOpacity>
                </View>

                {
                    !isGuideline &&
                    <DailyCheckPoint
                        setStringErr={setStringErr}
                        setIsError={setIsError}
                    />
                }

                {
                    isGuideline &&
                    <View style={homeScreenStyleSheet.dummyGuideline} />
                }
            </ScrollView>

            <ErrorModal
                stringErr={stringErr}
                isError={isError}
                setIsError={setIsError}
            />

            {
                isGuideline &&
                <NPCGuideline
                    scrollViewRef={scrollViewRef}
                    onScrolling={onScrolling}
                    setOnScrolling={setOnScrolling}
                />
            }
        </SafeAreaView>
    )
}