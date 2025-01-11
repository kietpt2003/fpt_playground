import { View, Text, Image, TextInput, FlatList, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { User } from '../constants/entities/User'
import friendsScreenStyleSheet from './styles/friendsScreenStyleSheet'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { colors } from '../constants/colors'
import { FontAwesome } from '@expo/vector-icons';
import { faker } from '@faker-js/faker';

faker.seed(10);

const DATA = [...Array(30).keys()].map((_, i) => {
    return {
        key: faker.string.uuid(),
        image: `https://picsum.photos/id/${faker.number.int({ min: 200, max: 300 })}/200`,
        name: faker.person.firstName(),
        jobTitle: faker.person.jobTitle(),
        email: faker.internet.email(),
    }
})

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default function FriendsScreen() {
    const user: User = {
        id: "abc",
        gender: "Male",
        name: "Tuan Kiet",
        imageUrl: "https://picsum.photos/id/237/200"
    }
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { t } = useTranslation();

    const [isHaveNoti, setIsHaveNoti] = useState(true);

    const scrollY = useRef(new Animated.Value(0)).current;

    return (
        <View style={friendsScreenStyleSheet.container}>
            {/* Header */}
            <View style={friendsScreenStyleSheet.headerContainer}>
                <LinearGradient
                    colors={theme === "dark" ? [colors.lightBlue, colors.darkBlue] : [colors.milkyWhite, colors.mediumOrange]} // Hiệu ứng chuyển màu
                    style={friendsScreenStyleSheet.headerContainerLinear}
                />

                <View style={friendsScreenStyleSheet.headerTopContainer}>
                    <View style={friendsScreenStyleSheet.imageContainer}>
                        <Image
                            source={{
                                uri: user.imageUrl
                            }}
                            style={friendsScreenStyleSheet.userImage}
                        />
                        {
                            isHaveNoti &&
                            <View style={friendsScreenStyleSheet.notiDot} />
                        }
                    </View>
                    <Text style={[
                        friendsScreenStyleSheet.headerTitle,
                        {
                            color: theme === "dark" ? colors.white : colors.black
                        }
                    ]}>
                        {t("chat-title-header")}
                    </Text>
                </View>

                <View style={friendsScreenStyleSheet.searhContainer}>
                    <LinearGradient
                        colors={[colors.icyWhite, colors.white]} // Hiệu ứng chuyển màu
                        style={friendsScreenStyleSheet.searhContainerLinear}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    />
                    <FontAwesome
                        name={"search"}
                        size={22}
                        color={colors.blurBlack}
                        style={friendsScreenStyleSheet.searchIcon}
                    />

                    <TextInput
                        style={friendsScreenStyleSheet.searchInput}
                        placeholder={t("search-friend-placeholder")}
                    />
                </View>
            </View>

            <View style={friendsScreenStyleSheet.flatListContainer}>
                <Animated.FlatList
                    data={DATA}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    keyExtractor={item => item.key}
                    contentContainerStyle={{
                        padding: SPACING
                    }}
                    renderItem={({ item, index }) => {
                        const inputRange = [
                            -1,
                            0,
                            ITEM_SIZE * index,
                            ITEM_SIZE * (index + 2)
                        ]

                        const opacityInputRange = [
                            -1,
                            0,
                            ITEM_SIZE * index,
                            ITEM_SIZE * (index + .5)
                        ]

                        const scale = scrollY.interpolate({
                            inputRange,
                            outputRange: [1, 1, 1, 0]
                        })

                        const opacity = scrollY.interpolate({
                            inputRange: opacityInputRange,
                            outputRange: [1, 1, 1, 0]
                        })

                        return <Animated.View style={{
                            flexDirection: "row",
                            padding: SPACING,
                            marginBottom: SPACING,
                            borderRadius: 12,
                            backgroundColor: colors.blurWhite,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 10
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 20,
                            transform: [{ scale }],
                            opacity
                        }}>
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: AVATAR_SIZE,
                                    height: AVATAR_SIZE,
                                    borderRadius: AVATAR_SIZE,
                                    marginRight: SPACING,

                                }}
                            />

                            <View>
                                <Text style={{
                                    fontSize: 22,
                                    fontWeight: "700",
                                    fontFamily: "Roboto"
                                }}>{item.name}</Text>
                                <Text style={{
                                    fontSize: 18,
                                    opacity: .7
                                }}>{item.jobTitle}</Text>
                                <Text style={{
                                    fontSize: 14,
                                    opacity: 0.8,
                                    color: colors.diamond
                                }}>{item.email}</Text>

                            </View>
                        </Animated.View>
                    }}
                />
            </View>
        </View>
    )
}