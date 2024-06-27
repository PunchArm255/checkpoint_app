import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router';
import { useFonts } from 'expo-font';
import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image 
               source={icon}
               resizeMode="contain"
               tintColor={color}
               className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-extrabold text-green-600' : 'font-regular text-green-700'} text-xs`}>
               {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#00cc6a',
        tabBarInactiveTintColor: '#87c2a6',
        tabBarStyle: {
            height: 84,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            overflow: 'hidden',
            position: 'absolute',
            left: 0,
            bottom: 0,
            right: 0,
        }
      }}>
        <Tabs.Screen
           name="home"
           options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
                <TabIcon 
                   icon={icons.home}
                   color={color}
                   name="Home"
                   focused={focused}
                />
            )
           }}
        />
        <Tabs.Screen
           name="profile"
           options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
                <TabIcon 
                   icon={icons.profile}
                   color={color}
                   name="Profile"
                   focused={focused}
                />
            )
           }}
        />
        <Tabs.Screen
           name="settings"
           options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
                <TabIcon 
                   icon={icons.settings}
                   color={color}
                   name="Settings"
                   focused={focused}
                />
            )
           }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout