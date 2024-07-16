import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { icons } from '../constants'
import { useGlobalContext } from "../context/GlobalProvider";

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  const { darkMode } = useGlobalContext();
  const [showPassword, setshowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className={`text-base ${darkMode ? 'text-lightpurpe' : 'text-secpurpe'} font-pmedium`}>{title}</Text>
      <View className="w-full h-16 px-4 bg-lightpurpe rounded-2xl focus:border-khder items-center flex-row">
        <TextInput 
          className="flex-1 text-mainpurpe font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#FFFFFF"
          onChangeText={handleChangeText}
          secureTextEntry={title=== 'Password' && !showPassword}
        />
        {title=== 'Password' && (
            <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
               <Image source={!showPassword ? icons.eye : icons.eyeHide} className=":w-6 h-6" resizeMode='contain'
               />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField