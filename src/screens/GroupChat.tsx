import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import groupChatStyleSheet from './styles/groupChatStyleSheet';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import SlotList from '../components/SlotList';
import { SlotItemType } from '../components/types/slotItemTypes';
import HeaderLeft from '../components/HeaderLeft';
import GroupChatFilters from '../components/GroupChatFilters';
import { useRoute } from '@react-navigation/native';
import { GroupChatRouteProp } from './types/groupChatTypes';
import useClick from '../hooks/useClick';
import { ScreenWidth } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroupChat() {
    const route = useRoute<GroupChatRouteProp>();
    const params = route.params;

    const theme = useSelector((state: RootState) => state.theme.theme);
    const [page, setPage] = useState<number>(1);

    const { playSound } = useClick();

    const [data, setData] = useState<SlotItemType[]>([
        {
            index: 1
        },
        {
            id: "1",
            groupName: "Trai F",
            imageUrl: "https://picsum.photos/id/237/200",
            status: "Active",
            index: 2
        },
        {
            index: 3
        },
        {
            id: "2",
            groupName: "KTPM",
            imageUrl: "https://picsum.photos/id/236/200",
            status: "Active",
            index: 4
        },
        {
            index: 5
        },
        {
            id: "3",
            groupName: "Gay nè",
            imageUrl: "https://picsum.photos/id/238/200",
            status: "Active",
            index: 6
        },
        {
            id: "4",
            groupName: "Boy phố",
            imageUrl: "https://picsum.photos/id/247/200",
            status: "Active",
            index: 7
        },
        {
            id: "5",
            groupName: "FU",
            imageUrl: "https://picsum.photos/id/227/200",
            status: "Active",
            index: 8
        },
        {
            id: "6",
            groupName: "Hello",
            imageUrl: "https://picsum.photos/id/230/200",
            status: "Active",
            index: 9
        },
    ]);

    return (
        <SafeAreaView>
            <View style={groupChatStyleSheet.container}>
                <LinearGradient
                    colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.milkyWhite, colors.icyWhite]} // Hiệu ứng chuyển màu
                    style={groupChatStyleSheet.containerLinear}
                />

                <ImageBackground
                    source={
                        theme === "dark" ?
                            require('../../assets/images/home-dark-header.webp') :
                            require('../../assets/images/home-light-header.webp')
                    }
                    style={groupChatStyleSheet.backgroundImage}
                >
                </ImageBackground>

                {/* Header left */}
                <HeaderLeft />

                {/* Header right */}
                <TouchableOpacity
                    style={groupChatStyleSheet.headerRightNoti}
                    onPress={() => {
                        playSound();
                    }}
                    touchSoundDisabled={true}
                >
                    <LinearGradient
                        colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                        style={groupChatStyleSheet.headerRightIconLinear}
                    />
                    <FontAwesome5
                        name="question"
                        size={20}
                        color={colors.white}
                    />
                </TouchableOpacity>

                <GroupChatFilters firstFilter={params.firstFilter} />

                <View style={groupChatStyleSheet.slotContainer}>
                    <LinearGradient
                        colors={[colors.icyWhite, colors.white]} // Hiệu ứng chuyển màu
                        style={groupChatStyleSheet.slotContainerLinear}
                    />
                    <View style={groupChatStyleSheet.paginationContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                if (page == 1) {
                                    setPage(100);
                                } else {
                                    setPage((current) => current - 1);
                                }
                            }}
                            touchSoundDisabled={true}
                        >
                            <FontAwesome
                                name="chevron-left"
                                size={ScreenWidth > 350 ? 26 : 20}
                                color={theme === "dark" ? colors.darkBlue : colors.darkOrange}
                            />
                        </TouchableOpacity>

                        <Text style={[
                            groupChatStyleSheet.paginationTxt,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.darkOrange
                            }
                        ]}>Trang {page}</Text>

                        <TouchableOpacity
                            onPress={() => {
                                if (page == 100) {
                                    setPage(1);
                                } else {
                                    setPage((current) => current + 1);
                                }
                            }}
                            touchSoundDisabled={true}
                        >
                            <FontAwesome
                                name="chevron-right"
                                size={ScreenWidth > 350 ? 26 : 20}
                                color={theme === "dark" ? colors.darkBlue : colors.darkOrange}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={groupChatStyleSheet.subSlotContainer}>
                        <SlotList
                            data={data}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}