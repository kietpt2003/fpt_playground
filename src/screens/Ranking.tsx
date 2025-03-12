import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import rankingStyleSheet from './styles/rankingStyleSheet'
import { useNavigation } from '@react-navigation/native';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import UserAvatar from '../components/UserAvatar';
import RankingRibbon from '../components/RankingRibbon';
import { Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RankingNavigationProp, RankingUser, RankingUserProps } from './types/rankingTypes';
import RankingUserItem from '../components/RankingUserItem';
import RankingFlatListHeader from '../components/RankingFlatListHeader';
import RankingCurrentUser from '../components/RankingCurrentUser';
import { Menu, MenuItem } from 'react-native-material-menu';
import useClick from '../hooks/useClick';
import RankingRulesModal from '../components/RankingRulesModal';
import { StatusBar } from 'expo-status-bar';
import { ServerNameAll } from '../constants/models/users/ServerResponse';

const rankingUsers: RankingUser[] = [
    {
        userId: "001",
        userName: "Nguyễn Công Đạt",
        imageUrl: "https://picsum.photos/id/235/200",
        gender: "Male",
        specializedCode: "SE",
        server: "Xavalo",
        likes: 1000,
        diamonds: 11250,
        ranking: 4
    },
    {
        userId: "002",
        userName: "Trần Thị Thu",
        imageUrl: "https://picsum.photos/id/236/200",
        gender: "Female",
        specializedCode: "SS",
        server: "Hola",
        likes: 95034,
        diamonds: 11000,
        ranking: 5
    },
    {
        userId: "003",
        userName: "Phạm Văn Hoàng",
        imageUrl: "https://picsum.photos/id/237/200",
        gender: "Bisexual",
        specializedCode: "SA",
        server: "Hovilo",
        likes: 9678,
        diamonds: 10850,
        ranking: 6
    },
    {
        userId: "004",
        userName: "Lê Thị Minh",
        imageUrl: "https://picsum.photos/id/238/200",
        gender: "Female",
        specializedCode: "DS",
        server: "Quy Nhơn",
        likes: 8500000,
        diamonds: 10700,
        ranking: 7
    },
    {
        userId: "005",
        userName: "Nguyễn Anh Tùng",
        imageUrl: "https://picsum.photos/id/239/200",
        gender: "Male",
        specializedCode: "SE",
        server: "Fuda",
        likes: 835,
        diamonds: 10550,
        ranking: 8
    },
    {
        userId: "006",
        userName: "Đặng Hồng Nhung",
        imageUrl: "https://picsum.photos/id/240/200",
        gender: "Female",
        specializedCode: "SS",
        server: "LinkingServer",
        likes: 75643,
        diamonds: 10400,
        ranking: 9
    },
    {
        userId: "007",
        userName: "Ngô Quốc Bảo",
        imageUrl: "https://picsum.photos/id/241/200",
        gender: "Other",
        specializedCode: "SA",
        server: "Hola",
        likes: 7120,
        diamonds: 10250,
        ranking: 10
    },
    {
        userId: "008",
        userName: "Hoàng Văn Đạt",
        imageUrl: "https://picsum.photos/id/242/200",
        gender: "Male",
        specializedCode: "DS",
        server: "Xavalo",
        likes: 6508,
        diamonds: 10100,
        ranking: 11
    },
    {
        userId: "009",
        userName: "Phạm Thị Thanh",
        imageUrl: "https://picsum.photos/id/243/200",
        gender: "Female",
        specializedCode: "UN",
        server: "Quy Nhơn",
        likes: 6560,
        diamonds: 9950,
        ranking: 12
    },
    {
        userId: "010",
        userName: "Lý Văn Long",
        imageUrl: "https://picsum.photos/id/244/200",
        gender: "Male",
        specializedCode: "SE",
        server: "Fuda",
        likes: 5523,
        diamonds: 9800,
        ranking: 13
    },
    {
        userId: "011",
        userName: "Đỗ Văn Hải",
        imageUrl: "https://picsum.photos/id/255/200",
        gender: "Male",
        specializedCode: "SA",
        server: "Hola",
        likes: 5320,
        diamonds: 9650,
        ranking: 14
    },
    {
        userId: "012",
        userName: "Vũ Thị Ngọc",
        imageUrl: "https://picsum.photos/id/256/200",
        gender: "Female",
        specializedCode: "SS",
        server: "LinkingServer",
        likes: 4568,
        diamonds: 9500,
        ranking: 15
    },
    {
        userId: "013",
        userName: "Trần Minh Hoàng",
        imageUrl: "https://picsum.photos/id/247/200",
        gender: "Male",
        specializedCode: "SE",
        server: "Xavalo",
        likes: 4675,
        diamonds: 9350,
        ranking: 16
    },
    {
        userId: "014",
        userName: "Nguyễn Thị Hạnh",
        imageUrl: "https://picsum.photos/id/248/200",
        gender: "Female",
        specializedCode: "DS",
        server: "Quy Nhơn",
        likes: 4873,
        diamonds: 9200,
        ranking: 17
    },
    {
        userId: "015",
        userName: "Phan Văn Bình",
        imageUrl: "https://picsum.photos/id/249/200",
        gender: "Male",
        specializedCode: "SS",
        server: "Fuda",
        likes: 34340,
        diamonds: 9050,
        ranking: 18
    },
    {
        userId: "016",
        userName: "Đặng Thị Hoa",
        imageUrl: "https://picsum.photos/id/250/200",
        gender: "Female",
        specializedCode: "SA",
        server: "Hola",
        likes: 3843,
        diamonds: 8900,
        ranking: 19
    },
    {
        userId: "017",
        userName: "Nguyễn Quốc Anh",
        imageUrl: "https://picsum.photos/id/251/200",
        gender: "Male",
        specializedCode: "SE",
        server: "Xavalo",
        likes: 36565,
        diamonds: 8750,
        ranking: 20
    },
    {
        userId: "018",
        userName: "Lê Thị Thanh",
        imageUrl: "https://picsum.photos/id/252/200",
        gender: "Female",
        specializedCode: "DS",
        server: "Quy Nhơn",
        likes: 3453,
        diamonds: 8600,
        ranking: 21
    },
    {
        userId: "019",
        userName: "Ngô Minh Trí",
        imageUrl: "https://picsum.photos/id/253/200",
        gender: "Male",
        specializedCode: "SS",
        server: "Fuda",
        likes: 3540,
        diamonds: 8450,
        ranking: 22
    },
    {
        userId: "020",
        userName: "Võ Văn Hùng",
        imageUrl: "https://picsum.photos/id/254/200",
        gender: "Male",
        specializedCode: "UN",
        server: "Hola",
        likes: 2878,
        diamonds: 8300,
        ranking: 23
    },
]

