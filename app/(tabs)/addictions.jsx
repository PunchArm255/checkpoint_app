import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Modal, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from '../../constants';
import { BarIndicator } from 'react-native-indicators';

const Addictions = () => {
  const { addictions, handleAddAddiction, handleUpdateAddiction, handleDeleteAddiction, toggleAddictionDone, darkMode } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [newAddiction, setNewAddiction] = useState('');
  const [editAddictionId, setEditAddictionId] = useState(null);
  const [editAddictionName, setEditAddictionName] = useState('');
  const [isAddingAddiction, setIsAddingAddiction] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const resetAddictionsDaily = () => {
      const now = new Date();
      const nextReset = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
      const timeUntilReset = nextReset - now;

      const timeout = setTimeout(() => {
        addictions.forEach(addiction => handleUpdateAddiction(addiction.id, { done: false }));
        resetAddictionsDaily(); // Schedule the next reset
      }, timeUntilReset);

      return () => clearTimeout(timeout);
    };

    resetAddictionsDaily();
  }, [addictions]);

  const addAddiction = async () => {
    setIsAddingAddiction(true);
    await handleAddAddiction({ name: newAddiction, done: false });
    setNewAddiction('');
    setModalVisible(false);
    setIsAddingAddiction(false);
  };

  const startEditAddiction = id => {
    const addiction = addictions.find(a => a.id === id);
    setEditAddictionId(id);
    setEditAddictionName(addiction.name);
    setModalVisible(true);
  };

  const saveEditAddiction = async () => {
    await handleUpdateAddiction(editAddictionId, { name: editAddictionName });
    setEditAddictionId(null);
    setEditAddictionName('');
    setModalVisible(false);
  };

  const deleteAddiction = async () => {
    await handleDeleteAddiction(editAddictionId);
    setEditAddictionId(null);
    setEditAddictionName('');
    setModalVisible(false);
  };

  return (
    <LinearGradient colors={darkMode ? ['#000000', '#000000'] : ['#1c063b', '#080019']} style={{ flex: 1 }}>
      <Image
        source={images.glow4}
        style={StyleSheet.absoluteFillObject}
        className="w-full h-full absolute contain top-0 left-0"
      />
      <SafeAreaView>
        <FlatList 
          data={addictions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="px-7">
              <TouchableOpacity 
                  onPress={() => startEditAddiction(item.id)} 
                  className={`p-5 py-6 mb-5 rounded-[30px] border-2 ${darkMode ? 'border-fakeGlass' : 'border-hapurpe2'}`}
                  style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.13)' : '#c5b0ef'}}>
                <View className="flex-row items-center justify-between px-2">
                  <Text className={`text-xl font-pbold ${darkMode ? 'text-hliba' : 'text-gradL'}`}>{item.name}</Text>
                  <TouchableOpacity 
                    className={`rounded-full w-8 h-8  ${darkMode ? 'border-fakeGlass border-2' : 'undefined'}`}
                    onPress={() => toggleAddictionDone(item.id)}
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
                  <Text className={`font-pbold text-3xl ${darkMode ? 'text-hliba' : 'text-secpurpe'}`}>Addictions</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-gradR px-4 py-6 rounded-full items-center justify-center"
                style={{backgroundColor: darkMode ? 'rgba(239, 239, 239, 0.16)' : '#2c1f59'}}>
                <Text className={`text-2xl font-psemibold ${darkMode ? 'text-hliba' : 'text-secpurpe'}`}>Add Addiction</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Modal visible={modalVisible} animationType="slide">
        <View className={`px-10 ${darkMode ? 'bg-black' : 'bg-secpurpe'} flex-1 justify-center items-center`}>
            {isAddingAddiction ? (
              <BarIndicator count={5} color={darkMode ? "#18154a" : "#18154a"} />
            ) : (
              <>
                <TextInput 
                  placeholder="Type your addiction"
                  placeholderTextColor={darkMode ? 'rgba(239, 239, 239, 0.30)' : 'undefined'}
                  value={editAddictionId ? editAddictionName : newAddiction}
                  onChangeText={text => editAddictionId ? setEditAddictionName(text) : setNewAddiction(text)}
                  className={`border-[3px] text-lg p-3 w-full mb-4 rounded-2xl font-psemibold ${darkMode ? 'border-fakeGlass text-hliba bg-fakeGlass ' : 'border-gradL text-gradL'} `}
                />
                <View className="mb-4">
                  <TouchableOpacity 
                    className={` ${darkMode ? 'bg-fakeGlass border-2 border-fakeGlass' : 'bg-gradR'} px-10 py-5 rounded-full items-center justify-center mb-4`}
                    onPress={editAddictionId ? saveEditAddiction : addAddiction}>
                    <Text className={`font-psemibold ${darkMode ? 'text-hliba' : 'text-secpurpe'}  text-xl`}>{editAddictionId ? "Edit" : "Save"}</Text>
                  </TouchableOpacity>
                  {editAddictionId && (
                    <TouchableOpacity 
                      onPress={deleteAddiction} 
                      className={` ${darkMode ? 'bg-fakeGlass border-2 border-fakeGlass' : 'bg-mainred'}  px-10 py-5 rounded-full items-center justify-center mb-3`}>
                      <Text className="font-psemibold text-secred text-xl">Delete</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity 
                    className={`${darkMode ? 'bg-fakeGlass border-2 border-fakeGlass' : 'bg-mainblue'} px-10 py-5 rounded-full items-center justify-center mt-1`}
                    onPress={() => {
                      setModalVisible(false);
                      setEditAddictionId(null);
                      setEditAddictionName('');
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

export default Addictions;

const styles = StyleSheet.create({});
