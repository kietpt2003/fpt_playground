import { View, Text, ImageBackground, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import rankingRewardsStyleSheet from '../components/styles/rankingRewardsStyleSheet'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../constants/colors'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Audio } from 'expo-av'
import useClick from '../hooks/useClick'
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DateReward } from '../constants/entities/Reward';
import DateRewardRankingItem from '../components/DateRewardRankingItem'

const rewardsList: DateReward[] = [
    {
        id: "001",
        userId: "abc",
        rewards: [
            {
                id: "001",
                userId: "abc",
                value: 200,
                type: "diamond",
                createdAt: new Date("2025-01-07"),
                status: "unclaimed",
            },
        ],
        createdAt: new Date("2025-01-07"),
        status: "unclaimed",
    },
    {
        id: "002",
        userId: "abc",
        rewards: [
            {
                id: "002",
                userId: "abc",
                value: 400,
                type: "diamond",
                createdAt: new Date("2025-01-06"),
                status: "claimed",
            },
            {
                id: "003",
                userId: "abc",
                value: 100,
                type: "diamond",
                createdAt: new Date("2025-01-06"),
                status: "claimed",
            },
        ],
        createdAt: new Date("2025-01-06"),
        status: "claimed",
    },
    {
        id: "003",
        userId: "abc",
        rewards: [
            {
                id: "004",
                userId: "abc",
                value: 200,
                type: "diamond",
                createdAt: new Date("2025-01-05"),
                status: "unclaimed",
            },
        ],
        createdAt: new Date("2025-01-05"),
        status: "unclaimed",
    },
    {
        id: "004",
        userId: "abc",
        rewards: [
            {
                id: "005",
                userId: "abc",
                value: 100,
                type: "diamond",
                createdAt: new Date("2025-01-04"),
                status: "claimed",
            },
        ],
        createdAt: new Date("2025-01-04"),
        status: "claimed",
    },
    {
        id: "005",
        userId: "abc",
        rewards: [
            {
                id: "006",
                userId: "abc",
                value: 400,
                type: "diamond",
                createdAt: new Date("2025-01-03"),
                status: "unclaimed",
            },
        ],
        createdAt: new Date("2025-01-03"),
        status: "unclaimed",
    },
    {
        id: "006",
        userId: "abc",
        rewards: [
            {
                id: "007",
                userId: "abc",
                value: 200,
                type: "diamond",
                createdAt: new Date("2025-01-02"),
                status: "claimed",
            },
        ],
        createdAt: new Date("2025-01-02"),
        status: "claimed",
    },
    {
        id: "007",
        userId: "abc",
        rewards: [
            {
                id: "008",
                userId: "abc",
                value: 100,
                type: "diamond",
                createdAt: new Date("2025-01-01"),
                status: "unclaimed",
            },
        ],
        createdAt: new Date("2025-01-01"),
        status: "unclaimed",
    },
    {
        id: "008",
        userId: "abc",
        rewards: [
            {
                id: "009",
                userId: "abc",
                value: 400,
                type: "diamond",
                createdAt: new Date("2024-12-31"),
                status: "claimed",
            },
        ],
        createdAt: new Date("2024-12-31"),
        status: "claimed",
    },
    {
        id: "009",
        userId: "abc",
        rewards: [
            {
                id: "010",
                userId: "abc",
                value: 200,
                type: "diamond",
                createdAt: new Date("2024-12-30"),
                status: "unclaimed",
            },
        ],
        createdAt: new Date("2024-12-30"),
        status: "unclaimed",
    },
    {
        id: "010",
        userId: "abc",
        rewards: [
            {
                id: "011",
                userId: "abc",
                value: 400,
                type: "diamond",
                createdAt: new Date("2024-12-29"),
                status: "claimed",
            },
            {
                id: "012",
                userId: "abc",
                value: 100,
                type: "diamond",
                createdAt: new Date("2024-12-29"),
                status: "claimed",
            },
        ],
        createdAt: new Date("2024-12-29"),
        status: "claimed",
    },
    {
        id: "011",
        userId: "abc",
        rewards: [
            {
                id: "013",
                userId: "abc",
                value: 200,
                type: "diamond",
                createdAt: new Date("2024-12-28"),
                status: "unclaimed",
            },
        ],
        createdAt: new Date("2024-12-28"),
        status: "unclaimed",
    },
    {
        id: "012",
        userId: "abc",
        rewards: [
            {
                id: "014",
                userId: "abc",
                value: 400,
                type: "diamond",
                createdAt: new Date("2024-12-27"),
                status: "claimed",
            },
        ],
        createdAt: new Date("2024-12-27"),
        status: "claimed",
    },
    {
        id: "013",
        userId: "abc",
        rewards: [
            {
                id: "015",
                userId: "abc",
                value: 100,
                type: "diamond",
                createdAt: new Date("2024-12-26"),
                status: "unclaimed",
            },
            {
                id: "016",
                userId: "abc",
                value: 200,
                type: "diamond",
                createdAt: new Date("2024-12-26"),
                status: "unclaimed",
            },
        ],
        createdAt: new Date("2024-12-26"),
        status: "unclaimed",
    },
    {
        id: "014",
        userId: "abc",
        rewards: [
            {
                id: "017",
                userId: "abc",
                value: 200,
                type: "diamond",
                createdAt: new Date("2024-12-25"),
                status: "claimed",
            },
        ],
        createdAt: new Date("2024-12-25"),
        status: "claimed",
    },
    {
        id: "015",
        userId: "abc",
        rewards: [
            {
                id: "018",
                userId: "abc",
                value: 400,
                type: "diamond",
                createdAt: new Date("2024-12-24"),
                status: "unclaimed",
            },
        ],
        createdAt: new Date("2024-12-24"),
        status: "unclaimed",
    },
    {
        id: "016",
        userId: "abc",
        rewards: [
            {
                id: "019",
                userId: "abc",
                value: 100,
                type: "diamond",
                createdAt: new Date("2024-12-23"),
                status: "claimed",
            },
            {
                id: "020",
                userId: "abc",
                value: 200,
                type: "diamond",
                createdAt: new Date("2024-12-23"),
                status: "claimed",
            },
        ],
        createdAt: new Date("2024-12-23"),
        status: "claimed",
    },
    {
        id: "017",
        userId: "abc",
        rewards: [
            {
                id: "021",
                userId: "abc",
                value: 400,
                type: "diamond",
                createdAt: new Date("2024-12-22"),
                status: "unclaimed",
            },
        ],
        createdAt: new Date("2024-12-22"),
        status: "unclaimed",
    },
    {
        id: "018",
        userId: "abc",
        rewards: [
            {
                id: "022",
                userId: "abc",
                value: 100,
                type: "diamond",
                createdAt: new Date("2024-12-21"),
                status: "claimed",
            },
        ],
        createdAt: new Date("2024-12-21"),
        status: "claimed",
    },
    {
        id: "019",
        userId: "abc",
        rewards: [
            {
                id: "023",
                userId: "abc",
                value: 200,
                type: "diamond",
                createdAt: new Date("2024-12-20"),
                status: "unclaimed",
            },
        ],
        createdAt: new Date("2024-12-20"),
        status: "unclaimed",
    },
    {
        id: "020",
        userId: "abc",
        rewards: [
            {
                id: "024",
                userId: "abc",
                value: 400,
                type: "diamond",
                createdAt: new Date("2024-12-19"),
                status: "claimed",
            },
        ],
        createdAt: new Date("2024-12-19"),
        status: "expired",
    },
];

