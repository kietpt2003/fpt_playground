package chinese_chess.entities

data class ChineseChessBoardPiece(
    var piece: ChineseChessPiece,
    var pieceColor: String,
    var row: Int,
    var column: Int,
    var isMoveValid: Boolean
)
