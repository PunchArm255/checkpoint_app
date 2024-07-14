// CustomAlert.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGlobalContext } from "../context/GlobalProvider";

const CustomAlert = ({ visible, title, message, onClose }) => {
  const { darkMode } = useGlobalContext();

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.alertBox, darkMode && styles.darkMode]}>
          <Text style={[styles.title, darkMode && styles.darkTitle]}>{title}</Text>
          <Text style={[styles.message, darkMode && styles.darkMessage]}>{message}</Text>
          <TouchableOpacity style={[styles.button, darkMode && styles.darkButton]} onPress={onClose}>
            <Text style={[styles.buttonText, darkMode && styles.darkButtonText]}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  alertBox: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  darkMode: {
    backgroundColor: '#333',
  },
  darkTitle: {
    color: '#fff',
  },
  darkMessage: {
    color: '#ddd',
  },
  darkButton: {
    backgroundColor: '#555',
  },
  darkButtonText: {
    color: '#fff',
  },
});

export default CustomAlert;
