import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { icons } from '../../constants';
import InfoBox from "../../components/InfoBox";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const router = useRouter();

  return (
    <LinearGradient colors={['#1c063b', '#080019']} style={{ flex: 1 }}>
      <SafeAreaView>
        <FlatList 
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
              <View className="flex justify-center items-start flex-row mb-1">
                <View>
                  <Text className="font-psemibold text-sm text-secpurpe">Welcome Back</Text>
                  <InfoBox
                      title={user?.username}
                      containerStyles="mt-0"
                      titleStyles="text-3xl font-pbold text-lightpurpe"
                  />
                </View>
              </View>

              <View className="space-y-8 px-9 h-50 w-50 justify-center items-center">
                <Text className="text-3xl font-pbold text-secpurpe mt-5">Activity</Text>
                <TouchableOpacity 
                  className="bg-secpurpe rounded-[40px] p-3 w-[320px] h-[200px]"
                  onPress={() => router.push('/habits')}
                >
                  <View className="justify-center pt-5 pl-7 space-y-2 ">
                    <View className="flex-row items-center">
                      <Image source={icons.habits} className="w-9 h-9 mr-2 mb-1" />
                      <Text className="text-3xl font-pbold text-gradL">Habits: 1</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Image source={icons.calendar} className="w-9 h-9 mr-2 mb-1" />
                      <Text className="text-3xl font-pbold text-gradL">Daily Log: ✓</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Image source={icons.streak} className="w-9 h-9 mr-2 mb-1" />
                      <Text className="text-3xl font-pbold text-gradL">Streak: 1</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="bg-secpurpe rounded-[40px] p-3 w-[320px] h-[200px]"
                  onPress={() => router.push('/addictions')}
                >
                  <View className="justify-center pt-5 pl-7 space-y-2">
                    <View className="flex-row items-center">
                      <Image source={icons.addictions} className="w-9 h-9 mr-2 mb-1" />
                      <Text className="text-3xl font-pbold text-gradL">Addictions: 1</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Image source={icons.calendar} className="w-9 h-9 mr-2 mb-1" />
                      <Text className="text-3xl font-pbold text-gradL">Daily Log: ✓</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Image source={icons.streak} className="w-9 h-9 mr-2 mb-1" />
                      <Text className="text-3xl font-pbold text-gradL">Streak: 1</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;