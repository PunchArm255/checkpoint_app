import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useGlobalContext } from "../context/GlobalProvider";
import LoadingScreen from '../components/LoadingScreen'; // Import the LoadingScreen component

const Welcome = () => {
  const { loading, isLogged, darkMode } = useGlobalContext();

  if (loading) {
    return <LoadingScreen />;
  }

  if (isLogged) {
    return <Redirect href="/home" />;
  }

  return (
    <LinearGradient colors={darkMode ? ['#000000', '#000000'] : ['#1c063b', '#080019']} style={{ flex: 1 }}>
      <Image
        source={images.glow3}
        style={StyleSheet.absoluteFillObject}
        className="w-full h-full absolute contain top-0 left-0"
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View className="w-full justify-center items-center min-h-[88vh] px-4  space-y-1">
            <Image 
               source={darkMode ? images.logo3 : images.logo}
               className="w-[320px] h-[150px]"
               resizeMode="contain"
            />
            <Image 
               source={darkMode ? images.cards2 : images.cards}
               className="max-w-[420px] w-full h-[340px] mt-[7%]"
               resizeMode="contain"
            />
            <View className="relative mt-[1%] px-4">
              <Text className={`text-3xl ${darkMode ? 'text-hliba' : 'text-secpurpe'} font-psemibold text-center`}>
                Track your habits, conquer your addictions, transform your life.
              </Text>
              <CustomButton 
                title="Continue with Email"
                handlePress={() => router.push('/sign-in')}
                containerStyles="mt-8"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Welcome;
