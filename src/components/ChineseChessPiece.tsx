import React from 'react'
import Svg, { Circle, Text } from 'react-native-svg'
import { ChineseChessPieceProps } from './types/chineseChessPieceTypes'
import { ChineseChessPiece as ChineseChessPieceType } from '../screens/types/chineseChessTypes'

export default function ChineseChessPiece({ piece, pieceColor, size, borderColor, chessBg = "white" }: ChineseChessPieceProps) {
    function handlePieceString(piece: ChineseChessPieceType): string {
        switch (piece) {
            case "king":
                if (pieceColor === "red") {
                    return "帥";
                }
                return "將";
            case "advisor":
                if (pieceColor === "red") {
                    return "仕";
                }
                return "士";
            case "bishop":
                if (pieceColor === "red") {
                    return "相";
                }
                return "象";
            case "rook":
                if (pieceColor === "red") {
                    return "俥";
                }
                return "車";
            case "cannon":
                if (pieceColor === "red") {
                    return "炮";
                }
                return "砲";
            case "knight":
                if (pieceColor === "red") {
                    return "傌";
                }
                return "馬";
            case "pawn":
                if (pieceColor === "red") {
                    return "兵";
                }
                return "卒";
            default:
                return "UNK";
        }
    }
    return (
        <Svg
            width={size} // Chiều rộng tùy chỉnh
            height={size} // Chiều cao tùy chỉnh
            viewBox="0 0 20 20" // Định nghĩa kích thước canvas gốc
        >
            <Circle
                cx={10}
                cy={10}
                r={10 - 1}
                stroke={borderColor}
                strokeWidth={0.7}
                fill={chessBg}
            />

            <Circle
                cx={10}
                cy={10}
                r={10 - 2.5}
                stroke={pieceColor}
                strokeWidth={0.6}
                fill={"none"}
            />
            <Text
                x="10" // Vị trí ngang (tâm x)
                y="11" // Vị trí dọc (tâm y)
                fill={pieceColor} // Màu chữ
                fontSize="9.5" // Kích thước chữ
                textAnchor="middle" // Căn giữa theo chiều ngang
                alignmentBaseline="middle" // Căn giữa theo chiều dọc
                fontFamily="RobotoBold"
            >
                {
                    handlePieceString(piece)
                }
            </Text>
        </Svg>
    )
}