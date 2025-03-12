import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent, Alert, Platform, PermissionsAndroid } from 'react-native'
import React, { useRef, useState } from 'react'
import { Canvas, Path, Skia, SkPath, useCanvasRef } from '@shopify/react-native-skia'
import { colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import { PDFDocument } from "pdf-lib";

export default function SignViewV2() {
    const [path] = useState<SkPath>(Skia.Path.Make());
    const canvasRef = useCanvasRef();
    const viewShotRef = useRef<ViewShot>(null);

    const [_, setTrigger] = useState(true); // Trigger để ép re-render

    const touchHandler = {
        onStart: (touchInfo: GestureResponderEvent) => {

            const { locationX: x, locationY: y } = touchInfo.nativeEvent;
            //Move the path to the starting point
            path.moveTo(x, y); // Bắt đầu nét mới
            setTrigger(!_);
        },
        onActive: (touchInfo: GestureResponderEvent) => {
            const { locationX: x, locationY: y } = touchInfo.nativeEvent;
            //Move the path to the current point as the User draws
            path.lineTo(x, y); // Vẽ tiếp tục nét vẽ
            setTrigger(!_);
        },
        onEnd: () => {
            //Save the signatures
            console.log("vo day end");
            const svgString = path.toSVGString();
            console.log("my string", svgString);

        },
    }

    const resetCanvas = () => {
        path.reset()
        setTrigger(!_);
    }

    const imageType = "image/png";
    const extension = imageType.substring(imageType.indexOf("/") + 1);
    const bgSrc = "https://img.freepik.com/free-vector/blue-curve-background_53876-113112.jpg";
    const imgWidth = 300;
    const imgHeight = 200;

    // Chụp chữ ký và lưu thành PNG
    const saveSignature = async () => {
        try {
            if (!viewShotRef.current?.capture) {
                return;
            }
            const uri = await viewShotRef.current?.capture();
            if (!uri) throw new Error("Chụp ảnh chữ ký thất bại!");

            const signaturePath = `${RNFS.DocumentDirectoryPath}/signature.png`;
            const base64 = await RNFS.readFile(uri, "base64");
            // await RNFS.writeFile(signaturePath, base64, "base64");

            // return signaturePath;
            return base64;
        } catch (error) {
            Alert.alert("Lỗi", "Không thể lưu chữ ký!");
            console.error(error);
            return null;
        }
    };

    // Thêm chữ ký vào file PDF
    const signPdf = async () => {

        const signatureBase64 = await saveSignature();
        if (!signatureBase64) return;

        try {
            const pdfPath = "/sdcard/Android/data/com.kietpt2003.fpt_playground/files/test.pdf";
            // Đọc file PDF gốc từ storage
            const existingPdfBytes = await RNFS.readFile(pdfPath, "base64");

            // Tải file PDF vào pdf-lib
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            // Lấy trang đầu tiên của PDF
            const pages = pdfDoc.getPages();
            const firstPage = pages[1];

            // Nhúng ảnh vào PDF
            const image = await pdfDoc.embedPng(signatureBase64); // Hỗ trợ PNG, nếu JPG dùng embedJpg()
            const { width, height } = image.scale(0.2); // Resize ảnh nếu cần

            firstPage.moveTo(120, height + 120);
            firstPage.drawSvgPath(path.toSVGString());
            // Vẽ ảnh lên trang PDF
            // firstPage.drawImage(image, {
            //     x: 120, // Vị trí X (trái -> phải)
            //     y: height + 20, // Vị trí Y (trên -> xuống)
            //     width,
            //     height,
            // });

            // Lưu file PDF mới
            const modifiedPdfBytes = await pdfDoc.saveAsBase64(); // Lưu file thành Base64

            // Định nghĩa đường dẫn lưu file mới
            const outputPdfPath = "/sdcard/Android/data/com.kietpt2003.fpt_playground/files/test1.pdf";

            // Ghi file xuống thiết bị
            await RNFS.writeFile(outputPdfPath, modifiedPdfBytes, "base64");

            console.log("PDF đã được cập nhật:", outputPdfPath);
            return outputPdfPath;
        } catch (error) {
            console.error("Lỗi khi chỉnh sửa PDF:", error);
            return null;
        }
    };

    return (
        <>
            <View style={{ width: imgWidth, height: imgHeight }}>
                <ViewShot style={styles.canvas} ref={viewShotRef} options={{ format: "png", quality: 1.0 }}>
                    <Canvas ref={canvasRef} style={styles.canvas}
                        onTouchStart={touchHandler.onStart}
                        onTouchMove={touchHandler.onActive}
                        onTouchEnd={touchHandler.onEnd}
                    >
                        <Path path={path} strokeWidth={1} style={"stroke"} />
                    </Canvas>
                </ViewShot>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            signPdf();
                        }}
                        touchSoundDisabled={true}
                    >
                        <LinearGradient
                            colors={path.isEmpty() ? [colors.grey, colors.blurBlack] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                            style={styles.buttonLinear}
                        />
                        <Text style={styles.txt}>
                            Save
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            resetCanvas();
                        }}
                        touchSoundDisabled={true}
                    >
                        <LinearGradient
                            colors={path.isEmpty() ? [colors.grey, colors.blurBlack] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
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
    canvas: {
        flex: 1,
    },
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