const playlist = [
    require('../../assets/audios/shop-door-bell.mp3'),
    require('../../assets/audios/cash-register.mp3'),
]

export default function RankingRewards() {
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    const theme = useSelector((state: RootState) => state.theme.theme);

    const { playSound } = useClick();

    const navigation = useNavigation();

    const loadSound = async (soundIndex: number = 0) => {
        if (sound) {
            await sound.unloadAsync(); // Dừng bài hát hiện tại
        }

        const { sound: soundAudio } = await Audio.Sound.createAsync(playlist[soundIndex], {
            shouldPlay: true,
            volume: 1,
        });
        setSound(soundAudio);
    };

    useEffect(() => {
        loadSound(0);
    }, [])

    return (
        <View style={rankingRewardsStyleSheet.container}>
            <LinearGradient
                colors={theme === "dark" ? [colors.lightBlue, colors.lighterBlue] : [colors.mediumOrange, colors.milkyWhite]} // Hiệu ứng chuyển màu
                style={rankingRewardsStyleSheet.containerLinear}
            />
            <ImageBackground
                source={
                    theme === "dark" ?
                        require('../../assets/images/ranking-reward-bg-dark.webp') :
                        require('../../assets/images/ranking-reward-bg-light.webp')
                }
                style={rankingRewardsStyleSheet.backgroundImage}
            />

            {/* Header */}
            <View style={rankingRewardsStyleSheet.headerContainer}>
                {/* Back */}
                <TouchableOpacity
                    style={rankingRewardsStyleSheet.backIconContainer}
                    onPress={() => {
                        playSound();
                        navigation.goBack()
                    }}
                    touchSoundDisabled={true}
                >
                    <LinearGradient
                        colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                        style={rankingRewardsStyleSheet.backIconContainerLinear}
                    />
                    <AntDesign
                        name="left"
                        size={28}
                        color={colors.white}
                    />
                </TouchableOpacity>

                {/* Coin + Diamond */}
                <View style={rankingRewardsStyleSheet.moneyContainer}>
                    {/* Coin */}
                    <View style={rankingRewardsStyleSheet.moneyItemContainer}>
                        <Image
                            source={require("../../assets/images/ptk-coin.png")}
                            style={rankingRewardsStyleSheet.coinImage}
                        />
                        <View style={rankingRewardsStyleSheet.moneyValueContainer}>
                            <LinearGradient
                                colors={[colors.darkBrown, colors.mediumBrown]} // Hiệu ứng chuyển màu
                                style={rankingRewardsStyleSheet.moneyValueContainerLinear}
                            />
                            <Text style={rankingRewardsStyleSheet.moneyValueTxt}>12K</Text>
                        </View>

                        <TouchableOpacity
                            style={rankingRewardsStyleSheet.plusMoneyButton}
                            touchSoundDisabled={true}
                        >
                            <FontAwesome
                                name="plus"
                                size={10}
                                color={colors.white}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Diamond */}
                    <View style={rankingRewardsStyleSheet.moneyItemContainer}>
                        <Image
                            source={require("../../assets/images/ptk-diamond.png")}
                            style={rankingRewardsStyleSheet.diamondImage}
                        />
                        <View style={rankingRewardsStyleSheet.moneyValueContainer}>
                            <LinearGradient
                                colors={[colors.darkBrown, colors.mediumBrown]} // Hiệu ứng chuyển màu
                                style={rankingRewardsStyleSheet.moneyValueContainerLinear}
                            />
                            <Text style={rankingRewardsStyleSheet.moneyValueTxt}>22K</Text>
                        </View>

                        <TouchableOpacity
                            style={rankingRewardsStyleSheet.plusMoneyButton}
                            touchSoundDisabled={true}
                        >
                            <FontAwesome
                                name="plus"
                                size={10}
                                color={colors.white}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Reward list container */}
            <View style={rankingRewardsStyleSheet.rewardListContainer}>
                <FlatList<DateReward>
                    data={rewardsList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <DateRewardRankingItem
                            dateReward={item}
                        />
                    )}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={10}
                    windowSize={5}
                    removeClippedSubviews
                    ListFooterComponent={<View />}
                    ListFooterComponentStyle={rankingRewardsStyleSheet.faltListFooterStyle}
                />
            </View>
        </View>
    )
}