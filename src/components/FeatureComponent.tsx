import { View, Text, Animated, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FunctionItem from './FunctionItem';
import { ScreenWidth } from '@rneui/base';
import IntroduceFunction from './IntroduceFunction';
import { FunctionItemProps } from "./types/functionItemTypes";
import { FeatureComponentProps, SliderContentItem } from './types/featureComponentTypes';
import featureComponentStyleSheet from './styles/featureComponentStyleSheet';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { colors } from '../constants/colors';

export default function FeatureComponent({
    sliderContents = [],
    featureTitle = "Feature Default",
    functionItems = [],
    changePosition = false,
    isGuideline
}: FeatureComponentProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const theme = useSelector((state: RootState) => state.theme.theme);

    const scrollX = useRef(new Animated.Value(0)).current;

    // Tự động chuyển slide sau 5 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === sliderContents.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval); // Xóa interval khi component bị hủy
    }, []);

    // Cập nhật vị trí FlatList
    useEffect(() => {
        if (flatListRef.current && sliderContents.length != 0) {
            flatListRef.current.scrollToIndex({ animated: true, index: currentIndex });
        }
    }, [currentIndex]);

    return (
        <View style={featureComponentStyleSheet.functionContainer}>
            <Text style={[
                featureComponentStyleSheet.functionTitle,
                {
                    color: theme === "dark" ? colors.white : colors.black
                }
            ]}>{featureTitle}</Text>

            <View style={featureComponentStyleSheet.functionContainerGroup}>
                {
                    !changePosition ?
                        <>
                            {/* Function Advertise */}
                            <View style={featureComponentStyleSheet.advertiseContainer}>
                                <FlatList<SliderContentItem>
                                    ref={flatListRef}
                                    data={sliderContents}
                                    keyExtractor={(item) => item.id.toString()}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    onScroll={Animated.event(
                                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                        { useNativeDriver: false }
                                    )}
                                    scrollEnabled={true} // Không cho phép người dùng cuộn
                                    renderItem={({ item }) => (
                                        <IntroduceFunction
                                            backgroundImgSrc={item.backgroundImgSrc}
                                            contentImageSrc={item.contentImageSrc}
                                            contentTxt={item.contentTxt}
                                            linearColors={item.linearColors}
                                        />
                                    )}
                                />
                                {/* Scroll indicator */}
                                <View style={featureComponentStyleSheet.scrollIndicatorContainer}>
                                    {sliderContents.map((_, index) => {
                                        const inputRange = [(index - 1) * (ScreenWidth / 2 - 25), index * (ScreenWidth / 2 - 25), (index + 1) * (ScreenWidth / 2 - 25)];
                                        const scale = scrollX.interpolate({
                                            inputRange,
                                            outputRange: [1, 1.5, 1], // Cục trắng lớn hơn khi được focus
                                            extrapolate: "clamp",
                                        });

                                        return (
                                            <Animated.View
                                                key={index.toString()}
                                                style={[
                                                    featureComponentStyleSheet.scrollIndicatorView,
                                                    { transform: [{ scale }] },
                                                ]}
                                            />
                                        );
                                    })}
                                </View>
                            </View>

                            {/* Function content */}
                            <View style={featureComponentStyleSheet.functionContentContainer}>

                                <FlatList<FunctionItemProps>
                                    data={functionItems}
                                    scrollEnabled={false}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <FunctionItem
                                            linearColors={item.linearColors}
                                            lottieSrc={item.lottieSrc}
                                            contentTxt={item.contentTxt}
                                            onPress={item.onPress}
                                            isGuideline={isGuideline}
                                        />
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                    numColumns={2} // Hiển thị 2 cột
                                />
                            </View>
                        </>
                        :
                        <>
                            {/* Function content */}
                            <View style={featureComponentStyleSheet.functionContentContainer}>
                                <FlatList<FunctionItemProps>
                                    data={functionItems}
                                    scrollEnabled={false}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <FunctionItem
                                            linearColors={item.linearColors}
                                            lottieSrc={item.lottieSrc}
                                            contentTxt={item.contentTxt}
                                            onPress={item.onPress}
                                        />
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                    numColumns={2} // Hiển thị 2 cột
                                />
                            </View>

                            {/* Function Advertise */}
                            <View style={featureComponentStyleSheet.advertiseContainer}>
                                <FlatList<SliderContentItem>
                                    ref={flatListRef}
                                    data={sliderContents}
                                    keyExtractor={(item) => item.id.toString()}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    onScroll={Animated.event(
                                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                        { useNativeDriver: false }
                                    )}
                                    scrollEnabled={true} // Không cho phép người dùng cuộn
                                    renderItem={({ item }) => (
                                        <IntroduceFunction
                                            backgroundImgSrc={item.backgroundImgSrc}
                                            contentImageSrc={item.contentImageSrc}
                                            contentTxt={item.contentTxt}
                                            linearColors={item.linearColors}
                                        />
                                    )}
                                />
                                {/* Scroll indicator */}
                                <View style={featureComponentStyleSheet.scrollIndicatorContainer}>
                                    {sliderContents.map((_, index) => {
                                        const inputRange = [(index - 1) * (ScreenWidth / 2 - 25), index * (ScreenWidth / 2 - 25), (index + 1) * (ScreenWidth / 2 - 25)];
                                        const scale = scrollX.interpolate({
                                            inputRange,
                                            outputRange: [1, 1.5, 1], // Cục trắng lớn hơn khi được focus
                                            extrapolate: "clamp",
                                        });

                                        return (
                                            <Animated.View
                                                key={index.toString()}
                                                style={[
                                                    featureComponentStyleSheet.scrollIndicatorView,
                                                    { transform: [{ scale }] },
                                                ]}
                                            />
                                        );
                                    })}
                                </View>
                            </View>
                        </>
                }
            </View>
        </View>
    )
}