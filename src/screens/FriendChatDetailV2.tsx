import { View, Text, TouchableOpacity, TextInput, Keyboard, Platform, StyleSheet, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
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
import { RootStackParamList } from '../navigation/types/types';
import { GiftedChat, IMessage, InputToolbar, Send } from 'react-native-gifted-chat';

export type FriendChatDetailRoutePropV2 = RouteProp<RootStackParamList, "FriendChatDetailV2">;
const messageData = [
    {
        id: "6139e7c6580e9b39d1c6bd79",
        from: 1,
        date: "Wed Aug 25 2021 04:34:39 GMT+0200 (Central European Summer Time)",
        msg: "Et nulla tempor nulla minim in veniam excepteur nisi deserunt cupidatat commodo reprehenderit duis pariatur. Eu ullamco velit minim cupidatat sit nisi laborum."
    },
    {
        id: "6139e7c645df995d423a0c61",
        from: 1,
        date: "Sat Aug 14 2021 06:09:53 GMT+0200 (Central European Summer Time)",
        msg: "Veniam esse non occaecat eiusmod. Adipisicing quis consectetur irure nostrud proident."
    },
    {
        id: "6139e7c687a7db674021c553",
        from: 0,
        date: "Tue Aug 03 2021 05:13:50 GMT+0200 (Central European Summer Time)",
        msg: "Aute nostrud eu aliqua reprehenderit consequat fugiat nulla reprehenderit pariatur ad veniam tempor mollit irure. Tempor Lorem sint non fugiat esse duis pariatur tempor irure."
    },
    {
        id: "6139e7c62b83d7f2c8d8f21c",
        from: 1,
        date: "Tue Aug 24 2021 21:09:23 GMT+0200 (Central European Summer Time)",
        msg: "Proident sunt cupidatat culpa id Lorem cillum duis nulla duis incididunt. Elit ad ut eu aliquip nisi tempor tempor reprehenderit est et id."
    },
    {
        id: "6139e7c6bf08d6589abff47d",
        from: 0,
        date: "Thu Aug 19 2021 05:57:54 GMT+0200 (Central European Summer Time)",
        msg: "Sint quis aliqua consectetur non esse do in ullamco do ea enim nostrud sit incididunt. Fugiat dolore esse voluptate tempor consequat veniam ad adipisicing aliquip."
    },
    {
        id: "6139e7c65e0794cb2e92b4d1",
        from: 1,
        date: "Fri Aug 27 2021 16:48:53 GMT+0200 (Central European Summer Time)",
        msg: "Anim ad proident cillum sit reprehenderit. Incididunt fugiat reprehenderit aliquip duis nostrud proident elit culpa eu ut."
    },
    {
        id: "6139e7c66e1691e1c8f0dd12",
        from: 0,
        date: "Sat Sep 04 2021 03:24:13 GMT+0200 (Central European Summer Time)",
        msg: "Nostrud ipsum qui excepteur cupidatat proident sit exercitation mollit ad magna. Irure sit do cillum sunt nostrud dolor."
    },
    {
        id: "6139e7c6f219f2a2ff61a21e",
        from: 1,
        date: "Sat Sep 04 2021 19:30:36 GMT+0200 (Central European Summer Time)",
        msg: "Voluptate amet labore est eu labore velit deserunt aliqua occaecat. Ex enim Lorem ad eiusmod velit velit velit."
    },
    {
        id: "6139e7c6be26f83b10403cbd",
        from: 1,
        date: "Sun Aug 08 2021 04:45:04 GMT+0200 (Central European Summer Time)",
        msg: "Nulla est labore in sint excepteur. Elit aliqua laborum dolore do."
    },
    {
        id: "6139e7c6c200a7eaf09c1d7d",
        from: 1,
        date: "Fri Aug 27 2021 06:23:41 GMT+0200 (Central European Summer Time)",
        msg: "Nostrud occaecat pariatur laborum aliqua ad reprehenderit mollit magna ex incididunt non sunt. Ullamco sunt nulla aliqua quis ex ullamco minim."
    },
    {
        id: "6139e7c658a955b40b50f382",
        from: 1,
        date: "Tue Aug 31 2021 20:57:48 GMT+0200 (Central European Summer Time)",
        msg: "Cupidatat occaecat consequat incididunt irure mollit enim duis incididunt ut id. Esse officia adipisicing cillum amet occaecat labore."
    },
    {
        id: "6139e7c63d23c8d990ffb3de",
        from: 1,
        date: "Thu Aug 05 2021 07:37:11 GMT+0200 (Central European Summer Time)",
        msg: "Exercitation consequat amet ut nisi. Do ex enim ullamco ex ex est et aliqua laborum ullamco magna."
    },
    {
        id: "6139e7c6d2b0ff349f80a2e5",
        from: 1,
        date: "Tue Aug 03 2021 16:28:33 GMT+0200 (Central European Summer Time)",
        msg: "Sunt amet deserunt sint amet pariatur duis anim commodo incididunt eu laborum. Consectetur excepteur amet incididunt qui irure."
    },
    {
        id: "6139e7c60af348dbd057f496",
        from: 0,
        date: "Tue Aug 10 2021 18:00:43 GMT+0200 (Central European Summer Time)",
        msg: "Anim reprehenderit voluptate nulla et officia qui nisi sunt nulla sint voluptate esse reprehenderit cupidatat. Incididunt elit fugiat culpa aliquip fugiat est officia."
    },
    {
        id: "6139e7c65dd5a5e8218ba2fa",
        from: 1,
        date: "Tue Aug 10 2021 23:22:28 GMT+0200 (Central European Summer Time)",
        msg: "Dolor adipisicing laborum esse incididunt esse consequat cupidatat esse. Est consequat incididunt pariatur sint sint magna."
    },
    {
        id: "6139e7c6281accff5fe55075",
        from: 0,
        date: "Tue Aug 31 2021 12:53:37 GMT+0200 (Central European Summer Time)",
        msg: "Ut ut esse occaecat Lorem aliquip aliquip ad eiusmod nulla eiusmod. Non commodo voluptate proident excepteur."
    },
    {
        id: "6139e7c6fabd8bfbfe184079",
        from: 1,
        date: "Thu Aug 26 2021 17:40:52 GMT+0200 (Central European Summer Time)",
        msg: "Adipisicing nulla ad ad nostrud mollit culpa ea cillum aute excepteur minim fugiat. Eiusmod et qui amet mollit aliqua eu anim adipisicing cupidatat."
    },
    {
        id: "6139e7c667c119fc716e4637",
        from: 1,
        date: "Fri Aug 13 2021 02:20:38 GMT+0200 (Central European Summer Time)",
        msg: "Do ipsum sint eiusmod incididunt sunt minim deserunt laborum nulla mollit reprehenderit ut veniam esse. Velit tempor amet ut magna non do."
    },
    {
        id: "6139e7c62a1478365c271d1a",
        from: 0,
        date: "Thu Aug 05 2021 14:18:52 GMT+0200 (Central European Summer Time)",
        msg: "Consectetur elit aute mollit sit dolor cupidatat. Voluptate non aliqua duis minim nostrud minim."
    },
    {
        id: "6139e7c65845fe107e9d8a03",
        from: 1,
        date: "Wed Sep 01 2021 06:10:22 GMT+0200 (Central European Summer Time)",
        msg: "Nulla proident consequat dolore Lorem Lorem. Enim minim ut aute duis."
    },
    {
        id: "6139e7c62d7582a17e8a5000",
        from: 0,
        date: "Mon Aug 16 2021 15:46:07 GMT+0200 (Central European Summer Time)",
        msg: "Dolor consectetur adipisicing velit enim officia. Mollit cupidatat nisi occaecat non sunt nisi eu incididunt adipisicing est non."
    },
    {
        id: "6139e7c6817200a4ecadb374",
        from: 1,
        date: "Sun Sep 05 2021 19:38:53 GMT+0200 (Central European Summer Time)",
        msg: "Deserunt ex ad esse non. Culpa incididunt sit ipsum qui excepteur velit proident ut."
    },
    {
        id: "6139e7c6766e6a212c44f378",
        from: 0,
        date: "Mon Aug 30 2021 11:04:14 GMT+0200 (Central European Summer Time)",
        msg: "Amet consectetur culpa ad sint laborum eu laboris non proident fugiat anim. Ad voluptate ipsum exercitation veniam ea reprehenderit."
    },
    {
        id: "6139e7c6b662a6e643064544",
        from: 1,
        date: "Mon Aug 30 2021 23:51:25 GMT+0200 (Central European Summer Time)",
        msg: "Exercitation sint ea dolore qui. Non minim nisi ex tempor mollit qui aute laborum."
    },
    {
        id: "6139e7c6f618709859887343",
        from: 0,
        date: "Tue Aug 03 2021 11:47:04 GMT+0200 (Central European Summer Time)",
        msg: "Elit ullamco sit do dolore et dolore id eiusmod dolor eiusmod occaecat sunt. Laboris occaecat adipisicing sint ad ea mollit et mollit laborum et occaecat duis sint."
    },
    {
        id: "6139e7c6763f4da907851d1f",
        from: 1,
        date: "Fri Sep 03 2021 23:46:25 GMT+0200 (Central European Summer Time)",
        msg: "Adipisicing do mollit et excepteur. Nulla eu ex deserunt proident eu anim culpa cillum."
    },
    {
        id: "6139e7c61a36a01ce3afe180",
        from: 0,
        date: "Fri Aug 13 2021 14:22:52 GMT+0200 (Central European Summer Time)",
        msg: "Lorem cillum consectetur quis qui magna cillum ullamco consequat eiusmod ad. Commodo do voluptate ullamco ullamco laborum in ullamco dolore."
    },
    {
        id: "6139e7c62fa2b5553022f27a",
        from: 0,
        date: "Mon Aug 02 2021 20:14:54 GMT+0200 (Central European Summer Time)",
        msg: "Aute ullamco commodo et aliquip est fugiat eu do fugiat consectetur officia excepteur tempor. Aute adipisicing eiusmod in ea laboris velit proident dolore voluptate veniam esse amet nostrud."
    },
    {
        id: "6139e7c67084a40c3adbe65e",
        from: 0,
        date: "Thu Aug 26 2021 09:31:50 GMT+0200 (Central European Summer Time)",
        msg: "Pariatur Lorem laboris aute tempor consectetur deserunt. Ullamco nostrud occaecat Lorem exercitation sit minim dolor."
    },
    {
        id: "6139e7c62333a40c3adbe65e",
        from: 0,
        date: "Thu Aug 26 2021 11:31:50 GMT+0200 (Central European Summer Time)",
        msg: "Check out this image!",
        img: "https://i0.wp.com/ionicacademy.com/wp-content/uploads/2019/09/simon_insta.jpg"
    },
    {
        id: "6139e7c6364562bd5ae10297",
        from: 0,
        date: "Thu Sep 02 2021 06:12:56 GMT+0200 (Central European Summer Time)",
        msg: "Proident qui do consequat labore magna amet reprehenderit do id. Eiusmod sunt fugiat aliquip sunt excepteur reprehenderit."
    }
]

export default function FriendChatDetailV2() {
    const route = useRoute<FriendChatDetailRoutePropV2>();
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
                        .catch(err => console.log("Error invoking JoinGroup method:", err));
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
                        console.log("SignalR Error:", err.message);
                    } else if (typeof err === "object" && err !== null && "type" in err) {
                        console.log(`SignalR Hub Error: ${(err as any).error}`);
                    } else {
                        console.log("Unknown SignalR Error:", err);
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
        // handleSignalR();
    }, [isLoggedIn]);

    const [messages, setMessages] = useState<IMessage[]>([])

    useEffect(() => {
        setMessages([
            ...messageData.map((message) => {
                return {
                    _id: message.id,
                    text: message.msg,
                    createdAt: new Date(message.date),
                    user: {
                        _id: message.from,
                        name: message.from ? 'You' : 'Bob',
                    },
                    received: message.from == 0 ? false : true,
                    pending: true
                };
            }),
            {
                _id: 0,
                system: true,
                text: 'All your base are belong to us',
                createdAt: new Date(),
                user: {
                    _id: 0,
                    name: 'Bot',
                },
            },
        ]);
    }, []);

    const onSend = useCallback((messages: IMessage[] = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: theme === "dark" ? colors.lighterBlue2 : colors.milkyWhite
        }}>
            {/* Header */}
            <View style={[
                styles.chatHeaderContainer,
                {
                    backgroundColor: theme === "dark" ? colors.lighterBlue : colors.lighterOrange
                }
            ]}>
                <View style={styles.chatHeaderLeftContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
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

                    <View style={styles.userInfoContainer}>
                        <Text
                            style={styles.username}
                            numberOfLines={1}
                        >
                            {friend?.name ? friend.name : "Default User"}
                        </Text>
                        <Text
                            style={styles.lastseen}
                            numberOfLines={1}
                        >
                            {t("online-active")}{formatDistanceToNowStrict(lastSeen, {
                                addSuffix: true,
                                locale: i18n.language === "vi" ? vi : enUS,
                            })}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => {

                    }}
                >
                    <AntDesign name={"bars"} size={30} color={theme === "dark" ? colors.darkBlue : colors.darkOrange} />
                </TouchableOpacity>
            </View>

            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderComposer={() => <View />}
                isLoadingEarlier={true}
                renderTicks={(message: IMessage) => {
                    if (!message.received) { //Cần handle case này để các msg của Friend không hiện dấu tick
                        return;
                    }
                    return (
                        <View style={{
                            position: "absolute",
                            bottom: 5,
                            left: 10
                        }}>
                            <Text>Tick</Text>
                        </View>
                    )
                }}
                {...(GiftedChat as any)} //Tránh lỗi do thư viện chưa định nghĩa renderTicks
            />

            <View style={[
                styles.bottomContentContainer,
                {
                    backgroundColor: theme === "dark" ? colors.lighterBlue2 : colors.milkyWhite,
                    marginBottom: keyboardHeight
                }
            ]}>
                {/* Camera */}
                <TouchableOpacity
                    style={styles.touchableButton}
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
                    style={styles.touchableButton}
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
                                    setKeyboardHeight(ScreenHeight * .35 + 5);
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
                <View style={styles.chatInputContainer}>
                    <TextInput
                        style={styles.chatInput}
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
                    <TouchableOpacity style={styles.stickerFunctionButton}>
                        <FontAwesome6 name={"face-smile-beam"} size={20} color={theme === "dark" ? colors.darkBlue : colors.darkOrange} />
                    </TouchableOpacity>
                </View>

                {/* Send icon or like icon */}
                <TouchableOpacity
                    style={styles.touchableButton}
                >
                    <FontAwesome name={"send"} size={20} color={theme === "dark" ? colors.darkBlue : colors.darkOrange} />
                </TouchableOpacity>
            </View>

            <BottomSheetGallery
                ref={bottomSheetGalleryRef}
                snapTo={ScreenHeight * .65}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    chatHeaderContainer: {
        flexDirection: "row",
        width: ScreenWidth,
        height: ScreenHeight * 0.07,
        alignItems: "center",
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: colors.blurBlack,
        justifyContent: "space-between",
    },
    chatHeaderLeftContainer: {
        flexDirection: "row",
    },
    backButton: {
        marginRight: 10
    },
    userInfoContainer: {
        marginLeft: 10,
        overflow: "hidden"
    },
    username: {
        fontFamily: "Roboto",
    },
    lastseen: {
        fontFamily: "RobotoLight",
        fontSize: 12
    },
    menuButton: {
    },
    chatContainer: {
        flex: 1
    },
    bottomContentContainer: {
        // position: "absolute",
        width: ScreenWidth,
        height: 50,
        flexDirection: "row",
        alignItems: "flex-end",
        paddingHorizontal: 10,
        gap: 20,
    },
    toolBarContainer: {
        justifyContent: "center",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        height: 50,
        left: 10
    },
    touchableButton: {
        justifyContent: "center",
        height: 50
    },
    chatInputContainer: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: colors.chatBox,
        overflow: "hidden",
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
        marginBottom: 5
    },
    chatInput: {
        fontFamily: "RobotoLight",
        textAlign: "left",
        width: "85%",
        height: "100%",
    },
    stickerFunctionButton: {
        position: "absolute",
        right: 10,
        bottom: 10
    }
});
