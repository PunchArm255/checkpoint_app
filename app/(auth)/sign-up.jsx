import { View, Text, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
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
      const result = await createUser(form.email, form.password, form.username)

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
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[84vh] px-5 my-6">
          <Image source={images.logo}
          resizeMode='contain' className="w-[250px] h-[150]" />
          <Text className="text-2xl text-secpurpe text-bold font-bold">
            Sign up to Checkpoint
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
             containerStyles="mt-7"
             isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-lightpurpe font-regular">
              already accounted bruv?
            </Text>
            <Link href="/sign-in" className="text-lg font-semibold first-letter:text-secpurpe">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  )
}

export default SignUp