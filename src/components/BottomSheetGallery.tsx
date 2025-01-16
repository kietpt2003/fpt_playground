import { FlatListProps, StyleSheet, Text, View, Animated as RNAnimated, TouchableOpacity, Image } from 'react-native';
import React, {
    forwardRef,
    useImperativeHandle,
    useCallback,
    useState,
    Dispatch,
    SetStateAction,
    useRef,
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
import { AlbumFilter } from './AlbumFilter';
import { BottomSheetAlbumFilterMethods } from './TestAlbum';

interface Props extends FlatListProps<any> {
    snapTo: number;
    backgroundColor: string;


    selectedAlbum: Album | null;
    bottomSheetHeight: number;
    setBottomSheetHeight: Dispatch<SetStateAction<number>>;
    showAlbumsList: boolean;
    translateY: RNAnimated.Value;
    setSelectedAlbum: Dispatch<SetStateAction<Album | null>>;
    handleOpenAlbumFilter: () => void;
    handleCloseAlbumFilter: () => void;
}

export interface BottomSheetMethods {
    expand: () => void;
    close: () => void;
}

const BottomSheetFlatList = forwardRef<BottomSheetMethods, Props>(
    (
        {
            snapTo,
            // renderItem,
            backgroundColor,
            data,


            selectedAlbum,
            bottomSheetHeight,
            setBottomSheetHeight,
            showAlbumsList,
            translateY,
            setSelectedAlbum,
            handleOpenAlbumFilter,
            handleCloseAlbumFilter,
            ...rest }: Props,
        ref,
    ) => {
        const inset = useSafeAreaInsets();
        const closeHeight = ScreenHeight + statusBarHeight;
        const openHeight = snapTo;
        const topAnimation = useSharedValue(closeHeight);
        const context = useSharedValue(0);
        const timing = useSharedValue(0);

        const flatListAnimation = useSharedValue(closeHeight);
        const scrollY = useSharedValue(0);
        const flatListHeight = useSharedValue(0);
        const [enableScroll, setEnableScroll] = useState(true);
        const [isPanEnabled, setIsPanEnabled] = useState(true);
        const [isTop, setIsTop] = useState(false);

        const expand = useCallback(() => {
            'worklet';
            topAnimation.value = withTiming(openHeight);
            runOnJS(setIsTop)(false);
        }, [openHeight, topAnimation]);

        const close = useCallback(() => {
            'worklet';
            topAnimation.value = withTiming(closeHeight);
            runOnJS(setIsTop)(false);
        }, [closeHeight, topAnimation]);

        useImperativeHandle(
            ref,
            () => ({
                expand,
                close,
            }),
            [expand, close],
        );

        const animationStyle = useAnimatedStyle(() => {
            const top = topAnimation.value;
            return {
                top,
            };
        });

        const pan = Gesture.Pan()
            .enabled(isPanEnabled)
            .onBegin(() => {
                context.value = topAnimation.value;
                timing.value = 0;
            })
            .onUpdate(event => {
                timing.value++;
                topAnimation.value = withSpring(context.value + event.translationY, {
                    damping: 100,
                    stiffness: 400,
                });
                console.log("jaa");

            })
            .onEnd((event) => {
                const speedRate = 1 / timing.value;

                if (!isTop) {
                    if (event.velocityY < 0 && (topAnimation.value < ScreenHeight / 2 || (speedRate > 0.08 && topAnimation.value < openHeight))) {
                        topAnimation.value = withSpring(statusBarHeight, {
                            damping: 100,
                            stiffness: 400,
                        });
                        runOnJS(setIsTop)(true);
                    } else {
                        topAnimation.value = withSpring(openHeight, {
                            damping: 100,
                            stiffness: 400,
                        });
                    }
                } else {
                    if (event.velocityY > 0 && speedRate > 0.11) {
                        topAnimation.value = withSpring(openHeight, {
                            damping: 100,
                            stiffness: 400,
                        });
                        runOnJS(setIsTop)(false);
                    } else if (event.velocityY > 0 && (topAnimation.value >= ScreenHeight / 2 - statusBarHeight && speedRate <= 0.11)) {
                        topAnimation.value = withSpring(openHeight, {
                            damping: 100,
                            stiffness: 400,
                        });
                        runOnJS(setIsTop)(false);
                    } else {
                        topAnimation.value = withSpring(statusBarHeight, {
                            damping: 100,
                            stiffness: 400,
                        });
                    }
                }
            });

        const onScroll = useAnimatedScrollHandler({
            onScroll: event => {
                scrollY.value = event.contentOffset.y;
            },
            onMomentumEnd: event => {
                flatListHeight.value = event.contentOffset.y; // Đảm bảo giá trị cuối cùng được lưu sau khi cuộn kết thúc            
            },
        });

        const panScroll = Gesture.Pan()
            .onBegin(() => {
                context.value = topAnimation.value;
                timing.value = 0;
                runOnJS(setIsPanEnabled)(false);
            })
            .onUpdate(event => {
                timing.value++;

                flatListAnimation.value = withSpring(context.value + event.translationY, {
                    damping: 100,
                    stiffness: 400,
                });

                if (event.velocityY > 0 && scrollY.value == 0 && isTop) {
                    runOnJS(setIsPanEnabled)(true);
                    runOnJS(setEnableScroll)(false);
                    topAnimation.value = withSpring(context.value + event.translationY, {
                        damping: 100,
                        stiffness: 400,
                    });
                }

                if (!enableScroll && isTop) {
                    topAnimation.value = withSpring(context.value + event.translationY, {
                        damping: 100,
                        stiffness: 400,
                    });
                }

            })
            .onEnd((event) => {
                console.log("vo day");

                runOnJS(setIsPanEnabled)(true);
                runOnJS(setEnableScroll)(true);
                const speedRate = 1 / timing.value;

                if (isPanEnabled && isTop) {
                    if (event.velocityY > 0 && speedRate > 0.11) {
                        topAnimation.value = withSpring(openHeight, {
                            damping: 100,
                            stiffness: 400,
                        });
                        runOnJS(setIsTop)(false);
                    } else if (event.velocityY > 0 && (topAnimation.value >= ScreenHeight / 2 - statusBarHeight && speedRate <= 0.11)) {
                        topAnimation.value = withSpring(openHeight, {
                            damping: 100,
                            stiffness: 400,
                        });
                        runOnJS(setIsTop)(false);
                    } else {
                        topAnimation.value = withSpring(statusBarHeight, {
                            damping: 100,
                            stiffness: 400,
                        });
                    }
                }

            });


        const scrollViewGesture = Gesture.Native();


        const theme = useSelector((state: RootState) => state.theme.theme);
        const { t } = useTranslation();

        const {
            albums,
            fullPhotos,
            fullPhotoPagination,
            loadPhotosSortByCreationTime,
            totalImages,
            photos,
            loadPhotos,
            pagination,
        } = usePhoto();

        return (
            <>
                <GestureDetector gesture={pan}>
                    <Animated.View
                        style={[
                            styles.container,
                            animationStyle,
                            {
                                backgroundColor: backgroundColor,
                                paddingBottom: inset.bottom,
                            },
                        ]}>
                        <View
                            style={[
                                bottomSheetGalleryStyleSheet.handleContainer,
                                {
                                    backgroundColor: theme === "dark" ? colors.lighterBlue : colors.lighterOrange
                                }
                            ]}
                        >
                            <View style={bottomSheetGalleryStyleSheet.handleBar} />
                            <TouchableOpacity
                                style={bottomSheetGalleryStyleSheet.selectedAlbumContainer}
                                onPress={() => {
                                    if (!showAlbumsList) {
                                        handleOpenAlbumFilter();
                                    } else {
                                        handleCloseAlbumFilter();
                                    }
                                }}
                                disabled={albums.length === 0 || fullPhotos.length === 0 || totalImages == 0}
                                touchSoundDisabled={true}
                            >
                                <Text style={bottomSheetGalleryStyleSheet.handleText}>{selectedAlbum == null ? t("all-images") : selectedAlbum.title}</Text>
                                <AntDesign name={!showAlbumsList ? "down" : "up"} size={15} color={colors.milkyWhite} />
                            </TouchableOpacity>
                        </View>

                        <GestureDetector
                            gesture={Gesture.Simultaneous(panScroll, scrollViewGesture)}>
                            {(albums.length === 0 || fullPhotos.length === 0 || totalImages == 0) ? (
                                <View>
                                    <Text style={bottomSheetGalleryStyleSheet.noImage}>{t("no-image")}</Text>
                                </View>
                            ) : (
                                <>
                                    <Animated.FlatList
                                        {...rest}
                                        data={selectedAlbum == null ? fullPhotos : photos[selectedAlbum.id]}
                                        scrollEnabled={enableScroll}
                                        renderItem={({ item }) => (
                                            <Image
                                                source={{ uri: item.uri }}
                                                style={bottomSheetGalleryStyleSheet.image}
                                            />
                                        )}
                                        onScroll={onScroll}
                                        bounces={false}
                                        scrollEventThrottle={16}

                                        numColumns={3}
                                        columnWrapperStyle={bottomSheetGalleryStyleSheet.row}
                                        onEndReached={() => {
                                            //Load more photos
                                            if (selectedAlbum == null) {
                                                loadPhotosSortByCreationTime(10, fullPhotoPagination?.endCursor);
                                            } else {
                                                loadPhotos(selectedAlbum, 10, pagination[selectedAlbum.id].endCursor);
                                            }
                                        }}
                                        onEndReachedThreshold={0.5}
                                        initialNumToRender={9}
                                        showsVerticalScrollIndicator={false}
                                        CellRendererComponent={undefined}
                                    />
                                    <AlbumFilter
                                        translateY={translateY}
                                        albumFilterHeight={bottomSheetHeight - 70}
                                        handleCloseAlbumFilter={handleCloseAlbumFilter}
                                        setSelectedAlbum={setSelectedAlbum}
                                        enableScrolling={enableScroll}
                                    />

                                </>
                            )}
                        </GestureDetector>

                    </Animated.View>
                </GestureDetector>
            </>
        );
    },
);

export default BottomSheetFlatList;

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