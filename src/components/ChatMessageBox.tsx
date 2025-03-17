import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { IMessage, Message, MessageProps } from 'react-native-gifted-chat';
import { isSameDay, isSameUser } from 'react-native-gifted-chat/lib/utils';
import { colors } from '../constants/colors';

type ChatMessageBoxProps = {
    setReplyOnSwipeOpen: (message: IMessage) => void;
    updateRowRef: (ref: any) => void;

} & MessageProps<IMessage>;

const ChatMessageBox = ({ setReplyOnSwipeOpen, updateRowRef, ...props }: ChatMessageBoxProps) => {
    const isNextMyMessage =
        props.currentMessage &&
        props.nextMessage &&
        isSameUser(props.currentMessage, props.nextMessage) &&
        isSameDay(props.currentMessage, props.nextMessage);

    const renderLeftAction = (progressAnimatedValue: Animated.AnimatedInterpolation<any>) => {
        const size = progressAnimatedValue.interpolate({
            inputRange: [0, 1, 100],
            outputRange: [0, 1, 1],
        });
        const trans = progressAnimatedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, 12, 20],
        });

        return (
            <Animated.View
                style={[
                    styles.container,
                    { transform: [{ scale: size }, { translateX: trans }] },
                    isNextMyMessage ? styles.defaultBottomOffset : styles.bottomOffsetNext,
                    props.position === 'left' && styles.rightOffsetValue,
                ]}>
                <View style={styles.replyImageWrapper}>
                    <MaterialCommunityIcons name="reply-circle" size={26} color={colors.grey} />
                </View>
            </Animated.View>
        );
    };

    const renderRightAction = (progressAnimatedValue: Animated.AnimatedInterpolation<any>) => {
        const size = progressAnimatedValue.interpolate({
            inputRange: [0, 1, 100],
            outputRange: [0, 1, 1],
        });
        const trans = progressAnimatedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, -12, -20],
        });

        return (
            <Animated.View
                style={[
                    styles.container,
                    { transform: [{ scale: size }, { translateX: trans }] },
                    isNextMyMessage ? styles.defaultBottomOffset : styles.bottomOffsetNext,
                    props.position === 'right' && styles.leftOffsetValue,
                ]}>
                <View style={styles.replyImageWrapper}>
                    <MaterialCommunityIcons name="reply-circle" size={26} color={colors.grey} />
                </View>
            </Animated.View>
        );
    };

    const onSwipeOpenAction = () => {
        if (props.currentMessage) {
            setReplyOnSwipeOpen({ ...props.currentMessage });
        }
    };

    return (
        <GestureHandlerRootView>
            <Swipeable
                ref={updateRowRef}
                friction={1}
                rightThreshold={40}
                leftThreshold={40}
                renderLeftActions={props.currentMessage.user.name != "You" ? renderLeftAction : undefined}
                renderRightActions={props.currentMessage.user.name == "You" ? renderRightAction : undefined}
                onSwipeableWillOpen={onSwipeOpenAction}>
                <Message {...props} />
            </Swipeable>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 40,
    },
    replyImageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    replyImage: {
        width: 20,
        height: 20,
    },
    defaultBottomOffset: {
        marginBottom: 2,
    },
    bottomOffsetNext: {
        marginBottom: 10,
    },
    leftOffsetValue: {
        marginLeft: 16,
    },
    rightOffsetValue: {
        marginRight: 16,
    },
});

export default ChatMessageBox;