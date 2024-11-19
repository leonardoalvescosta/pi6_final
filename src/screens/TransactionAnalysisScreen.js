import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ApiService from '../services/api_service';

const TransactionAnalysisScreen = () => {
  const [transactionId, setTransactionId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const navigation = useNavigation();
  const apiService = new ApiService();

  const handleSearchTransaction = async () => {
    try {
      if (transactionId) {
        const fetchedTransaction = await apiService.fetchTransactionById(transactionId);
        setTransactions([fetchedTransaction]);
      } else {
        const fetchedTransactions = await apiService.fetchTransactions();
        setTransactions(fetchedTransactions);
      }
    } catch (error) {
      Alert.alert('Erro', `Erro ao buscar transação: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FAF9F6" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Análise de transação</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>ID da transação (opcional)</Text>
        <TextInput
          style={styles.input}
          value={transactionId}
          onChangeText={setTransactionId}
          placeholder="Digite o ID da transação ou deixe em branco para todas"
          placeholderTextColor="#9E9E9E"
        />

        <TouchableOpacity style={styles.button} onPress={handleSearchTransaction}>
          <Text style={styles.buttonText}>BUSCAR TRANSAÇÃO</Text>
        </TouchableOpacity>

        {transactions && transactions.length > 0 && (
          <View>
            {transactions.map((transaction, index) => (
              <TouchableOpacity
                key={index}
                style={styles.transactionCard}
                onPress={() => navigation.navigate('TransactionDetail', { transaction })}
              >
                <Text style={styles.transactionText}>Data: {new Date(transaction.trans_date_trans_time).toLocaleString()}</Text>
                <Text style={styles.transactionCategory}>Categoria: {transaction.category}</Text>
                <Text style={styles.transactionAmount}>Valor: R$ {transaction.amt}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#1E1E1E',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#E6E6E6',
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#1E1E1E',
  },
  button: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FAF9F6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionCard: {
    backgroundColor: '#16272E',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
  },
  transactionText: {
    color: '#FAF9F6',
    fontSize: 16,
    marginBottom: 5,
  },
  transactionCategory: {
    color: '#FAF9F6',
    fontSize: 14,
  },
  transactionAmount: {
    color: '#FAF9F6',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default TransactionAnalysisScreen;