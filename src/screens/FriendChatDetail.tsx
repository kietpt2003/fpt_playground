import { View, Text, TouchableOpacity, TextInput, Keyboard, Platform } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
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
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import usePhoto from '../hooks/usePhoto';
import BottomSheetGallery from '../components/BottomSheetGallery';
import { statusBarHeight } from '../constants/statusBarHeight';
import { BottomSheetGalleryMethods } from '../components/types/bottomSheetGaleryTypes';
import useCamera from '../hooks/useCamera';
import { FriendChatDetailNavigationProp } from './types/friendChatDetailTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as signalR from "@microsoft/signalr"

export default function FriendChatDetail() {
    const route = useRoute<FriendChatDetailRouteProp>();
    const params = route.params;

    const navigation = useNavigation<FriendChatDetailNavigationProp>();

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const theme = useSelector((state: RootState) => state.theme.theme);

    const {
        requestPermission,
    } = usePhoto();

    const {
        isNeedCameraPermission,
        requestCameraPermission,
        canAskAgain,
        requestCameraPermissionWithoutLinking
    } = useCamera();

    const bottomSheetGalleryRef = useRef<BottomSheetGalleryMethods>(null);

    const lastSeen: Date = faker.date.recent();
    const { t, i18n } = useTranslation();

    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const userMasked = useMemo(() => { return params.userMasked }, [params.userMasked?.id]);

    const friend = useMemo(() => { return params.friend }, [params.friend?.id]);

    const conversationId = useMemo(() => { return params.conversationId }, [params.conversationId]);


    const handleOpenPhoneSetting = async () => {
        if (!canAskAgain) {
            await requestCameraPermission();
            const { status, canAskAgain } = await requestCameraPermissionWithoutLinking();
            if (canAskAgain && status === "granted") {

            }
        }
    }

    const domainName = "10.0.2.2"
    const webSocketPort = "5272"

    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

    const handleSignalR = async () => {
        if (isLoggedIn) {
            const token = await AsyncStorage.getItem("token");
            if (token == null) {
                return;
            }
            // Create the SignalR connection
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl(`http://${domainName}:${webSocketPort}/chat/hub?access_token=${token}`, {
                    withCredentials: false
                })
                .withAutomaticReconnect()
                .build();

            // Start the connection
            newConnection.start()
                .then(() => {
                    console.log('SignalR Connected!');
                    // Call the restricted method "SendMessage"
                    newConnection.invoke("JoinGroup", conversationId)
                        .then(() => console.log("JoinGroup method invoked successfully"))
                        .catch(err => console.error("Error invoking JoinGroup method:", err));
                    newConnection.on('GroupMethod', (user, receivedMessage) => {
                        console.log("Raw data received:", user, receivedMessage);
                        console.log("User type:", typeof user, "Message type:", typeof receivedMessage);
                    });
                    // Call the restricted method "PersonalMessage"
                    newConnection.on('PersonalMethod', (user, receivedMessage) => {
                        console.log("vo day", user, receivedMessage);
                    });
                })
                .catch((err: unknown) => {
                    if (err instanceof Error) {
                        console.error("SignalR Error:", err.message);
                    } else if (typeof err === "object" && err !== null && "type" in err) {
                        console.error(`SignalR Hub Error: ${(err as any).error}`);
                    } else {
                        console.error("Unknown SignalR Error:", err);
                    }
                });

            setConnection(newConnection);

            // Cleanup the connection when component unmounts
            return () => {
                if (connection) {
                    connection.stop();
                }
            };
        }
    }
    useEffect(() => {
        handleSignalR();
    }, [isLoggedIn]);

    return (
        <SafeAreaView>
            {/* Header */}
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
                    avatarUrl={friend?.avatarUrl}
                />

                <View style={friendChatDetailStyleSheet.userInfoContainer}>
                    <Text
                        style={friendChatDetailStyleSheet.username}
                        numberOfLines={1}
                    >
                        {friend?.name ? friend.name : "Default User"}
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
                friendChatDetailStyleSheet.chatContainer,
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
                        onPress={() => {
                            if (isNeedCameraPermission) {
                                handleOpenPhoneSetting();
                            } else {
                                navigation.navigate("CameraScreen");
                            }
                        }}
                    >
                        <Entypo name={"camera"} size={25} color={theme === "dark" ? colors.darkBlue : colors.darkOrange} />
                    </TouchableOpacity>

                    {/* Images galery */}
                    <TouchableOpacity
                        style={friendChatDetailStyleSheet.touchableButton}
                        onPress={() => {
                            if (bottomSheetGalleryRef.current != null) {
                                if (!requestPermission) {
                                    if (Keyboard.isVisible()) {
                                        Keyboard.dismiss();
                                    }
                                    bottomSheetGalleryRef.current.handleBottomSheetGallery();
                                    if (bottomSheetGalleryRef.current.isBottomSheetGalleryOpen) {
                                        setKeyboardHeight(0);
                                    }
                                    else {
                                        setKeyboardHeight(ScreenWidth > 350 ? ScreenHeight / 3.7 : ScreenHeight / 3);
                                    }
                                } else {
                                    bottomSheetGalleryRef.current.handleOpenPhoneSetting();
                                }
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
                            onPressIn={() => {
                                if (bottomSheetGalleryRef.current != null) {
                                    if (!requestPermission) {
                                        if (bottomSheetGalleryRef.current.isBottomSheetGalleryOpen) {
                                            bottomSheetGalleryRef.current.handleBottomSheetGallery();
                                            setKeyboardHeight(0);
                                        }
                                    } else {
                                        bottomSheetGalleryRef.current.handleOpenPhoneSetting();
                                    }
                                }
                            }}
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
                ref={bottomSheetGalleryRef}
                snapTo={ScreenHeight - (ScreenHeight / 3.5)}
            />
        </SafeAreaView>
    )
}
