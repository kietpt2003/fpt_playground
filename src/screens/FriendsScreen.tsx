import { View, Text, TextInput, Animated, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { User } from '../constants/entities/User'
import friendsScreenStyleSheet from './styles/friendsScreenStyleSheet'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { colors } from '../constants/colors'
import { FontAwesome } from '@expo/vector-icons';
import { faker } from '@faker-js/faker';
import { FriendItemData } from '../components/types/friendItemTypes'
import { Message } from '../constants/entities/Message'
import FriendItem from '../components/FriendItem'
import UserAvatar from '../components/UserAvatar'
import usePhoto from '../hooks/usePhoto'
import useAudio from '../hooks/useAudio'
import { useFocusEffect } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

faker.seed(20);

const SPACING = 20;
const AVATAR_SIZE = 55;
const ITEM_SIZE = AVATAR_SIZE + SPACING;

const statuses: Message["status"][] = ["Inactive", "Unsend", "Sent", "Received", "Read"];

const data: FriendItemData[] = Array.from({ length: 20 }).map((_, index) => {
    const senderId = faker.string.uuid();
    const receiverId = faker.string.uuid();

    return {
        item: {
            id: faker.string.uuid(),
            sender: {
                id: senderId,
                name: faker.person.firstName(),
                imageUrl: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
                gender: faker.helpers.arrayElement(["Male", "Female"]),
            },
            senderId,
            receiver: {
                id: receiverId,
                name: faker.person.firstName(),
                imageUrl: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
                gender: faker.helpers.arrayElement(["Male", "Female"]),
            },
            receiverId,
            content: faker.lorem.sentence(faker.number.int({ min: 3, max: 8 })),
            createdAt: faker.date.recent(),
            status: statuses[index % statuses.length],
        },
    };
});

export default function FriendsScreen() {
    const user: User = {
        id: "abc",
        gender: "Male",
        name: "Tuan Kiet",
        imageUrl: faker.image.urlPicsumPhotos({ width: 200, height: 200 })
    }
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { t } = useTranslation();

    const { changeStateFriendsScreen } = usePhoto();
    const { pauseSong, resumeSong, isPlaying } = useAudio();

    const [isHaveNoti, setIsHaveNoti] = useState(true);

    const scrollY = useRef(new Animated.Value(0)).current;

    //Cập nhật state để biết đang ở screen này
    useEffect(() => {
        const handleChangeState = async () => {
            await pauseSong();
            changeStateFriendsScreen();
        }
        handleChangeState();
    }, []);

    // //Handle back press to resume song
    // useFocusEffect(
    //     useCallback(() => {
    //         // Hàm xử lý khi nút Back được nhấn
    //         const onBackPress = () => {
    //             resumeSong();
    //             return false; // Không ngăn hành động mặc định
    //         };

    //         // Thêm listener
    //         BackHandler.addEventListener('hardwareBackPress', onBackPress);

    //         // Cleanup: Xóa listener khi component bị unmount
    //         return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    //     }, [])
    // );

    //Chạy nhạc khi thoát khởi FriendsScreen
    useFocusEffect(
        useCallback(() => {
            return () => {
                // Khi màn hình bị unfocus (rời khỏi màn hình)
                if (!isPlaying) {
                    resumeSong();
                }
            };
        }, [])
    );

    return (
        <SafeAreaView style={friendsScreenStyleSheet.container}>
            <View style={friendsScreenStyleSheet.bgContainer}>
                {/* Header */}
                <View style={friendsScreenStyleSheet.headerContainer}>
                    <LinearGradient
                        colors={theme === "dark" ? [colors.lightBlue, colors.darkBlue] : [colors.milkyWhite, colors.mediumOrange]} // Hiệu ứng chuyển màu
                        style={friendsScreenStyleSheet.headerContainerLinear}
                    />

                    <View style={friendsScreenStyleSheet.headerTopContainer}>
                        <View style={friendsScreenStyleSheet.imageContainer}>
                            <UserAvatar
                                avatarUrl={user.imageUrl}
                                imageBorderWidth={0}
                                imageWidth={friendsScreenStyleSheet.userImage.width}
                                imageHeight={friendsScreenStyleSheet.userImage.height}
                                loadingIndicatorSize={friendsScreenStyleSheet.userImage.width / 3}
                                imageBorderRadius={friendsScreenStyleSheet.userImage.borderRadius}
                                imageBorderColor={undefined}
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
                    <Animated.FlatList<FriendItemData>
                        data={data}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: true }
                        )}
                        keyExtractor={item => item.item.id}
                        showsVerticalScrollIndicator={false}
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

                            return <FriendItem
                                AVATAR_SIZE={AVATAR_SIZE}
                                opacity={opacity}
                                scale={scale}
                                item={item.item}
                            />
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}