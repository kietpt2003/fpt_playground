import { Animated, BackHandler, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { checkBishopMove, checkCastling, checkKingMove, checkKnightMove, checkPawnMove, checkPotentialBlockMoves, checkQueenMove, checkRookMove, isInCheck } from './MoveValidation'


// Responsive
import { Dimensions } from 'react-native'
import BoardTile from './BoardTile'
import { LinearGradient } from 'expo-linear-gradient'
import PlayerCard from './PlayerCard'
import { RootStackParamList } from '../navigation/types/types'
const Width = Dimensions.get('window').width

type LocalGameProps = NativeStackScreenProps<RootStackParamList, 'LocalGame'>

export interface ChessBoardPiece {
  piece: string, pieceColor: string, row: number, column: number, isMoveValid?: boolean
}



const PlayLocal = ({ navigation }: LocalGameProps) => {

  const chessboard: ChessBoardPiece[][] = [
    [
      { piece: 'chess-rook', pieceColor: 'black', row: 0, column: 0, isMoveValid: false },
      { piece: 'chess-knight', pieceColor: 'black', row: 0, column: 1, isMoveValid: false },
      { piece: 'chess-bishop', pieceColor: 'black', row: 0, column: 2, isMoveValid: false },
      { piece: 'chess-king', pieceColor: 'black', row: 0, column: 3, isMoveValid: false },
      { piece: 'chess-queen', pieceColor: 'black', row: 0, column: 4, isMoveValid: false },
      { piece: 'chess-bishop', pieceColor: 'black', row: 0, column: 5, isMoveValid: false },
      { piece: 'chess-knight', pieceColor: 'black', row: 0, column: 6, isMoveValid: false },
      { piece: 'chess-rook', pieceColor: 'black', row: 0, column: 7, isMoveValid: false },
    ],
    [
      { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 0, isMoveValid: false },
      { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 1, isMoveValid: false },
      { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 2, isMoveValid: false },
      { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 3, isMoveValid: false },
      { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 4, isMoveValid: false },
      { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 5, isMoveValid: false },
      { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 6, isMoveValid: false },
      { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 7, isMoveValid: false },
    ],
    [
      { piece: '', pieceColor: '', row: 2, column: 0, isMoveValid: false },
      { piece: '', pieceColor: '', row: 2, column: 1, isMoveValid: false },
      { piece: '', pieceColor: '', row: 2, column: 2, isMoveValid: false },
      { piece: '', pieceColor: '', row: 2, column: 3, isMoveValid: false },
      { piece: '', pieceColor: '', row: 2, column: 4, isMoveValid: false },
      { piece: '', pieceColor: '', row: 2, column: 5, isMoveValid: false },
      { piece: '', pieceColor: '', row: 2, column: 6, isMoveValid: false },
      { piece: '', pieceColor: '', row: 2, column: 7, isMoveValid: false },
    ],
    [
      { piece: '', pieceColor: '', row: 3, column: 0, isMoveValid: false },
      { piece: '', pieceColor: '', row: 3, column: 1, isMoveValid: false },
      { piece: '', pieceColor: '', row: 3, column: 2, isMoveValid: false },
      { piece: '', pieceColor: '', row: 3, column: 3, isMoveValid: false },
      { piece: '', pieceColor: '', row: 3, column: 4, isMoveValid: false },
      { piece: '', pieceColor: '', row: 3, column: 5, isMoveValid: false },
      { piece: '', pieceColor: '', row: 3, column: 6, isMoveValid: false },
      { piece: '', pieceColor: '', row: 3, column: 7, isMoveValid: false },
    ],
    [
      { piece: '', pieceColor: '', row: 4, column: 0, isMoveValid: false },
      { piece: '', pieceColor: '', row: 4, column: 1, isMoveValid: false },
      { piece: '', pieceColor: '', row: 4, column: 2, isMoveValid: false },
      { piece: '', pieceColor: '', row: 4, column: 3, isMoveValid: false },
      { piece: '', pieceColor: '', row: 4, column: 4, isMoveValid: false },
      { piece: '', pieceColor: '', row: 4, column: 5, isMoveValid: false },
      { piece: '', pieceColor: '', row: 4, column: 6, isMoveValid: false },
      { piece: '', pieceColor: '', row: 4, column: 7, isMoveValid: false },
    ],
    [
      { piece: '', pieceColor: '', row: 5, column: 0, isMoveValid: false },
      { piece: '', pieceColor: '', row: 5, column: 1, isMoveValid: false },
      { piece: '', pieceColor: '', row: 5, column: 2, isMoveValid: false },
      { piece: '', pieceColor: '', row: 5, column: 3, isMoveValid: false },
      { piece: '', pieceColor: '', row: 5, column: 4, isMoveValid: false },
      { piece: '', pieceColor: '', row: 5, column: 5, isMoveValid: false },
      { piece: '', pieceColor: '', row: 5, column: 6, isMoveValid: false },
      { piece: '', pieceColor: '', row: 5, column: 7, isMoveValid: false },
    ],
    [
      { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 0, isMoveValid: false },
      { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 1, isMoveValid: false },
      { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 2, isMoveValid: false },
      { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 3, isMoveValid: false },
      { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 4, isMoveValid: false },
      { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 5, isMoveValid: false },
      { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 6, isMoveValid: false },
      { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 7, isMoveValid: false },
    ],
    [
      { piece: 'chess-rook', pieceColor: '#cacaca', row: 7, column: 0, isMoveValid: false },
      { piece: 'chess-knight', pieceColor: '#cacaca', row: 7, column: 1, isMoveValid: false },
      { piece: 'chess-bishop', pieceColor: '#cacaca', row: 7, column: 2, isMoveValid: false },
      { piece: 'chess-king', pieceColor: '#cacaca', row: 7, column: 3, isMoveValid: false },
      { piece: 'chess-queen', pieceColor: '#cacaca', row: 7, column: 4, isMoveValid: false },
      { piece: 'chess-bishop', pieceColor: '#cacaca', row: 7, column: 5, isMoveValid: false },
      { piece: 'chess-knight', pieceColor: '#cacaca', row: 7, column: 6, isMoveValid: false },
      { piece: 'chess-rook', pieceColor: '#cacaca', row: 7, column: 7, isMoveValid: false },
    ],

  ]

  const [player, setPlayer] = useState('white')
  const [isWinner, setIsWinner] = useState('')
  const [gameState, setGameState] = useState(chessboard)
  const [lostWhitePiece, setLostWhitePiece] = useState<ChessBoardPiece[]>([])
  const [lostBlackPiece, setLostBlackPiece] = useState<ChessBoardPiece[]>([])
  const [selectedPiece, setSelectedPiece] = useState<ChessBoardPiece>({ piece: '', pieceColor: '', row: 0, column: 0, isMoveValid: false })
  const [isCheck, setIsCheck] = useState(false)

  const [promotionPiece, setPromotionPiece] = useState({ row: 0, column: 0, isPromotion: false })

  const [isCastlingAllowed, setIsCastlingAllowed] = useState([{ left: true, right: true }, { left: true, right: true }])

  const [screenWidth, setScreenWidth] = useState(Width)
  useEffect(() => {

    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      setScreenWidth(width)
    })

    const back = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('HomeScreen')
      return true
    })

  }, [])

  // Checks if the king is in check or not
  const checkKingState = async () => {
    setIsCheck(await isInCheck(gameState, player === 'white' ? '#cacaca' : 'black'))
    // console.log(isCheck)
  }

  // Check the castling direction
  const castleDirectionCheck = async () => {
    let direction: string[] = []

    direction = await checkCastling(gameState, player === 'white' ? '#cacaca' : 'black')

    if (isCastlingAllowed[0] && player === 'white') {

      if (isCastlingAllowed[0].left === true) {
        if (direction.find(obj => obj === 'left')) {
          gameState[7][1].isMoveValid = true
          // console.log(direction)
        }
      }

      if (isCastlingAllowed[0].right === true) {
        if (direction.find(obj => obj === 'right')) {
          gameState[7][5].isMoveValid = true
        }
      }
    }

    if (isCastlingAllowed[1] && player === 'black') {

      if (isCastlingAllowed[1].left === true) {
        if (direction.find(obj => obj === 'left')) {
          gameState[0][1].isMoveValid = true
        }
      }

      if (isCastlingAllowed[1].right === true) {
        if (direction.find(obj => obj === 'right')) {
          gameState[0][5].isMoveValid = true
        }
      }
    }


  }

  // Gives suggetion of the valid moves for the selected piece
  const onPieceSelected = async ({ piece, pieceColor, row, column, isMoveValid }: ChessBoardPiece) => {
    let newGameState = [...gameState];
    if (isWinner) {
      return
    }

    checkKingState()

    newGameState.map((innerArray) => {
      innerArray.map((obj) => {
        obj.isMoveValid = false
      })
    })

    switch (piece) {
      case 'chess-pawn':
        newGameState = checkPawnMove(gameState, { piece, pieceColor, row, column, isMoveValid })
        break;
      case 'chess-rook':
        newGameState = checkRookMove(gameState, { piece, pieceColor, row, column, isMoveValid })
        break;
      case 'chess-knight':
        newGameState = checkKnightMove(gameState, { piece, pieceColor, row, column, isMoveValid })
        break;
      case 'chess-bishop':
        newGameState = checkBishopMove(gameState, { piece, pieceColor, row, column, isMoveValid })
        break;
      case 'chess-queen':
        newGameState = checkQueenMove(gameState, { piece, pieceColor, row, column, isMoveValid })
        break;
      case 'chess-king':
        newGameState = checkKingMove(gameState, { piece, pieceColor, row, column, isMoveValid })
        if (isCheck !== true && isCastlingAllowed) {
          await castleDirectionCheck()
          console.log('Here')
        }
        break;
      default:
        console.log('Please select valid piece')
        break;
    }


    setGameState(newGameState)
    // checkIsWinner(pieceColor,row,column)
  }

  // Selects the destination or target square to make move
  const selectMove = async (row: number, column: number) => {
    let newGameState = [...gameState];
    const currentSquareState = newGameState[row][column]


    if (selectedPiece.piece === 'chess-rook' || selectedPiece.piece === 'chess-king') {
      if (selectedPiece.pieceColor === '#cacaca') {
        if (column == 0) {
          isCastlingAllowed[0].left = false
        } else if (column === 7) {
          isCastlingAllowed[0].right = false
        } else {
          isCastlingAllowed[0].left = false
          isCastlingAllowed[0].right = false
        }
      } else {
        if (column == 0) {
          isCastlingAllowed[1].left = false
        } else if (column === 7) {
          isCastlingAllowed[1].right = false
        } else {
          isCastlingAllowed[1].left = false
          isCastlingAllowed[1].right = false
        }
      }
    }

    if (isCastlingAllowed && selectedPiece.piece === 'chess-king') {
      makeMove(currentSquareState)
      if (column === 1) {
        selectedPiece.piece = 'chess-rook'
        selectedPiece.column = 0
        makeMove(newGameState[row][2])

        return
      } else if (column == 5) {
        selectedPiece.piece = 'chess-rook'
        selectedPiece.column = 7
        makeMove(newGameState[row][4])
        console.log(isCastlingAllowed)
        return
      }
    }


    if (isCheck) {
      console.log("King Is In Check")

      const availableMoves = await checkPotentialBlockMoves(gameState, player === 'white' ? '#cacaca' : 'black')
      const res = availableMoves.find(moves => moves.row === currentSquareState.row && moves.column === currentSquareState.column)
      if (availableMoves.length === 0) {
        setIsWinner(player === 'white' ? 'black won the Game' : 'white won the game')
      }

      if (res != undefined) {
        makeMove(currentSquareState)
      }

    } else {
      makeMove(currentSquareState)
    }

  }

  // Updates the game state and piece position
  const makeMove = ({ piece, pieceColor, row, column, isMoveValid }: ChessBoardPiece) => {
    let newGameState = [...gameState];

    if (piece !== '') {
      // Collects lost pieces
      const lostPiece: ChessBoardPiece = {
        piece: piece,
        pieceColor: pieceColor,
        row: row,
        column: column,
        isMoveValid: false
      }

      if (pieceColor === '#cacaca') {
        let temp = lostWhitePiece
        temp.push(lostPiece)
        setLostWhitePiece(temp)

      } else {
        let temp = lostBlackPiece
        temp.push(lostPiece)
        setLostBlackPiece(temp)
      }
    }


    newGameState[row][column] = {
      row: row,
      column: column,
      piece: selectedPiece.piece,
      pieceColor: selectedPiece.pieceColor,
      isMoveValid: false,
    };

    // Pawn Promotion - Special Move
    if (selectedPiece.piece === 'chess-pawn' && (row === 0 || row === 7)) {
      setPromotionPiece({
        row: row,
        column: column,
        isPromotion: true
      })
    }

    newGameState[selectedPiece.row][selectedPiece.column] = {
      piece: '',
      pieceColor: '',
      isMoveValid: false,
      row: selectedPiece.row,
      column: selectedPiece.column
    };

    checkKingState()

    newGameState.map((innerArray) => {
      innerArray.map((obj) => {
        newGameState[obj.row][obj.column].isMoveValid = false
      })
    })

    setSelectedPiece(
      { piece: '', pieceColor: '', row: 0, column: 0, isMoveValid: false }
    )

    setGameState(newGameState)
    checkIsWinner()
    setPlayer(selectedPiece.pieceColor === '#cacaca' ? 'black' : 'white')

  }

  // Check if the game is over or not
  const checkIsWinner = () => {
    const blackKing = gameState.flatMap((innerArray) =>
      innerArray.filter((obj) => obj.piece == 'chess-king')
    );

    if (blackKing.length == 1) {
      setIsWinner(`Player ${blackKing[0].pieceColor === 'black' ? 'White' : 'Black'} has won the game`)
    }
    // console.log(player)
  }

  // Promotes the pawn
  const promotePawn = ({ piece, pieceColor, row, column }: ChessBoardPiece) => {
    gameState[row][column].piece = piece
    gameState[row][column].pieceColor = pieceColor
    gameState[row][column].isMoveValid = false

    setPromotionPiece({
      row: row,
      column: column,
      isPromotion: false
    })
  }

  // Player Resign
  const resignMatch = () => {

    if (!isWinner) {
      setIsWinner(player.charAt(0).toUpperCase() + player.slice(1) +
        ' forfeited \n' + (player === 'white' ? 'Player Black won the match' :
          'Player White won the match'))
    }
  }

  // Reset the match
  const resetMatch = () => {
    setIsWinner('')
    setLostBlackPiece([])
    setLostWhitePiece([])
    setSelectedPiece({ piece: '', pieceColor: '', row: 0, column: 0, isMoveValid: false })
    setIsCheck(false)
    setPromotionPiece({ row: 0, column: 0, isPromotion: false })
    setIsCastlingAllowed([{ left: true, right: true }, { left: true, right: true }])
    setPlayer('white')
    setGameState(chessboard)
  }

  return (
    <LinearGradient
      colors={['#4246b4', '#141E30']}
      style={[styles.container, { width: "100%" }]}
    >

      <ScrollView showsVerticalScrollIndicator={false} >
        {screenWidth.toFixed() > '650' ? (
          <View style={{ flexDirection: 'row-reverse' }}>

            <View style={styles.boardContainer}>

              <FlatList
                data={gameState}
                scrollEnabled={false}
                renderItem={({ item, index }) => (

                  <FlatList
                    data={item}
                    numColumns={8}
                    scrollEnabled={false}
                    keyExtractor={(item) => `${item.column}-${item.row}`}
                    renderItem={({ item, index }) => (

                      <Pressable onPress={() => {
                        if (player == item.pieceColor || (item.pieceColor == '#cacaca' && player === 'white')) {

                          onPieceSelected({
                            piece: item.piece,
                            pieceColor: item.pieceColor,
                            row: item.row,
                            column: item.column,
                            isMoveValid: item.isMoveValid
                          })

                          setSelectedPiece({
                            piece: item.piece,
                            pieceColor: item.pieceColor,
                            row: item.row,
                            column: item.column,
                            isMoveValid: false
                          })
                        }

                        if (item.isMoveValid) {
                          selectMove(item.row, item.column)
                        }

                      }}

                        key={`${item.column}+${item.row}+${index}`}
                      >
                        <BoardTile color={item.pieceColor} piece={item.piece} bgColor={(item.row + item.column) % 2 == 0 ? '#fffdf0' : '#2e2a2adb'} isValid={item.isMoveValid} />
                      </Pressable>
                    )}
                  />
                )}
              />

            </View>

            <View>
              <View style={styles.playerCardContainer}>
                <PlayerCard name='White' />
                {isWinner ? (
                  <Text style={[styles.playerTurnText, { backgroundColor: '#1e9de6', color: '#fff', fontWeight: 'bold' }]}>{isWinner}</Text>
                ) : (
                  <Text style={styles.playerTurnText}>{player.charAt(0).toUpperCase() + player.slice(1) + " 's move"}</Text>
                )}
                <PlayerCard name='Black' />
              </View>

              <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'space-between', marginHorizontal: 15 }}>

                <View style={[styles.lostPieceContainer,]}>
                  {lostBlackPiece.map((item, index) => (
                    <Icon name={item.piece} key={index} size={22} color={item.pieceColor} />
                  ))}
                </View>


                <View style={[styles.lostPieceContainer,]}>
                  {lostWhitePiece.map((item, index) => (
                    <Icon name={item.piece} key={index} size={25} color={item.pieceColor} />
                  ))}
                </View>
              </View>

            </View>
          </View>
        ) : (
          <>
            <View style={styles.playerCardContainer}>
              <PlayerCard name='White' />
              {isWinner ? (
                <Text style={[styles.playerTurnText, { backgroundColor: '#1e9de6', color: '#fff', fontWeight: 'bold' }]}>{isWinner}</Text>
              ) : (
                <Text style={styles.playerTurnText}>{player.charAt(0).toUpperCase() + player.slice(1) + " 's move"}</Text>
              )}
              <PlayerCard name='Black' />
            </View>

            <View style={styles.lostPieceContainer}>
              {lostBlackPiece.map((item, index) => (
                <Icon name={item.piece} key={index} size={22} color={item.pieceColor} />
              ))}
            </View>

            <View style={styles.boardContainer}>

              <FlatList
                data={gameState}
                scrollEnabled={false}
                renderItem={({ item, index }) => (

                  <FlatList
                    data={item}
                    numColumns={8}
                    scrollEnabled={false}
                    keyExtractor={(item) => `${item.column}-${item.row}`}
                    renderItem={({ item, index }) => (

                      <Pressable onPress={() => {
                        if (player == item.pieceColor || (item.pieceColor == '#cacaca' && player === 'white')) {

                          onPieceSelected({
                            piece: item.piece,
                            pieceColor: item.pieceColor,
                            row: item.row,
                            column: item.column,
                            isMoveValid: item.isMoveValid
                          })

                          setSelectedPiece({
                            piece: item.piece,
                            pieceColor: item.pieceColor,
                            row: item.row,
                            column: item.column,
                            isMoveValid: false
                          })
                        }

                        if (item.isMoveValid) {
                          selectMove(item.row, item.column)
                        }

                      }}

                        key={`${item.column}+${item.row}+${index}`}
                      >
                        <BoardTile color={item.pieceColor} piece={item.piece} bgColor={(item.row + item.column) % 2 == 0 ? '#fffdf0' : '#2e2a2adb'} isValid={item.isMoveValid} />
                      </Pressable>
                    )}
                  />
                )}
              />

            </View>


            <View style={[styles.lostPieceContainer,]}>
              {lostWhitePiece.map((item, index) => (
                <Icon name={item.piece} key={index} size={25} color={item.pieceColor} />
              ))}
            </View>

            <View style={styles.playerCardContainer}>
            </View>

          </>
        )}


      </ScrollView>
      {/* Pawn Promotion Modal Dialog */}
      <Modal
        visible={promotionPiece.isPromotion}
        transparent={true}
        animationType='none'

      >
        <View style={[styles.modalCenteredView]}>
          <View style={styles.promotionContainer}>
            <Text style={styles.modalHeadingText}>Promote your pawn to any one of these</Text>
            <View style={styles.promotionPieceContainer}>
              <Icon name={'chess-queen'} size={25} color={player !== 'white' ? '#fff' : 'black'}
                onPress={() => promotePawn({
                  piece: 'chess-queen',
                  pieceColor: player !== 'white' ? '#cacaca' : 'black',
                  row: promotionPiece.row,
                  column: promotionPiece.column
                })} />
              <Icon name={'chess-bishop'} size={25} color={player !== 'white' ? '#fff' : 'black'}
                onPress={() => promotePawn({
                  piece: 'chess-bishop',
                  pieceColor: player !== 'white' ? '#cacaca' : 'black',
                  row: promotionPiece.row,
                  column: promotionPiece.column
                })} />
              <Icon name={'chess-knight'} size={25} color={player !== 'white' ? '#fff' : 'black'}
                onPress={() => promotePawn({
                  piece: 'chess-knight',
                  pieceColor: player !== 'white' ? '#cacaca' : 'black',
                  row: promotionPiece.row,
                  column: promotionPiece.column
                })} />
              <Icon name={'chess-rook'} size={25} color={player !== 'white' ? '#fff' : 'black'}
                onPress={() => promotePawn({
                  piece: 'chess-rook',
                  pieceColor: player !== 'white' ? '#cacaca' : 'black',
                  row: promotionPiece.row,
                  column: promotionPiece.column
                })} />
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    width: 345,
    marginVertical: 10,
    borderWidth: 8,
    height: 350,
    borderRadius: 8,
    borderColor: '#bdbdbd61',
    alignSelf: 'center',
    // marginHorizontal:5
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  promotionPieceContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  promotionContainer: {
    width: 300,
    height: 200,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#bcbdbfdf',
    borderRadius: 20,
  },
  modalHeadingText: {
    padding: 12,
    marginTop: 20,
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  playerCardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    // backgroundColor:'red'
  },
  playerTurnText: {
    color: '#fff',
    fontSize: 16,
    padding: 8,
    fontWeight: 'semibold',
    backgroundColor: '#bdbdbd61',
    elevation: 1,
    borderRadius: 15,
    flexWrap: 'wrap',
    maxWidth: 210,
  },
  lostPieceContainer: {
    width: 345,
    height: 50,
    flexDirection: 'row',
    columnGap: 15,
    rowGap: 2,
    marginBottom: 2,
    paddingHorizontal: 8,
    flexWrap: 'wrap',
    alignSelf: 'center'
  }
})

export default PlayLocal