const currentUserRank: RankingUserProps = {
    user: {
        userId: "001",
        userName: "Bùi Công Danh",
        imageUrl: "https://picsum.photos/id/257/200",
        gender: "Male",
        specializedCode: "SE",
        server: "Xavalo",
        likes: 1000,
        diamonds: 11250,
        ranking: 104
    }
}

export default function Ranking() {
    const theme = useSelector((state: RootState) => state.theme.theme);

    const { t, i18n } = useTranslation();

    const navigation = useNavigation<RankingNavigationProp>();

    const [headerSelect, setHeaderSelect] = useState<"CollegeStudent" | "GroupChat">("CollegeStudent");
    const [serverSelect, setServerSelect] = useState<ServerNameAll>("Xavalo");

    const { playSound } = useClick();

    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const showMenu = () => {
        playSound(); // Phát âm thanh khi bấm
        setMenuVisible(true);
    };
    const hideMenu = () => {
        playSound(); // Phát âm thanh khi bấm
        setMenuVisible(false);
    };

    const [isOpenRules, setOpenRules] = useState<boolean>(false);

    return (
        <View style={rankingStyleSheet.container}>
            <LinearGradient
                colors={theme === "dark" ? [colors.lightBlue, colors.darkBlue] : [colors.mediumOrange, colors.milkyWhite]} // Hiệu ứng chuyển màu
                style={rankingStyleSheet.containerLinear}
            />

            {/* Header */}
            <View style={rankingStyleSheet.headerContainer}>
                {/* Back button */}
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    touchSoundDisabled={true}
                >
                    <AntDesign
                        name="left"
                        size={ScreenWidth > 350 ? 28 : 24}
                        color={colors.white}
                    />
                </TouchableOpacity>

                {/* College student */}
                <TouchableOpacity
                    style={[
                        rankingStyleSheet.headerButton,
                        {
                            opacity: headerSelect === "CollegeStudent" ? 1 : 0.5
                        }
                    ]}
                    onPress={() => {
                        setHeaderSelect("CollegeStudent");
                    }}
                    touchSoundDisabled={true}
                >
                    <Text style={rankingStyleSheet.headerText}>Sinh viên</Text>

                    {
                        headerSelect === "CollegeStudent" &&
                        <View style={rankingStyleSheet.headerButtonUnderline} />
                    }
                </TouchableOpacity>

                {/* Group */}
                <TouchableOpacity
                    style={[
                        rankingStyleSheet.headerButton,
                        {
                            opacity: headerSelect === "GroupChat" ? 1 : 0.5
                        }
                    ]}
                    onPress={() => {
                        setHeaderSelect("GroupChat");
                    }}
                    touchSoundDisabled={true}
                >
                    <Text style={rankingStyleSheet.headerText}>Hội nhóm</Text>
                    {
                        headerSelect === "GroupChat" &&
                        <View style={rankingStyleSheet.headerButtonUnderline} />
                    }
                </TouchableOpacity>

                <Menu
                    visible={menuVisible}
                    anchor={
                        <TouchableOpacity
                            onPress={showMenu}
                            touchSoundDisabled={true}
                        >
                            <Ionicons
                                name="ellipsis-horizontal"
                                size={ScreenWidth > 350 ? 28 : 27}
                                color={colors.white}
                            />
                        </TouchableOpacity>
                    }
                    onRequestClose={hideMenu}
                    style={{
                        position: "absolute",
                        top: 35,
                        borderRadius: 10,
                        width: i18n.language === "vi" ? 170 : 220,
                        backgroundColor: colors.milkyWhite,
                    }}
                >
                    {/* Rules */}
                    <MenuItem
                        onPress={() => {
                            hideMenu();
                            setOpenRules(true);
                        }}
                    >
                        <View style={rankingStyleSheet.menuItem}>
                            <FontAwesome
                                name="question-circle-o"
                                size={24}
                                color={colors.black}
                            />
                            <Text style={rankingStyleSheet.menuItemTxt}>
                                {t("rules")}
                            </Text>
                        </View>
                    </MenuItem>

                    {/* Rewards */}
                    <MenuItem
                        onPress={() => {
                            hideMenu();
                            navigation.navigate("RankingReward");
                        }}
                    >
                        <View style={rankingStyleSheet.menuItem}>
                            <Ionicons name={"gift-outline"} size={21} color={colors.black} />
                            <Text style={rankingStyleSheet.menuItemTxt}>
                                {t("rewards")}
                            </Text>
                        </View>
                    </MenuItem>
                </Menu>
            </View>

            {/* Top 3 users */}
            <View style={rankingStyleSheet.topThreeContainer}>
                {/* Top 2 */}
                <View style={[
                    rankingStyleSheet.topThreeItemContainer,
                    {
                        height: ScreenHeight / 7,
                    }
                ]}>
                    <LinearGradient
                        colors={theme === "dark" ? [colors.darkBlue, colors.superBlurWhite2] : [colors.lightOrange, colors.superBlurWhite]} // Hiệu ứng chuyển màu
                        style={[
                            rankingStyleSheet.topThreeItemLinear,
                            {
                                borderTopLeftRadius: 10,
                            }
                        ]}
                    />

                    {/* Custom linear border */}
                    <View style={rankingStyleSheet.top2BorderContainer}>
                        <View style={rankingStyleSheet.top2BorderBlur} />
                    </View>

                    {/* Avatar + Username + Diamond Value + Ribbon */}
                    <View style={rankingStyleSheet.imageContainer}>
                        <UserAvatar
                            avatarUrl="https://picsum.photos/id/238/200"
                            imageWidth={ScreenWidth / 7.7}
                            imageHeight={ScreenWidth / 7.7}
                            imageBorderRadius={50}
                            imageBorderWidth={1}
                            imageBorderColor={colors.rightRibbonLinearRightTop2}
                            loadingIndicatorSize={26}
                        />
                        {/* CustomRibbon */}
                        <View style={rankingStyleSheet.ribbonTop2}>
                            <RankingRibbon
                                width={ScreenWidth / 4.3}
                                height={ScreenHeight / 17}
                                leftRibbonLinearLeft={colors.leftRibbonLinearLeftTop2}
                                leftRibbonLinearRight={colors.leftRibbonLinearRightTop2}
                                rightRibbonLinearLeft={colors.rightRibbonLinearLeftTop2}
                                rightRibbonLinearRight={colors.rightRibbonLinearRightTop2}
                                centerRibbonLinearLeft={colors.centerRibbonLinearLeftTop2}
                                centerRibbonLinearRight={colors.centerRibbonLinearRightTop2}
                                textContent="Top 2"
                            />
                        </View>

                        {/* Username + Diamond Value */}
                        <View style={[
                            rankingStyleSheet.rankingContentContainer,
                            {
                                bottom: -65
                            }
                        ]}>
                            <Text
                                style={rankingStyleSheet.userName}
                                numberOfLines={1}
                            >
                                Quang Kiệt
                            </Text>

                            <View style={rankingStyleSheet.diamondDetailContainer}>
                                <Text
                                    style={rankingStyleSheet.diamondValue}
                                    numberOfLines={1}
                                >
                                    13200

                                </Text>
                                <Image
                                    source={require("../../assets/images/ptk-diamond-pool.png")}
                                    style={rankingStyleSheet.rankingContentImage}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Top 1 */}
                <View style={[
                    rankingStyleSheet.topThreeItemContainer,
                    {
                        height: ScreenHeight / 6,
                    }
                ]}>
                    <LinearGradient
                        colors={theme === "dark" ? [colors.darkBlue, colors.superBlurWhite2] : [colors.lightOrange, colors.superBlurWhite]} // Hiệu ứng chuyển màu
                        style={[
                            rankingStyleSheet.topThreeItemLinear,
                            {
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10
                            }
                        ]}
                    />

                    {/* Custom linear border */}
                    <View style={rankingStyleSheet.top1BorderContainer}>
                        <View style={rankingStyleSheet.top1BorderBlur} />
                    </View>

                    {/* Avatar + Username + Diamond Value + Ribbon */}
                    <View style={rankingStyleSheet.imageContainer}>
                        <UserAvatar
                            avatarUrl="https://picsum.photos/id/237/200"
                            imageWidth={ScreenWidth / 6.2}
                            imageHeight={ScreenWidth / 6.2}
                            imageBorderRadius={50}
                            imageBorderWidth={1}
                            imageBorderColor={colors.rightRibbonLinearRightTop1}
                            loadingIndicatorSize={32}
                        />
                        {/* CustomRibbon */}
                        <View style={rankingStyleSheet.ribbonTop1}>
                            <RankingRibbon
                                width={ScreenWidth / 3.7}
                                height={ScreenHeight / 15}
                                leftRibbonLinearLeft={colors.leftRibbonLinearLeftTop1}
                                leftRibbonLinearRight={colors.leftRibbonLinearRightTop1}
                                rightRibbonLinearLeft={colors.rightRibbonLinearLeftTop1}
                                rightRibbonLinearRight={colors.rightRibbonLinearRightTop1}
                                centerRibbonLinearLeft={colors.centerRibbonLinearLeftTop1}
                                centerRibbonLinearRight={colors.centerRibbonLinearRightTop1}
                                textContent="Top 1"
                            />
                        </View>

                        {/* Username + Diamond Value */}
                        <View style={[
                            rankingStyleSheet.rankingContentContainer,
                            {
                                bottom: -70
                            }
                        ]}>
                            <Text
                                style={rankingStyleSheet.userName}
                                numberOfLines={1}
                            >
                                Tuấn Kiệt
                            </Text>

                            <View style={rankingStyleSheet.diamondDetailContainer}>
                                <Text
                                    style={rankingStyleSheet.diamondValue}
                                    numberOfLines={1}
                                >
                                    15700
                                </Text>
                                <Image
                                    source={require("../../assets/images/ptk-diamond-pool.png")}
                                    style={rankingStyleSheet.rankingContentImage}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Top 3 */}
                <View style={[
                    rankingStyleSheet.topThreeItemContainer,
                    {
                        height: ScreenHeight / 8.5,
                    }
                ]}>
                    <LinearGradient
                        colors={theme === "dark" ? [colors.darkBlue, colors.superBlurWhite2] : [colors.lightOrange, colors.superBlurWhite]} // Hiệu ứng chuyển màu
                        style={[
                            rankingStyleSheet.topThreeItemLinear,
                            {
                                borderTopRightRadius: 10
                            }
                        ]}
                    />

                    {/* Custom linear border */}
                    <View style={rankingStyleSheet.top3BorderContainer}>
                        <View style={rankingStyleSheet.top3BorderBlur} />
                    </View>

                    {/* Avatar + Username + Diamond Value + Ribbon */}
                    <View style={rankingStyleSheet.imageContainer}>
                        <UserAvatar
                            avatarUrl="https://picsum.photos/id/236/200"
                            imageWidth={ScreenWidth / 8.5}
                            imageHeight={ScreenWidth / 8.5}
                            imageBorderRadius={50}
                            imageBorderWidth={1}
                            imageBorderColor={colors.rightRibbonLinearRightTop3}
                            loadingIndicatorSize={24}
                        />
                        {/* CustomRibbon */}
                        <View style={rankingStyleSheet.ribbonTop3}>
                            <RankingRibbon
                                width={ScreenWidth / 4.8}
                                height={ScreenHeight / 18}
                                leftRibbonLinearLeft={colors.leftRibbonLinearLeftTop3}
                                leftRibbonLinearRight={colors.leftRibbonLinearRightTop3}
                                rightRibbonLinearLeft={colors.rightRibbonLinearLeftTop3}
                                rightRibbonLinearRight={colors.rightRibbonLinearRightTop3}
                                centerRibbonLinearLeft={colors.centerRibbonLinearLeftTop3}
                                centerRibbonLinearRight={colors.centerRibbonLinearRightTop3}
                                textContent="Top 3"
                            />
                        </View>

                        {/* Username + Diamond Value */}
                        <View style={rankingStyleSheet.rankingContentContainer}>
                            <Text
                                style={rankingStyleSheet.userName}
                                numberOfLines={1}
                            >
                                Hữu Thuần
                            </Text>

                            <View style={rankingStyleSheet.diamondDetailContainer}>
                                <Text
                                    style={rankingStyleSheet.diamondValue}
                                    numberOfLines={1}
                                >
                                    12300
                                </Text>
                                <Image
                                    source={require("../../assets/images/ptk-diamond-pool.png")}
                                    style={rankingStyleSheet.rankingContentImage}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View style={rankingStyleSheet.otherUsersContainer}>
                {/* Server selection */}
                <View style={rankingStyleSheet.serverContainer}>
                    <TouchableOpacity
                        style={rankingStyleSheet.serverSelectionBtn}
                        touchSoundDisabled={true}
                        onPress={() => {
                            setServerSelect("Xavalo");
                        }}
                    >
                        <LinearGradient
                            colors={theme === "dark" ? [colors.lightBlue, colors.lighterBlue2] : [colors.lightOrange, colors.lighterOrange]} // Hiệu ứng chuyển màu
                            style={[
                                rankingStyleSheet.serverSelectionBtnLinear,
                                {
                                    borderTopLeftRadius: 15,
                                    opacity: serverSelect === "Xavalo" ? 0.5 : 1
                                }
                            ]}
                        />
                        <Text style={[
                            rankingStyleSheet.serverSelectName,
                            {
                                display: serverSelect === "Xavalo" ? "none" : undefined
                            }
                        ]}>
                            Xavalo
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={rankingStyleSheet.serverSelectionBtn}
                        touchSoundDisabled={true}
                        onPress={() => {
                            setServerSelect("All");
                        }}
                    >
                        <LinearGradient
                            colors={theme === "dark" ? [colors.lightBlue, colors.lighterBlue2] : [colors.lightOrange, colors.lighterOrange]} // Hiệu ứng chuyển màu
                            style={[
                                rankingStyleSheet.serverSelectionBtnLinear,
                                {
                                    borderTopRightRadius: 15,
                                    opacity: serverSelect === "All" ? 0.5 : 1
                                }
                            ]}
                        />
                        <Text style={[
                            rankingStyleSheet.serverSelectName,
                            {
                                display: serverSelect === "All" ? "none" : undefined
                            }
                        ]}>
                            {t("server-all")}
                        </Text>
                    </TouchableOpacity>
                    <View style={[
                        rankingStyleSheet.serverSelectedBg,
                        {
                            left: serverSelect === "Xavalo" ? 0 : undefined,
                            right: serverSelect === "All" ? 0 : undefined
                        }
                    ]}>
                        <LinearGradient
                            colors={theme === "dark" ? [colors.darkBlue, colors.superBlurWhite] : [colors.darkOrange, colors.superBlurWhite]} // Hiệu ứng chuyển màu
                            style={rankingStyleSheet.serverSelectedBgLinear}
                        />
                        <Text style={rankingStyleSheet.serverSelectedName}>
                            {
                                serverSelect === "All" ? t("server-all") :
                                    serverSelect === "Quy Nhơn" ? t("server-quy-nhon") :
                                        serverSelect
                            }
                        </Text>
                    </View>
                </View>

                <RankingFlatListHeader />
                <FlatList<RankingUser>
                    data={rankingUsers}
                    keyExtractor={(item) => item.userId}
                    renderItem={({ item, index }) => (
                        <RankingUserItem
                            user={item}
                        />
                    )}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={10}
                    windowSize={5}
                    removeClippedSubviews
                    ListFooterComponent={<View />}
                    ListFooterComponentStyle={rankingStyleSheet.faltListFooterStyle}
                />
            </View>

            <View style={rankingStyleSheet.currentUserRankingContainer}>
                <LinearGradient
                    colors={theme === "dark" ? [colors.lighterBlue, colors.darkerBlue] : [colors.lighterOrange, colors.darkOrange]} // Hiệu ứng chuyển màu
                    style={rankingStyleSheet.currentUserRankingLinear}
                    start={{ x: 0, y: 0 }} // Bắt đầu từ bên trái
                    end={{ x: 1, y: 0 }} //Kết thúc bên phải
                />
                <RankingCurrentUser
                    user={currentUserRank.user}
                />
            </View>

            <StatusBar backgroundColor={
                isOpenRules ? "rgba(0,0,0,0.7)" : undefined
            } />

            <RankingRulesModal
                isOpenRules={isOpenRules}
                setOpenRules={setOpenRules}
            />
        </View>
    )
}