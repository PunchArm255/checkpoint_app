import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { icons, images } from '../../constants';
import InfoBox from "../../components/InfoBox";
import { useGlobalContext } from "../../context/GlobalProvider";
import { StyleSheet } from 'react-native-web';

const Home = () => {
  const { user, habits, habitStreak, addictions, addictionStreak, darkMode } = useGlobalContext();
  const router = useRouter();

  const habitsLoggedToday = habits.every(habit => habit.done);
  const addictionsLoggedToday = addictions.every(addiction => addiction.done);

  return (
    <LinearGradient colors={darkMode ? ['#000000', '#000000'] : ['#1c063b', '#080019']} style={{ flex: 1 }}>
      <Image
        source={images.glow}
        style={StyleSheet.absoluteFillObject}
        className="w-full h-full absolute contain top-0 left-0"
      />
      <SafeAreaView>
        <FlatList 
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-[1%]">
              <View className="flex justify-center items-start flex-row mb-[1%]">
                <View>
                  <Text className={`font-psemibold text-sm ${darkMode ? 'text-hliba' : 'text-secpurpe'}`}>Welcome Back</Text>
                  <InfoBox
                      title={user?.username}
                      containerStyles="mt-0"
                      titleStyles={`text-3xl font-pbold ${darkMode ? 'text-hliba' : 'text-lightpurpe'}`}
                  />
                </View>
              </View>

              <View className="space-y-8 px-9 h-50 w-50 justify-center items-center">
                <Text className={`text-3xl font-pbold mt-5 ${darkMode ? 'text-hliba' : 'text-secpurpe'}`}>Activity</Text>
                <TouchableOpacity 
                  className={`rounded-[40px] p-3 w-[320px] h-[200px]  border-2 ${darkMode ? 'border-fakeGlass' : 'border-hapurpe2'}`}
                  onPress={() => router.push('/habits')}
                  style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#c5b0ef'}}
                >
                  <View className="justify-center pt-5 pl-7 space-y-2 ">
                    <View className="flex-row items-center">
                      <Image source={icons.habits} className="w-9 h-9 mr-2 mb-1" tintColor={darkMode ? '#efefef' : '#18154a'} />
                      <Text className={`text-3xl font-pbold ${darkMode ? 'text-hliba' : 'text-gradL'}`}>Habits: {habits.length}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Image source={icons.calendar} className="w-9 h-9 mr-2 mb-1" tintColor={darkMode ? '#efefef' : '#18154a'} />
                      <Text className={`text-3xl font-pbold ${darkMode ? 'text-hliba' : 'text-gradL'}`}>Daily Log: {habitsLoggedToday ? '✓' : '✗'}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Image source={icons.streak} className="w-9 h-9 mr-2 mb-1" tintColor={darkMode ? '#efefef' : '#18154a'} />
                      <Text className={`text-3xl font-pbold ${darkMode ? 'text-hliba' : 'text-gradL'}`}>Streak: {habitStreak}</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  className={`rounded-[40px] p-3 w-[320px] h-[200px] border-2 ${darkMode ? 'border-fakeGlass' : 'border-hapurpe2'}`}
                  onPress={() => router.push('/addictions')}
                  style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#c5b0ef'}}
                >
                  <View className="justify-center pt-5 pl-7 space-y-2">
                    <View className="flex-row items-center">
                      <Image source={icons.addictions} className="w-9 h-9 mr-2 mb-1" tintColor={darkMode ? '#efefef' : '#18154a'} />
                      <Text className={`text-3xl font-pbold ${darkMode ? 'text-hliba' : 'text-gradL'}`}>Addictions: {addictions.length}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Image source={icons.calendar} className="w-9 h-9 mr-2 mb-1" tintColor={darkMode ? '#efefef' : '#18154a'} />
                      <Text className={`text-3xl font-pbold ${darkMode ? 'text-hliba' : 'text-gradL'}`}>Daily Log: {addictionsLoggedToday ? '✓' : '✗'}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Image source={icons.streak} className="w-9 h-9 mr-2 mb-1" tintColor={darkMode ? '#efefef' : '#18154a'} />
                      <Text className={`text-3xl font-pbold ${darkMode ? 'text-hliba' : 'text-gradL'}`}>Streak: {addictionStreak}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          renderItem={null} // FlatList needs this prop, but we don't need to render items here
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
