import React from 'react'
import Svg, { Defs, LinearGradient, Path, Stop, Text } from 'react-native-svg'
import { RankingRibbonProps } from './types/rankingRibbonTypes';
import { colors } from '../constants/colors';

export default function RankingRibbon({
    width,
    height,
    leftRibbonLinearLeft,
    leftRibbonLinearRight,
    rightRibbonLinearLeft,
    rightRibbonLinearRight,
    centerRibbonLinearLeft,
    centerRibbonLinearRight,
    textContent,
}: RankingRibbonProps) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox={`0 0 110 25`}
        >
            {/* Ribbon left */}
            <Defs>
                <LinearGradient id="ribbonLeftBackground" x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0%" stopColor={leftRibbonLinearLeft} />
                    <Stop offset="80%" stopColor={leftRibbonLinearRight} />
                </LinearGradient>
            </Defs>
            <Path
                d="M0 14 H27 V35 H8 L13 24 Z"
                fill={"url(#ribbonLeftBackground)"}
            />

            {/* Ribbon right */}
            <Defs>
                <LinearGradient id="ribbonRightBackground" x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0%" stopColor={rightRibbonLinearLeft} />
                    <Stop offset="80%" stopColor={rightRibbonLinearRight} />
                </LinearGradient>
            </Defs>
            <Path
                d="M83 14 H110 L97 24 L102 35 H83 Z"
                fill={"url(#ribbonRightBackground)"}
            />

            {/* Ribbon center */}
            <Defs>
                <LinearGradient id="ribbonCenterBackground" x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0%" stopColor={centerRibbonLinearLeft} />
                    <Stop offset="80%" stopColor={centerRibbonLinearRight} />
                </LinearGradient>
            </Defs>
            <Path
                d="M20 13 C30 0,85 0, 90 13 V33 C85 20, 30 20, 20 33 Z"
                fill={"url(#ribbonCenterBackground)"}
            />

            <Text
                x="56.5" // Vị trí ngang (tâm x)
                y="14" // Vị trí dọc (tâm y)
                fill={colors.white} // Màu chữ
                fontSize="15" // Kích thước chữ
                textAnchor="middle" // Căn giữa theo chiều ngang
                alignmentBaseline="middle" // Căn giữa theo chiều dọc
                fontFamily="RobotoBold"
            >
                {textContent}
            </Text>
        </Svg>
    )
}