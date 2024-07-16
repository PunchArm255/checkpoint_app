import { TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import { useGlobalContext } from "../context/GlobalProvider";

const CustomButton = ( {title, handlePress, containerStyles, textStyles, isLoading }) => {
  const { darkMode } = useGlobalContext();
  return (
    <TouchableOpacity 
       onPress={handlePress}
       activeOpacity={0.7}
       className={`${darkMode ? 'border-fakeGlass border-2' : 'undefined'} rounded-2xl min-h-[65px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
       disabled={isLoading}
       style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.20)' : '#c5b0ef'}}>
      <Text className={`text-2xl ${darkMode ? 'text-hliba' : 'text-mainpurpe'} font-psemibold $textStyles`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton