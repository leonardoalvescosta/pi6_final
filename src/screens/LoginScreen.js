import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ApiService from '../services/api_service';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const apiService = new ApiService();
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoginError('');
    if (!email || !password) {
      setLoginError('Para prosseguir, insira seu e-mail e senha.');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.login(email, password);
      
      if (response && response.access_token) {
        setLoginSuccess(true);
        setTimeout(() => {
          setLoginSuccess(false);
          navigation.replace('Home');
        }, 5000);
      } else {
        setLoginError('Erro ao fazer login. Token de acesso não encontrado.');
      }
    } catch (error) {
      setLoginError('Erro no login: e-mail ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo_e_fraude_branco.png')} style={styles.logo} />
      
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#E6E6E6"
      />
      
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#E6E6E6"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'ENTRAR'}</Text>
      </TouchableOpacity>

      {loginSuccess && <Text style={styles.successMessage}>Bem-vindo(a)! Login concluído com sucesso.</Text>}
      {loginError && <Text style={styles.errorMessage}>{loginError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#0F303E',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#FAF9F6',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#1E1E1E',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#16272E',
    color: '#FAF9F6',
  },
  button: {
    height: 50,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FAF9F6',
    fontWeight: 'bold',
    fontSize: 18,
  },
  successMessage: {
    fontSize: 18,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 18,
    color: '#FF5252',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default LoginScreen;