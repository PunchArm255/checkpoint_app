import { StyleSheet, Text, View, TouchableOpacity, Switch, FlatList } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(previousState => !previousState);
  };

  return (
    <LinearGradient colors={['#1c063b', '#080019']} style={{ flex: 1 }}>
      <SafeAreaView>
        <FlatList 
          ListHeaderComponent={() => (
            <View className="my-6 px-[9%] space-y-6">
              <View className="flex justify-center items-start flex-row mb-6">
                <View>
                  <Text className="text-3xl font-pbold text-secpurpe">Settings</Text>
                </View>
              </View>

              {/* Account Settings Box */}
              <View className="bg-secpurpe rounded-[30px] p-4 space-y-4">
                <TouchableOpacity className="p-4 bg-savpurpe rounded-[22px]">
                  <Text className="text-2xl font-pbold text-gradR">Account Settings</Text>
                </TouchableOpacity>
              </View>

              {/* Preferences Box */}
              <View className="bg-secpurpe rounded-[30px] p-4 space-y-4">
                <TouchableOpacity className="p-4 bg-savpurpe rounded-[22px]">
                  <Text className="text-2xl font-pbold text-gradR">Language</Text>
                </TouchableOpacity>
                <View className="p-4 bg-savpurpe rounded-[22px] flex-row justify-between items-center">
                  <Text className="text-2xl font-pbold text-gradR">Dark Mode</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={handleDarkModeToggle}
                    value={isDarkMode}
                  />
                </View>
                <TouchableOpacity className="p-4 bg-savpurpe rounded-[22px]">
                  <Text className="text-2xl font-pbold text-gradR">Accessibility</Text>
                </TouchableOpacity>
              </View>

              {/* About Box */}
              <View className="bg-secpurpe rounded-[30px] p-4 space-y-4">
                <TouchableOpacity className="p-4 bg-savpurpe rounded-[22px]">
                  <Text className="text-2xl font-pbold text-gradR">About</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;

const styles = StyleSheet.create({});
