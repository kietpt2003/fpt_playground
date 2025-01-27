import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import confirmModalStyleSheet from "./styles/confirmModalStyleSheet";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import useClick from "../hooks/useClick";
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { ConfirmModalProps } from "./types/confirmModalTypes";

export default function ConfirmModal({ stringConfirm, isConfirm, setIsConfirm, handleConfirmFunction }: ConfirmModalProps) {
    const { playSound } = useClick();

    return (
        <Modal
            isVisible={isConfirm}
            onBackdropPress={() => setIsConfirm(false)}
            style={confirmModalStyleSheet.modalContainer}
        >
            <View
                style={confirmModalStyleSheet.container}
            >
                <LinearGradient
                    colors={[colors.icyWhite, colors.milkyWhite]} // Hiệu ứng chuyển màu
                    style={confirmModalStyleSheet.containerLinear}
                >
                    <Text
                        style={confirmModalStyleSheet.confirmTxt}
                    >
                        {stringConfirm}
                    </Text>

                    <View style={confirmModalStyleSheet.functionContainer}>
                        {/* Cancel */}
                        <TouchableOpacity
                            style={[
                                confirmModalStyleSheet.closeBtnContainer,
                                {
                                    backgroundColor: colors.disapprove
                                }
                            ]}
                            onPress={() => {
                                playSound();
                                setIsConfirm(false);
                            }}
                            touchSoundDisabled={true}
                        >
                            <FontAwesome name="close" size={20} color={colors.white} />
                        </TouchableOpacity>

                        {/* Yes */}
                        <TouchableOpacity
                            style={[
                                confirmModalStyleSheet.closeBtnContainer,
                                {
                                    backgroundColor: colors.approve
                                }
                            ]}
                            onPress={() => {
                                playSound();
                                setIsConfirm(false);
                                handleConfirmFunction();
                            }}
                            touchSoundDisabled={true}
                        >
                            <Entypo name="check" size={22} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </Modal >
    );
};
