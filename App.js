import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RequestFormScreen from './src/screens/RequestFormScreen';
import TransactionDetailScreen from './src/screens/TransactionDetailsScreen';
import TransactionAnalysisScreen from './src/screens/TransactionAnalysisScreen';
import ChatBotScreen from './src/screens/ChatBotScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="TransactionAnalysis" 
          component={TransactionAnalysisScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="RequestForm" 
          component={RequestFormScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="TransactionDetail" 
          component={TransactionDetailScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ChatBot" 
          component={ChatBotScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;