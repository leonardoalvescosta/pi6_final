import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ApiService from '../services/api_service';

const RequestFormScreen = () => {
  const navigation = useNavigation();
  const apiService = new ApiService();

  const [formData, setFormData] = useState({
    cc_num: '',
    merchant: '',
    category: '',
    amt: '',
    first: '',
    last: '',
    gender: '',
    street: '',
    city: '',
    state: '',
    lat: '',
    long: '',
    city_pop: '',
    job: '',
    dob: '',
    trans_num: '',
    unix_time: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    const missingFields = Object.entries(formData).filter(([_, value]) => value.trim() === '');
    if (missingFields.length > 0) {
      Alert.alert('Erro', 'Atenção: Todos os campos deste formulário são obrigatórios.');
      return;
    }

    const transaction = {
      ...formData,
      cc_num: formData.cc_num.toString(),
      amt: parseFloat(formData.amt),
      lat: parseFloat(formData.lat),
      long: parseFloat(formData.long),
      city_pop: parseInt(formData.city_pop, 10),
      unix_time: parseInt(formData.unix_time, 10),
    };

    try {
      await apiService.createTransaction(transaction);
      setSuccessMessage('Transação cadastrada com sucesso!');
      setTimeout(() => {
        setSuccessMessage('');
        navigation.navigate('Home');
      }, 5000);
    } catch (error) {
      Alert.alert('Erro', `Erro ao cadastrar a transação: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FAF9F6" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cadastrar uma nova transação</Text>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        {successMessage ? (
          <Text style={styles.successMessage}>{successMessage}</Text>
        ) : (
          <>
            <Text style={styles.label}>Número do Cartão</Text>
            <TextInput
              style={styles.input}
              value={formData.cc_num}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('cc_num', value)}
            />

            <Text style={styles.label}>Nome do Comerciante</Text>
            <TextInput
              style={styles.input}
              value={formData.merchant}
              onChangeText={(value) => handleInputChange('merchant', value)}
            />

            <Text style={styles.label}>Categoria da Transação</Text>
            <TextInput
              style={styles.input}
              value={formData.category}
              onChangeText={(value) => handleInputChange('category', value)}
            />

            <Text style={styles.label}>Valor da Transação</Text>
            <TextInput
              style={styles.input}
              value={formData.amt}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('amt', value)}
            />

            <Text style={styles.label}>Primeiro Nome</Text>
            <TextInput
              style={styles.input}
              value={formData.first}
              onChangeText={(value) => handleInputChange('first', value)}
            />

            <Text style={styles.label}>Último Nome</Text>
            <TextInput
              style={styles.input}
              value={formData.last}
              onChangeText={(value) => handleInputChange('last', value)}
            />

            <Text style={styles.label}>Gênero</Text>
            <TextInput
              style={styles.input}
              value={formData.gender}
              onChangeText={(value) => handleInputChange('gender', value)}
            />

            <Text style={styles.label}>Endereço</Text>
            <TextInput
              style={styles.input}
              value={formData.street}
              onChangeText={(value) => handleInputChange('street', value)}
            />

            <Text style={styles.label}>Cidade</Text>
            <TextInput
              style={styles.input}
              value={formData.city}
              onChangeText={(value) => handleInputChange('city', value)}
            />

            <Text style={styles.label}>Estado</Text>
            <TextInput
              style={styles.input}
              value={formData.state}
              onChangeText={(value) => handleInputChange('state', value)}
            />

            <Text style={styles.label}>Latitude</Text>
            <TextInput
              style={styles.input}
              value={formData.lat}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('lat', value)}
            />

            <Text style={styles.label}>Longitude</Text>
            <TextInput
              style={styles.input}
              value={formData.long}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('long', value)}
            />

            <Text style={styles.label}>População da Cidade</Text>
            <TextInput
              style={styles.input}
              value={formData.city_pop}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('city_pop', value)}
            />

            <Text style={styles.label}>Cargo</Text>
            <TextInput
              style={styles.input}
              value={formData.job}
              onChangeText={(value) => handleInputChange('job', value)}
            />

            <Text style={styles.label}>Data de Nascimento</Text>
            <TextInput
              style={styles.input}
              value={formData.dob}
              placeholder="AAAA-MM-DD"
              onChangeText={(value) => handleInputChange('dob', value)}
            />

            <Text style={styles.label}>Número da Transação</Text>
            <TextInput
              style={styles.input}
              value={formData.trans_num}
              onChangeText={(value) => handleInputChange('trans_num', value)}
            />

            <Text style={styles.label}>Unix Time</Text>
            <TextInput
              style={styles.input}
              value={formData.unix_time}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('unix_time', value)}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
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
    alignItems: 'center',
    backgroundColor: '#0F303E',
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    padding: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FAF9F6',
    textAlign: 'center',
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#1E1E1E',
  },
  input: {
    height: 40,
    borderColor: '#1E1E1E',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
    color: '#1E1E1E',
  },
  button: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAF9F6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successMessage: {
    fontSize: 18,
    color: '#4CAF50',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default RequestFormScreen;