import { router }  from "expo-router";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons, images } from '../../constants';
import InfoBox from "../../components/InfoBox";
import { signOut } from "../../lib/appwrite";


const Profile = () => {

  const { user, setUser, setIsLogged, darkMode } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };
  return (
    <LinearGradient colors={darkMode ? ['#000000', '#000000'] : ['#1c063b', '#080019']} style={{ flex: 1 }}>
      <Image
        source={images.glow3}
        style={StyleSheet.absoluteFillObject}
        className="w-full h-full absolute contain top-0 left-0"
      />
    <SafeAreaView>
      <FlatList 
         /*data={[{id: 1}, {id: 2}, {id: 3},]}
         keyExtractor={(item) => item.$id}
         renderItem={({item}) => (
          <Text className="text-3xl font-pbold text-secpurpe">{item.id}</Text>
         )}*/
         ListHeaderComponent={() => (
          <View className="my-7 px-4 space-y-6">
            <View className="flex justify-center items-start flex-row mb-6">
              <View>
                <Text className={`font-pbold text-3xl ${darkMode ? 'text-hliba' : 'text-secpurpe'}`}>Profile</Text>
              </View>
            </View>
          </View>
          
         )}
         
         ListEmptyComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-[25%]">
            <View className={`w-[100px] h-[100px] border-2 ${darkMode ? 'border-hliba' : 'border-secpurpe'} rounded-full flex justify-center items-center`}>
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-full"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-3"
              titleStyles={`text-2xl ${darkMode ? 'text-hliba' : 'text-lightpurpe'} font-pbold`}
            />

            <TouchableOpacity
               onPress={logout}
               className={`flex flex-row w-full items-center mb-10 ${darkMode ? 'border-fakeGlass' : 'border-hapurpe'} px-10 py-5 rounded-full justify-center  border-2`}
               style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#c5b0ef'}}>
                
                  <Text className={`text-2xl font-pbold ${darkMode ? 'text-hliba' : 'text-gradL'}`}>Logout</Text>
                  <Image
                     source={icons.logout}
                     resizeMode="contain"
                     className="w-6 h-6 ml-2" // Add a margin-left to create some space between the text and the icon
                  />
            </TouchableOpacity>

          </View>
        )}
      />
    </SafeAreaView>
    </LinearGradient>
  )
}

export default Profile

const styles = StyleSheet.create({})