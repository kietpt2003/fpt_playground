import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import npcGuidelineStyleSheet from './styles/npcGuidelineStyleSheet';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { colors } from '../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import useNPC from '../hooks/useNPC';
import { useTranslation } from 'react-i18next';
import { User } from '../constants/entities/User';
import { getDialogues } from '../utils/getDialogues';
import { NPCGuidelineProps } from './types/npcGuidelineTypes';
import useAudio from '../hooks/useAudio';
import { scrollToPosition } from '../utils/scrollToPosition';
import { coveredNumber, dailyCheckPointHeight, featureComponentHeight, homeHeaderImageHeight } from '../constants/scrollHeight';
import { ScreenHeight } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setHomeGuideline } from '../store/reducers/homeReducer';

export default function NPCGuideline({ scrollViewRef, onScrolling, setOnScrolling }: NPCGuidelineProps) {
    const [isChangeImage, setIsChangeImage] = useState<boolean>(true);

    const { t } = useTranslation();

    const theme = useSelector((state: RootState) => state.theme.theme);

    const changeImage = () => setIsChangeImage(!isChangeImage);

    const user: User = {
        id: "userId1",
        name: "Huu Thuan",
        gender: "Male",
        imageUrl: "https://picsum.photos/id/237/200"
    }

    const [showBlurBg, setShowBlurBg] = useState(true);
    const [showGuideline, setShowGuideline] = useState(false);

    const dialogues = getDialogues(t, user);

    const [currentDialogue, setCurrentDialogue] = useState(0);

    const [displayedText, setDisplayedText] = useState(""); // Chữ hiển thị dần
    const [currentTextIndex, setCurrentTextIndex] = useState(0); // Vị trí ký tự hiện tại
    const [showCursor, setShowCursor] = useState(true); // Hiển thị con trỏ nháy
    const [speedRate, setSpeedRate] = useState(1);

    const dispatch = useDispatch();

    const [showNextButton, setShowNextButton] = useState(false);
    const {
        loadSound,
        increaseSpeedRate,
        loadTypingSound,
        stopTypingSound,
    } = useNPC();

    const { volume, sound: songSound } = useAudio();
    const currentSongVolume = volume;

    async function handleClickNext() {
        if (currentDialogue < dialogues.length - 1) {
            setShowNextButton(false);
            setCurrentDialogue((prev) => prev + 1);
            changeImage();
            await loadSound(user.gender === "Male" ? 4 : 2);
            setDisplayedText("");
            setCurrentTextIndex(0);
            setShowCursor(true);
        } else {
            if (songSound) {
                songSound.setVolumeAsync(currentSongVolume);
            }
            AsyncStorage.setItem("homeGuideline", "false");
            dispatch(setHomeGuideline(false));
        }
    }

    const playTypingSfx = async () => {
        await loadTypingSound();
    };

    const sayingHiSfx = async () => {
        if (songSound) {
            await songSound.setVolumeAsync(0.2);
        }
        await loadSound(user.gender === "Male" ? 3 : 0);
    };

    // Scroll to index
    useEffect(() => {
        switch (currentDialogue) {
            case 2:
                setShowBlurBg(false);
                setShowGuideline(true);
                break;
            case 4:
                setShowBlurBg(true);
                setShowGuideline(false);
                setOnScrolling(true);
                // scrollToPosition(scrollViewRef, 0, homeHeaderImageHeight + featureComponentHeight - homeHeaderImageHeight);
                scrollToPosition(scrollViewRef, 0, homeHeaderImageHeight);
                break;
            case 7:
                setShowBlurBg(true);
                setShowGuideline(false);
                setOnScrolling(true);
                // scrollToPosition(scrollViewRef, 0, homeHeaderImageHeight + dailyCheckPointHeight);
                scrollToPosition(scrollViewRef, 0, homeHeaderImageHeight + homeHeaderImageHeight + coveredNumber);
                break;
            case 10:
                setShowBlurBg(true);
                setShowGuideline(false);
                setOnScrolling(true);
                scrollToPosition(scrollViewRef, 0, homeHeaderImageHeight + homeHeaderImageHeight + coveredNumber + homeHeaderImageHeight);
                break;
            default:
                break;
        }
    }, [currentDialogue]);

    // Check when finish scrolling
    useEffect(() => {
        if (onScrolling) {
            switch (currentDialogue) {
                case 4:
                    setShowBlurBg(false);
                    setShowGuideline(true);
                    setOnScrolling(false);
                    break;
                case 7:
                    setShowBlurBg(false);
                    setShowGuideline(true);
                    setOnScrolling(false);
                    break;
                case 10:
                    setShowBlurBg(false);
                    setShowGuideline(true);
                    setOnScrolling(false);
                    break;
                default:
                    break;
            }
        }
    }, [onScrolling]);

    //Hiệu ứng chạy chữ
    useEffect(() => {
        if (currentDialogue < dialogues.length && currentTextIndex < dialogues[currentDialogue].length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + dialogues[currentDialogue][currentTextIndex]); // Thêm từng ký tự vào
                setCurrentTextIndex((prev) => prev + 1); // Tăng vị trí
            }, 150 / speedRate);

            return () => clearTimeout(timeout); // Dọn dẹp timeout
        } else {
            setShowNextButton(true);
            stopTypingSound();
        }
    }, [currentTextIndex]);

    // Hiệu ứng nháy con trỏ
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500); // Con trỏ nháy mỗi 500ms

        return () => clearInterval(interval);
    }, []);

    //Say Hi Sfx và Chạy hiệu ứng typing Sfx
    useEffect(() => {
        const myFunction = async () => {
            if (currentDialogue === 0) {
                await sayingHiSfx();
            }
            await playTypingSfx();
        }
        myFunction();
    }, [currentDialogue]);

    return (
        <View style={[
            npcGuidelineStyleSheet.container,
            {
                backgroundColor: showBlurBg ? colors.blurBlack : undefined
            }
        ]}>
            {
                showGuideline &&
                <>
                    {/* Top blur */}
                    <View style={[
                        npcGuidelineStyleSheet.topBlur,
                    ]} />

                    {/* Bottom blur */}
                    <View style={[
                        npcGuidelineStyleSheet.bottomBlur,
                        {
                            top: (currentDialogue == 0 || currentDialogue == 1 || currentDialogue == 2 || currentDialogue == 3) ? ("59%")
                                : (currentDialogue == 4 || currentDialogue == 5 || currentDialogue == 6) ? ("61.5%")
                                    : (currentDialogue == 7 || currentDialogue == 8 || currentDialogue == 9) ? ("57.5%")
                                        : ("60%"),
                        }
                    ]} />
                </>
            }

            <Pressable
                style={[
                    npcGuidelineStyleSheet.npcBlurContainer,
                    {
                        borderColor: theme === "dark" ? colors.darkBlue : colors.darkOrange
                    }
                ]}
                onPress={() => {
                    if (showNextButton) {
                        handleClickNext();
                    } else {
                        setDisplayedText(dialogues[currentDialogue]); // Thêm từng ký tự vào
                        setCurrentTextIndex(dialogues[currentDialogue].length);
                    }
                }}
                onLongPress={() => {
                    increaseSpeedRate(10);
                    setSpeedRate(150);
                }}
                onPressOut={() => {
                    increaseSpeedRate(1);
                    setSpeedRate(1);
                }}
            >
                {
                    user.gender === "Male" ?
                        <Image
                            source={isChangeImage ? require("../../assets/images/non-player-character1.png") :
                                require("../../assets/images/non-player-character2.png")
                            }
                            style={npcGuidelineStyleSheet.npcImage}
                        /> :
                        <Image
                            source={isChangeImage ? require("../../assets/images/non-player-character3.png") :
                                require("../../assets/images/non-player-character4.png")
                            }
                            style={npcGuidelineStyleSheet.npcImage}
                        />
                }
                <Text style={npcGuidelineStyleSheet.textContent}>
                    {displayedText}
                    <Text style={npcGuidelineStyleSheet.textCursor}>
                        {showCursor && "|"}
                    </Text>
                </Text>

                {
                    showNextButton &&
                    <TouchableOpacity
                        style={npcGuidelineStyleSheet.nextButton}
                        onPress={() => {
                            handleClickNext();
                        }}
                        touchSoundDisabled={true}
                    >
                        <AntDesign
                            name="caretright"
                            size={18}
                            color={colors.white}
                        />
                    </TouchableOpacity>
                }
            </Pressable>
        </View>
    )
}