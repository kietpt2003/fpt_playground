import { View, Text, Animated, Image } from 'react-native'
import React from 'react'
import { FriendItemProps } from './types/friendItemTypes'
import { colors } from '../constants/colors'

export default function FriendItem({ item, SPACING, opacity, AVATAR_SIZE, scale }: FriendItemProps) {
    return (
        <Animated.View style={{
            flexDirection: "row",
            padding: SPACING,
            marginBottom: SPACING,
            borderRadius: 12,
            backgroundColor: colors.blurWhite,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 10
            },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            transform: [{ scale }],
            opacity
        }}>
            <Image
                source={{ uri: item.sender.imageUrl }}
                style={{
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE,
                    marginRight: SPACING,

                }}
            />

            <View>
                <Text style={{
                    fontSize: 22,
                    fontWeight: "700",
                    fontFamily: "Roboto"
                }}>{item.sender.name}</Text>
                <Text
                    style={{
                        fontSize: 18,
                        opacity: .7,
                    }}
                    numberOfLines={1}
                >
                    {item.content}
                </Text>
            </View>
        </Animated.View>
    )
}