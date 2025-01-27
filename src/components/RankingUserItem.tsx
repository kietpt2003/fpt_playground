import { View, Text, Image } from 'react-native'
import React from 'react'
import { RankingUserProps } from '../screens/types/rankingTypes'
import rankingUserItemStyleSheet from './styles/rankingUserItemStyleSheet'
import UserAvatar from './UserAvatar'
import { ScreenHeight } from '@rneui/base'
import { colors } from '../constants/colors'
import { FontAwesome6, Foundation } from '@expo/vector-icons';
import { convertNumberToString } from '../utils/convertNumberToString'
import { formatLikesNumber } from '../utils/formatNumber'
import { useTranslation } from 'react-i18next'

export default function RankingUserItem({ user }: RankingUserProps) {
    const { t } = useTranslation();

    return (
        <View style={rankingUserItemStyleSheet.container}>
            <Text style={rankingUserItemStyleSheet.rankingIndex}>
                {convertNumberToString(user.ranking)}
            </Text>
            <UserAvatar
                avatarUrl={user.imageUrl}
                imageWidth={ScreenHeight / 20}
                imageHeight={ScreenHeight / 20}
                imageBorderWidth={0.5}
                imageBorderColor={colors.grey}
                imageBorderRadius={30}
                loadingIndicatorSize={20}
            />
            <View style={rankingUserItemStyleSheet.rankingUserContainer}>
                {/* Username + gender */}
                <View style={rankingUserItemStyleSheet.rankingUserHeaderContainer}>
                    <Text
                        style={rankingUserItemStyleSheet.userName}
                        numberOfLines={1}
                    >
                        {user.userName}
                    </Text>
                    {
                        user.gender == "Male" &&
                        <Foundation
                            name="male-symbol"
                            size={19}
                            color={colors.maleGender}
                        />
                    }
                    {
                        user.gender == "Female" &&
                        <Foundation
                            name="female-symbol"
                            size={19}
                            color={colors.femaleGender}
                        />
                    }
                    {
                        user.gender == "Bisexual" &&
                        <FontAwesome6
                            name="transgender"
                            size={17}
                            color={colors.brown}
                        />
                    }
                </View>

                {/* Like + Specialized code */}
                <View style={rankingUserItemStyleSheet.rankingUserContentContainer}>
                    {/* Like */}
                    <View style={rankingUserItemStyleSheet.likesContainer}>
                        <Text
                            style={rankingUserItemStyleSheet.likeTxt}
                            numberOfLines={1}
                        >
                            {formatLikesNumber(user.likes, t)}
                        </Text>
                    </View>

                    {/* Specialized code */}
                    <View style={rankingUserItemStyleSheet.specializedCodeContainer}>
                        <Text
                            style={rankingUserItemStyleSheet.specializedCodeTxt}
                            numberOfLines={1}
                        >
                            {user.specializedCode}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Diamonds */}
            <View style={rankingUserItemStyleSheet.rankingDiamondContainer}>
                <Text style={rankingUserItemStyleSheet.rankingDiamondTxt}>
                    {user.diamonds}
                </Text>

                <Image
                    source={require("../../assets/images/ptk-diamond.png")}
                    style={rankingUserItemStyleSheet.diamondImage}
                />
            </View>
        </View>
    )
}