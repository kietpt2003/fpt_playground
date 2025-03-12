import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next'
import checkPointItemStyleSheet from './styles/checkPointItemStyleSheet'
import { DailyCheckPointItemProps } from './types/dailyCheckPointTypes';

export type CheckPointItemProps = {
    isFetching: boolean
    item: DailyCheckPointItemProps
    handleCheckin: (dailyCheckpointId: string) => Promise<void>
};

export default function CheckPointItem({ item, isFetching, handleCheckin }: CheckPointItemProps) {
    const { t } = useTranslation();

    return (
        <View>
            <TouchableOpacity
                style={checkPointItemStyleSheet.checkPointItemContainer}
                disabled={isFetching || item.status === "Checked" || item.dayStatus !== "Today"}
                touchSoundDisabled={true}
                onPress={() => {
                    handleCheckin(item.id);
                }}
            >
                <LinearGradient
                    colors={[colors.lightYellow, colors.darkYellow]} // Hiệu ứng chuyển màu
                    style={checkPointItemStyleSheet.checkPointItemBgLinear}
                />

                {/* Hết hạn ở quá khứ */}
                {
                    (item.dayStatus !== "Future" && item.dayStatus !== "Today" && item.status === "Unchecked") &&
                    <View style={checkPointItemStyleSheet.notCheckedContainer}>
                        <Text
                            style={checkPointItemStyleSheet.notCheckedTxt}
                            numberOfLines={1}
                        >
                            {t("daily-expired")}
                        </Text>
                    </View>
                }

                {/* Đã nhận ở quá khứ và hiện tại */}
                {
                    (item.dayStatus !== "Future" && item.status === "Checked") &&
                    <View style={checkPointItemStyleSheet.checkedContainer}>
                        <Text
                            style={checkPointItemStyleSheet.checkedTxt}
                            numberOfLines={1}
                        >
                            {t("daily-checked")}
                        </Text>
                    </View>
                }

                {/* Tương lai thì khóa */}
                {
                    (item.dayStatus !== "Today") &&
                    <View style={checkPointItemStyleSheet.lockContainer}>
                        {
                            (item.dayStatus === "Future") &&
                            <MaterialCommunityIcons name="lock" size={45} color={colors.brown} />
                        }
                    </View>
                }

                <Image
                    source={require("../../assets/images/ptk-coin.png")}
                    style={checkPointItemStyleSheet.coinImage}
                />
                <Text style={
                    [
                        checkPointItemStyleSheet.valueTxt,
                        {
                            color: colors.black,
                        }
                    ]
                }>
                    {item?.coinValue ? `+${item?.coinValue}` : "???"}
                </Text>
            </TouchableOpacity>
            <View style={checkPointItemStyleSheet.dateItemContainer}>
                <Text
                    style={checkPointItemStyleSheet.dateItemTxt}
                    numberOfLines={1}
                >
                    {item.date}
                </Text>
            </View>
        </View>
    )
}