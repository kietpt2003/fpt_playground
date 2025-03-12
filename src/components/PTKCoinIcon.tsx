import React from 'react'
import Svg, { Circle, Text } from 'react-native-svg'
import { PTKCoinIconProps } from './types/ptkCoinIconTypes';

export default function PTKCoinIcon({ size, coinColor }: PTKCoinIconProps) {
    return (
        <Svg
            width={size} // Chiều rộng tùy chỉnh
            height={size} // Chiều cao tùy chỉnh
            viewBox="0 0 20 20" // Định nghĩa kích thước canvas gốc
        >
            <Circle
                cx={10}
                cy={10}
                r={10 - 1}
                stroke={coinColor}
                strokeWidth={1.5}
                fill={"none"}
            />
            <Text
                x="10" // Vị trí ngang (tâm x)
                y="11" // Vị trí dọc (tâm y)
                fill={coinColor} // Màu chữ
                fontSize="12" // Kích thước chữ
                textAnchor="middle" // Căn giữa theo chiều ngang
                alignmentBaseline="middle" // Căn giữa theo chiều dọc
                fontFamily="RobotoBold"
            >
                K
            </Text>
        </Svg>
    )
}