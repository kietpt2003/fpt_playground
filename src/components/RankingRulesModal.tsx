import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import LottieView from "lottie-react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import useClick from "../hooks/useClick";
import { FontAwesome } from '@expo/vector-icons';
import { ScreenHeight } from "@rneui/base";
import { RankingRulesModalProps } from "./types/rankingRulesModalTypes";
import rankingRulesModalStyleSheet from "./styles/rankingRulesModalStyleSheet";
import { useTranslation } from "react-i18next";

export default function RankingRulesModal({ isOpenRules, setOpenRules }: RankingRulesModalProps) {
    const { t } = useTranslation();

    const theme = useSelector((state: RootState) => state.theme.theme);
    const { playSound } = useClick();

    const scrollRef = useRef<ScrollView>(null);
    const scrollY = useRef(new Animated.Value(0)).current;
    const [contentHeight, setContentHeight] = useState(0);

    const viewportHeight = ScreenHeight / 2 - ScreenHeight / 25 - 40 - 10; // Chiều cao viewport (chiều cao modal)

    const handleContentSizeChange = (width: number, height: number) => {
        setContentHeight(height); // Cập nhật chiều cao nội dung
    };

    const handleCloseModal = () => {
        playSound();
        setOpenRules(false); // Đóng modal
        scrollRef.current?.scrollTo({ y: 0, animated: false }); // Reset vị trí scroll
    };

    // Tính chiều cao thanh cuộn
    const scrollbarHeight =
        contentHeight > viewportHeight ? (viewportHeight / contentHeight) * viewportHeight : viewportHeight;

    // Tính vị trí của thanh cuộn
    const translateY = scrollY.interpolate({
        inputRange: [0, Math.max(0, contentHeight - viewportHeight)],
        outputRange: [0, viewportHeight - scrollbarHeight],
        extrapolate: 'clamp',
    });

    return (
        <Modal
            isVisible={isOpenRules}
            onBackdropPress={handleCloseModal}
            style={rankingRulesModalStyleSheet.modalContainer}
        >
            <View
                style={rankingRulesModalStyleSheet.container}
            >
                <View style={rankingRulesModalStyleSheet.headerContainer}>
                    <Text style={[
                        rankingRulesModalStyleSheet.rankingRulesTitle,
                        {
                            color: theme === "dark" ? colors.darkBlue : colors.darkOrange
                        }
                    ]}>
                        {t("ranking-rules-title")}
                    </Text>

                    <TouchableOpacity
                        style={rankingRulesModalStyleSheet.closeBtnContainer}
                        onPress={handleCloseModal}
                        touchSoundDisabled={true}
                    >
                        <LinearGradient
                            colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={rankingRulesModalStyleSheet.closeBtnLinear}
                        />
                        <FontAwesome name="close" size={24} color={colors.white} />
                    </TouchableOpacity>
                </View>

                {/* Custom Scroll Indicator */}
                {contentHeight > viewportHeight && (
                    <View style={rankingRulesModalStyleSheet.indicatorContainer}>
                        <Animated.View
                            style={[
                                rankingRulesModalStyleSheet.indicator,
                                {
                                    height: scrollbarHeight,
                                    transform: [{ translateY }],
                                },
                            ]}
                        >
                            <LinearGradient
                                colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                                style={rankingRulesModalStyleSheet.indicatorLinear}
                            />
                        </Animated.View>
                    </View>
                )}

                <ScrollView
                    ref={scrollRef}
                    showsVerticalScrollIndicator={false} // Tắt scroll indicator mặc định
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                    onContentSizeChange={handleContentSizeChange}
                    scrollEventThrottle={16}
                    contentContainerStyle={{
                        paddingRight: 10,
                    }}
                >
                    {/* Top 100 SV */}
                    <Text style={[
                        rankingRulesModalStyleSheet.rulesHeader,
                        {
                            color: theme === "dark" ? colors.darkBlue : colors.darkOrange
                        }
                    ]}>
                        {t("ranking-rules-header1")}
                    </Text>

                    {/* Top 100 SV - Rule 1 */}
                    <>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesSubHeader,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.darkOrange
                            }
                        ]}>
                            {t("ranking-rules-subheader1-1")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-1-1-1")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-1-1-2")}
                        </Text>
                    </>

                    {/* Top 100 SV - Rule 2 */}
                    <>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesSubHeader,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.darkOrange
                            }
                        ]}>
                            {t("ranking-rules-subheader1-2")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-1-2-1")}
                        </Text>
                    </>

                    {/* Top 100 SV - Rule 3 */}
                    <>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesSubHeader,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.darkOrange
                            }
                        ]}>
                            {t("ranking-rules-subheader1-3")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-1-3-1")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-1-3-2")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-1-3-3")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-1-3-4")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-1-3-5")}
                        </Text>
                    </>

                    {/* Top 100 Group */}
                    <Text style={[
                        rankingRulesModalStyleSheet.rulesHeader,
                        {
                            color: theme === "dark" ? colors.darkBlue : colors.darkOrange
                        }
                    ]}>
                        {t("ranking-rules-header2")}
                    </Text>

                    {/* Top 100 Group - Rule 1 */}
                    <>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesSubHeader,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.darkOrange
                            }
                        ]}>
                            {t("ranking-rules-subheader2-1")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-2-1-1")}
                        </Text>
                    </>

                    {/* Top 100 Group - Rule 2 */}
                    <>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesSubHeader,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.darkOrange
                            }
                        ]}>
                            {t("ranking-rules-subheader2-2")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-2-2-1")}
                        </Text>
                    </>

                    {/* Top 100 Group - Rule 3 */}
                    <>
                        <Text style={[rankingRulesModalStyleSheet.rulesSubHeader,
                        {
                            color: theme === "dark" ? colors.darkBlue : colors.darkOrange
                        }
                        ]}>
                            {t("ranking-rules-subheader2-3")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-2-3-1")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-2-3-2")}
                        </Text>
                    </>

                    {/* Top 100 Group - Rule 4 */}
                    <>
                        <Text style={[rankingRulesModalStyleSheet.rulesSubHeader,
                        {
                            color: theme === "dark" ? colors.darkBlue : colors.darkOrange
                        }
                        ]}>
                            {t("ranking-rules-subheader2-4")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-2-4-1")}
                        </Text>
                        {/* Sub content */}
                        <>
                            <Text style={[
                                rankingRulesModalStyleSheet.rulesSubContent,
                                {
                                    color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                                }
                            ]}>
                                {t("ranking-rules-subcontent-2-4-1-1")}
                            </Text>
                            <Text style={[
                                rankingRulesModalStyleSheet.rulesSubContent,
                                {
                                    color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                                }
                            ]}>
                                {t("ranking-rules-subcontent-2-4-1-2")}
                            </Text>
                        </>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-2-4-2")}
                        </Text>
                        {/* Sub content */}
                        <>
                            <Text style={[
                                rankingRulesModalStyleSheet.rulesSubContent,
                                {
                                    color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                                }
                            ]}>
                                {t("ranking-rules-subcontent-2-4-2-1")}
                            </Text>
                            <Text style={[
                                rankingRulesModalStyleSheet.rulesSubContent,
                                {
                                    color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                                }
                            ]}>
                                {t("ranking-rules-subcontent-2-4-2-2")}
                            </Text>
                        </>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-2-4-3")}
                        </Text>
                        {/* Sub content */}
                        <>
                            <Text style={[
                                rankingRulesModalStyleSheet.rulesSubContent,
                                {
                                    color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                                }
                            ]}>
                                {t("ranking-rules-subcontent-2-4-3-1")}
                            </Text>
                            <Text style={[
                                rankingRulesModalStyleSheet.rulesSubContent,
                                {
                                    color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                                }
                            ]}>
                                {t("ranking-rules-subcontent-2-4-3-2")}
                            </Text>
                        </>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-2-4-4")}
                        </Text>
                        {/* Sub content */}
                        <>
                            <Text style={[
                                rankingRulesModalStyleSheet.rulesSubContent,
                                {
                                    color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                                }
                            ]}>
                                {t("ranking-rules-subcontent-2-4-4-1")}
                            </Text>
                            <Text style={[
                                rankingRulesModalStyleSheet.rulesSubContent,
                                {
                                    color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                                }
                            ]}>
                                {t("ranking-rules-subcontent-2-4-4-2")}
                            </Text>
                        </>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-2-4-5")}
                        </Text>
                        {/* Sub content */}
                        <>
                            <Text style={[
                                rankingRulesModalStyleSheet.rulesSubContent,
                                {
                                    color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                                }
                            ]}>
                                {t("ranking-rules-subcontent-2-4-5-1")}
                            </Text>
                            <Text style={[
                                rankingRulesModalStyleSheet.rulesSubContent,
                                {
                                    color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                                }
                            ]}>
                                {t("ranking-rules-subcontent-2-4-5-2")}
                            </Text>
                        </>
                    </>

                    {/* Notice */}
                    <Text style={[rankingRulesModalStyleSheet.rulesHeader,
                    {
                        color: theme === "dark" ? colors.darkBlue : colors.darkOrange
                    }
                    ]}>
                        {t("ranking-rules-header3")}
                    </Text>

                    {/* Notice - Content */}
                    <>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-3")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-3-1")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-3-2")}
                        </Text>
                        <Text style={[
                            rankingRulesModalStyleSheet.rulesContent,
                            {
                                color: theme === "dark" ? colors.darkBlue : colors.lightOrange
                            }
                        ]}>
                            {t("ranking-rules-content-3-3")}
                        </Text>
                    </>
                </ScrollView>
            </View>
        </Modal>
    );
};
