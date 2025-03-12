import { View, Text, TextInput, Animated, BackHandler, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { User } from '../constants/entities/User'
import friendsScreenStyleSheet from './styles/friendsScreenStyleSheet'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { colors } from '../constants/colors'
import { FontAwesome } from '@expo/vector-icons';
import { faker } from '@faker-js/faker';
// import { FriendItemData } from '../components/types/friendItemTypes'
import { Message } from '../constants/entities/Message'
import FriendItem, { FriendItemData } from '../components/FriendItem'
import UserAvatar from '../components/UserAvatar'
import usePhoto from '../hooks/usePhoto'
import useAudio from '../hooks/useAudio'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useApiServer } from '../hooks/useApiServer'
import { useApiClient } from '../hooks/useApiClient'
import { PaginatedResponse } from '../constants/Paginations/PaginationResponse'
import axios from 'axios'
import { ErrorResponse } from '../constants/Errors/ErrorResponse'
import { handleLogout } from '../utils/authorizationUtils'
import LottieView from 'lottie-react-native'
import { UserConversationResponse } from '../constants/models/conversations/UserConversationResponse'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types/types'

faker.seed(20);

const SPACING = 20;
const AVATAR_SIZE = 55;
const ITEM_SIZE = AVATAR_SIZE + SPACING;

export default function FriendsScreen() {
    // const user: User = {
    //     id: "abc",
    //     gender: "Male",
    //     name: "Tuan Kiet",
    //     imageUrl: faker.image.urlPicsumPhotos({ width: 200, height: 200 })
    // }
    const user = useSelector((state: RootState) => state.auth.user);
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { t } = useTranslation();

    const [data, setData] = useState<UserConversationResponse[]>([]);
    const [noResults, setNoResults] = useState(false);

    const { changeStateFriendsScreen } = usePhoto();
    const { pauseSong, resumeSong, isPlaying } = useAudio();

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [isHaveNoti, setIsHaveNoti] = useState(true);

    const scrollY = useRef(new Animated.Value(0)).current;

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = useRef(10);
    const [isFetching, setFetching] = useState<boolean>(false);

    const [stringErr, setStringErr] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState(false);

    const { apiUrl } = useApiServer();
    const apiClient = useApiClient();

    const dispatch = useDispatch();

    const fetchUserConversations = useCallback(async (resetPage = false) => {
        if (!hasMore && page !== 1 && !resetPage) return;
        setFetching(true);
        try {
            const currentPage = resetPage ? 1 : page;
            const response = await apiClient.get(`${apiUrl}/conversations/user?FilterType=Friends&Page=${currentPage}&PageSize=${pageSize.current}`)
            const responseData: PaginatedResponse<UserConversationResponse> = response.data;

            if (responseData.items.length === 0 && currentPage === 1) {
                setNoResults(true);
            } else {
                setNoResults(false);
                setData(prev => resetPage ? responseData.items : [...prev, ...responseData.items]);
                setPage(prev => resetPage ? 2 : prev + 1);
                setHasMore(responseData.hasNextPage);
            }
        } catch (error: unknown) {
            // Kiểm tra nếu error là AxiosError
            if (axios.isAxiosError(error)) {
                const errorData: ErrorResponse = error.response?.data;
                console.log("API call error:", error.response?.data);
                if (error.status == 503) {
                    setStringErr(t("server-maintenance"));
                    setIsError(true);
                    setFetching(false);
                    await handleLogout(dispatch, navigation);
                } else {
                    console.log(errorData?.reasons?.[0]?.message ??
                        "Lỗi mạng, vui lòng thử lại sau");
                }
            } else {
                console.log("Unexpected error:", error);
            }
            if (data.length === 0 && page === 1) {
                setNoResults(true);
            }
        } finally {
            setFetching(false);
        }
    }, [page, hasMore])

    const handleRefresh = async () => {
        setRefreshing(true);
        setPage(1);
        await fetchUserConversations(true);
        setRefreshing(false);
    };

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

    //Fetch UserConversation
    useFocusEffect(
        useCallback(() => {
            setData([]);
            setPage(1);
            setHasMore(true);
            fetchUserConversations();
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
                                avatarUrl={user?.avatarUrl}
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
                    {isFetching && page === 1 ? (
                        <View style={friendsScreenStyleSheet.loadingContent}>
                            <LottieView
                                source={theme === "dark" ? require("../../assets/animations/sleepyPanda.json") : require("../../assets/animations/catEating.json")}
                                style={friendsScreenStyleSheet.lottieAnimation}
                                autoPlay
                                loop
                                speed={0.8}
                            />
                            <Text style={friendsScreenStyleSheet.loadingText}>{t("loading-msg")}</Text>
                        </View>

                    ) : noResults ? (
                        <View style={friendsScreenStyleSheet.loadingContent}>
                            <LottieView
                                source={theme === "dark" ? require("../../assets/animations/sleepyPanda.json") : require("../../assets/animations/catEating.json")}
                                style={friendsScreenStyleSheet.lottieAnimation}
                                autoPlay
                                loop
                                speed={0.8}
                            />
                            <Text style={friendsScreenStyleSheet.loadingText}>{t("empy-user-conversations")}</Text>
                        </View>
                    ) : (
                        <Animated.FlatList<UserConversationResponse>
                            data={data}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                { useNativeDriver: true }
                            )}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                padding: SPACING
                            }}
                            onEndReached={() => fetchUserConversations()}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={() => (
                                hasMore && <ActivityIndicator size={24} color="#ed8900" />
                            )}
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
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
                                    item={item}
                                />
                            }}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}