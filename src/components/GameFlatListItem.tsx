import { Animated, FlatList, Image, Text, View } from 'react-native'
import React from 'react'
import { GameFlatListItemProps } from './types/gameFlatListTypes'
import { ScreenWidth } from '@rneui/base'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { colors } from '../constants/colors'
import gameListStyleSheet from '../screens/styles/gameListStyleSheet'
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next'

export default function GameFlatListItem({ item, ITEM_SIZE, SPACING, opacity, scale, index }: GameFlatListItemProps) {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { t } = useTranslation();

    return (
        <Animated.View style={[
            {
                zIndex: 2,
                width: ScreenWidth - 2 * SPACING,
                height: ITEM_SIZE,
                marginBottom: SPACING * 2,
                marginTop: index == 0 ? SPACING : 0,
                borderRadius: SPACING,
            },
            {
                transform: [{ scale }],
                opacity
            }
        ]}>
            <LinearGradient
                colors={item.gameId == 1 ? [colors.gameColorItem1, colors.gameColorItem2] :
                    [colors.milkyWhite, colors.mediumOrange]} // Hiệu ứng chuyển màu
                style={[
                    gameListStyleSheet.gameContainerLinear,
                    {
                        borderRadius: SPACING
                    }
                ]}
                start={{ x: 0, y: 0 }} // Bắt đầu từ bên trái
                end={{ x: 1, y: 0 }} //Kết thúc bên phải
            />
            <Image style={gameListStyleSheet.imageContainer} source={item.gameImageUrl} />
            <View style={gameListStyleSheet.gameDescription}>
                <Text
                    style={gameListStyleSheet.gameName}
                    numberOfLines={1}
                >{item.gameName}</Text>
                <Text style={gameListStyleSheet.totalOnline}>{item.totalPeopleOnline}</Text>
            </View>

            <AntDesign
                name="doubleright"
                size={ScreenWidth > 350 ? 26 : 20}
                color={colors.white}
                style={gameListStyleSheet.gameIcon}
            />

            <View style={gameListStyleSheet.onlinePeopleContainer}>
                <Text style={gameListStyleSheet.activePeopleTxt}>{t("people-online-game")}</Text>
                <FlatList<string>
                    style={gameListStyleSheet.flatListStyle}
                    data={item.people}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                    renderItem={({ item: avatarUrl, index: fIndex }) => (
                        <Image style={[
                            gameListStyleSheet.userOnlineAva,
                            {
                                marginLeft: fIndex === 0 ? 0 : -10, // Chồng lấp bằng margin
                                zIndex: item.people.length - fIndex, // Phần tử trước có zIndex lớn hơn
                                borderColor: theme === "dark" ? colors.darkBlue : colors.darkOrange
                            },
                        ]} source={{ uri: avatarUrl }} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={gameListStyleSheet.flatListContentContainerStyle}
                    initialNumToRender={3}
                />
                {
                    item.totalPeopleOnline >= 4 &&
                    <View style={[
                        gameListStyleSheet.totalOnlineContainer,
                        {
                            borderColor: theme === "dark" ? colors.darkBlue : colors.darkOrange
                        },
                    ]}>
                        <Text style={gameListStyleSheet.totalOnlineTxt}>
                            {item.totalPeopleOnline}+
                        </Text>
                    </View>
                }
            </View>
        </Animated.View>
    )
}