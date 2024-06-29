import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const home = () => {
  return (
    <LinearGradient colors={['#1c063b', '#080019']} style={{ flex: 1 }}>
    <View>
      <Text>home</Text>
    </View>
    </LinearGradient>
  )
}

export default home