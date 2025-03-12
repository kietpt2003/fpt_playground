import { View, Text, Animated as RNAnimated, TouchableOpacity, Image } from 'react-native'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { colors } from '../constants/colors';
import { useTranslation } from 'react-i18next';
import albumFilterStyleSheet from './styles/albumFilterStyleSheet';
import usePhoto from '../hooks/usePhoto';
import { AlbumFilterMethods, AlbumFilterProps, AlbumHeaderFilterProps } from './types/albumFilterTypes';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedScrollHandler, useSharedValue, withSpring } from 'react-native-reanimated';
import { statusBarHeight } from '../constants/statusBarHeight';
import { ScreenHeight } from '@rneui/base';

export const AlbumFilter = forwardRef<AlbumFilterMethods, AlbumFilterProps>(
    (
        {
            setSelectedAlbum,
            topAnimation,
            isPanEnabled,
            setIsPanEnabled,
            enableScroll,
            setEnableScroll,
            isTop,
            setIsTop,
            openHeight,
            setShowAlbumsList
        }: AlbumFilterProps,
        ref
    ) => {
        const { t } = useTranslation();

        const theme = useSelector((state: RootState) => state.theme.theme);
        const {
            albums,
            photos,
            fullPhotos,
            totalImages
        } = usePhoto();

        const scrollY = useSharedValue(0);
        const context = useSharedValue(0);
        const timing = useSharedValue(0);

        const onScroll = useAnimatedScrollHandler({
            onScroll: event => {
                scrollY.value = event.contentOffset.y;
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
                runOnJS(setIsPanEnabled)(true);
                runOnJS(setEnableScroll)(true);
                const speedRate = 1 / timing.value;
                console.log(speedRate, isPanEnabled, isTop);


                if (isPanEnabled && isTop) {
                    if (event.velocityY > 0 && speedRate > 0.07 && scrollY.value == 0) {
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
                } else if (!isPanEnabled && enableScroll && isTop) {
                    topAnimation.value = withSpring(statusBarHeight, {
                        damping: 100,
                        stiffness: 400,
                    });
                }

            });

        const scrollViewGesture = Gesture.Native();

        const translateY = useRef(new RNAnimated.Value(ScreenHeight)).current;
        const handleOpenAlbumFilter = () => {
            RNAnimated.timing(translateY, {
                toValue: 0, // Dịch chuyển đến vị trí ban đầu
                duration: 800, // Thời gian chạy animation (ms)
                useNativeDriver: true, // Sử dụng native driver để tăng hiệu suất
            }).start();
            setShowAlbumsList(true);
        }
        const handleCloseAlbumFilter = () => {
            RNAnimated.timing(translateY, {
                toValue: ScreenHeight, // Dịch chuyển đến vị trí ban đầu
                duration: 800, // Thời gian chạy animation (ms)
                useNativeDriver: true, // Sử dụng native driver để tăng hiệu suất
            }).start();
            setShowAlbumsList(false);
        }

        useImperativeHandle(
            ref,
            () => ({
                handleOpenAlbumFilter,
                handleCloseAlbumFilter,
            }),
        );

        return (
            <RNAnimated.View
                style={[
                    albumFilterStyleSheet.container,
                    {
                        transform: [{ translateY }],
                        backgroundColor: theme === "dark" ? colors.lighterBlue : colors.lighterOrange,
                    }, // Thêm animation dịch chuyển
                ]}
            >
                <View style={[
                    albumFilterStyleSheet.handleContainer,
                    {
                        backgroundColor: theme === "dark" ? colors.lighterBlue : colors.lighterOrange
                    }
                ]} />
                {(albums.length === 0 || fullPhotos.length === 0 || totalImages === 0) ? (
                    <Text style={albumFilterStyleSheet.noImage}>{t("no-image")}</Text>
                ) : (
                    <GestureDetector
                        gesture={Gesture.Simultaneous(panScroll, scrollViewGesture)}>
                        <Animated.FlatList
                            data={albums}
                            scrollEnabled={enableScroll}
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
                    </GestureDetector>
                )}
            </RNAnimated.View>
        )
    }
)

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
