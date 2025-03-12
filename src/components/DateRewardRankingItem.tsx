import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { DateRewardRankingItemProps } from './types/rewardRankingItemTypes'
import dateRewardRankingItemStyleSheet from './styles/dateRewardRankingItemStyleSheet'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { colors } from '../constants/colors'
import { useTranslation } from 'react-i18next'
import { formatDate } from '../utils/formatDate'
import { Reward } from '../constants/entities/Reward'
import RewardRankingItem from './RewardRankingItem'

export default function DateRewardRankingItem({ dateReward }: DateRewardRankingItemProps) {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language || 'en'; // Lấy ngôn ngữ hiện tại
    const formattedDate = formatDate(dateReward.createdAt, currentLocale);

    return (
        <View style={[
            dateRewardRankingItemStyleSheet.container,
            {
                backgroundColor: theme === "dark" ? colors.lightBlue : colors.lightOrange
            }
        ]}>
            <LinearGradient
                colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.mediumOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                style={[
                    dateRewardRankingItemStyleSheet.containerLinear,
                    {
                        borderColor: theme === "dark" ? colors.darkBlue : colors.darkOrange
                    }
                ]}
            />

            {/* Header */}
            <View style={dateRewardRankingItemStyleSheet.headerContainer}>
                <LinearGradient
                    colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.superBlurWhite, colors.darkOrange]} // Hiệu ứng chuyển màu
                    style={[
                        dateRewardRankingItemStyleSheet.headerContainerLinear,
                        {
                            borderColor: theme === "dark" ? colors.darkBlue : colors.darkOrange
                        }
                    ]}
                    start={{ x: 0, y: 0 }} // Bắt đầu từ bên trái
                    end={{ x: 1, y: 0 }} //Kết thúc bên phải
                />
                <Text style={dateRewardRankingItemStyleSheet.createdAtTxt}>
                    {formattedDate}
                </Text>
            </View>

            <View style={dateRewardRankingItemStyleSheet.contentContainer}>
                <View style={dateRewardRankingItemStyleSheet.listValueContainer}>
                    <FlatList<Reward>
                        data={dateReward.rewards}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <RewardRankingItem
                                reward={item}
                            />
                        )}
                        onEndReachedThreshold={0.5}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={5}
                        windowSize={5}
                        removeClippedSubviews
                        horizontal={true}
                    />
                </View>

                {/* Collect button */}
                <TouchableOpacity
                    style={[
                        dateRewardRankingItemStyleSheet.collectButton,
                        {
                            opacity: dateReward.status === "unclaimed" ? 1 : 0.9
                        }
                    ]}
                    touchSoundDisabled={true}
                    disabled={dateReward.status === "claimed" || dateReward.status === "expired"}
                >
                    {
                        dateReward.status === "unclaimed" &&
                        <LinearGradient
                            colors={theme === "dark" ? [colors.lighterBlue, colors.lighterBlue2] : [colors.lighterOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={dateRewardRankingItemStyleSheet.collectButtonLinear}
                        />
                    }
                    <Text style={dateRewardRankingItemStyleSheet.collectButtonTxt}>
                        {
                            dateReward.status === "claimed" ?
                                t("claimed") :
                                dateReward.status === "unclaimed" ?
                                    t("unclaimed") :
                                    t("reward-expired")
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}