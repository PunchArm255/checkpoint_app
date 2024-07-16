import { StyleSheet, Text, View, TouchableOpacity, Switch, FlatList, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { images } from '../../constants';
import { useGlobalContext } from "../../context/GlobalProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const { darkMode, setDarkMode } = useGlobalContext();
  const router = useRouter();

  const handleDarkModeToggle = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };

  return (
    <LinearGradient colors={darkMode ? ['#000000', '#000000'] : ['#1c063b', '#080019']} style={{ flex: 1 }}>
      <Image
        source={images.glow2}
        style={StyleSheet.absoluteFillObject}
        className="w-full h-full absolute contain top-0 left-0"
      />
      <SafeAreaView>
        <FlatList 
          ListHeaderComponent={() => (
            <View className="my-6 px-[9%] space-y-6">
              <View className="flex justify-center items-start flex-row mb-6">
                <View>
                  <Text className={`font-pbold text-3xl ${darkMode ? 'text-hliba' : 'text-secpurpe'}`}>Settings</Text>
                </View>
              </View>

              {/* Account Settings Box */}
              <View className="rounded-[30px] p-4 space-y-4" style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#c5b0ef'}}>
                <TouchableOpacity className="p-4 rounded-[22px]" style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#e8d1ff'}}>
                  <Text className={`text-2xl font-pbold ${darkMode ? 'text-hliba' : 'text-gradL'}`}>Account Settings</Text>
                </TouchableOpacity>
              </View>

              {/* Preferences Box */}
              <View className="rounded-[30px] p-4 space-y-4" style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#c5b0ef'}}>
                <TouchableOpacity className="p-4 rounded-[22px]" style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#e8d1ff'}}>
                  <Text className={`text-2xl font-pbold ${darkMode ? 'text-hliba' : 'text-gradL'}`} onPress={() => router.push('/language')}>Language</Text>
                </TouchableOpacity>
                <View className="p-4 rounded-[22px] flex-row justify-between items-center" style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#e8d1ff'}}>
                  <Text className={`text-2xl font-pbold ${darkMode ? 'text-hliba' : 'text-gradL'}`}>Dark Mode</Text>
                  <Switch
                    trackColor={{ false: "#c5b0ef", true: "rgba(239, 239, 239, 0.19)" }}
                    thumbColor={darkMode ? "#efefef" : "#2c1f59"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={handleDarkModeToggle}
                    value={darkMode}
                  />
                </View>
                <TouchableOpacity className="p-4 rounded-[22px]" style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#e8d1ff'}}>
                  <Text className={`text-2xl font-pbold ${darkMode ? 'text-hliba' : 'text-gradL'}`}>Accessibility</Text>
                </TouchableOpacity>
              </View>

              {/* About Box */}
              <View className="rounded-[30px] p-4 space-y-4" style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#c5b0ef'}}>
                <TouchableOpacity className="p-4 rounded-[22px]" onPress={() => router.push('/about')} style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#e8d1ff'}}>
                  <Text className={`text-2xl font-pbold ${darkMode ? 'text-hliba' : 'text-gradL'}`}>About</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;

const styles = StyleSheet.create({});
