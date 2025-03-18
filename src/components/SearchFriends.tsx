import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import LottieView from 'lottie-react-native';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import ErrorModal from './ErrorModal';
import { useApiServer } from '../hooks/useApiServer';
import { useApiClient } from '../hooks/useApiClient';
import axios from 'axios';
import { ErrorResponse } from '../constants/Errors/ErrorResponse';
import { handleLogout } from '../utils/authorizationUtils';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FindUserResponse } from '../constants/models/users/FindUserResponse';
import { PaginatedResponse } from '../constants/Paginations/PaginationResponse';
import UserAvatar from './UserAvatar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types/types';

const { width: screenWidth } = Dimensions.get('window');

type RenderUserResponseProps = {
    item: FindUserResponse
}

const AVATAR_SIZE = 55;

export default function SearchFriends() {
    const [usersResponse, setUsersResponse] = useState<FindUserResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [brands, setBrands] = useState([]);
    const [filters, setFilters] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(150000000);
    const [activeFilters, setActiveFilters] = useState(false);
    const [currentFilters, setCurrentFilters] = useState('');
    const [noResults, setNoResults] = useState(false);

    const { apiUrl } = useApiServer();
    const apiClient = useApiClient();

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [stringErr, setStringErr] = useState('');
    const [isError, setIsError] = useState(false);

    const fetchUsers = useCallback(async (filterParams = '', resetPage = false) => {
        if (!hasMore && page !== 1 && !resetPage) return;
        setLoading(true);
        try {
            const currentPage = resetPage ? 1 : page;
            const url = `${apiUrl}/users${filterParams}${filterParams ? '&' : '?'}Page=${currentPage}&PageSize=20`;
            const response = await apiClient.get(url);
            const responseData: PaginatedResponse<FindUserResponse> = response.data;

            const newUsers = responseData.items;
            if (newUsers.length === 0 && currentPage === 1) {
                setNoResults(true);
            } else {
                setNoResults(false);
                setUsersResponse(prev => resetPage ? newUsers : [...prev, ...newUsers]);
                setPage(prev => resetPage ? 2 : prev + 1);
                setHasMore(newUsers.length === 20);
            }
        } catch (error: unknown) {
            // Kiểm tra nếu error là AxiosError
            if (axios.isAxiosError(error)) {
                const errorData: ErrorResponse = error.response?.data;
                console.log("API call error:", error.response?.data);
                if (error.status == 503) {
                    setStringErr(t("server-maintenance"));
                    setIsError(true);
                    setLoading(false);
                    await handleLogout(dispatch, navigation);
                } else {
                    console.log(errorData?.reasons?.[0]?.message ??
                        "Lỗi mạng, vui lòng thử lại sau");
                }
            } else {
                console.log("Unexpected error:", error);
                setStringErr("Unexpected error");
                setIsError(true);
            }
        } finally {
            setLoading(false);
        }
    }, [page, hasMore]);

    useFocusEffect(
        useCallback(() => {
            setUsersResponse([]);
            setPage(1);
            setHasMore(true);
            fetchUsers();
        }, [])
    );

    const openFilterModal = () => {
        setFilterModalVisible(true);
    };

    const renderUserResponse = ({ item }: RenderUserResponseProps) => (
        <TouchableOpacity
            style={styles.gadgetCard}
        // onPress={() => navigation.navigate('FriendChatDetailV2', {})}
        >
            <UserAvatar
                avatarUrl={item.avatarUrl}
                imageBorderWidth={0}
                imageWidth={AVATAR_SIZE}
                imageHeight={AVATAR_SIZE}
                loadingIndicatorSize={AVATAR_SIZE / 3}
                imageBorderRadius={AVATAR_SIZE}
                imageBorderColor={undefined}
            />
            <View>
                <Text>{item.userName}</Text>
                <Text>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <LinearGradient
            colors={['#FFFFFF', '#fea92866']}
            style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={openFilterModal}>
                    <AntDesign name="filter" size={24} color={activeFilters ? "#ed8900" : "black"} />
                </TouchableOpacity>
            </View>
            {loading && page === 1 ? (

                <LinearGradient colors={['#fea92866', '#FFFFFF']} style={styles.loadingContainer}>
                    <View style={styles.loadingContent}>
                        <LottieView
                            source={require("../../assets/animations/catEating.json")}
                            style={styles.lottieAnimation}
                            autoPlay
                            loop
                            speed={0.8}
                        />
                        <Text style={styles.loadingText}>Đang load dữ liệu</Text>
                    </View>
                </LinearGradient>

            ) : noResults ? (
                <LinearGradient colors={['#fea92866', '#FFFFFF']} style={styles.loadingContainer}>
                    <View style={styles.loadingContent}>
                        <LottieView
                            source={require("../../assets/animations/catEating.json")}
                            style={styles.lottieAnimation}
                            autoPlay
                            loop
                            speed={0.8}
                        />
                        <Text style={styles.loadingText}>Không có sản phẩm bạn tìm kiếm</Text>
                    </View>
                </LinearGradient>
            ) : (
                <FlatList
                    data={usersResponse}
                    renderItem={renderUserResponse}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    numColumns={2}
                    contentContainerStyle={styles.gadgetList}
                    onEndReached={() => fetchUsers(currentFilters)}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => (
                        hasMore && <ActivityIndicator size={24} color="#ed8900" />
                    )}
                />
            )}

            <ErrorModal
                stringErr={stringErr}
                isError={isError}
                setIsError={setIsError}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        height: ScreenHeight / 1.5,
    },
    loadingContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    lottieAnimation: {
        width: ScreenWidth,
        height: ScreenWidth / 1.5,
    },
    loadingText: {
        fontSize: 18,
        width: ScreenWidth / 1.5,
        textAlign: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: 'rgb(254, 169, 40)',
        backgroundColor: 'rgba(254, 169, 40, 0.3)',
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: "rgba(254, 161, 40, 0.5)",
        borderWidth: 1,
        borderColor: "rgb(254, 161, 40)",
    },
    headerTxt: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        flex: 1,
    },
    gadgetList: {
        padding: 10,
    },
    gadgetCard: {
        width: (screenWidth - 30) / 2,
        marginHorizontal: 5,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: "row",
        justifyContent: "center"
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 120,
        marginBottom: 10,
    },
    gadgetImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    watermarkContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 10,

    },
    watermarkText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    discountBadge: {
        position: 'absolute',
        top: 5,
        left: 5,
        transform: [{ rotate: '0deg' }],
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    discountText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    favoriteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gadgetName: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
        color: '#333',
    },
    priceContainer: {
        flexDirection: 'column',
    },
    originalPrice: {
        fontSize: 12,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    discountPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ed8900',
    },
    gadgetPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ed8900',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    filterSectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
    },
    brandListContainer: {
        height: 170, // Adjust this value to fit two rows of brands
    },
    brandRowGroup: {
        marginRight: 20, // Add some space between groups of brands
    },
    brandRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    brandItem: {
        width: (screenWidth - 60) / 4, // Display 4 items per row
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 5,
        marginRight: 10,
    },
    selectedBrandItem: {
        backgroundColor: '#fea92866',
    },
    brandLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    brandName: {
        marginTop: 5,
        textAlign: 'center',
        fontSize: 10,
    },
    priceRangeContainer: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginBottom: 10,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    filterOptionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    filterOption: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
    },
    selectedFilterOption: {
        backgroundColor: '#fea92866',
    },
    filterOptionText: {
        fontSize: 14,
    },
    filterButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    applyButton: {
        backgroundColor: '#ed8900',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    applyButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 10,
    },
    cancelButtonText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsText: {
        fontSize: 16,
        color: '#666',
    },
});