import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text } from 'react-native';
import { IMessage } from 'react-native-gifted-chat';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { colors } from '../constants/colors';
import { useTranslation } from 'react-i18next';

type ReplyMessageBarProps = {
    clearReply: () => void;
    message: IMessage | null;
};

const ReplyMessageBar = ({ clearReply, message }: ReplyMessageBarProps) => {
    const { t } = useTranslation();

    return (
        <>
            {message !== null && (
                <Animated.View
                    style={{ height: 50, flexDirection: 'row', backgroundColor: colors.chatBox }}
                    entering={FadeInDown}
                    exiting={FadeOutDown}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text
                            style={{
                                color: colors.black,
                                paddingLeft: 10,
                                paddingTop: 5,
                                fontSize: 15,
                                fontFamily: "RobotoMedium"
                            }}>
                            {message?.user.name == "You" ? t("reply-yourself") : `${t("reply")}${message?.user.name}`}
                        </Text>
                        <Text style={{ color: colors.grey, paddingLeft: 10, paddingTop: 5, fontFamily: "Roboto" }}>
                            {message!.text.length > 40 ? message?.text.substring(0, 40) + '...' : message?.text}
                        </Text>
                    </View>
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10 }}>
                        <TouchableOpacity onPress={clearReply}>
                            <Ionicons name="close-circle-outline" color={colors.lighterOrange} size={28} />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
        </>
    );
};

export default ReplyMessageBar;