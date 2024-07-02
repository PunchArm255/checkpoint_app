import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Modal, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const Habits = () => {
  const [habits, setHabits] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [editHabitId, setEditHabitId] = useState(null);
  const [editHabitName, setEditHabitName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const resetHabits = habits.map(habit => ({ ...habit, done: false }));
      setHabits(resetHabits);
    }, 24 * 60 * 60 * 1000); // Reset every 24 hours

    return () => clearInterval(interval);
  }, [habits]);

  const addHabit = () => {
    setHabits([...habits, { id: Date.now().toString(), name: newHabit, done: false }]);
    setNewHabit('');
    setModalVisible(false);
  };

  const toggleDone = id => {
    setHabits(habits.map(habit => habit.id === id ? { ...habit, done: !habit.done } : habit));
  };

  const startEditHabit = id => {
    const habit = habits.find(h => h.id === id);
    setEditHabitId(id);
    setEditHabitName(habit.name);
    setModalVisible(true);
  };

  const saveEditHabit = () => {
    setHabits(habits.map(habit => habit.id === editHabitId ? { ...habit, name: editHabitName } : habit));
    setEditHabitId(null);
    setEditHabitName('');
    setModalVisible(false);
  };

  const deleteHabit = () => {
    setHabits(habits.filter(habit => habit.id !== editHabitId));
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
            <TouchableOpacity onPress={() => startEditHabit(item.id)} className="p-5 py-6 mb-5 bg-secpurpe rounded-[30px]">
              <View className="flex-row items-center justify-between px-2">
                <Text className="text-xl font-pbold text-gradL">{item.name}</Text>
                <TouchableOpacity onPress={() => toggleDone(item.id)}>
                  <Text className="text-lg font-psemibold text-gradL">{item.done ? '✓' : '✗'}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-[10vh] space-y-6">
              <View className="flex justify-center items-start flex-row mb-6">
                <View>
                  <Text className="text-3xl font-pbold text-secpurpe">Addictions</Text>
                </View>
              </View>
              <TouchableOpacity
                   onPress={() => setModalVisible(true)}
                   className="bg-gradR px-4 py-6 rounded-full items-center justify-center">
                  <Text className="text-lightpurpe text-2xl font-psemibold">Add Addiction</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Modal visible={modalVisible} animationType="slide">
          <View className="px-10 bg-secpurpe flex-1 justify-center items-center">
            <TextInput 
              placeholder="Addiction Name"
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
                 className="bg-mainred px-10 py-5 rounded-full items-center justify-center mb-3>" >
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