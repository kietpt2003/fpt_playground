import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { RewardRankingItemProps } from './types/rewardRankingItemTypes'
import rewardRankingItemStyleSheet from './styles/rewardRankingItemStyleSheet'
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg'
import { ScreenHeight } from '@rneui/base'
import { colors } from '../constants/colors'

export default function RewardRankingItem({ reward }: RewardRankingItemProps) {
    return (
        <View style={rewardRankingItemStyleSheet.container}>
            {/* radial background */}
            <View style={rewardRankingItemStyleSheet.svgBackground}>
                <Svg
                    width="100%"
                    height="100%"
                >
                    <Defs>
                        <RadialGradient
                            id="grad"
                        >
                            <Stop offset="20%" stopColor={colors.diamond2} stopOpacity="1" />
                            <Stop offset="95%" stopColor={colors.diamond1} stopOpacity="1" />
                        </RadialGradient>
                    </Defs>
                    <Rect
                        x="-2"
                        y="-2"
                        width="100%"
                        height="100%"
                        fill="url(#grad)"
                    />
                </Svg>
            </View>

            <ImageBackground
                source={require('../../assets/images/ptk-diamond.png')}
                style={rewardRankingItemStyleSheet.diamondImage}
            />

            <Text style={rewardRankingItemStyleSheet.valueTxt}>
                {reward.value}
            </Text>

            {
                reward.status === "claimed" &&
                <View style={rewardRankingItemStyleSheet.blurBg} />
            }
        </View>
    )
}