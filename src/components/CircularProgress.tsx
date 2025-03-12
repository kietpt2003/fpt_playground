import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { CircularProgressProps } from "./types/circularProgressTypes";
import circularProgressStyleSheet from "./styles/circularProgressStyleSheet";
import { colors } from "../constants/colors";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function CircularProgress({ currentLevelPercent, totalDuration, targetLevel }: CircularProgressProps) {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [progress, setProgress] = useState(0);

    const radius = 15;
    const strokeWidth = 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const theme = useSelector((state: RootState) => state.theme.theme);

    useEffect(() => {
        const step = 5; // Mỗi lần tăng 1%
        const steps = Math.ceil(currentLevelPercent / step); // Tổng số bước cần thực hiện
        const intervalTime = totalDuration / steps; // Thời gian giữa mỗi lần tăng

        const interval = setInterval(() => {
            setProgress((prev) => (prev < currentLevelPercent ? prev + step : currentLevelPercent));
        }, intervalTime);

        return () => clearInterval(interval);
    }, [targetLevel])

    useEffect(() => {
        if (currentLevel < targetLevel) {
            const intervalTime = totalDuration / targetLevel; // Thời gian giữa mỗi lần tăng
            const interval = setInterval(() => {
                setCurrentLevel((prev) => {
                    if (prev < targetLevel) {
                        return prev + 1;
                    } else {
                        clearInterval(interval);
                        return prev;
                    }
                });
            }, intervalTime);

            return () => clearInterval(interval);
        }
    }, [currentLevel, targetLevel, totalDuration]);

    return (
        <View style={circularProgressStyleSheet.container}>
            <Svg
                width={radius * 2}
                height={radius * 2}
            >
                {/* Vòng tròn nền */}
                <Circle
                    cx={radius}
                    cy={radius}
                    r={radius - 1}
                    stroke={theme === "dark" ? colors.lighterBlue : colors.brown}
                    strokeWidth={strokeWidth}
                    fill={theme === "dark" ? colors.lighterBlue : colors.brown}
                />
                {/* Vòng tròn động */}
                <Circle
                    cx={radius}
                    cy={radius}
                    r={radius - 1}
                    stroke={colors.white}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${radius} ${radius})`} // Xoay vòng tròn
                />
            </Svg>
            {/* Hiển thị phần trăm */}
            <Text style={circularProgressStyleSheet.levelTxt}>{currentLevel}</Text>
        </View>
    );
};
