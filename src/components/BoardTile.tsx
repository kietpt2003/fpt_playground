import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type BoardTileProps=PropsWithChildren<{
  color:string,
  piece:string,
  bgColor?:string,
  isValid?:boolean
}>

import  Icon  from 'react-native-vector-icons/FontAwesome5'

const PieceIcon = ({color,piece}:BoardTileProps) =>{
  
  return(
    <Icon name={piece} size={20} color={color}  />    
  )
}


const BoardTile = ({color,piece,bgColor,isValid}:BoardTileProps) => {
  return (
    <View style={[styles.container,{backgroundColor:bgColor, }]}>
      {isValid && (<Icon name='circle' size={8} solid color={'#4dafff' } />)}
      {piece && (<PieceIcon color={color} piece={piece==='' ? '' : piece}  />)}
    </View>
  )
}

export default BoardTile

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    width:41.1,
    height:42,
    // flexDirection:'row',
    // flexWrap:'wrap', 
  }
})