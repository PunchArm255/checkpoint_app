import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'

import Loader from "../../components/Loader";
import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <>
      <Stack>
        <Stack.Screen 
            name="sign-in"
            options={{
              headerShown: false
            }}
         />
         <Stack.Screen 
            name="sign-up"
            options={{
              headerShown: false
            }}
         />
      </Stack>

      <Loader isLoading={loading} />
    </>
  )
}

export default AuthLayout