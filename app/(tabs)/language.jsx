import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { useGlobalContext } from "../../context/GlobalProvider";

const About = () => {
  const { darkMode } = useGlobalContext();
  return (
    <LinearGradient colors={darkMode ? ['#000000', '#000000'] : ['#1c063b', '#080019']} style={{ flex: 1 }}>
      <Image
        source={images.glow3}
        style={StyleSheet.absoluteFillObject}
        className="w-full h-full absolute contain top-0 left-0"
      />
      <SafeAreaView className="flex-1 justify-between px-4 mb-[50%]">
        <View className="items-center mt-6">
                <View>
                <Text className={`font-pbold text-3xl ${darkMode ? 'text-hliba' : 'text-secpurpe'}`}>Language</Text>
                </View>
                <View className="py-10 ">
                <TouchableOpacity 
                  className={`px-[15vh] py-6 rounded-[30px] border-2 ${darkMode ? 'border-fakeGlass' : 'border-hapurpe2'}`}
                  style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#c5b0ef'}}>
                    <View className="flex-row items-center justify-between">
                    <Text className={`text-2xl font-pbold ${darkMode ? 'text-hliba' : 'text-gradL'}`}>English</Text>
                    </View>
                  </TouchableOpacity>
                </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default About;
