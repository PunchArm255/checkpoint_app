import { View, Text, Image, Alert, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { getCurrentUser, signIn, fetchHabits, fetchAddictions } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged, setHabits, setAddictions, darkMode } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      const userHabits = await fetchHabits();
      setHabits(userHabits.map(habit => ({ id: habit.$id, ...habit })));
      const userAddictions = await fetchAddictions();
      setAddictions(userAddictions.map(addiction => ({ id: addiction.$id, ...addiction })));

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LinearGradient colors={darkMode ? ['#000000', '#000000'] : ['#1c063b', '#080019']} style={{ flex: 1 }}>
      <Image
        source={images.glow4}
        style={StyleSheet.absoluteFillObject}
        className="w-full h-full absolute contain top-0 left-0"
      />
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center min-h-[75vh] px-7 my-[4%]">
            <Image source={images.logo2} resizeMode='contain' className="w-[280px] h-[80]" tintColor={darkMode ? '#eee0fe' : '#c5b0ef'} />
            <Text className={`text-2xl ${darkMode ? "text-lightpurpe" : "text-secpurpe" } text-bold font-pbold`}>
              Log in to your account
            </Text>
            <FormField 
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e})}
              otherStyles="mt-[20%]"
              keyboardType="email-address"
            />
            <FormField 
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e})}
              otherStyles="mt-7"
            />
            <CustomButton
              title="Sign In"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
            <View className="justify-center pt-5 flex-row gap-2">
            <Text className={`text-lg ${darkMode ? 'text-hliba' : 'text-lightpurpe'} font-pregular`}>
                No account yet?
              </Text>
              <Link href="/sign-up" className={`text-lg font-psemibold ${darkMode ? 'first-letter:text-hliba' : 'first-letter:text-secpurpe'} `}>Sign Up</Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignIn;
