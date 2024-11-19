import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiService {
  constructor() {
    this.baseUrl = 'https://pi-6-semester.onrender.com';
  }

  async setAuthToken() {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  async login(email, password) {
    const url = `${this.baseUrl}/auth`;
    console.log('Tentando login com URL:', url);

    try {
      const response = await axios.post(url, { email, password });
      console.log('Resposta da API de login:', response.data);

      if (response && response.data) {
        await AsyncStorage.setItem('access_token', response.data.access_token);
        return response.data;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      const errorMessage = error.response && error.response.data ? JSON.stringify(error.response.data) : error.message;
      throw new Error(`Failed to login: ${errorMessage}`);
    }
  }

  async createTransaction(transaction) {
    const formattedTransaction = {
      trans_date_trans_time: new Date().toISOString(),
      cc_num: transaction.cc_num ? transaction.cc_num.toString() : '1234567',
      merchant: transaction.merchant || '',
      category: transaction.category || '',
      amt: isNaN(parseFloat(transaction.amt)) ? 0 : parseFloat(transaction.amt),
      first: transaction.first || '',
      last: transaction.last || '',
      gender: transaction.gender || '',
      street: transaction.street || '',
      city: transaction.city || '',
      state: transaction.state || '',
      lat: isNaN(parseFloat(transaction.lat)) ? 0 : parseFloat(transaction.lat),
      long: isNaN(parseFloat(transaction.long)) ? 0 : parseFloat(transaction.long),
      city_pop: isNaN(parseInt(transaction.city_pop, 10)) ? 0 : parseInt(transaction.city_pop, 10),
      job: transaction.job || '',
      dob: transaction.dob ? transaction.dob : '',
      trans_num: transaction.trans_num || '',
      unix_time: isNaN(parseInt(transaction.unix_time, 10)) ? 0 : parseInt(transaction.unix_time, 10),
    };

    console.log('Enviando dados formatados para cadastro:', formattedTransaction);

    await this.setAuthToken();
    const url = `${this.baseUrl}/input`;
    try {
      const response = await axios.post(url, formattedTransaction);
      console.log('Resposta da API (createTransaction):', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar transação:', error);
      const errorMessage = error.response && error.response.data
        ? JSON.stringify(error.response.data)
        : JSON.stringify(error);
      throw new Error(`Failed to create transaction: ${errorMessage}`);
    }
  }

  async checkFraudStatus(inputId) {
    await this.setAuthToken();
    const url = `${this.baseUrl}/fraud/${inputId}`;
    try {
      const response = await axios.get(url);
      console.log('Resposta da API (checkFraudStatus):', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao verificar status de fraude:', error);
      const errorMessage = error.response && error.response.data
        ? JSON.stringify(error.response.data)
        : JSON.stringify(error);
      throw new Error(`Failed to check fraud status: ${errorMessage}`);
    }
  }

  async fetchTransactions() {
    await this.setAuthToken();
    const url = `${this.baseUrl}/input`;
    try {
      const response = await axios.get(url);
      console.log('Resposta da API (fetchTransactions):', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      throw new Error('Failed to fetch transactions');
    }
  }

  async fetchTransactionById(id) {
    await this.setAuthToken();
    const url = `${this.baseUrl}/input/${id}`;
    try {
      const response = await axios.get(url);
      console.log('Resposta da API (fetchTransactionById):', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar transação por ID:', error);
      throw new Error('Failed to fetch transaction by ID');
    }
  }
}

export default ApiService;