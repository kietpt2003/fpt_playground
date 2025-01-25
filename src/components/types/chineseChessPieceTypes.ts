import { ChineseChessPiece } from "../../screens/types/chineseChessTypes"

export type ChineseChessPieceProps = {
    piece: ChineseChessPiece;
    pieceColor: string;
    size: number;
    borderColor: string;
    chessBg?: string;
}
