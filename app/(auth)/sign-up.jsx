import { View, Text, Image, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { createUser } from '../../lib/appwrite'

import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <LinearGradient colors={['#1c063b', '#080019']} style={{ flex: 1 }}>
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[84vh] px-5 my-[6%]">
        <Image source={images.logo2}
          resizeMode='contain' className="w-[280px] h-[80]" />
          <Text className="text-2xl text-secpurpe text-bold font-pbold">
            Create your account
          </Text>
          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e})}
            otherStyles="mt-10"
          />
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e})}
            otherStyles="mt-7"
          />
          <CustomButton
             title="Sign Up"
             handlePress={submit}
             containerStyles="mt-9"
             isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-lightpurpe font-pregular">
              Already signed up?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold first-letter:text-secpurpe">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  )
}

export default SignUp