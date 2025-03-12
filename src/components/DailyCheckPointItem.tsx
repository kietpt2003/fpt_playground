import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../constants/colors'
import { DailyCheckPointItemProps } from './types/dailyCheckPointTypes'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next'
import dailyCheckPointItemStyleSheet from './styles/dailyCheckPointItemStyleSheet'

type DailyCheckPointComponentProps = {
    isFetching: boolean
    item: DailyCheckPointItemProps
    handleCheckin: (dailyCheckpointId: string) => Promise<void>
}

export default function DailyCheckPointItem({ item, isFetching, handleCheckin }: DailyCheckPointComponentProps) {
    const { t } = useTranslation();

    return (
        <TouchableOpacity
            style={dailyCheckPointItemStyleSheet.checkPointItemContainer}
            disabled={isFetching || item.status === "Checked" || item.dayStatus !== "Today"}
            touchSoundDisabled={true}
            onPress={() => {
                handleCheckin(item.id);
            }}
        >
            <LinearGradient
                colors={[colors.lightYellow, colors.darkYellow]} // Hiệu ứng chuyển màu
                style={dailyCheckPointItemStyleSheet.checkPointItemBgLinear}
            />

            <View style={dailyCheckPointItemStyleSheet.dateItemContainer}>
                <LinearGradient
                    colors={[colors.icyWhite, colors.white]} // Hiệu ứng chuyển màu
                    style={dailyCheckPointItemStyleSheet.dateItemContainerLinear}
                />
                <Text style={dailyCheckPointItemStyleSheet.dateItemTxt}>
                    {item.date}
                </Text>
            </View>

            {/* Hết hạn ở quá khứ */}
            {
                (item.dayStatus !== "Future" && item.dayStatus !== "Today" && item.status === "Unchecked") &&
                <View style={dailyCheckPointItemStyleSheet.notCheckedContainer}>
                    <Text style={dailyCheckPointItemStyleSheet.notCheckedTxt}>
                        {t("daily-expired")}
                    </Text>
                </View>
            }

            {/* Đã nhận ở quá khứ và hiện tại */}
            {
                (item.dayStatus !== "Future" && item.status === "Checked") &&
                <View style={dailyCheckPointItemStyleSheet.checkedContainer}>
                    <Text style={dailyCheckPointItemStyleSheet.checkedTxt}>
                        {t("daily-checked")}
                    </Text>
                </View>
            }

            {/* Tương lai thì khóa */}
            {
                (item.dayStatus !== "Today") &&
                <View style={dailyCheckPointItemStyleSheet.lockContainer}>
                    {
                        (item.dayStatus === "Future") &&
                        <MaterialCommunityIcons name="lock" size={50} color={colors.brown} />
                    }
                </View>
            }

            <Image
                source={require("../../assets/images/ptk-coin.png")}
                style={dailyCheckPointItemStyleSheet.coinImage}
            />
            <Text style={
                [
                    dailyCheckPointItemStyleSheet.valueTxt,
                    {
                        color: colors.black,
                    }
                ]
            }>
                +{item.coinValue} {t("coin")}
            </Text>
        </TouchableOpacity>
    )
}