import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from '../../constants';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from "../../context/GlobalProvider";

const createStyles = (darkMode) => StyleSheet.create({
  tabBar: {
    backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#2c1f59',
    borderTopWidth: 0,
    height: '9.5%',
    width: '70%',
    borderRadius: 40,
    position: 'absolute',
    left: '15%',
    right: '5%',
    bottom: 10,
    elevation: darkMode ? 0 : 8, // for Android shadow
    shadowColor: darkMode ? '#efefef' : '#6100bc', // iOS shadow
    shadowOpacity: 0.1, // iOS shadow
    shadowOffset: { width: 0, height: 4 }, // iOS shadow
    shadowRadius: 20, // iOS shadow
    marginBottom: 20,
    borderWidth: 1, // Add border width
    borderColor: darkMode ? 'rgba(239, 239, 239, 0.16)' : '#6100bc',
  }
});

const TabIcon = ({ icon, color, name, focused, darkMode }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-8 h-8"
      />
      {/*<Text className={`${focused ? 'font-pbold text-secpurpe' : 'font-psemibold text-lightpurpe'} text-xs`}>
         {name}
      </Text>}*/}
    </View>
  );
};

const TabsLayout = () => {
  const { darkMode } = useGlobalContext();
  const styles = createStyles(darkMode);

  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: darkMode ? '#efefef' : '#9a69f5',
        tabBarInactiveTintColor: darkMode ? '#8c8c8c' : '#eee0fe',
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
                darkMode={darkMode}
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
                darkMode={darkMode}
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
                darkMode={darkMode}
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
        <Tabs.Screen
          name="language"
          options={{
            headerShown: false,
            tabBarButton: () => null }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
