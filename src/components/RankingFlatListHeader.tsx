import { View, Text } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import rankingFlatListHeaderStyleSheet from './styles/rankingFlatListHeaderStyleSheet';

export default function RankingFlatListHeader() {
    const { t } = useTranslation();

    return (
        <View style={rankingFlatListHeaderStyleSheet.container}>
            <Text style={rankingFlatListHeaderStyleSheet.rankingIndex}>
                {t("ranking-no")}
            </Text>
            <Text style={rankingFlatListHeaderStyleSheet.rankingUser}>
                {t("ranking-user")}
            </Text>
            <Text style={rankingFlatListHeaderStyleSheet.rankingDiamond}>
                {t("ranking-diamond")}
            </Text>
        </View>
    )
}