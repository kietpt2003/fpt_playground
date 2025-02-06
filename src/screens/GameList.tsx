import { View, Text, Animated, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { faker } from '@faker-js/faker/.';
import { GameDataItem, GameListNavigationProp } from './types/gameListTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useTranslation } from 'react-i18next';
import useAudio from '../hooks/useAudio';
import { Image } from 'react-native';
import gameListStyleSheet from './styles/gameListStyleSheet';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import WaveAnimation from '../components/WaveAnimation';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import useClick from '../hooks/useClick';
import GameFlatListItem from '../components/GameFlatListItem';

faker.seed(20);

const SPACING = 20;
const AVATAR_SIZE = 100;
const ITEM_SIZE = AVATAR_SIZE + SPACING;

const data: GameDataItem[] = Array.from({ length: 10 }).map((_, index) => {
    return {
        gameId: 1,
        gameName: "Cóc Vương",
        gameImageUrl: require("../../assets/images/chineseChessLogo.webp"),
        totalPeopleOnline: 5,
        people: Array.from({ length: 3 }).map((_, index) => {
            return faker.image.urlPicsumPhotos({ width: 200, height: 200 });
        }),
        status: "Active"
    };
});

export default function GameList() {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { t } = useTranslation();

    const { pauseSong, resumeSong } = useAudio();

    const navigation = useNavigation<GameListNavigationProp>();

    const scrollY = useRef(new Animated.Value(0)).current;

    const { playSound } = useClick();

    //Cập nhật state để biết đang ở screen này
    useEffect(() => {
        const handleChangeState = async () => {
            await pauseSong();
        }
        handleChangeState();
    }, []);

    return (
        <WaveAnimation>
            <View style={gameListStyleSheet.container}>
                {/* Header */}
                <View style={gameListStyleSheet.headerContainer}>
                    <LinearGradient
                        colors={theme === "dark" ? [colors.lightBlue, colors.darkBlue] : [colors.milkyWhite, colors.mediumOrange]} // Hiệu ứng chuyển màu
                        style={gameListStyleSheet.headerContainerLinear}
                    />
                    {/* Back */}
                    <TouchableOpacity
                        style={gameListStyleSheet.backIconContainer}
                        onPress={() => {
                            playSound();
                            navigation.goBack()
                        }}
                        touchSoundDisabled={true}
                    >
                        <LinearGradient
                            colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={gameListStyleSheet.backIconContainerLinear}
                        />
                        <AntDesign
                            name="left"
                            size={28}
                            color={colors.white}
                        />
                    </TouchableOpacity>

                    {/* Coin + Diamond */}
                    <View style={gameListStyleSheet.moneyContainer}>
                        {/* Coin */}
                        <View style={gameListStyleSheet.moneyItemContainer}>
                            <Image
                                source={require("../../assets/images/ptk-coin.png")}
                                style={gameListStyleSheet.coinImage}
                            />
                            <View style={gameListStyleSheet.moneyValueContainer}>
                                <LinearGradient
                                    colors={[colors.darkBrown, colors.mediumBrown]} // Hiệu ứng chuyển màu
                                    style={gameListStyleSheet.moneyValueContainerLinear}
                                />
                                <Text style={gameListStyleSheet.moneyValueTxt}>12K</Text>
                            </View>

                            <TouchableOpacity
                                style={gameListStyleSheet.plusMoneyButton}
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
                        <View style={gameListStyleSheet.moneyItemContainer}>
                            <Image
                                source={require("../../assets/images/ptk-diamond.png")}
                                style={gameListStyleSheet.diamondImage}
                            />
                            <View style={gameListStyleSheet.moneyValueContainer}>
                                <LinearGradient
                                    colors={[colors.darkBrown, colors.mediumBrown]} // Hiệu ứng chuyển màu
                                    style={gameListStyleSheet.moneyValueContainerLinear}
                                />
                                <Text style={gameListStyleSheet.moneyValueTxt}>22K</Text>
                            </View>

                            <TouchableOpacity
                                style={gameListStyleSheet.plusMoneyButton}
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

                <View style={gameListStyleSheet.flatListContainer}>
                    <Animated.FlatList<GameDataItem>
                        data={data}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: true }
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            padding: SPACING
                        }}
                        renderItem={({ item, index }) => {
                            const inputRange = [
                                -1,
                                0,
                                (ITEM_SIZE + 30) * index,
                                (ITEM_SIZE + 30) * (index + 2)
                            ]

                            const opacityInputRange = [
                                -1,
                                0,
                                (ITEM_SIZE + 30) * index,
                                (ITEM_SIZE + 30) * (index + .5)
                            ]

                            const scale = scrollY.interpolate({
                                inputRange,
                                outputRange: [1, 1, 1, 0]
                            })

                            const opacity = scrollY.interpolate({
                                inputRange: opacityInputRange,
                                outputRange: [1, 1, 1, 0]
                            })

                            return (
                                <TouchableOpacity onPress={() => {
                                    if (item.gameId == 1) {
                                        navigation.navigate("ChineseChessGame");
                                    }
                                }}>
                                    <GameFlatListItem
                                        ITEM_SIZE={ITEM_SIZE}
                                        SPACING={SPACING}
                                        item={item}
                                        opacity={opacity}
                                        scale={scale}
                                        index={index}
                                    />
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
        </WaveAnimation>
    )
}