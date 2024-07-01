import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
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
            <Text className={`${focused ? 'font-pbold text-secpurpe' : 'font-pregular text-lightpurpe'} text-xs`}>
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
        tabBarActiveTintColor: '#c5b0ef',
        tabBarInactiveTintColor: '#eee0fe',
        tabBarStyle: {
            backgroundColor: '#2c1f59',
            borderTopWidth: 0,
            height: 84,
            width: 300,
            borderRadius: 40,
            position: 'absolute',
            left: 10,
            right: 10,
            bottom: 10,
            elevation: 5, // for Android shadow
            shadowColor: '#2c1f59', // iOS shadow
            shadowOpacity: 0.1, // iOS shadow
            shadowOffset: { width: 0, height: 4 }, // iOS shadow
            shadowRadius: 20, // iOS shadow
            marginLeft: 63,
            marginBottom: 20,
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

export default TabsLayout;