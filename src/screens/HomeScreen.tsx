import { View, Text, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import homeScreenStyleSheet from './styles/homeScreenStyleSheet';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Menu, MenuItem } from 'react-native-material-menu';
import { useTranslation } from 'react-i18next';
import PTKCoin from '../components/PTKCoin';
import useClick from '../hooks/useClick';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import FeatureComponent from '../components/FeatureComponent';
import HeaderLeft from '../components/HeaderLeft';
import { useNavigation } from '@react-navigation/native';
import { GroupChatNavigationProp } from './types/groupChatTypes';
import DailyCheckPoint from '../components/DailyCheckPoint';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { t, i18n } = useTranslation();

    const navigation = useNavigation<GroupChatNavigationProp>();

    const [menuVisible, setMenuVisible] = useState<boolean>(false);

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

    const [isOpenDailyCheckPoint, setIsOpenDailyCheckPoint] = useState<boolean>(true);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <LinearGradient
                colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.milkyWhite, colors.icyWhite]} // Hiệu ứng chuyển màu
                style={homeScreenStyleSheet.containerLinear}
            />
            <ImageBackground
                source={
                    theme === "dark" ?
                        require('../../assets/images/home-dark-header.webp') :
                        require('../../assets/images/home-light-header.webp')
                }
                style={homeScreenStyleSheet.backgroundImage}
            >
            </ImageBackground>

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
                            <TouchableOpacity onPress={showMenu}>
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
                                <Ionicons name={"person-circle-outline"} size={24} color={"black"} />
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
                                <Ionicons name={"settings-outline"} size={21} color={"black"} />
                                <Text style={homeScreenStyleSheet.menuItemTxt}>
                                    {t("settings")}
                                </Text>
                            </View>
                        </MenuItem>

                        {/* PTK Coin */}
                        <MenuItem
                            onPress={() => {
                                hideMenu();
                            }}
                        >
                            <View style={homeScreenStyleSheet.menuItem}>
                                <PTKCoin
                                    style={homeScreenStyleSheet.coinContainer}
                                    textStyle={homeScreenStyleSheet.coinTxt}
                                />
                                <Text style={homeScreenStyleSheet.menuItemTxt}>
                                    {t("ptk-coin")}
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
                                <MaterialIcons name={"logout"} size={20} color={"black"} />
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
                        contentTxt: 'Khám phá tính năng nhóm chat với trải nghiệm hoàn toàn mới.',
                        contentImageSrc: require('../../assets/images/frog-with-phone2.png'),
                        backgroundImgSrc: require('../../assets/images/group-chat.webp'),
                        linearColors: [colors.mintDark, colors.mintLight]
                    },
                    {
                        id: 2,
                        contentTxt: 'Tham gia thảo luận nhóm một cách dễ dàng và tiện lợi.',
                        contentImageSrc: require('../../assets/images/frog-with-phone.png'),
                        backgroundImgSrc: require('../../assets/images/group-chat.webp'),
                        linearColors: [colors.pastelDark, colors.pastelLight]
                    },
                ]}
                functionItems={[
                    {
                        contentTxt: "Hội học tập",
                        lottieSrc: require("../../assets/animations/bookFlying.json"),
                        linearColors: [colors.darkGreen, colors.lightGreen],
                        onPress: () => {
                            navigation.navigate("GroupChat", {
                                firstFilter: 0
                            });
                        }
                    },
                    {
                        contentTxt: "Hội hóng hớt",
                        lottieSrc: require("../../assets/animations/penguinSearching.json"),
                        linearColors: [colors.icyWhite, colors.white],
                        onPress: () => {
                            navigation.navigate("GroupChat", {
                                firstFilter: 1
                            });
                        }
                    },
                    {
                        contentTxt: "Hội giao lưu",
                        lottieSrc: require("../../assets/animations/coffeeChilling.json"),
                        linearColors: [colors.lightOrange, colors.darkYellow],
                        onPress: () => {
                            navigation.navigate("GroupChat", {
                                firstFilter: 2
                            });
                        }
                    },
                    {
                        contentTxt: "Hội kiếm ny",
                        lottieSrc: require("../../assets/animations/heartFlying.json"),
                        linearColors: [colors.darkRed, colors.lightRed],
                        onPress: () => {
                            navigation.navigate("GroupChat", {
                                firstFilter: 3
                            });
                        }
                    },
                ]}
                featureTitle="Hội nhóm"
            />

            {/* Điểm danh mỗi ngày */}
            <View style={{
                padding: 15,
                gap: 10
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 19,
                        fontWeight: "bold",
                        color: theme === "dark" ? colors.white : colors.black
                    }}>Điểm danh mỗi ngày</Text>
                    <TouchableOpacity style={{
                        flexDirection: "row",
                        gap: 5,
                    }}>
                        <Text style={{
                            color: theme === "dark" ? colors.white : colors.black
                        }}>Tìm hiểu ngay</Text>
                        <Entypo
                            name="chevron-small-right"
                            size={20}
                            color={theme === "dark" ? colors.white : colors.black}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity>
                    <Image
                        source={require("../../assets/images/checkinBg.png")}
                        style={{
                            width: ScreenWidth - 30,
                            height: ScreenHeight / 4.5,
                            resizeMode: "stretch",
                            borderRadius: 25
                        }}
                    />
                </TouchableOpacity>
            </View>

            {/* Kênh cá nhân */}
            <FeatureComponent
                sliderContents={[
                    {
                        id: 1,
                        contentTxt: 'Quản lý bạn bè, tìm người lạ, gửi lời mời dễ dàng.',
                        contentImageSrc: require('../../assets/images/frog-talking.webp'),
                        backgroundImgSrc: require('../../assets/images/group-chat.webp'),
                        linearColors: [colors.lightRed, colors.lightOrange]
                    },
                    {
                        id: 2,
                        contentTxt: 'Không gian giao tiếp an toàn và thoải mái.',
                        contentImageSrc: require('../../assets/images/frog-talking2.webp'),
                        backgroundImgSrc: require('../../assets/images/group-chat.webp'),
                        linearColors: [colors.pastelLight, colors.lightYellow]
                    },
                ]}
                functionItems={[
                    {
                        contentTxt: "Bạn bè",
                        lottieSrc: require("../../assets/animations/friends.json"),
                        linearColors: [colors.lightOcean, colors.darkGreen],
                        onPress: () => {
                            // navigation.navigate("GroupChat");
                        }
                    },
                    {
                        contentTxt: "Người lạ",
                        lottieSrc: require("../../assets/animations/stranger.json"),
                        linearColors: [colors.darkBlue, colors.black],
                        onPress: () => {
                            // navigation.navigate("GroupChat");
                        }
                    },
                    {
                        contentTxt: "Mời kết bạn",
                        lottieSrc: require("../../assets/animations/searchUser.json"),
                        linearColors: [colors.icyWhite, colors.white],
                        onPress: () => {
                            // navigation.navigate("GroupChat");
                        }
                    },
                    {
                        contentTxt: "Chặn",
                        lottieSrc: require("../../assets/animations/blocking.json"),
                        linearColors: [colors.lightOcean, colors.darkBlue],
                        onPress: () => {
                            // navigation.navigate("GroupChat");
                        }
                    },
                ]}
                featureTitle="Kênh cá nhân"
                changePosition={true}
            />

            {/* Bảng xếp hạng */}
            <View style={{
                padding: 15,
                gap: 10
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 19,
                        fontWeight: "bold",
                        color: theme === "dark" ? colors.white : colors.black
                    }}>Bảng xếp hạng</Text>
                    <TouchableOpacity style={{
                        flexDirection: "row",
                        gap: 5,
                    }}>
                        <Text style={{
                            color: theme === "dark" ? colors.white : colors.black
                        }}>Tìm hiểu ngay</Text>
                        <Entypo
                            name="chevron-small-right"
                            size={20}
                            color={theme === "dark" ? colors.white : colors.black}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity>
                    <Image
                        source={require("../../assets/images/rankingBg.webp")}
                        style={{
                            width: ScreenWidth - 30,
                            height: ScreenHeight / 4.5,
                            resizeMode: "stretch",
                            borderRadius: 25
                        }}
                    />
                </TouchableOpacity>
            </View>

            <StatusBar backgroundColor={
                isOpenDailyCheckPoint ? "rgba(0,0,0,0.7)" : undefined
            } />

            <DailyCheckPoint
                isOpenDailyCheckPoint={isOpenDailyCheckPoint}
                setIsOpenDailyCheckPoint={setIsOpenDailyCheckPoint}
            />
        </ScrollView >
    )
}