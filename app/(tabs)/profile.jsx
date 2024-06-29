import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const anaProfile = () => {
  return (
    <LinearGradient colors={['#1c063b', '#080019']} style={{ flex: 1 }}>
    <View>
      <Text>anaProfile</Text>
    </View>
    </LinearGradient>
  )
}

export default anaProfile

const styles = StyleSheet.create({})