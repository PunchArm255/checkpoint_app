import { TouchableOpacity, View, Text } from 'react-native'
import React from 'react'

const CustomButton = ( {title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
       onPress={handlePress}
       activeOpacity={0.7}
       className={`bg-khder rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
       disabled={isLoading}>
      <Text className={`text-2xl text-white font-semibold $textStyles`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton