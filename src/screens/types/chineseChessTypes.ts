import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types/types";
import { ScreenWidth } from "@rneui/base";

export type ChineseChessPiece = "rook" | "knight" | "bishop" | "advisor" | "king" | "cannon" | "pawn" | ""

export type Position = {
    row: number,
    column: number,
}

export type PotentialMovePiece = {
    potentialMove: ChineseChessBoardPiece,
    fromMove: ChineseChessBoardPiece,
}

export interface ChineseChessBoardPiece {
    piece: ChineseChessPiece,
    pieceColor: string,
    row: number,
    column: number,
    isMoveValid?: boolean
}

export const chineseChessRowSize = Math.floor(ScreenWidth / 10) - 1;

export type ChineseChessNavigationProp = NativeStackNavigationProp<RootStackParamList>;
