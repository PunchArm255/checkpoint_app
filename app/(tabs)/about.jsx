import { StyleSheet, Text, View, Image } from 'react-native';
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
        {/* top */}
        <View className="items-center mt-6">
                <View>
                  <Text className="text-3xl font-pbold text-secpurpe">About</Text>
                </View>
          <Image source={images.about} className="w-[80%] h-[80%]" resizeMode="contain" />

        </View>

        {/* bottom */}
        <View className="items-center mt-[35%]">
          {/*<Image source={images.alx} className="w-[35%] h-[35%]" resizeMode="contain" />*/}
          <View className="mt-1">
                  <Text className="text-xs font-pbold text-secpurpe">© Simo Nassiri - 2024</Text>
                </View>
        </View>
        
      </SafeAreaView>
    </LinearGradient>
  );
};

export default About;
