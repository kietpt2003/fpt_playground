import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import rankingStyleSheet from './styles/rankingStyleSheet'
import { useNavigation } from '@react-navigation/native';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import UserAvatar from '../components/UserAvatar';
import RankingRibbon from '../components/RankingRibbon';
import { Image } from 'react-native';
import { ServerNameAll } from '../constants/entities/Server';
import { useTranslation } from 'react-i18next';

export default function Ranking() {
    const theme = useSelector((state: RootState) => state.theme.theme);

    const { t } = useTranslation();

    const navigation = useNavigation();

    const [headerSelect, setHeaderSelect] = useState<"CollegeStudent" | "GroupChat">("CollegeStudent");
    const [serverSelect, setServerSelect] = useState<ServerNameAll>("Xavalo");

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
                        size={28}
                        color={colors.white}
                    />
                </TouchableOpacity>

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

                <TouchableOpacity
                    touchSoundDisabled={true}
                >
                    <Ionicons
                        name="ellipsis-horizontal"
                        size={28}
                        color={colors.white}
                    />
                </TouchableOpacity>
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
            </View>
        </View>
    )
}