import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

const anaProfile = () => {
  return (
    <LinearGradient colors={['#1c063b', '#080019']} style={{ flex: 1 }}>
    <SafeAreaView>
      <FlatList 
         /*data={[{id: 1}, {id: 2}, {id: 3},]}
         keyExtractor={(item) => item.$id}
         renderItem={({item}) => (
          <Text className="text-3xl font-pbold text-secpurpe">{item.id}</Text>
         )}*/
         ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="flex justify-center items-start flex-row mb-6">
              <View>
                <Text className="text-3xl font-pbold text-secpurpe">Profile</Text>
              </View>
            </View>
          </View>
         )}
      />
    </SafeAreaView>
    </LinearGradient>
  )
}

export default anaProfile

const styles = StyleSheet.create({})