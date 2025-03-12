import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import SignatureView, { SignatureViewRef } from 'react-native-signature-canvas';
import { colors } from '../constants/colors';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import RNFS from 'react-native-fs';
import { PDFDocument } from 'pdf-lib';

interface Props {
    scrollEnabled: boolean;
    setScrollEnabled: Dispatch<SetStateAction<boolean>>;
    setStringErr: Dispatch<SetStateAction<string>>;
    setIsError: Dispatch<SetStateAction<boolean>>;
}

export default function SignView({ scrollEnabled, setScrollEnabled, setStringErr, setIsError }: Props) {
    const [signature, setSign] = useState<string | null>(null);
    const ref = useRef<SignatureViewRef>(null);
    const { t } = useTranslation();

    const imageType = "image/png";
    const extension = imageType.substring(imageType.indexOf("/") + 1);
    const imgWidth = 300;
    const imgHeight = 200;
    const style = `.m-signature-pad {box-shadow: none; border: none; } 
              .m-signature-pad--body {border: none;}
              .m-signature-pad--footer {display: none; margin: 0px;}
              body,html {
              width: ${imgWidth}px; height: ${imgHeight}px;}
              .button {
      background-color: red;
      color: #FFF;
    }`;

    // Called after ref.current.readSignature() reads a non-empty base64 string
    const handleOK = (signature: string) => {
        console.log("handle ok", signature);
        setSign(signature);
    };

    const handleConfirm = async () => {
        if (!signature) {
            Alert.alert("Lỗi", "Chưa có chữ ký để lưu!");
            return;
        }

        try {
            // Đường dẫn lưu file
            const downloadDest = `${RNFS.DownloadDirectoryPath}/testFile.${extension}`;

            const base64Data = signature.replace("data:image/png;base64,", ""); // Loại bỏ phần header base64

            // Tải file
            // await RNFS.writeFile(downloadDest, base64Data, "base64");

            const pdfPath = "/sdcard/Android/data/com.kietpt2003.fpt_playground/files/test.pdf";
            // Đọc file PDF gốc từ storage
            const existingPdfBytes = await RNFS.readFile(pdfPath, "base64");

            // Tải file PDF vào pdf-lib
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            // Lấy trang đầu tiên của PDF
            const pages = pdfDoc.getPages();
            const firstPage = pages[1];

            // Nhúng ảnh vào PDF
            const image = await pdfDoc.embedPng(base64Data); // Hỗ trợ PNG, nếu JPG dùng embedJpg()
            const { width, height } = image.scale(0.2); // Resize ảnh nếu cần

            // Vẽ ảnh lên trang PDF
            firstPage.drawImage(image, {
                x: 120, // Vị trí X (trái -> phải)
                y: height + 20, // Vị trí Y (trên -> xuống)
                width,
                height,
            });

            // Lưu file PDF mới
            const modifiedPdfBytes = await pdfDoc.saveAsBase64(); // Lưu file thành Base64

            // Định nghĩa đường dẫn lưu file mới
            const outputPdfPath = "/sdcard/Android/data/com.kietpt2003.fpt_playground/files/test1.pdf";

            // Ghi file xuống thiết bị
            await RNFS.writeFile(outputPdfPath, modifiedPdfBytes, "base64");

            console.log("PDF đã được cập nhật:", outputPdfPath);

            Alert.alert("Thành công", `Chữ ký đã được lưu tại: ${downloadDest}`);
        } catch (error) {
            console.log(error);
            setStringErr(
                "Lỗi tải xuống, vui lòng thử lại sau"
            );
            setIsError(true);
        }
    };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
        console.log("Empty");
        setStringErr(t("empty-signature"))
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        console.log("clear success!");
        setSign("");
        ref.current?.clearSignature();
    };

    // Called after end of stroke
    const handleEnd = () => {
        setScrollEnabled(true);
        ref.current?.readSignature();
    };

    // Called after ref.current.getData()
    const handleData = (data: string) => {
        console.log("handle data", data);
    };
    return (
        <>
            <View style={styles.previews}>
                {signature ? (
                    <Image
                        resizeMode={"contain"}
                        style={{ width: 335, height: 114 }}
                        source={{ uri: signature }}
                    />
                ) : null}
            </View>
            <View style={{ width: imgWidth, height: imgHeight }}>
                <SignatureView
                    onBegin={() => setScrollEnabled(false)}
                    descriptionText="Sign"
                    clearText="Clear"
                    confirmText="Save"
                    bgSrc="https://img.freepik.com/free-vector/blue-curve-background_53876-113112.jpg"
                    bgWidth={imgWidth}
                    bgHeight={imgHeight}
                    webStyle={style}
                    // overlaySrc="https://cdn.pixabay.com/photo/2017/06/08/17/43/blue-2384333_1280.png" // Note: overlay just except png
                    // overlayWidth={imgWidth}
                    // overlayHeight={imgHeight}
                    ref={ref}
                    onEnd={handleEnd}
                    onOK={handleOK}
                    onEmpty={handleEmpty}
                    // autoClear={true}
                    onGetData={handleData}
                    imageType={imageType}
                />
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            handleConfirm();
                        }}
                        touchSoundDisabled={true}
                    >
                        <LinearGradient
                            colors={!signature ? [colors.grey, colors.blurBlack] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={styles.buttonLinear}
                        />
                        <Text style={styles.txt}>
                            Save
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            handleClear();
                        }}
                        touchSoundDisabled={true}
                    >
                        <LinearGradient
                            colors={!signature ? [colors.grey, colors.blurBlack] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={styles.buttonLinear}
                        />
                        <Text style={styles.txt}>
                            Clear
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    previews: {
        width: 335,
        height: 114,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
    },
    button: {
        width: 100,
        height: 40,
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 5
    },
    buttonLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 20
    },
    txt: {
        color: colors.white
    }
});