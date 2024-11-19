import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import ApiService from '../services/api_service';

const TransactionDetailScreen = () => {
  const [isFraud, setIsFraud] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const { transaction } = route.params;
  const apiService = new ApiService();

  useEffect(() => {
    const checkFraudStatus = async () => {
      try {
        const response = await apiService.checkFraudStatus(transaction.id);
        setTimeout(() => {
          setIsFraud(response.is_fraud === 1);
          setLoading(false);
        }, 5000);
      } catch (error) {
        Alert.alert('Erro', `Erro ao verificar o status de fraude: ${error.message}`);
        setLoading(false);
      }
    };

    checkFraudStatus();
  }, [transaction]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0F303E" />
        <Text style={styles.loadingText}>Analisando transação...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FAF9F6" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalhes da transação</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}><Text style={styles.labelBold}>Data da Transação:</Text> {new Date(transaction.trans_date_trans_time).toLocaleString()}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Número do Cartão:</Text> {transaction.cc_num}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Nome do Comerciante:</Text> {transaction.merchant}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Categoria da Transação:</Text> {transaction.category}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Valor da Transação:</Text> R$ {transaction.amt}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Primeiro Nome:</Text> {transaction.first}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Último Nome:</Text> {transaction.last}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Gênero:</Text> {transaction.gender}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Endereço:</Text> {transaction.street}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Cidade:</Text> {transaction.city}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Estado:</Text> {transaction.state}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Latitude do Titular:</Text> {transaction.lat}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Longitude do Titular:</Text> {transaction.long}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>População da Cidade:</Text> {transaction.city_pop}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Cargo:</Text> {transaction.job}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Data de Nascimento:</Text> {new Date(transaction.dob).toLocaleDateString()}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Número da Transação:</Text> {transaction.trans_num}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Unix Time:</Text> {transaction.unix_time}</Text>

        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Resultado da análise:</Text>
          <View style={isFraud ? styles.fraudResultBox : styles.noFraudResultBox}>
            <Text style={isFraud ? styles.fraudText : styles.noFraudText}>
              {isFraud ? 'É FRAUDE!' : 'NÃO É FRAUDE!'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#0F303E',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F303E',
    paddingVertical: 20,
    paddingHorizontal: 10,
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
  content: {
    flexGrow: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    color: '#1E1E1E',
    marginBottom: 10,
  },
  labelBold: {
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E1E1E',
  },
  fraudResultBox: {
    padding: 15,
    backgroundColor: '#FFCCCC',
    borderRadius: 10,
    borderColor: '#FF0000',
    borderWidth: 2,
  },
  noFraudResultBox: {
    padding: 15,
    backgroundColor: '#CCFFCC',
    borderRadius: 10,
    borderColor: '#008000',
    borderWidth: 2,
  },
  fraudText: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noFraudText: {
    color: '#008000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TransactionDetailScreen;