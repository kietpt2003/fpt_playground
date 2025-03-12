import { View, Text, Animated, TouchableOpacity } from 'react-native'
import React from 'react'
import { FriendChatDetailNavigationProp } from './types/friendItemTypes'
import UserAvatar from './UserAvatar'
import { formatDistanceToNowStrict } from 'date-fns';
import { vi, enUS } from "date-fns/locale";
import { useTranslation } from 'react-i18next'
import friendItemStyleSheet from './styles/friendItemStyleSheet'
import { useNavigation } from '@react-navigation/native'
import { UserConversationResponse } from '../constants/models/conversations/UserConversationResponse';

export interface FriendItemData {
    item: UserConversationResponse;
}

export interface FriendItemProps extends FriendItemData {
    opacity: Animated.AnimatedInterpolation<string | number>;
    AVATAR_SIZE: number;
    scale: Animated.AnimatedInterpolation<string | number>;
}


export default function FriendItem({ item, opacity, AVATAR_SIZE, scale }: FriendItemProps) {
    const { t, i18n } = useTranslation();

    const navigation = useNavigation<FriendChatDetailNavigationProp>();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("FriendChatDetail", {
                    userMasked: item.usermasked,
                    friend: item.friend,
                    conversationId: item.id
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
                    avatarUrl={item.friend ? item.friend.avatarUrl : item.usermasked ? item.usermasked.avatarUrl : undefined}
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
                        {item.friend ? item.friend.name : item.usermasked ? item.usermasked.maskedName : "Default User"}
                    </Text>
                    <View style={friendItemStyleSheet.contentContainer}>
                        {
                            item.firstMessage ?
                                <>
                                    <Text
                                        style={[
                                            friendItemStyleSheet.contentTxt,
                                            {
                                                fontFamily: item.firstMessage.isRead ? "RobotoBold" : "RobotoLight"
                                            }
                                        ]}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {item.firstMessage.content}
                                    </Text>
                                    <Text
                                        style={friendItemStyleSheet.dateTxt}
                                    >
                                        {formatDistanceToNowStrict(item.firstMessage.createdAt, {
                                            addSuffix: true,
                                            locale: i18n.language === "vi" ? vi : enUS,
                                        })}
                                    </Text>
                                </> :
                                <>
                                    <Text
                                        style={[
                                            friendItemStyleSheet.contentTxt,
                                            {
                                                fontFamily: "RobotoLight"
                                            }
                                        ]}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {t("friend-first-msg")}
                                    </Text>
                                </>
                        }
                    </View>
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
}