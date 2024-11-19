import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Início</Text>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('TransactionAnalysis')}
          >
            <Text style={styles.buttonText}>Análise de transação</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('RequestForm')}
          >
            <Text style={styles.buttonText}>Cadastro de transação</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, { alignSelf: 'flex-start', marginLeft: 34 }]}
          onPress={() => navigation.navigate('ChatBot')}
        >
          <Text style={styles.buttonText}>ChatBot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#0F303E',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FAF9F6',
    textAlign: 'center',
  },
  logoutButton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  buttonContainer: {
    paddingTop: 50,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0F303E',
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FAF9F6',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;