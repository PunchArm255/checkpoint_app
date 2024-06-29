import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import {LinearGradient} from 'expo-linear-gradient';

export default function App() {
  return (
    <LinearGradient colors={['#1c063b', '#080019']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View className="w-full justify-center items-center min-h-[85vh] px-4">
            <Image 
               source={images.logo}
               className="w-[320px] h-[150px]"
               resizeMode="contain"
            />
            <Image 
               source={images.cards}
               className="max-w-[380px] w-full h-[300px]"
               resizeMode="contain"
            />
            <View className="relative mt-5">
              <Text className="text-3xl text-secpurpe font-extrabold text-center">
                Track your habits, conquer your addictions, transform your life.
              </Text>
              <CustomButton 
                title="Continue with Email"
                handlePress={() => router.push('/sign-in')}
                containerStyles="mt-7"
              />
              <CustomButton 
                title="Continue without account"
                handlePress={() => router.push('/home')}
                containerStyles="mt-7"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}