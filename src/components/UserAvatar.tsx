import { View, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors';
import { UserAvatarProps } from './types/userAvatarTypes';

export default function UserAvatar({
    avatarUrl,
    imageWidth,
    imageHeight,
    imageBorderRadius,
    imageBorderWidth,
    imageBorderColor,
    loadingIndicatorSize
}: UserAvatarProps) {
    const [isLoadAva, setLoadAva] = useState(false);

    return (
        <View>
            <Image
                source={avatarUrl ?
                    {
                        uri: avatarUrl,
                    } : require("../../assets/images/user-default-ava.jpg")}
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    borderRadius: imageBorderRadius,
                    borderWidth: imageBorderWidth,
                    borderColor: imageBorderColor,
                    opacity: isLoadAva ? 0 : 1
                }}
                onLoadStart={() => {
                    setLoadAva(true)
                }}
                onLoadEnd={() => {
                    setLoadAva(false)
                }}
            />
            {
                isLoadAva &&
                <View style={{
                    width: imageWidth,
                    height: imageHeight,
                    borderRadius: imageBorderRadius,
                    borderWidth: imageBorderWidth,
                    borderColor: imageBorderColor,
                    position: "absolute",
                    left: 0,
                }}>
                    <Image
                        source={require("../../assets/images/user-default-ava.jpg")}
                        style={{
                            width: imageWidth,
                            height: imageHeight,
                            borderRadius: imageBorderRadius,
                            opacity: 0.7
                        }}
                    />
                    <ActivityIndicator
                        color={colors.blurBlack}
                        style={{
                            position: "absolute",
                            right: 0,
                            left: 0,
                            top: 0,
                            bottom: 0
                        }}
                        size={loadingIndicatorSize}
                    />
                </View>
            }
        </View>
    )
}