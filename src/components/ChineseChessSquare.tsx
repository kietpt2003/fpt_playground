import { View, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import Svg, { Line, Path, Rect } from 'react-native-svg';
import { chineseChessSize } from '../screens/types/chineseChessTypes';

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
    diagonalLeftToRightHalfTop?: boolean; // Hiển thị đường chéo từ trái sang phải nửa trên
    diagonalLeftToRightHalfBottom?: boolean; // Hiển thị đường chéo từ trái sang phải nửa dưới
    diagonalRightToLeftHalfTop?: boolean; // Hiển thị đường chéo từ phải sang trái nửa trên
    diagonalRightToLeftHalfBottom?: boolean; // Hiển thị đường chéo từ phải sang trái nửa dưới
    children: ReactNode;
}

export default function ChineseChessSquare({
    size = 40,
    horizontalLeft = true,
    horizontalRight = true,
    verticalTop = true,
    verticalBottom = true,
    topRightL = false,
    topLeftL = false,
    bottomRightL = false,
    bottomLeftL = false,
    diagonalLeftToRightHalfTop = false,
    diagonalLeftToRightHalfBottom = false,
    diagonalRightToLeftHalfTop = false,
    diagonalRightToLeftHalfBottom = false,
    children
}: SquareProps) {
    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Svg width={size} height={size}>
                {/* Vẽ viền của ô vuông */}
                <Rect
                    x={0}
                    y={0}
                    width={size}
                    height={size}
                    stroke="black"
                    strokeWidth={0}
                    fill="none"
                />

                {/* Đường kẻ ngang nửa trái */}
                {horizontalLeft && (
                    <Line
                        x1={0}
                        y1={size / 2}
                        x2={size / 2}
                        y2={size / 2}
                        stroke="black"
                        strokeWidth={1}
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
                        strokeWidth={1}
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
                        strokeWidth={1}
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
                        strokeWidth={1}
                    />
                )}

                {/* Chữ L trên bên phải */}
                {topRightL && (
                    <>
                        <Path
                            d={`M${(size / 2) + 5} ${(size / 2) - 5} V${size - (size / 1.4)}`}
                            strokeWidth={1}
                            stroke={"black"}
                        />
                        <Path
                            d={`M${(size / 2) + 5} ${(size / 2) - 5} H${size / 1.4}`}
                            strokeWidth={1}
                            stroke={"black"}
                        />
                    </>
                )}

                {/* Chữ L trên bên trái */}
                {topLeftL && (
                    <>
                        <Path
                            d={`M${(size / 2) - 5} ${(size / 2) - 5} V${size - (size / 1.4)}`}
                            strokeWidth={1}
                            stroke={"black"}
                        />
                        <Path
                            d={`M${(size / 2) - 5} ${(size / 2) - 5} H${size - (size / 1.4)}`}
                            strokeWidth={1}
                            stroke={"black"}
                        />
                    </>
                )}

                {/* Chữ L dưới bên phải */}
                {bottomRightL && (
                    <>
                        <Path
                            d={`M${(size / 2) + 5} ${(size / 2) + 5} V${size / 1.4}`}
                            strokeWidth={1}
                            stroke={"black"}
                        />
                        <Path
                            d={`M${(size / 2) + 5} ${(size / 2) + 5} H${size / 1.4}`}
                            strokeWidth={1}
                            stroke={"black"}
                        />
                    </>
                )}

                {/* Chữ L dưới bên trái */}
                {bottomLeftL && (
                    <>
                        <Path
                            d={`M${(size / 2) - 5} ${(size / 2) + 5} V${size / 1.4}`}
                            strokeWidth={1}
                            stroke={"black"}
                        />
                        <Path
                            d={`M${(size / 2) - 5} ${(size / 2) + 5} H${size - (size / 1.4)}`}
                            strokeWidth={1}
                            stroke={"black"}
                        />
                    </>
                )}

                {/* Đường chéo từ trái sang phải nửa trên */}
                {diagonalLeftToRightHalfTop && (
                    <Line
                        x1={0}
                        y1={0}
                        x2={size / 2}
                        y2={size / 2}
                        stroke="black"
                        strokeWidth={1}
                    />
                )}

                {/* Đường chéo từ trái sang phải nửa dưới */}
                {diagonalLeftToRightHalfBottom && (
                    <Line
                        x1={size / 2}
                        y1={size / 2}
                        x2={size}
                        y2={size}
                        stroke="black"
                        strokeWidth={1}
                    />
                )}

                {/* Đường chéo từ phải sang trái nửa trên */}
                {diagonalRightToLeftHalfTop && (
                    <Line
                        x1={size}
                        y1={0}
                        x2={size / 2}
                        y2={size / 2}
                        stroke="black"
                        strokeWidth={1}
                    />
                )}

                {/* Đường chéo từ phải sang trái nửa dưới */}
                {diagonalRightToLeftHalfBottom && (
                    <Line
                        x1={size / 2}
                        y1={size / 2}
                        x2={0}
                        y2={size}
                        stroke="black"
                        strokeWidth={1}
                    />
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    childrenContainer: {
        width: chineseChessSize,
        height: chineseChessSize,
        position: "absolute",
        top: 0,
        left: 0
    }
});

