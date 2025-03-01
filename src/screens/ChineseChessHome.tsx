import { View, Text, ImageBackground, TouchableOpacity, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import chineseChessHomeStyleSheet from './styles/chineseChessHomeStyleSheet'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import { AntDesign, Ionicons, Octicons } from '@expo/vector-icons';
import useClick from '../hooks/useClick';
import useAudio from '../hooks/useAudio';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import LoadingBar from '../components/LoadingBar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ChineseChessNavigationProp } from './types/chineseChessTypes';
import ErrorModal from '../components/ErrorModal';
import ConfirmModal from '../components/ConfirmModal';
import { Audio, AVPlaybackSource } from 'expo-av';

export default function ChineseChessHome() {
    const { t } = useTranslation();

    const [bso, setBso] = useState(false); // Tín hiệu true để tiếp tục loading
    const [percentage, setPercentage] = useState(0); // Hiển thị % đã load

    const navigation = useNavigation<ChineseChessNavigationProp>();

    const [stringErr, setStringErr] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    const [stringConfirm, setStringConfirm] = useState<string>("");
    const [isConfirm, setIsConfirm] = useState<boolean>(false);

    const [menuExpand, setMenuExpand] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const backGroundSoundRef = useRef<Audio.Sound | null>(null);

    const [isPlaySfx, setIsPlaySfx] = useState(true);

    const { playSound } = useClick();
    const { resumeSong } = useAudio();

    const showMenu = () => {
        if (isPlaySfx) {
            playSound(); // Phát âm thanh khi bấm
        }
        setMenuExpand(true);
    };
    const hideMenu = () => {
        if (isPlaySfx) {
            playSound(); // Phát âm thanh khi bấm
        }
        setMenuExpand(false);
    };

    const handleClickBack = () => {
        setStringConfirm("Bạn có muốn thoát trò chơi không? Mọi dữ liệu có thể bị mất. Bạn chắc chắn chứ?");
        setIsConfirm(true);
        return true; // Chặn hành động mặc định của nút back
    }

    const handleBackPress = async () => {
        navigation.goBack();
    };

    const [isPlaySound, setIsPlaySound] = useState(false);
    const [isLoadSound, setLoadSound] = useState(false);
    const handlePlayBgSound = async () => {
        setLoadSound(true);
        if (backGroundSoundRef.current) {
            await backGroundSoundRef.current.playAsync(); // Chơi bài hát hiện tại
            setIsPlaySound(true);
        } else {
            const mySound: AVPlaybackSource = require("../../assets/audios/chinese_chess/chinese-chese-background.m4a")
            if (mySound != undefined) {
                const { sound } = await Audio.Sound.createAsync(mySound, {
                    shouldPlay: true,
                    isLooping: true,
                });
                backGroundSoundRef.current = sound;
                setIsPlaySound(true);
            }
        }
        setLoadSound(false);
    };

    const handleStopBgSound = async () => {
        setLoadSound(true);
        if (backGroundSoundRef.current) {
            await backGroundSoundRef.current.pauseAsync(); // Dừng bài hát hiện tại
            setIsPlaySound(false);
        }
        setLoadSound(false);
    };

    const handleSoundBtn = async () => {
        if (backGroundSoundRef.current) {
            if (isPlaySound) {
                await handleStopBgSound()
            } else {
                await handlePlayBgSound()
            }
        }
    }


    const handlePlaySfx = () => {
        setIsPlaySfx(!isPlaySfx);
    }

    useEffect(() => {
        setTimeout(() => {
            setBso(true); // Load tiếp đến 100%
        }, 2000); // Delay 2 giây
    }, []);

    useEffect(() => {
        if (percentage == 100) {
            setIsLoading(false);
        }
    }, [percentage]);

    //Background sound handler
    useEffect(() => {
        handlePlayBgSound()
    }, []);

    //Back handler
    useFocusEffect(
        useCallback(() => {
            // Gắn sự kiện BackHandler
            BackHandler.addEventListener('hardwareBackPress', handleClickBack);

            // Gỡ sự kiện khi component unmount
            return () => BackHandler.removeEventListener('hardwareBackPress', handleClickBack);
        }, [])
    );

    const menuExpandHeight = ScreenWidth > 350 ? (ScreenHeight / 22) * 6.8 : (ScreenHeight / 18) * 6.5;
    const menuCloseHeight = ScreenWidth > 350 ? (ScreenHeight / 22) * 3.65 : (ScreenHeight / 18) * 3.5;

    //Dừng nhạc khi thoát khởi game
    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", (e) => {
            if (e.data.action.type === "GO_BACK") {
                // Người dùng bấm nút back (goBack)
                if (backGroundSoundRef.current) {
                    backGroundSoundRef.current.stopAsync(); // Dừng nhạc
                    backGroundSoundRef.current.unloadAsync(); // Giải phóng bộ nhớ
                    backGroundSoundRef.current = null;
                }
            }
        });

        return unsubscribe; // Cleanup listener khi unmount
    }, [navigation]);

    return (
        <SafeAreaView>
            <ImageBackground
                source={require('../../assets/images/chineseChessHomeBg.webp')}
                style={chineseChessHomeStyleSheet.backgroundImage}
            >
                {/* Back button */}
                <TouchableOpacity
                    onPress={() => {
                        handleClickBack();
                    }}
                    touchSoundDisabled={true}
                    style={chineseChessHomeStyleSheet.backButton}
                >
                    <Ionicons name={"return-up-back"} size={35} color={colors.white} />
                </TouchableOpacity>

                {/* Menu */}
                <View style={[
                    chineseChessHomeStyleSheet.menuOptionContainer,
                    {
                        height: menuExpand ? menuExpandHeight : menuCloseHeight
                    }
                ]}>
                    {/* Luật chơi */}
                    <TouchableOpacity
                        onPress={() => {
                            if (isPlaySfx) {
                                playSound(); // Phát âm thanh khi bấm
                            }
                        }}
                        touchSoundDisabled={true}
                        style={chineseChessHomeStyleSheet.menuOptionItemContainer}
                    >
                        <View style={chineseChessHomeStyleSheet.menuOptionItemIconContainer}>
                            <LinearGradient
                                colors={[colors.gameColorItem1, colors.gameColorItem2]} // Hiệu ứng chuyển màu
                                style={chineseChessHomeStyleSheet.menuOptionItemIconLinear}
                            />
                            <AntDesign name={"question"} size={28} color={colors.white} />
                        </View>
                        <Text
                            style={chineseChessHomeStyleSheet.menuOptionItemTxt}
                            numberOfLines={1}
                        >{t("chinese-chess-guideline")}</Text>
                    </TouchableOpacity>

                    {/* Bạn bè */}
                    <TouchableOpacity
                        onPress={() => {
                            if (isPlaySfx) {
                                playSound(); // Phát âm thanh khi bấm
                            }
                        }}
                        touchSoundDisabled={true}
                        style={chineseChessHomeStyleSheet.menuOptionItemContainer}
                    >
                        <View style={chineseChessHomeStyleSheet.menuOptionItemIconContainer}>
                            <LinearGradient
                                colors={[colors.gameColorItem1, colors.gameColorItem2]} // Hiệu ứng chuyển màu
                                style={chineseChessHomeStyleSheet.menuOptionItemIconLinear}
                            />
                            <Octicons name={"people"} size={28} color={colors.white} />
                        </View>
                        <Text
                            style={chineseChessHomeStyleSheet.menuOptionItemTxt}
                            numberOfLines={1}
                        >{t("friends")}</Text>
                    </TouchableOpacity>

                    {/* Âm thanh */}
                    <TouchableOpacity
                        onPress={() => {
                            if (isPlaySfx) {
                                playSound(); // Phát âm thanh khi bấm
                            }
                            handleSoundBtn();
                        }}
                        touchSoundDisabled={true}
                        style={chineseChessHomeStyleSheet.menuOptionItemContainer}
                        disabled={isLoadSound}
                    >
                        <View style={chineseChessHomeStyleSheet.menuOptionItemIconContainer}>
                            <LinearGradient
                                colors={[colors.gameColorItem1, colors.gameColorItem2]} // Hiệu ứng chuyển màu
                                style={chineseChessHomeStyleSheet.menuOptionItemIconLinear}
                            />
                            <Ionicons name={isPlaySound ? "volume-medium" : "volume-mute"} size={28} color={colors.white} />
                        </View>
                        <Text
                            style={chineseChessHomeStyleSheet.menuOptionItemTxt}
                            numberOfLines={1}
                        >{t("sound")}</Text>
                    </TouchableOpacity>

                    {/* Hiệu ứng âm thanh */}
                    <TouchableOpacity
                        onPress={() => {
                            if (isPlaySfx) {
                                playSound(); // Phát âm thanh khi bấm
                            }
                            handlePlaySfx();
                        }}
                        touchSoundDisabled={true}
                        style={chineseChessHomeStyleSheet.menuOptionItemContainer}
                    >
                        <View style={chineseChessHomeStyleSheet.menuOptionItemIconContainer}>
                            <LinearGradient
                                colors={[colors.gameColorItem1, colors.gameColorItem2]} // Hiệu ứng chuyển màu
                                style={chineseChessHomeStyleSheet.menuOptionItemIconLinear}
                            />
                            <Ionicons name={isPlaySfx ? "volume-medium" : "volume-mute"} size={28} color={colors.white} />
                        </View>
                        <Text
                            style={chineseChessHomeStyleSheet.menuOptionItemTxt}
                            numberOfLines={1}
                        >{t("sfx")}</Text>
                    </TouchableOpacity>

                    {/* Xem thêm */}
                    <TouchableOpacity
                        onPress={() => {
                            if (menuExpand) {
                                hideMenu();
                            } else {
                                showMenu();
                            }
                        }}
                        touchSoundDisabled={true}
                        style={chineseChessHomeStyleSheet.menuOptionExpand}
                    >
                        <LinearGradient
                            colors={[colors.gameColorItem1, colors.gameColorItem2]} // Hiệu ứng chuyển màu
                            style={chineseChessHomeStyleSheet.menuOptionExpandLinear}
                        />
                        <Text style={chineseChessHomeStyleSheet.menuOptionExpandTxt}>{t(menuExpand ? "shrink" : "expand")}</Text>
                    </TouchableOpacity>
                </View>

                {/* Game play */}
                <View style={chineseChessHomeStyleSheet.menuContainer}>
                    {/* Bot Playing */}
                    <TouchableOpacity
                        style={chineseChessHomeStyleSheet.menuItemContainer}
                        onPress={() => {
                            navigation.navigate("ChineseChessBoard", { isPlaySfx });
                        }}
                        touchSoundDisabled={true}
                    >
                        <LinearGradient
                            colors={[colors.gameColorItem1, colors.gameColorItem2]} // Hiệu ứng chuyển màu
                            style={chineseChessHomeStyleSheet.menuItemContainerLinear}
                        />
                        <Text style={chineseChessHomeStyleSheet.menuItemTxt}>{t("play-with-bot")}</Text>
                    </TouchableOpacity>

                    {/* One Player */}
                    <TouchableOpacity
                        style={chineseChessHomeStyleSheet.menuItemContainer}
                        onPress={() => {

                        }}
                        touchSoundDisabled={true}
                    >
                        <LinearGradient
                            colors={[colors.gameColorItem1, colors.gameColorItem2]} // Hiệu ứng chuyển màu
                            style={chineseChessHomeStyleSheet.menuItemContainerLinear}
                        />
                        <Text style={chineseChessHomeStyleSheet.menuItemTxt}>{t("play-button")}</Text>
                    </TouchableOpacity>

                    {/* Find room */}
                    <TouchableOpacity
                        style={chineseChessHomeStyleSheet.menuItemContainer}
                        onPress={() => {

                        }}
                        touchSoundDisabled={true}
                    >
                        <LinearGradient
                            colors={[colors.gameColorItem1, colors.gameColorItem2]} // Hiệu ứng chuyển màu
                            style={chineseChessHomeStyleSheet.menuItemContainerLinear}
                        />
                        <Text style={chineseChessHomeStyleSheet.menuItemTxt}>{t("find-room")}</Text>
                    </TouchableOpacity>
                </View>

                <ConfirmModal
                    stringConfirm={stringConfirm}
                    isConfirm={isConfirm}
                    setIsConfirm={setIsConfirm}
                    handleConfirmFunction={handleBackPress}
                />

                <ErrorModal
                    stringErr={stringErr}
                    isError={isError}
                    setIsError={setIsError}
                />
            </ImageBackground>
            {
                isLoading &&
                <ImageBackground
                    source={require('../../assets/images/chineseChessLoadingBg.webp')}
                    style={chineseChessHomeStyleSheet.loadingBackgroundImage}
                >
                    {/* Back button */}
                    <TouchableOpacity
                        onPress={() => {
                            handleClickBack();
                        }}
                        touchSoundDisabled={true}
                        style={chineseChessHomeStyleSheet.backButton}
                    >
                        <Ionicons name={"return-up-back"} size={35} color={colors.white} />
                    </TouchableOpacity>

                    <View style={chineseChessHomeStyleSheet.loadingContainer}>
                        <Text style={chineseChessHomeStyleSheet.loadingBarTxt}>{t("loading")} {percentage}%</Text>
                        <LoadingBar
                            bso={bso}
                            setPercentage={setPercentage}
                            styleContainer={chineseChessHomeStyleSheet.loadingBarContainer}
                            styleLoading={chineseChessHomeStyleSheet.loadingBarProgress}
                        />
                    </View>
                </ImageBackground>
            }
        </SafeAreaView>
    )
}