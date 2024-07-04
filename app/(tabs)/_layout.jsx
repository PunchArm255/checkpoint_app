import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from '../../constants';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from "../../context/GlobalProvider";

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
    );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#c5b0ef',
        tabBarInactiveTintColor: '#eee0fe',
        tabBarStyle: styles.tabBar,
        safeAreaInsets: { bottom: 20 },
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
        <Tabs.Screen
           name="habits"
           options={{ 
            headerShown: false,
            tabBarButton: () => null }}
        />
        <Tabs.Screen
           name="addictions"
           options={{
            headerShown: false,
            tabBarButton: () => null }}
        />

        <Tabs.Screen
           name="about"
           options={{
            headerShown: false,
            tabBarButton: () => null }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#2c1f59',
    borderTopWidth: 0,
    height: '9.5%',
    width: '70%',
    borderRadius: 40,
    position: 'absolute',
    left: '15%',
    right: '5%',
    bottom: 10,
    elevation: 0, // for Android shadow
    shadowColor: '#c5b0ef', // iOS shadow
    shadowOpacity: 0.1, // iOS shadow
    shadowOffset: { width: 0, height: 4 }, // iOS shadow
    shadowRadius: 20, // iOS shadow
    marginBottom: 20,
  }
});
