import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { ScreenWidth } from '@rneui/base';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { colors } from '../constants/colors';
import CameraZoomItem from './CameraZoomItem';
import cameraZoomStyleSheet from './styles/cameraZoomStyleSheet';
import { CameraZoomProps } from './types/cameraZoomTypes';

const step = 0.1;
const start = 0;
const end = 1;
const _spacing = 15;
const _itemWidth = 5;

const zoomLevels = Array.from({ length: Math.round((end - start) / step) + 1 }, (_, i) =>
    parseFloat((start + i * step).toFixed(2))
);

export default function CameraZoom({
    zoomValue,
    setZoomValue,
}: CameraZoomProps) {
    const flatListRef = useRef<FlatList>(null);
    const theme = useSelector((state: RootState) => state.theme.theme);

    const [longPressButton, setLongPressButton] = useState<boolean>(false);
    const longPressActive = useSharedValue(false);
    const [isActionActive, setIsActionActive] = useState<boolean>(false);

    // Tính tổng khoảng cuộn tối đa
    const closeWidth = -ScreenWidth * 2;
    const maxOffset = (zoomLevels.length - 1) * (_itemWidth + _spacing);
    const minLeft = Math.round(ScreenWidth / 2 - _itemWidth / 2);
    const maxRight = Math.round(-(maxOffset - ScreenWidth / 2 + _itemWidth / 2));

    const leftAnimation = useSharedValue(closeWidth);
    const context = useSharedValue(0);

    const animationStyle = useAnimatedStyle(() => {
        const left = leftAnimation.value;
        return {
            left,
            bottom: 0
        };
    });

    const panGesture = Gesture.Pan()
        .onBegin(() => {
            if (runOnJS(() => longPressActive.value)) {
                let contextValue = 0;
                switch (zoomValue) {
                    case 0:
                        contextValue = ScreenWidth / 2 - 2.5;
                    case 1:
                        contextValue = ScreenWidth / 2 - 2.5 - maxOffset;
                    default:
                        contextValue = ScreenWidth / 2 - 2.5 - (_itemWidth + _spacing) * zoomValue * 10;
                }
                context.value = contextValue;
            } else {
                context.value = leftAnimation.value;
                runOnJS(setIsActionActive)(true);
            }
        })
        .onUpdate((event) => {
            if (longPressButton) {
                if (longPressActive.value) {
                    runOnJS(setIsActionActive)(true);
                }
                const newPosition = Math.round(context.value + event.translationX);

                // Giới hạn scroll từ trái sang phải
                if (newPosition <= minLeft && newPosition >= maxRight) {
                    const itemsLength = ScreenWidth / 2 - newPosition;
                    leftAnimation.value = withSpring(context.value + event.translationX, {
                        damping: 100,
                        stiffness: 400,
                    });
                    const itemNumber = itemsLength / (_itemWidth + _spacing);
                    runOnJS(setZoomValue)(parseFloat((itemNumber / 10).toFixed(1)));
                }
            }

        })
        .onEnd((event) => {
            runOnJS(setIsActionActive)(false);
        })
        .shouldCancelWhenOutside(true);

    const buttonOneGesture = Gesture.Race(
        Gesture.Tap()
            .onEnd(() => {
                runOnJS(setZoomValue)(0);
            }),
        Gesture.LongPress()
            .onStart(() => {
                runOnJS(setZoomValue)(0);
                runOnJS(handleLongPress)(0);
            })
    )

    const buttonTwoGesture = Gesture.Race(
        Gesture.Tap()
            .onEnd(() => {
                runOnJS(setZoomValue)(0.5);
            }),
        Gesture.LongPress()
            .onStart(() => {
                runOnJS(setZoomValue)(0.5);
                runOnJS(handleLongPress)(5);
            })
    )

    const buttonThreeGesture = Gesture.Race(
        Gesture.Tap()
            .onEnd(() => {
                runOnJS(setZoomValue)(1);
            }),
        Gesture.LongPress()
            .onStart(() => {
                runOnJS(setZoomValue)(1);
                runOnJS(handleLongPress)(10);
            })
    );

    const buttonContainerGesture = Gesture.LongPress()
        .onStart(() => {
            longPressActive.value = true;
            runOnJS(setLongPressButton)(true);
            runOnJS(handleOpenZoomSlider)();
        })
        .simultaneousWithExternalGesture(panGesture)
        .shouldCancelWhenOutside(true);

    const composedGesture = Gesture.Simultaneous(panGesture, buttonContainerGesture);

    const handleTapGesture = (fIndex: number) => {
        return Gesture.Tap()
            .onEnd(() => {
                runOnJS(setZoomValue)(fIndex / 10);
                runOnJS(handleSlider)(fIndex);
                runOnJS(setIsActionActive)(false);
            });
    };

    function handleSlider(zoomLevelIndex: number) {
        let zoomWidth = 0;
        switch (zoomLevelIndex) {
            case 0:
                zoomWidth = ScreenWidth / 2 - 2.5;
                break;
            case 1:
                zoomWidth = ScreenWidth / 2 - 2.5 - maxOffset;
                break;
            default:
                zoomWidth = ScreenWidth / 2 - 2.5 - (_itemWidth + _spacing) * zoomLevelIndex;
                break;
        }
        leftAnimation.value = withSpring(zoomWidth, {
            damping: 100,
            stiffness: 400,
        });
    }

    function handleOpenZoomSlider() {
        let zoomWidth = 0;
        switch (zoomValue) {
            case 0:
                zoomWidth = ScreenWidth / 2 - 2.5;
                break;
            case 1:
                zoomWidth = ScreenWidth / 2 - 2.5 - maxOffset;
                break;
            default:
                zoomWidth = ScreenWidth / 2 - 2.5 - (_itemWidth + _spacing) * zoomValue * 10;
                break;
        }
        leftAnimation.value = withSpring(zoomWidth, {
            damping: 100,
            stiffness: 400,
        });
    }

    function handleCloseZoomSlider() {
        leftAnimation.value = withSpring(closeWidth, {
            damping: 100,
            stiffness: 400,
        });
    }

    function handleLongPress(index: number) {
        setLongPressButton(true);
        handleSlider(index);
    }

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (longPressButton) {
            const countdown = () => {
                timer = setTimeout(() => {
                    if (isActionActive) {
                        countdown(); // Tiếp tục đếm ngược
                    } else {
                        setLongPressButton(false); // Dừng countdown
                        handleCloseZoomSlider();
                    }
                }, 4000); // Mỗi giây kiểm tra một lần
            };

            countdown();
        }

        // Dọn dẹp khi `longPressButton` thay đổi hoặc component unmount
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [longPressButton, isActionActive]);

    return (
        <>
            <View style={cameraZoomStyleSheet.headerContainer} >
                {
                    longPressButton &&
                    <>
                        <View style={cameraZoomStyleSheet.headerContentContainer}>
                            <Text style={[
                                cameraZoomStyleSheet.headerZoomValue,
                                {
                                    color: theme === "dark" ? colors.darkBlue : colors.darkOrange,
                                }
                            ]}>
                                {zoomValue}x
                            </Text>
                        </View>
                        <View
                            style={[
                                cameraZoomStyleSheet.zoomSelectStick,
                                {
                                    backgroundColor: theme === "dark" ? colors.darkBlue : colors.darkOrange,
                                }
                            ]}
                        />
                    </>
                }
            </View>

            {/* Custom slider */}
            <View style={cameraZoomStyleSheet.customSliderContainer}>
                <GestureDetector gesture={composedGesture}>
                    <>
                        <Animated.View
                            style={[
                                {
                                    ...StyleSheet.absoluteFillObject,
                                },
                                animationStyle,
                            ]}>

                            <FlatList<number>
                                ref={flatListRef}
                                initialScrollIndex={0}
                                style={cameraZoomStyleSheet.flatListStyle}
                                data={zoomLevels}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                horizontal={true}
                                renderItem={({ item, index: fIndex }) => (
                                    <CameraZoomItem
                                        item={item}
                                        viewStyle={
                                            {
                                                height: 20,
                                                marginRight: _spacing,
                                                backgroundColor: fIndex == 0 || fIndex == 5 || fIndex == 10 ? colors.white : theme === "light" ? colors.lightOrange : colors.lighterBlue,
                                                opacity: fIndex === (zoomValue * 10) ? 1 : 0.6
                                            }
                                        }
                                        gesture={handleTapGesture(fIndex)}
                                    />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                                onScrollToIndexFailed={(info) => {
                                    // Cuộn đến mục gần nhất
                                    flatListRef.current?.scrollToIndex({
                                        index: 0,
                                        animated: true,
                                        viewOffset: _spacing,
                                        viewPosition: 0
                                    });
                                }}
                                scrollEnabled={false}
                            />
                        </Animated.View>

                        <GestureDetector
                            gesture={buttonContainerGesture}
                        >
                            <View
                                style={[
                                    cameraZoomStyleSheet.zoomButtonsContainer,
                                    {
                                        opacity: longPressButton ? 0 : 1
                                    }
                                ]}
                            >
                                {/* x0 */}
                                <GestureDetector
                                    gesture={buttonOneGesture}
                                >
                                    <Animated.View
                                        style={[
                                            cameraZoomStyleSheet.zoomButton,
                                            {
                                                backgroundColor:
                                                    zoomValue !== 0 ? colors.icyWhite : theme === "dark" ? colors.lighterBlue : colors.lightOrange,
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                cameraZoomStyleSheet.zoomButtonTxt,
                                                {
                                                    color: zoomValue === 0 ? colors.white : colors.grey,
                                                    fontSize: zoomValue === 0 ? 15 : 14,
                                                },
                                            ]}
                                        >
                                            0x
                                        </Text>
                                    </Animated.View>
                                </GestureDetector>

                                {/* x0.5 */}
                                <GestureDetector
                                    gesture={buttonTwoGesture}
                                >
                                    <Animated.View
                                        style={[
                                            cameraZoomStyleSheet.zoomButton,
                                            {
                                                backgroundColor:
                                                    !(zoomValue !== 0.5 && zoomValue !== 0 && zoomValue !== 1 || zoomValue == 0.5) ? colors.icyWhite : theme === "dark" ? colors.lighterBlue : colors.lightOrange,
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                cameraZoomStyleSheet.zoomButtonTxt,
                                                {
                                                    color: (zoomValue !== 0.5 && zoomValue !== 0 && zoomValue !== 1 || zoomValue == 0.5) ? colors.white : colors.grey,
                                                    fontSize: (zoomValue !== 0.5 && zoomValue !== 0 && zoomValue !== 1 || zoomValue == 0.5) ? 15 : 14,
                                                },
                                            ]}
                                        >
                                            {(zoomValue !== 0.5 && zoomValue !== 0 && zoomValue !== 1) ? zoomValue : 0.5}
                                        </Text>
                                    </Animated.View>
                                </GestureDetector>

                                {/* x1 */}
                                <GestureDetector
                                    gesture={buttonThreeGesture}
                                >
                                    <Animated.View
                                        style={[
                                            cameraZoomStyleSheet.zoomButton,
                                            {
                                                backgroundColor:
                                                    zoomValue !== 1 ? colors.icyWhite : theme === "dark" ? colors.lighterBlue : colors.lightOrange,
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                cameraZoomStyleSheet.zoomButtonTxt,
                                                {
                                                    color: zoomValue === 1 ? colors.white : colors.grey,
                                                    fontSize: zoomValue === 1 ? 15 : 14,
                                                },
                                            ]}
                                        >
                                            1x
                                        </Text>
                                    </Animated.View>
                                </GestureDetector>
                            </View>
                        </GestureDetector>
                    </>
                </GestureDetector>
            </View>
        </>
    )
}