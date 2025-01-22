import { Image, StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'

type PlayerCardProps = PropsWithChildren<{
  name: string,
  imageUrl?: string,

}>

const PlayerCard = ({ name, imageUrl }: PlayerCardProps) => {
  return (
    <View style={styles.container}>
      {imageUrl ? (
        // Image by xadartstudio on Freepik
        <Image source={{ uri: imageUrl }} style={styles.playerImage} />
      ) : (
        <Image source={require("../../assets/images/user-default-ava.jpg")} style={styles.playerImage} />
      )}

      <Text style={styles.cardText}>{name}</Text>
    </View>
  )
}

export default PlayerCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  playerImage: {
    height: 52,
    width: 50,
    borderRadius: 25
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    padding: 2,
    fontWeight: 'semibold'
  }
})