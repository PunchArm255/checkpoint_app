import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Modal, Image } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from '../../constants';
import { BarIndicator } from 'react-native-indicators';

const Habits = () => {
  const { habits, handleAddHabit, handleUpdateHabit, handleDeleteHabit, toggleDone, darkMode } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [editHabitId, setEditHabitId] = useState(null);
  const [editHabitName, setEditHabitName] = useState('');
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const router = useRouter();

  const addHabit = async () => {
    setIsAddingHabit(true);
    await handleAddHabit({ name: newHabit, done: false });
    setNewHabit('');
    setModalVisible(false);
    setIsAddingHabit(false);
  };

  const startEditHabit = id => {
    const habit = habits.find(h => h.id === id);
    setEditHabitId(id);
    setEditHabitName(habit.name);
    setModalVisible(true);
  };

  const saveEditHabit = async () => {
    await handleUpdateHabit(editHabitId, { name: editHabitName });
    setEditHabitId(null);
    setEditHabitName('');
    setModalVisible(false);
  };

  const deleteHabit = async () => {
    await handleDeleteHabit(editHabitId);
    setEditHabitId(null);
    setEditHabitName('');
    setModalVisible(false);
  };

  return (
    <LinearGradient colors={darkMode ? ['#000000', '#000000'] : ['#1c063b', '#080019']} style={{ flex: 1 }}>
      <Image
        source={images.glow3}
        style={StyleSheet.absoluteFillObject}
        className="w-full h-full absolute contain top-0 left-0"
      />
      <SafeAreaView>
        <FlatList 
          data={habits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="px-7">
              <TouchableOpacity 
                  onPress={() => startEditHabit(item.id)} 
                  className={`p-5 py-6 mb-5 rounded-[30px] border-2 ${darkMode ? 'border-fakeGlass' : 'border-hapurpe2'}`}
                  style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#c5b0ef'}}>
                <View className="flex-row items-center justify-between px-2">
                  <Text className={`text-xl font-pbold ${darkMode ? 'text-hliba' : 'text-gradL'}`}>{item.name}</Text>
                  <TouchableOpacity 
                    className={`rounded-full w-8 h-8  ${darkMode ? 'border-fakeGlass border-2' : 'undefined'}`}
                    onPress={() => toggleDone(item.id)}
                    style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#2c1f59'}}>
                    <Text className={`text-lg font-psemibold justify-center items-center ${darkMode ? 'text-hliba' : 'text-secpurpe'}`}>{item.done ? '  ✓' : '  ✗'}</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-[20%] space-y-6">
              <View className="flex justify-center items-start flex-row mb-6">
                <View>
                  <Text className={`font-pbold text-3xl ${darkMode ? 'text-hliba' : 'text-secpurpe'}`}>Habits</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className='px-4 py-6 rounded-full items-center justify-center'
                style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.16)' : '#2c1f59'}}>
                <Text className={`text-2xl font-psemibold ${darkMode ? 'text-hliba' : 'text-secpurpe'}`}>Add Habit</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Modal visible={modalVisible} animationType="slide">
          <View className="px-10 bg-secpurpe flex-1 justify-center items-center">
            {isAddingHabit ? (
              <BarIndicator count={5} color={darkMode ? "#18154a" : "#18154a"} />
            ) : (
              <>
                <TextInput 
                  placeholder="Habit Name"
                  value={editHabitId ? editHabitName : newHabit}
                  onChangeText={text => editHabitId ? setEditHabitName(text) : setNewHabit(text)}
                  className="border-[3px] border-gradL p-2 w-full mb-4 rounded-xl font-psemibold text-gradL text-xl"
                />
                <View className="mb-4">
                  <TouchableOpacity 
                    className="bg-gradR px-10 py-5 rounded-full items-center justify-center mb-4"
                    onPress={editHabitId ? saveEditHabit : addHabit}>
                    <Text className="font-psemibold text-secpurpe text-xl">{editHabitId ? "Edit" : "Save"}</Text>
                  </TouchableOpacity>
                  {editHabitId && (
                    <TouchableOpacity 
                      onPress={deleteHabit} 
                      className="bg-mainred px-10 py-5 rounded-full items-center justify-center mb-3">
                      <Text className="font-psemibold text-secred text-xl">Delete</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity 
                    className="bg-mainblue px-10 py-5 rounded-full items-center justify-center mt-1"
                    onPress={() => {
                      setModalVisible(false);
                      setEditHabitId(null);
                      setEditHabitName('');
                    }}>
                    <Text className="font-psemibold text-secblue text-xl">Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Habits;

const styles = StyleSheet.create({});
