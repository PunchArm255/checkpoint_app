import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { signIn } from '../../lib/appwrite'
import { Alert } from 'react-native'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setisSubmitting] = useState(false)
  const submit = async () => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields')
    }

    setisSubmitting(true);

    try {
      const result = await signIn(form.email, form.password)

      // set to global state perhaps
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setisSubmitting(false)
    }
    createUser();
  }
  return (
    <LinearGradient colors={['#1c063b', '#080019']} style={{ flex: 1 }}>
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[84vh] px-7 my-6">
          <Image source={images.logo2}
          resizeMode='contain' className="w-[300px] h-[150]" />
          <Text className="text-2xl text-secpurpe text-bold font-pbold">
            Log in to your account
          </Text>
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
             title="Sign In"
             handlePress={submit}
             containerStyles="mt-7"
             isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-lightpurpe font-pregular">
              no account lol?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold first-letter:text-secpurpe">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  )
}

export default SignIn