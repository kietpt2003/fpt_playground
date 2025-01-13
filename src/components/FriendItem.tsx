import { View, Text, Animated, TouchableOpacity } from 'react-native'
import React from 'react'
import { FriendChatDetailNavigationProp, FriendItemProps } from './types/friendItemTypes'
import UserAvatar from './UserAvatar'
import { formatDistanceToNowStrict } from 'date-fns';
import { vi, enUS } from "date-fns/locale";
import { useTranslation } from 'react-i18next'
import friendItemStyleSheet from './styles/friendItemStyleSheet'
import { useNavigation } from '@react-navigation/native'

export default function FriendItem({ item, opacity, AVATAR_SIZE, scale }: FriendItemProps) {
    const { i18n } = useTranslation();

    const navigation = useNavigation<FriendChatDetailNavigationProp>();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("FriendChatDetail", {
                    senderId: item.sender.id,
                    receiverId: item.receiver.id
                });
            }}
            touchSoundDisabled={true}
        >
            <Animated.View style={[
                friendItemStyleSheet.container,
                {
                    transform: [{ scale }],
                    opacity
                }
            ]}>
                <UserAvatar
                    avatarUrl={item.sender.imageUrl}
                    imageBorderWidth={0}
                    imageWidth={AVATAR_SIZE}
                    imageHeight={AVATAR_SIZE}
                    loadingIndicatorSize={AVATAR_SIZE / 3}
                    imageBorderRadius={AVATAR_SIZE}
                    imageBorderColor={undefined}
                />

                <View>
                    <Text
                        style={friendItemStyleSheet.username}
                        numberOfLines={1}
                    >
                        {item.sender.name}
                    </Text>
                    <View style={friendItemStyleSheet.contentContainer}>
                        <Text
                            style={[
                                friendItemStyleSheet.contentTxt,
                                {
                                    fontFamily: item.status !== "Read" ? "RobotoBold" : "RobotoLight"
                                }
                            ]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {item.content}
                        </Text>
                        <Text
                            style={friendItemStyleSheet.dateTxt}
                        >
                            {formatDistanceToNowStrict(item.createdAt, {
                                addSuffix: true,
                                locale: i18n.language === "vi" ? vi : enUS,
                            })}
                        </Text>
                    </View>
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
}