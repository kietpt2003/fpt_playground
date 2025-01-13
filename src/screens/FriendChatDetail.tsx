import { View, Text, TouchableOpacity, TextInput, Keyboard, Platform } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
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
import BottomSheetGallery from '../components/BottomSheetGallery';
import { ScreenHeight } from '@rneui/base';

export default function FriendChatDetail() {
    const route = useRoute<FriendChatDetailRouteProp>();
    const params = route.params;

    const navigation = useNavigation();

    const theme = useSelector((state: RootState) => state.theme.theme);

    const [isGalleryVisible, setGalleryVisible] = useState(false);
    const photos = Array.from({ length: 20 }, (_, index) => ({
        id: `${index}`,
        uri: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    }));

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
                            if (!isGalleryVisible) {
                                setKeyboardHeight(ScreenHeight / 3);
                            } else {
                                setKeyboardHeight(0);
                            }
                            setGalleryVisible(!isGalleryVisible);
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
            <BottomSheetGallery
                isVisible={isGalleryVisible}
                photos={photos}
            />
        </View>
    )
}