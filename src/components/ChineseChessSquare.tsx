import { View, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import Svg, { Line, Path } from 'react-native-svg';
import { chineseChessRowSize } from '../screens/types/chineseChessTypes';

interface SquareProps {
    size?: number; // Kích thước ô vuông (mặc định là 40)
    horizontalLeft?: boolean; // Hiển thị đường kẻ ngang trái
    horizontalRight?: boolean; // Hiển thị đường kẻ ngang phải
    verticalTop?: boolean; // Hiển thị đường kẻ dọc trên
    verticalBottom?: boolean; // Hiển thị đường kẻ dọc dưới
    topRightL?: boolean;// Hiển thị chữ L trên bên phải
    topLeftL?: boolean;// Hiển thị chữ L trên bên trái
    bottomRightL?: boolean;// Hiển thị chữ L dưới bên phải
    bottomLeftL?: boolean;// Hiển thị chữ L dưới bên trái
    bgColor?: string;
    topRightBg?: boolean; //Bật/Tắt background topRight
    topLeftBg?: boolean; //Bật/Tắt background topLeft
    bottomRightBg?: boolean; //Bật/Tắt background bottomRight
    bottomLeftBg?: boolean; //Bật/Tắt background bottomLeft
    children: ReactNode;
}

export default function ChineseChessSquare({
    size = 40,
    horizontalLeft = false,
    horizontalRight = false,
    verticalTop = false,
    verticalBottom = false,
    topRightL = false,
    topLeftL = false,
    bottomRightL = false,
    bottomLeftL = false,
    bgColor = "white",
    topRightBg = false,
    topLeftBg = false,
    bottomRightBg = false,
    bottomLeftBg = false,
    children
}: SquareProps) {
    return (
        <View style={[styles.container, { width: size, height: size }]}>
            {/* background topRight */}
            {
                topRightBg &&
                <View style={{
                    width: size / 2,
                    height: size / 2,
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: bgColor
                }} />
            }

            {/* background topLeft */}
            {
                topLeftBg &&
                <View style={{
                    width: size / 2,
                    height: size / 2,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: bgColor
                }} />
            }

            {/* background bottomRightBg */}
            {
                bottomRightBg &&
                <View style={{
                    width: size / 2,
                    height: size / 2,
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: bgColor
                }} />
            }

            {/* background bottomLeftBg */}
            {
                bottomLeftBg &&
                <View style={{
                    width: size / 2,
                    height: size / 2,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    backgroundColor: bgColor
                }} />
            }

            <Svg
                width={size}
                height={size}
            >
                {/* Đường kẻ ngang nửa trái */}
                {horizontalLeft && (
                    <Line
                        x1={0}
                        y1={size / 2}
                        x2={size / 2}
                        y2={size / 2}
                        stroke="black"
                        strokeWidth={1.5}
                    />
                )}

                {/* Đường kẻ ngang nửa phải */}
                {horizontalRight && (
                    <Line
                        x1={size / 2}
                        y1={size / 2}
                        x2={size}
                        y2={size / 2}
                        stroke="black"
                        strokeWidth={1.5}
                    />
                )}

                {/* Đường kẻ dọc trên */}
                {verticalTop && (
                    <Line
                        x1={size / 2}
                        y1={0}
                        x2={size / 2}
                        y2={size / 2}
                        stroke="black"
                        strokeWidth={1.5}
                    />
                )}

                {/* Đường kẻ dọc dưới */}
                {verticalBottom && (
                    <Line
                        x1={size / 2}
                        y1={size / 2}
                        x2={size / 2}
                        y2={size}
                        stroke="black"
                        strokeWidth={1.5}
                    />
                )}

                {/* Chữ L trên bên phải */}
                {topRightL && (
                    <>
                        <Path
                            d={`M${(size / 2) + 4} ${(size / 2) - 4} V${size - (size / 1.3)}`}
                            strokeWidth={1.5}
                            stroke={"black"}
                        />
                        <Path
                            d={`M${(size / 2) + 4} ${(size / 2) - 4} H${size / 1.3}`}
                            strokeWidth={1.5}
                            stroke={"black"}
                        />
                    </>
                )}

                {/* Chữ L trên bên trái */}
                {topLeftL && (
                    <>
                        <Path
                            d={`M${(size / 2) - 4} ${(size / 2) - 4} V${size - (size / 1.3)}`}
                            strokeWidth={1.5}
                            stroke={"black"}
                        />
                        <Path
                            d={`M${(size / 2) - 4} ${(size / 2) - 4} H${size - (size / 1.3)}`}
                            strokeWidth={1.5}
                            stroke={"black"}
                        />
                    </>
                )}

                {/* Chữ L dưới bên phải */}
                {bottomRightL && (
                    <>
                        <Path
                            d={`M${(size / 2) + 4} ${(size / 2) + 4} V${size / 1.3}`}
                            strokeWidth={1.5}
                            stroke={"black"}
                        />
                        <Path
                            d={`M${(size / 2) + 4} ${(size / 2) + 4} H${size / 1.3}`}
                            strokeWidth={1.5}
                            stroke={"black"}
                        />
                    </>
                )}

                {/* Chữ L dưới bên trái */}
                {bottomLeftL && (
                    <>
                        <Path
                            d={`M${(size / 2) - 4} ${(size / 2) + 4} V${size / 1.3}`}
                            strokeWidth={1.5}
                            stroke={"black"}
                        />
                        <Path
                            d={`M${(size / 2) - 4} ${(size / 2) + 4} H${size - (size / 1.3)}`}
                            strokeWidth={1.5}
                            stroke={"black"}
                        />
                    </>
                )}


            </Svg>

            <View style={styles.childrenContainer}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: chineseChessRowSize,
        height: chineseChessRowSize,
        justifyContent: "center",
        alignItems: "center",
    },
    childrenContainer: {
        position: "absolute",
        top: 0,
        left: 0
    }
});

