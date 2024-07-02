import { router }  from "expo-router";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from '../../constants';
import InfoBox from "../../components/InfoBox";
import { signOut } from "../../lib/appwrite";


const Profile = () => {

  const { user, setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };
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
         
         ListEmptyComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-7 rounded-full flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

          </View>
        )}
      />
    </SafeAreaView>
    </LinearGradient>
  )
}

export default Profile

const styles = StyleSheet.create({})