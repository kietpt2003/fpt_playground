package chinese_chess.utils

import android.util.Log
import chinese_chess.entities.ChineseChessBoardPiece
import chinese_chess.entities.ChineseChessPiece
import chinese_chess.entities.PotentialMovePiece
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap

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

    fun parsePotentialMovesArray(readableArray: ReadableArray): MutableList<PotentialMovePiece> {
        val potentialMovesList = mutableListOf<PotentialMovePiece>()

        for (i in 0 until readableArray.size()) {
            val moveMap = readableArray.getMap(i)
            potentialMovesList.add(parsePotentialMoveMap((moveMap)))
        }

        return potentialMovesList
    }

    private fun parsePotentialMoveMap(poMoveMap: ReadableMap): PotentialMovePiece {
        val potentialMoveMap = poMoveMap.getMap("potentialMove")!!
        val fromMoveMap = poMoveMap.getMap("fromMove")!!

        val potentialMove = ChineseChessBoardPiece(
            piece = stringToChineseChessPiece(potentialMoveMap.getString("piece")!!),
            pieceColor = potentialMoveMap.getString("pieceColor") ?: "",
            row = potentialMoveMap.getInt("row"),
            column = potentialMoveMap.getInt("column"),
            isMoveValid = potentialMoveMap.getBoolean("isMoveValid")
        )

        val fromMove = ChineseChessBoardPiece(
            piece = stringToChineseChessPiece(potentialMoveMap.getString("piece")!!),
            pieceColor = fromMoveMap.getString("pieceColor") ?: "",
            row = fromMoveMap.getInt("row"),
            column = fromMoveMap.getInt("column"),
            isMoveValid = fromMoveMap.getBoolean("isMoveValid")
        )

        return PotentialMovePiece(potentialMove, fromMove)
    }

    fun convertGameStateToReadableArray(gameState: Array<Array<ChineseChessBoardPiece>>): WritableArray {
        val array = Arguments.createArray()
        for (row in gameState) {
            val rowArray = Arguments.createArray()
            for (piece in row) {
                val pieceMap = Arguments.createMap()
                when (piece.piece) {
                    ChineseChessPiece.EMPTY -> pieceMap.putString("piece", "");
                    else -> pieceMap.putString("piece", piece.piece.name.lowercase());
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
        map.putString("piece", piece.piece.toString().lowercase())
        map.putString("pieceColor", piece.pieceColor)
        map.putInt("row", piece.row)
        map.putInt("column", piece.column)
        map.putBoolean("isMoveValid", piece.isMoveValid)
        return map
    }

    fun convertPotentialMovesToReadableArray(gameState: MutableList<PotentialMovePiece>): WritableArray {
        val writableArray = Arguments.createArray()

        gameState.forEach { potentialMovePiece ->
            val potentialMoveMap: WritableMap = Arguments.createMap()
            potentialMoveMap.putString(
                "piece",
                potentialMovePiece.potentialMove.piece.toString().lowercase()
            )
            potentialMoveMap.putString("pieceColor", potentialMovePiece.potentialMove.pieceColor)
            potentialMoveMap.putInt("row", potentialMovePiece.potentialMove.row)
            potentialMoveMap.putInt("column", potentialMovePiece.potentialMove.column)
            potentialMoveMap.putBoolean("isMoveValid", potentialMovePiece.potentialMove.isMoveValid)

            val fromMoveMap: WritableMap = Arguments.createMap()
            fromMoveMap.putString("piece", potentialMovePiece.fromMove.piece.toString().lowercase())
            fromMoveMap.putString("pieceColor", potentialMovePiece.fromMove.pieceColor)
            fromMoveMap.putInt("row", potentialMovePiece.fromMove.row)
            fromMoveMap.putInt("column", potentialMovePiece.fromMove.column)
            fromMoveMap.putBoolean("isMoveValid", potentialMovePiece.fromMove.isMoveValid)

            val moveMap: WritableMap = Arguments.createMap()
            moveMap.putMap("potentialMove", potentialMoveMap)
            moveMap.putMap("fromMove", fromMoveMap)

            writableArray.pushMap(moveMap)
        }

        return writableArray
    }

    fun convertPotentialMoveToWritableMap(move: PotentialMovePiece): WritableMap {
        val moveMap: WritableMap = Arguments.createMap()
        val potentialMoveMap: WritableMap = Arguments.createMap()
        val fromMoveMap: WritableMap = Arguments.createMap()

        potentialMoveMap.putString("piece", move.potentialMove.piece.toString().lowercase())
        potentialMoveMap.putString("pieceColor", move.potentialMove.pieceColor)
        potentialMoveMap.putInt("row", move.potentialMove.row)
        potentialMoveMap.putInt("column", move.potentialMove.column)
        potentialMoveMap.putBoolean("isMoveValid", move.potentialMove.isMoveValid)

        fromMoveMap.putString("piece", move.fromMove.piece.toString().lowercase())
        fromMoveMap.putString("pieceColor", move.fromMove.pieceColor)
        fromMoveMap.putInt("row", move.fromMove.row)
        fromMoveMap.putInt("column", move.fromMove.column)
        fromMoveMap.putBoolean("isMoveValid", move.fromMove.isMoveValid)

        moveMap.putMap("potentialMove", potentialMoveMap)
        moveMap.putMap("fromMove", fromMoveMap)

        return moveMap
    }

}