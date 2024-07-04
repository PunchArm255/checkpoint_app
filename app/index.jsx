import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import {LinearGradient} from 'expo-linear-gradient';
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <LinearGradient colors={['#1c063b', '#080019']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View className="w-full justify-center items-center min-h-[88vh] px-4  space-y-1">
            <Image 
               source={images.logo}
               className="w-[320px] h-[150px]"
               resizeMode="contain"
            />
            <Image 
               source={images.cards}
               className="max-w-[420px] w-full h-[340px] mt-[7%]"
               resizeMode="contain"
            />
            <View className="relative mt-[1%] px-4">
              <Text className="text-3xl text-secpurpe font-psemibold text-center">
                Track your habits, conquer your addictions, transform your life.
              </Text>
              <CustomButton 
                title="Continue with Email"
                handlePress={() => router.push('/sign-in')}
                containerStyles="mt-8"
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
};

export default Welcome;