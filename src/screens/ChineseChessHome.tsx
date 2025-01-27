import { View, Text, ImageBackground, TouchableOpacity, Alert, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import chineseChessHomeStyleSheet from './styles/chineseChessHomeStyleSheet'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import { AntDesign, Ionicons, Octicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import useClick from '../hooks/useClick';
import useAudio from '../hooks/useAudio';
import { ScreenHeight } from '@rneui/base';
import LoadingBar from '../components/LoadingBar';
import { useNavigation } from '@react-navigation/native';
import { ChineseChessNavigationProp } from './types/chineseChessTypes';
import ErrorModal from '../components/ErrorModal';
import ConfirmModal from '../components/ConfirmModal';

export default function ChineseChessHome() {
    const { t } = useTranslation();
    const theme = useSelector((state: RootState) => state.theme.theme);

    const [bso, setBso] = useState(false); // Tín hiệu true để tiếp tục loading
    const [percentage, setPercentage] = useState(0); // Hiển thị % đã load

    const navigation = useNavigation<ChineseChessNavigationProp>();

    const [stringErr, setStringErr] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    const [stringConfirm, setStringConfirm] = useState<string>("");
    const [isConfirm, setIsConfirm] = useState<boolean>(false);

    const [menuExpand, setMenuExpand] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { playSound } = useClick();
    const { resumeSong } = useAudio();

    const showMenu = () => {
        playSound(); // Phát âm thanh khi bấm
        setMenuExpand(true);
    };
    const hideMenu = () => {
        playSound(); // Phát âm thanh khi bấm
        setMenuExpand(false);
    };

    const handleClickBack = () => {
        setStringConfirm("Bạn có muốn thoát trò chơi không? Mọi dữ liệu có thể bị mất. Bạn chắc chắn chứ?");
        setIsConfirm(true);
        return true; // Chặn hành động mặc định của nút back
    }

    const handleBackPress = () => {
        navigation.goBack();
    };

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

    //Back handler
    useEffect(() => {
        // Gắn sự kiện BackHandler
        BackHandler.addEventListener('hardwareBackPress', handleClickBack);

        // Gỡ sự kiện khi component unmount
        return () => BackHandler.removeEventListener('hardwareBackPress', handleClickBack);
    }, []);

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
                        height: menuExpand ? (ScreenHeight / 22) * 5 : (ScreenHeight / 22) * 3.5
                    }
                ]}>
                    {/* Luật chơi */}
                    <TouchableOpacity
                        onPress={() => {

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
                        <Text style={chineseChessHomeStyleSheet.menuOptionItemTxt}>{t("chinese-chess-guideline")}</Text>
                    </TouchableOpacity>

                    {/* Bạn bè */}
                    <TouchableOpacity
                        onPress={() => {

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
                        <Text style={chineseChessHomeStyleSheet.menuOptionItemTxt}>{t("friends")}</Text>
                    </TouchableOpacity>

                    {/* Âm thanh */}
                    <TouchableOpacity
                        onPress={() => {

                        }}
                        touchSoundDisabled={true}
                        style={chineseChessHomeStyleSheet.menuOptionItemContainer}
                    >
                        <View style={chineseChessHomeStyleSheet.menuOptionItemIconContainer}>
                            <LinearGradient
                                colors={[colors.gameColorItem1, colors.gameColorItem2]} // Hiệu ứng chuyển màu
                                style={chineseChessHomeStyleSheet.menuOptionItemIconLinear}
                            />
                            <Ionicons name={"volume-medium"} size={28} color={colors.white} />
                        </View>
                        <Text style={chineseChessHomeStyleSheet.menuOptionItemTxt}>{t("sound")}</Text>
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
                    <TouchableOpacity
                        style={chineseChessHomeStyleSheet.menuItemContainer}
                        onPress={() => {
                            navigation.navigate("ChineseChessBoard");
                        }}
                        touchSoundDisabled={true}
                    >
                        <LinearGradient
                            colors={[colors.gameColorItem1, colors.gameColorItem2]} // Hiệu ứng chuyển màu
                            style={chineseChessHomeStyleSheet.menuItemContainerLinear}
                        />
                        <Text style={chineseChessHomeStyleSheet.menuItemTxt}>{t("play-with-bot")}</Text>
                    </TouchableOpacity>
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
        </SafeAreaView>
    )
}