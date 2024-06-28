import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setisSubmitting] = useState(false)
  const submit = () => {

  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[84vh] px-5 my-6">
          <Image source={images.logo}
          resizeMode='contain' className="w-[250px] h-[150] justify-center" />
          <Text className="text-2xl text-khder text-bold font-bold">
            Log in to Checkpoint
          </Text>
          <FormField 
            title="Email"
            value="form.email"
            handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value="form.password"
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
            <Text className="text-lg text-black font-regular">
              Don't have an account hh?
            </Text>
            <Link href="/sign-up" className="text-lg font-semibold first-letter:text-khder">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn