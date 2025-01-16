import { View, Text, TouchableOpacity, TextInput, Keyboard, Platform, Animated } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { FriendChatDetailRouteProp } from '../components/types/friendItemTypes';
import { faker } from '@faker-js/faker/.';
import friendChatDetailStyleSheet from './styles/friendChatDetailStyleSheet';
import UserAvatar from '../components/UserAvatar';
import { AntDesign, Entypo, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useTranslation } from 'react-i18next';
import { enUS, vi } from 'date-fns/locale';
import { formatDistanceToNowStrict } from 'date-fns';
import { ScreenHeight } from '@rneui/base';
import BottomSheet from '@gorhom/bottom-sheet';
import usePhoto from '../hooks/usePhoto';
import { Album } from 'expo-media-library';
import BottomSheetFlatList, { BottomSheetMethods } from '../components/BottomSheetGallery';
import { statusBarHeight } from '../constants/statusBarHeight';
import TestAlbum, { BottomSheetAlbumFilterMethods } from '../components/TestAlbum';

export default function FriendChatDetail() {
    const route = useRoute<FriendChatDetailRouteProp>();
    const params = route.params;

    const navigation = useNavigation();

    const theme = useSelector((state: RootState) => state.theme.theme);

    // bottom sheet
    const [snapPointIndex, setSnapPointIndex] = useState(-1);
    const [isGalleryVisible, setGalleryVisible] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [bottomSheetHeight, setBottomSheetHeight] = useState<number>(ScreenHeight / 3);
    const handleOpenBottomSheet = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.snapToIndex(0);
        }
        setGalleryVisible(true);
        setShowAlbumsList(false);
    }
    const handleCloseBottomSheet = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.close();
        }
        setGalleryVisible(false);
        // handleCloseAlbumBottomSheetFilter();
        handleCloseAlbumFilter();
    }
    // const handleOpenPhoneSetting = async () => {
    //     if (!canAskAgain) {
    //         await requestMediaLibPermission();
    //         const { status, canAskAgain } = await requestMediaLibPermissionWithoutLinking();
    //         if (canAskAgain && status === "granted") {
    //             handleBottomSheet();
    //         }
    //     }
    // }
    // const handleBottomSheet = () => {
    //     if (!isGalleryVisible) {
    //         setKeyboardHeight(ScreenHeight / 3);
    //         handleOpenBottomSheet();
    //     } else {
    //         setKeyboardHeight(0);
    //         handleCloseBottomSheet();
    //     }
    // }

    // album filter
    const [showAlbumsList, setShowAlbumsList] = useState<boolean>(false);
    const translateY = useRef(new Animated.Value(ScreenHeight)).current;
    const handleOpenAlbumFilter = () => {
        Animated.timing(translateY, {
            toValue: 0, // Dịch chuyển đến vị trí ban đầu
            duration: 800, // Thời gian chạy animation (ms)
            useNativeDriver: true, // Sử dụng native driver để tăng hiệu suất
        }).start();
        setShowAlbumsList(true);
        setBottomSheetHeight(handleSetBottomSheetHeight());
    }
    const handleCloseAlbumFilter = () => {
        Animated.timing(translateY, {
            toValue: ScreenHeight, // Dịch chuyển đến vị trí ban đầu
            duration: 800, // Thời gian chạy animation (ms)
            useNativeDriver: true, // Sử dụng native driver để tăng hiệu suất
        }).start();
        setShowAlbumsList(false);
        setBottomSheetHeight(handleSetBottomSheetHeight());
    }
    const handleSetBottomSheetHeight = () => {
        let heightNumber = 0;
        switch (snapPointIndex) {
            case -1:
            case 0:
                heightNumber = ScreenHeight / 3;
                break;
            case 1:
                heightNumber = ScreenHeight;
                break;

            default:
                heightNumber = ScreenHeight / 3;
                break;
        }
        return heightNumber;
    }

    const {
        requestPermission,
        requestMediaLibPermission,
        canAskAgain,
        requestMediaLibPermissionWithoutLinking,
    } = usePhoto();
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

    const lastSeen: Date = faker.date.recent();
    const { t, i18n } = useTranslation();

    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const sender = useMemo(() => ({
        id: params.senderId,
        gender: faker.helpers.arrayElement(["Male", "Female"]),
        name: faker.person.firstName(),
        imageUrl: faker.image.urlPicsumPhotos({ width: 200, height: 200 })
    }), [params.senderId]);

    const receiver = useMemo(() => ({
        id: params.receiverId,
        gender: faker.helpers.arrayElement(["Male", "Female"]),
        name: faker.person.firstName(),
        imageUrl: faker.image.urlPicsumPhotos({ width: 200, height: 200 })
    }), [params.receiverId]);

    //Check keyboard open
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (event) => {
                setKeyboardHeight(event.endCoordinates.height);
            });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });

        // Cleanup các listener khi component unmount
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);


    const bottomSheetRef4 = useRef<BottomSheetMethods>(null);
    const pressHandler4 = useCallback(() => {
        bottomSheetRef4.current?.expand();
    }, []);
    const pressHandler4Close = useCallback(() => {
        bottomSheetRef4.current?.close();
    }, []);
    const handleOpenPhoneSetting = async () => {
        if (!canAskAgain) {
            await requestMediaLibPermission();
            const { status, canAskAgain } = await requestMediaLibPermissionWithoutLinking();
            if (canAskAgain && status === "granted") {
                handleBottomSheet();
            }
        }
    }
    const handleBottomSheet = () => {
        if (!isGalleryVisible) {
            setKeyboardHeight(ScreenHeight / 3);
            handleOpenBottomSheet();
            pressHandler4();
        } else {
            setKeyboardHeight(0);
            handleCloseBottomSheet();
            pressHandler4Close();
        }
    }

    return (
        <View>
            <View style={[
                friendChatDetailStyleSheet.chatHeaderContainer,
                {
                    backgroundColor: theme === "dark" ? colors.lighterBlue : colors.lighterOrange
                }
            ]}>
                <TouchableOpacity
                    style={friendChatDetailStyleSheet.backButton}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <AntDesign name={"arrowleft"} size={30} color={theme === "dark" ? colors.darkBlue : colors.darkOrange} />
                </TouchableOpacity>

                <UserAvatar
                    imageWidth={40}
                    imageHeight={40}
                    imageBorderWidth={0}
                    imageBorderColor={undefined}
                    imageBorderRadius={40}
                    loadingIndicatorSize={20}
                    avatarUrl={receiver.imageUrl}
                />

                <View style={friendChatDetailStyleSheet.userInfoContainer}>
                    <Text
                        style={friendChatDetailStyleSheet.username}
                        numberOfLines={1}
                    >
                        {receiver.name}
                    </Text>
                    <Text
                        style={friendChatDetailStyleSheet.lastseen}
                        numberOfLines={1}
                    >
                        {t("online-active")}{formatDistanceToNowStrict(lastSeen, {
                            addSuffix: true,
                            locale: i18n.language === "vi" ? vi : enUS,
                        })}
                    </Text>
                </View>

                <TouchableOpacity
                    style={friendChatDetailStyleSheet.menuButton}
                    onPress={() => {

                    }}
                >
                    <AntDesign name={"bars"} size={30} color={theme === "dark" ? colors.darkBlue : colors.darkOrange} />
                </TouchableOpacity>
            </View>

            <View style={[
                friendChatDetailStyleSheet.chatContaienr,
                {
                    backgroundColor: theme === "dark" ? colors.lighterBlue2 : colors.milkyWhite
                }
            ]}>

                <View style={[
                    friendChatDetailStyleSheet.bottomContentContainer,
                    {
                        backgroundColor: theme === "dark" ? colors.lighterBlue2 : colors.milkyWhite,
                        bottom: keyboardHeight
                    }
                ]}>
                    {/* Camera */}
                    <TouchableOpacity
                        style={friendChatDetailStyleSheet.touchableButton}
                    >
                        <Entypo name={"camera"} size={25} color={theme === "dark" ? colors.darkBlue : colors.darkOrange} />
                    </TouchableOpacity>

                    {/* Images galery */}
                    <TouchableOpacity
                        style={friendChatDetailStyleSheet.touchableButton}
                        onPress={() => {
                            if (!requestPermission) {
                                handleBottomSheet();
                            } else {
                                handleOpenPhoneSetting();
                            }
                        }}
                    >
                        <FontAwesome name={"image"} size={24} color={theme === "dark" ? colors.darkBlue : colors.darkOrange} />
                    </TouchableOpacity>

                    {/* Text input */}
                    <View style={friendChatDetailStyleSheet.chatInputContainer}>
                        <TextInput
                            style={friendChatDetailStyleSheet.chatInput}
                            placeholder={t("chat-input-msg")}
                            multiline={true}
                            numberOfLines={6}
                        />

                        {/* Icon/Sticker function */}
                        <TouchableOpacity style={friendChatDetailStyleSheet.stickerFunctionButton}>
                            <FontAwesome6 name={"face-smile-beam"} size={20} color={theme === "dark" ? colors.darkBlue : colors.darkOrange} />
                        </TouchableOpacity>
                    </View>

                    {/* Send icon or like icon */}
                    <TouchableOpacity
                        style={friendChatDetailStyleSheet.touchableButton}
                    >
                        <FontAwesome name={"send"} size={20} color={theme === "dark" ? colors.darkBlue : colors.darkOrange} />
                    </TouchableOpacity>
                </View>
            </View>

            <BottomSheetFlatList
                ref={bottomSheetRef4}
                backgroundColor={theme === "dark" ? colors.lighterBlue : colors.lighterOrange}
                selectedAlbum={selectedAlbum}
                bottomSheetHeight={bottomSheetHeight}
                setBottomSheetHeight={setBottomSheetHeight}
                showAlbumsList={showAlbumsList}
                translateY={translateY}
                setSelectedAlbum={setSelectedAlbum}
                handleOpenAlbumFilter={handleOpenAlbumFilter}
                handleCloseAlbumFilter={handleCloseAlbumFilter}
                data={[]}
                renderItem={() => (<></>)}
                snapTo={ScreenHeight - (ScreenHeight / 3) + statusBarHeight}
            />
        </View>
    )
}
