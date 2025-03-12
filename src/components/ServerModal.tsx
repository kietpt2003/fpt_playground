import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Modal from "react-native-modal";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { useTranslation } from "react-i18next";
import { ServerResponse } from "../constants/models/users/ServerResponse";

export type ServerModalProps = {
    selectedServer: ServerResponse | null;
    openChooseServer: boolean;
    setOpenChooseServer: Dispatch<SetStateAction<boolean>>;
    servers: ServerResponse[];
    handleChangeServer: (server: ServerResponse) => void;
}

export default function ServerModal({ selectedServer, openChooseServer, setOpenChooseServer, servers, handleChangeServer }: ServerModalProps) {
    const { t } = useTranslation();

    const reduxTheme = useSelector((state: RootState) => state.theme.theme);

    return (
        <Modal
            isVisible={openChooseServer}
            onBackdropPress={() => setOpenChooseServer(false)}
            onSwipeComplete={() => setOpenChooseServer(false)}
            useNativeDriverForBackdrop
            swipeDirection={"down"}
            propagateSwipe={true}
            style={{
                justifyContent: 'flex-end',
                margin: 0,
            }}
        >
            <View>
                <View style={styles.modalContent}>
                    {/* Thanh hồng trên cùng */}
                    <LinearGradient
                        colors={reduxTheme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                        style={styles.header}
                    />

                    <View style={styles.serversContainer}>
                        <FlatList<ServerResponse>
                            data={servers}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <Pressable
                                    style={styles.modalOption}
                                    onPress={() => {
                                        handleChangeServer(item);
                                        setOpenChooseServer(false);
                                    }}
                                >
                                    <View style={styles.modalLeft}>
                                        <LinearGradient
                                            colors={servers[0].state == "Solitary" ? [colors.darkGreen, colors.lightGreen] :
                                                servers[0].state == "Medium" ? [colors.darkYellow, colors.lightYellow] :
                                                    [colors.darkRed, colors.lightRed]}
                                            style={styles.serverStatus}
                                        />
                                        <Text style={styles.modalOptionText}>{t("server")}
                                            <Text style={styles.serverNameTxt}>
                                                {item.name}
                                            </Text>
                                            <Text style={styles.serverStateTxt}> - {servers[0].state == "Solitary" ? t("state-solitary") :
                                                servers[0].state == "Medium" ? t("state-medium") :
                                                    t("state-full")}</Text>
                                        </Text>
                                    </View>
                                    {(selectedServer?.name == item.name) ? (
                                        <MaterialCommunityIcons name="check-circle" size={24} color={reduxTheme === "dark" ? colors.darkBlue : colors.darkOrange} />
                                    ) : (
                                        <MaterialCommunityIcons
                                            name="checkbox-blank-circle-outline"
                                            size={24}
                                            color={reduxTheme === "dark" ? colors.darkBlue : colors.darkOrange}
                                        />
                                    )}
                                </Pressable>
                            )}
                            onEndReachedThreshold={0.5}
                            showsVerticalScrollIndicator={false}
                            initialNumToRender={10}
                            windowSize={5}
                            removeClippedSubviews
                        // ListFooterComponent={<View />}
                        // ListFooterComponentStyle={rankingStyleSheet.faltListFooterStyle}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    header: {
        width: ScreenWidth / 7,
        height: ScreenHeight / 80,
        borderRadius: 30,
        alignSelf: "center",
        margin: 12
    },
    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    serversContainer: {
        height: 250,
        width: ScreenWidth
    },
    modalOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    modalLeft: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    serverStatus: {
        width: 12,
        height: 12,
        borderRadius: 30
    },
    serverNameTxt: {
        fontSize: 16,
        textAlignVertical: "center",
        fontFamily: "Roboto",
    },
    serverStateTxt: {
        fontSize: 16,
        textAlignVertical: "center",
        fontFamily: "Roboto"
    },
    modalOptionText: {
        fontSize: 16,
        textAlignVertical: "center",
        fontFamily: "RobotoMedium",
    },
});