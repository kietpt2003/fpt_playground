import { View, Text, Image } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { RankingUserProps } from '../screens/types/rankingTypes';
import rankingCurrentUserStyleSheet from './styles/rankingCurrentUserStyleSheet';
import { FontAwesome6, Foundation } from '@expo/vector-icons';
import { convertNumberToString } from '../utils/convertNumberToString'
import { formatLikesNumber } from '../utils/formatNumber'
import { colors } from '../constants/colors';
import { ScreenHeight } from '@rneui/base';
import UserAvatar from './UserAvatar';

export default function RankingCurrentUser({ user }: RankingUserProps) {
    const { t } = useTranslation();

    return (
        <View style={rankingCurrentUserStyleSheet.container}>
            <Text style={rankingCurrentUserStyleSheet.rankingIndex}>
                {convertNumberToString(user.ranking)}
            </Text>
            <UserAvatar
                avatarUrl={user.imageUrl}
                imageWidth={ScreenHeight / 17.5}
                imageHeight={ScreenHeight / 17.5}
                imageBorderWidth={0.5}
                imageBorderColor={colors.grey}
                imageBorderRadius={30}
                loadingIndicatorSize={20}
            />
            <View style={rankingCurrentUserStyleSheet.rankingUserContainer}>
                {/* Username + gender */}
                <View style={rankingCurrentUserStyleSheet.rankingUserHeaderContainer}>
                    <Text
                        style={rankingCurrentUserStyleSheet.userName}
                        numberOfLines={1}
                    >
                        {user.userName}
                    </Text>
                    {
                        user.gender == "Male" &&
                        <Foundation
                            name="male-symbol"
                            size={23}
                            color={colors.maleGender}
                        />
                    }
                    {
                        user.gender == "Female" &&
                        <Foundation
                            name="female-symbol"
                            size={23}
                            color={colors.femaleGender2}
                        />
                    }
                    {
                        user.gender == "Bisexual" &&
                        <FontAwesome6
                            name="transgender"
                            size={20}
                            color={colors.brown}
                        />
                    }
                </View>

                {/* Like + Specialized code */}
                <View style={rankingCurrentUserStyleSheet.rankingUserContentContainer}>
                    {/* Like */}
                    <View style={rankingCurrentUserStyleSheet.likesContainer}>
                        <Text
                            style={rankingCurrentUserStyleSheet.likeTxt}
                            numberOfLines={1}
                        >
                            {formatLikesNumber(user.likes, t)}
                        </Text>
                    </View>

                    {/* Specialized code */}
                    <View style={rankingCurrentUserStyleSheet.specializedCodeContainer}>
                        <Text
                            style={rankingCurrentUserStyleSheet.specializedCodeTxt}
                            numberOfLines={1}
                        >
                            {user.specializedCode}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Diamonds */}
            <View style={rankingCurrentUserStyleSheet.rankingDiamondContainer}>
                <Text style={rankingCurrentUserStyleSheet.rankingDiamondTxt}>
                    {user.diamonds}
                </Text>

                <Image
                    source={require("../../assets/images/ptk-diamond.png")}
                    style={rankingCurrentUserStyleSheet.diamondImage}
                />
            </View>
        </View>
    )
}