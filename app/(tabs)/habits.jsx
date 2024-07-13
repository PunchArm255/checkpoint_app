import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useGlobalContext } from "../../context/GlobalProvider";

const Habits = () => {
  const { habits, handleAddHabit, handleUpdateHabit, handleDeleteHabit } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [editHabitId, setEditHabitId] = useState(null);
  const [editHabitName, setEditHabitName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      habits.forEach(habit => handleUpdateHabit(habit.id, { done: false }));
    }, 24 * 60 * 60 * 1000); // Reset every 24 hours

    return () => clearInterval(interval);
  }, [habits]);

  const addHabit = () => {
    handleAddHabit({ name: newHabit, done: false });
    setNewHabit('');
    setModalVisible(false);
  };

  const toggleDone = id => {
    const habit = habits.find(habit => habit.id === id);
    handleUpdateHabit(id, { done: !habit.done });
  };

  const startEditHabit = id => {
    const habit = habits.find(h => h.id === id);
    setEditHabitId(id);
    setEditHabitName(habit.name);
    setModalVisible(true);
  };

  const saveEditHabit = () => {
    handleUpdateHabit(editHabitId, { name: editHabitName });
    setEditHabitId(null);
    setEditHabitName('');
    setModalVisible(false);
  };

  const deleteHabit = () => {
    handleDeleteHabit(editHabitId);
    setEditHabitId(null);
    setEditHabitName('');
    setModalVisible(false);
  };

  return (
    <LinearGradient colors={['#1c063b', '#080019']} style={{ flex: 1 }}>
      <SafeAreaView>
        <FlatList 
          data={habits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="px-7">
              <TouchableOpacity onPress={() => startEditHabit(item.id)} className="p-5 py-6 mb-5 bg-secpurpe rounded-[30px] border-hapurpe border-2">
                <View className="flex-row items-center justify-between px-2">
                  <Text className="text-xl font-pbold text-gradL">{item.name}</Text>
                  <TouchableOpacity 
                    className="bg-gradR rounded-full w-8 h-8"
                    onPress={() => toggleDone(item.id)}>
                    <Text className="text-lg font-psemibold text-secpurpe items-center justify-center">{item.done ? '  ✓' : '  ✗'}</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-[20%] space-y-6">
              <View className="flex justify-center items-start flex-row mb-6">
                <View>
                  <Text className="text-3xl font-pbold text-secpurpe">Habits</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-gradR px-4 py-6 rounded-full items-center justify-center">
                <Text className="text-lightpurpe text-2xl font-psemibold">Add Habit</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Modal visible={modalVisible} animationType="slide">
          <View className="px-10 bg-secpurpe flex-1 justify-center items-center">
            <TextInput 
              placeholder="Habit Name"
              value={editHabitId ? editHabitName : newHabit}
              onChangeText={text => editHabitId ? setEditHabitName(text) : setNewHabit(text)}
              className="border-[3px] border-gradL p-2 w-full mb-4 rounded-xl font-psemibold text-gradL text-xl"
            />
            <View className="mb-4">
              <TouchableOpacity 
                className="bg-gradR px-10 py-5 rounded-full items-center justify-center mb-3"
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
                className="bg-mainblue px-10 py-5 rounded-full items-center justify-center mt-3"
                onPress={() => {
                  setModalVisible(false);
                  setEditHabitId(null);
                  setEditHabitName('');
                }}>
                <Text className="font-psemibold text-secblue text-xl">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Habits;

const styles = StyleSheet.create({});
