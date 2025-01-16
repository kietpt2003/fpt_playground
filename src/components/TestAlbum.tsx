import { StyleSheet, Text, View, Animated as RNAnimated, TouchableOpacity, Image } from 'react-native';
import React, {
    forwardRef,
    useImperativeHandle,
    useCallback,
    useState,
    Dispatch,
    SetStateAction,
} from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    useAnimatedScrollHandler,
    runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useTranslation } from 'react-i18next';
import usePhoto from '../hooks/usePhoto';
import bottomSheetGalleryStyleSheet from './styles/bottomSheetGalleryStyleSheet';
import { Album } from 'expo-media-library';
import { colors } from '../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import { ScreenHeight } from '@rneui/base';
import { statusBarHeight } from '../constants/statusBarHeight';
import { AlbumHeaderFilterProps } from './types/albumFilterTypes';
import albumFilterStyleSheet from './styles/albumFilterStyleSheet';

interface Props {
    snapTo: number;
    backgroundColor: string;


    selectedAlbum: Album | null;
    showAlbumsList: boolean;
    setSelectedAlbum: Dispatch<SetStateAction<Album | null>>;
    handleOpenAlbumFilter: () => void;
    handleCloseAlbumFilter: () => void;
    enableScrolling: boolean;
}

export interface BottomSheetAlbumFilterMethods {
    expandAlbum: () => void;
    closeAlbum: () => void;
}

const TestAlbum = forwardRef<BottomSheetAlbumFilterMethods, Props>(
    (
        {
            snapTo,
            backgroundColor,


            selectedAlbum,
            showAlbumsList,
            setSelectedAlbum,
            handleOpenAlbumFilter,
            handleCloseAlbumFilter,
            enableScrolling
        }: Props,
        ref,
    ) => {
        const inset = useSafeAreaInsets();
        const closeHeight = ScreenHeight + statusBarHeight;
        const openHeight = snapTo;
        const topAnimation = useSharedValue(closeHeight);

        const scrollY = useSharedValue(0);
        const flatListHeight = useSharedValue(0);

        const expandAlbum = useCallback(() => {
            'worklet';
            topAnimation.value = withTiming(openHeight);
        }, [openHeight, topAnimation]);

        const closeAlbum = useCallback(() => {
            'worklet';
            topAnimation.value = withTiming(closeHeight);
        }, [closeHeight, topAnimation]);

        useImperativeHandle(
            ref,
            () => ({
                expandAlbum,
                closeAlbum,
            }),
            [expandAlbum, closeAlbum],
        );

        const animationStyle = useAnimatedStyle(() => {
            const top = topAnimation.value;
            return {
                top,
            };
        });

        const pan = Gesture.Pan();

        const onScroll = useAnimatedScrollHandler({
            onScroll: event => {
                scrollY.value = event.contentOffset.y;
            },
            onMomentumEnd: event => {
                flatListHeight.value = event.contentOffset.y; // Đảm bảo giá trị cuối cùng được lưu sau khi cuộn kết thúc            
            },
        });

        const theme = useSelector((state: RootState) => state.theme.theme);
        const { t } = useTranslation();

        const {
            albums,
            fullPhotos,
            totalImages,
            photos,
        } = usePhoto();

        const scrollViewGesture = Gesture.Native();

        return (
            <>
                <GestureDetector gesture={Gesture.Simultaneous(pan, scrollViewGesture)}>
                    <Animated.View
                        style={[
                            styles.container,
                            animationStyle,
                            {
                                backgroundColor: backgroundColor,
                                padding: 10,
                                paddingBottom: inset.bottom,
                            },
                        ]}>
                        {(albums.length === 0 || fullPhotos.length === 0 || totalImages == 0) ? (
                            <View>
                                <Text style={bottomSheetGalleryStyleSheet.noImage}>{t("no-image")}</Text>
                            </View>
                        ) : (
                            <>
                                <Animated.FlatList
                                    data={albums}
                                    scrollEnabled={true}
                                    keyExtractor={(item) => item.id}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        if (!photos[item.id]?.some((value) => {
                                            return value.mediaType == "photo";
                                        })) {
                                            return null;
                                        }

                                        return (
                                            <TouchableOpacity
                                                style={albumFilterStyleSheet.itemContentContainer}
                                                onPress={() => {
                                                    handleCloseAlbumFilter();
                                                    setSelectedAlbum(item);
                                                }}
                                            >
                                                <Image source={{ uri: photos[item.id]?.length ? photos[item.id][0].uri : undefined }} style={albumFilterStyleSheet.albumFirstImage} />
                                                <View>
                                                    <Text style={albumFilterStyleSheet.albumTitlteTxt}>{item.title}</Text>
                                                    <Text style={albumFilterStyleSheet.assetCountTxt}>{item.assetCount}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}
                                    ListHeaderComponent={
                                        <AlbumHeaderFilter
                                            setSelectedAlbum={setSelectedAlbum}
                                            handleCloseAlbumFilter={handleCloseAlbumFilter}
                                        />
                                    }
                                    onScroll={onScroll}
                                />
                            </>
                        )}
                    </Animated.View>
                </GestureDetector>
            </>
        );
    },
);

export default TestAlbum;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    lineContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    line: {
        width: 50,
        height: 4,
        backgroundColor: 'black',
        borderRadius: 20,
    },
});

function AlbumHeaderFilter({
    handleCloseAlbumFilter,
    setSelectedAlbum,
}: AlbumHeaderFilterProps) {
    const { t } = useTranslation();
    const {
        fullPhotos,
        totalImages
    } = usePhoto();

    return (
        <TouchableOpacity
            style={albumFilterStyleSheet.itemContentContainer}
            onPress={() => {
                handleCloseAlbumFilter();
                setSelectedAlbum(null);
            }}
        >
            <Image source={{ uri: fullPhotos.at(0)?.uri }} style={albumFilterStyleSheet.albumFirstImage} />
            <View>
                <Text style={albumFilterStyleSheet.albumTitlteTxt}>{t("all-images")}</Text>
                <Text style={albumFilterStyleSheet.assetCountTxt}>{totalImages}</Text>
            </View>
        </TouchableOpacity>
    )
}
