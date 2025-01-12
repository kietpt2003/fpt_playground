import { View, Text, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
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
import { useNavigation } from '@react-navigation/native';
import { GroupChatNavigationProp } from './types/groupChatTypes';
import DailyCheckPoint from '../components/DailyCheckPoint';
import { StatusBar } from 'expo-status-bar';
import NPCGuideline from '../components/NPCGuideline';
import PTKCoinIcon from '../components/PTKCoinIcon';
import { ScreenWidth } from '@rneui/base';

export default function HomeScreen() {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { t, i18n } = useTranslation();

    const navigation = useNavigation<GroupChatNavigationProp>();

    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    const { playSound } = useClick();

    const isOpenDailyCheckPoint = useSelector((state: RootState) => state.home.isOpenDailyCheckPoint);

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

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
                scrollEnabled={!isGuideline}
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

                <StatusBar backgroundColor={
                    (!isGuideline && isOpenDailyCheckPoint) ? "rgba(0,0,0,0.7)" : undefined
                } />

                {
                    !isGuideline &&
                    <DailyCheckPoint
                        isOpenDailyCheckPoint={isOpenDailyCheckPoint}
                    />
                }

                {
                    isGuideline &&
                    <View style={homeScreenStyleSheet.dummyGuideline} />
                }
            </ScrollView>

            {
                isGuideline &&
                <NPCGuideline
                    scrollViewRef={scrollViewRef}
                    onScrolling={onScrolling}
                    setOnScrolling={setOnScrolling}
                />
            }
        </>
    )
}