import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Button, Text } from 'react-native';
import { LoadingBarProps } from './types/loadingBarTypes';

const LoadingBar = ({ bso, setPercentage, styleContainer, styleLoading }: LoadingBarProps) => {
    const progress = useRef(new Animated.Value(0)).current; // Giá trị hoạt ảnh (0 -> 1)


    // Hàm lấy số ngẫu nhiên từ 0 -> 0.99
    function getRandomNumber(): number {
        return Math.random() * 0.99; // Giới hạn tối đa là 80%
    }

    useEffect(() => {
        const targetValue = getRandomNumber(); // Giá trị ngẫu nhiên
        Animated.timing(progress, {
            toValue: targetValue, // Tăng lên giá trị ngẫu nhiên
            duration: 2000, // Thời gian để hoàn thành
            useNativeDriver: false,
        }).start();

        // Lắng nghe tiến trình và cập nhật phần trăm
        progress.addListener(({ value }) => {
            setPercentage(Math.round(value * 100)); // Tính phần trăm (0-100)
        });

        return () => progress.removeAllListeners();
    }, []);

    const continueLoading = () => {
        // Khi bso === true, tiếp tục loading lên 100%
        Animated.timing(progress, {
            toValue: 1, // Giá trị hoàn tất
            duration: 1000, // Thời gian chạy tiếp
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        // Khi bso thay đổi, kiểm tra và tiếp tục loading
        if (bso) {
            continueLoading();
        }
    }, [bso]);

    // Xử lý chiều rộng thanh loading
    const width = progress.interpolate({
        inputRange: [0, 1], // Giá trị từ 0 → 1
        outputRange: ['0%', '100%'], // Chiều rộng từ 0% → 100%
    });

    return (
        <View style={[styles.bar, styleContainer]}>
            <Animated.View style={[styles.progress, { width }, styleLoading]} />
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        width: '80%',
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 10,
    },
    progress: {
        height: '100%',
        backgroundColor: '#4caf50', // Màu của thanh loading
    },
});

export default LoadingBar;
