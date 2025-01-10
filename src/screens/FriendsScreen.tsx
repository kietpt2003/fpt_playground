import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { User } from '../constants/entities/User'
import friendsScreenStyleSheet from './styles/friendsScreenStyleSheet'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { colors } from '../constants/colors'
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function FriendsScreen() {
    const user: User = {
        id: "abc",
        gender: "Male",
        name: "Tuan Kiet",
        imageUrl: "https://picsum.photos/id/237/200"
    }
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { t } = useTranslation();

    const [isHaveNoti, setIsHaveNoti] = useState(true);

    return (
        <View style={friendsScreenStyleSheet.container}>
            {/* Header */}
            <View style={friendsScreenStyleSheet.headerContainer}>
                <LinearGradient
                    colors={theme === "dark" ? [colors.lightBlue, colors.darkBlue] : [colors.milkyWhite, colors.mediumOrange]} // Hiệu ứng chuyển màu
                    style={friendsScreenStyleSheet.headerContainerLinear}
                />

                <View style={friendsScreenStyleSheet.headerTopContainer}>
                    <View style={friendsScreenStyleSheet.imageContainer}>
                        <Image
                            source={{
                                uri: user.imageUrl
                            }}
                            style={friendsScreenStyleSheet.userImage}
                        />
                        {
                            isHaveNoti &&
                            <View style={friendsScreenStyleSheet.notiDot} />
                        }
                    </View>
                    <Text style={[
                        friendsScreenStyleSheet.headerTitle,
                        {
                            color: theme === "dark" ? colors.white : colors.black
                        }
                    ]}>
                        {t("chat-title-header")}
                    </Text>
                </View>

                <View style={friendsScreenStyleSheet.searhContainer}>
                    <LinearGradient
                        colors={[colors.icyWhite, colors.white]} // Hiệu ứng chuyển màu
                        style={friendsScreenStyleSheet.searhContainerLinear}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    />
                    <FontAwesome
                        name={"search"}
                        size={22}
                        color={colors.blurBlack}
                        style={friendsScreenStyleSheet.searchIcon}
                    />

                    <TextInput
                        style={friendsScreenStyleSheet.searchInput}
                        placeholder={t("search-friend-placeholder")}
                    />
                </View>
            </View>
        </View>
    )
}