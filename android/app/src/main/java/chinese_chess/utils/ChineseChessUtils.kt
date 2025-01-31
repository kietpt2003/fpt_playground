package chinese_chess.utils

import chinese_chess.entities.ChineseChessBoardPiece
import chinese_chess.entities.ChineseChessPiece
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray

object ChineseChessUtils {
    fun stringToChineseChessPiece(piece: String): ChineseChessPiece {
        return when (piece.lowercase()) {
            "rook" -> ChineseChessPiece.ROOK
            "knight" -> ChineseChessPiece.KNIGHT
            "bishop" -> ChineseChessPiece.BISHOP
            "advisor" -> ChineseChessPiece.ADVISOR
            "king" -> ChineseChessPiece.KING
            "cannon" -> ChineseChessPiece.CANNON
            "pawn" -> ChineseChessPiece.PAWN
            "" -> ChineseChessPiece.EMPTY
            else -> throw IllegalArgumentException("Unknown piece: $piece")
        }
    }

    fun parseGameStateArray(gameStateArray: ReadableArray): Array<Array<ChineseChessBoardPiece>> {
        val rows = gameStateArray.size()
        val gameState = Array(rows) { arrayOf<ChineseChessBoardPiece>() }

        for (i in 0 until rows) {
            val rowArray = gameStateArray.getArray(i)
            val columns = rowArray.size()
            val row =
                Array(columns) { ChineseChessBoardPiece(ChineseChessPiece.EMPTY, "", 0, 0, false) }

            for (j in 0 until columns) {
                val pieceMap = rowArray.getMap(j)
                row[j] = ChineseChessBoardPiece(
                    piece = stringToChineseChessPiece(pieceMap.getString("piece")!!),
                    pieceColor = pieceMap.getString("pieceColor")!!,
                    row = pieceMap.getInt("row"),
                    column = pieceMap.getInt("column"),
                    isMoveValid = pieceMap.getBoolean("isMoveValid")
                )
            }
            gameState[i] = row
        }

        return gameState
    }

    fun parseBoardPieceMap(pieceMap: ReadableMap): ChineseChessBoardPiece {
        return ChineseChessBoardPiece(
            piece = stringToChineseChessPiece(pieceMap.getString("piece")!!),
            pieceColor = pieceMap.getString("pieceColor")!!,
            row = pieceMap.getInt("row"),
            column = pieceMap.getInt("column"),
            isMoveValid = pieceMap.getBoolean("isMoveValid")
        )
    }

    fun convertGameStateToReadableArray(gameState: Array<Array<ChineseChessBoardPiece>>): WritableArray {
        val array = Arguments.createArray()
        for (row in gameState) {
            val rowArray = Arguments.createArray()
            for (piece in row) {
                val pieceMap = Arguments.createMap()
                when (piece.piece) {
                    ChineseChessPiece.EMPTY -> pieceMap.putString("piece","");
                    else -> pieceMap.putString("piece",piece.piece.name.lowercase());
                }
                pieceMap.putString("pieceColor", piece.pieceColor)
                pieceMap.putInt("row", piece.row)
                pieceMap.putInt("column", piece.column)
                piece.isMoveValid.let { pieceMap.putBoolean("isMoveValid", it) }
                rowArray.pushMap(pieceMap)
            }
            array.pushArray(rowArray)
        }
        return array
    }

    fun convertChineseChessBoardPieceToReadableMap(piece: ChineseChessBoardPiece): ReadableMap {
        val map = Arguments.createMap()
        map.putString("piece", piece.piece.toString())
        map.putString("pieceColor", piece.pieceColor)
        map.putInt("row", piece.row)
        map.putInt("column", piece.column)
        map.putBoolean("isMoveValid", piece.isMoveValid)
        return map
    }
}