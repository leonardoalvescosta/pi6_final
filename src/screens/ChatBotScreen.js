import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const ChatBotScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [initialView, setInitialView] = useState(true);
  const [showSecurityOptions, setShowSecurityOptions] = useState(false);

  const rasaUrl = 'http://192.168.0.167:5005/webhooks/rest/webhook';

  const handleSend = async (message = inputText) => {
    if (message.trim()) {
      setMessages([...messages, { from: 'user', text: message }]);
      setInitialView(false);
      setShowSecurityOptions(false);

      try {
        const response = await axios.post(rasaUrl, {
          sender: 'user_id_12345',
          message,
        });

        const botMessages = response.data.map((msg) => ({
          from: 'bot',
          text: msg.text,
          buttons: msg.buttons || null,
        }));
        setMessages((prevMessages) => [...prevMessages, ...botMessages]);

      } catch (error) {
        console.error("Erro ao conectar com o Rasa:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { from: 'bot', text: 'Desculpe, houve um problema ao processar sua solicitação.' }
        ]);
      }

      setInputText('');
    }
  };

  const handleButtonPress = (payload) => {
    if (payload === '/ask_security_tips') {
      setShowSecurityOptions(true);
    } else {
      handleSend(payload);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FAF9F6" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chatbot</Text>
      </View>

      <ScrollView style={styles.chatContainer}>
        {initialView ? (
          <View style={styles.initialView}>
            <Text style={styles.botTitle}>FraudeBot</Text>
            <Ionicons name="chatbubbles" size={80} color="#0F303E" style={styles.initialIcon} />
            <Text style={styles.initialText}>Como posso ajudar você hoje?</Text>

            <View style={styles.suggestionContainer}>
              <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSend("Como posso proteger minhas senhas?")}>
                <Ionicons name="key" size={24} color="#FAF9F6" />
                <Text style={styles.suggestionText}>Segurança de Senhas</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSend("Dicas para proteger dados pessoais.")}>
                <Ionicons name="person" size={24} color="#FAF9F6" />
                <Text style={styles.suggestionText}>Proteção de Dados Pessoais</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSend("Como fazer compras online seguras?")}>
                <Ionicons name="cart" size={24} color="#FAF9F6" />
                <Text style={styles.suggestionText}>Compras Online Seguras</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSend("Dicas para monitoramento de transações.")}>
                <Ionicons name="stats-chart" size={24} color="#FAF9F6" />
                <Text style={styles.suggestionText}>Monitoramento de Transações</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSend("Como identificar phishing?")}>
                <Ionicons name="alert-circle" size={24} color="#FAF9F6" />
                <Text style={styles.suggestionText}>Identificação de Phishing</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                message.from === 'bot' ? styles.botMessage : styles.userMessage,
              ]}
            >
              <Text style={[
                styles.messageText,
                message.from === 'bot' ? { color: '#1E1E1E' } : { color: '#FAF9F6' }
              ]}>
                {message.text}
              </Text>

              {message.from === 'bot' && message.text.includes("Olá! Sou o FraudeBot") && (
                <View style={styles.suggestionContainer}>
                  <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSend("Como posso proteger minhas senhas?")}>
                    <Ionicons name="key" size={24} color="#FAF9F6" />
                    <Text style={styles.suggestionText}>Segurança de Senhas</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSend("Dicas para proteger dados pessoais.")}>
                    <Ionicons name="person" size={24} color="#FAF9F6" />
                    <Text style={styles.suggestionText}>Proteção de Dados Pessoais</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSend("Como fazer compras online seguras?")}>
                    <Ionicons name="cart" size={24} color="#FAF9F6" />
                    <Text style={styles.suggestionText}>Compras Online Seguras</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSend("Dicas para monitoramento de transações.")}>
                    <Ionicons name="stats-chart" size={24} color="#FAF9F6" />
                    <Text style={styles.suggestionText}>Monitoramento de Transações</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSend("Como identificar phishing?")}>
                    <Ionicons name="alert-circle" size={24} color="#FAF9F6" />
                    <Text style={styles.suggestionText}>Identificação de Phishing</Text>
                  </TouchableOpacity>
                </View>
              )}

              {message.buttons && !message.text.includes("Olá! Sou o FraudeBot") && (
                <View style={styles.suggestionContainer}>
                  {message.buttons.map((button, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.suggestionButton}
                      onPress={() => handleButtonPress(button.payload)}
                    >
                      <Ionicons
                        name={button.title.toLowerCase() === 'sim' ? 'checkmark-circle' : 'close-circle'}
                        size={24}
                        color={button.title.toLowerCase() === 'sim' ? 'green' : 'red'}
                      />
                      <Text style={styles.suggestionText}>{button.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))
        )}

        {showSecurityOptions && (
          <View style={[styles.messageBubble, styles.botMessage]}>
            <Text style={[styles.messageText, { color: '#1E1E1E' }]}>
              Quais dessas áreas de segurança você gostaria de saber mais?
            </Text>
            <View style={styles.suggestionContainer}>
              <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSend("Como posso proteger minhas senhas?")}>
                <Ionicons name="key" size={24} color="#FAF9F6" />
                <Text style={styles.suggestionText}>Segurança de Senhas</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSend("Dicas para proteger dados pessoais.")}>
                <Ionicons name="person" size={24} color="#FAF9F6" />
                <Text style={styles.suggestionText}>Proteção de Dados Pessoais</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSend("Como fazer compras online seguras?")}>
                <Ionicons name="cart" size={24} color="#FAF9F6" />
                <Text style={styles.suggestionText}>Compras Online Seguras</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSend("Dicas para monitoramento de transações.")}>
                <Ionicons name="stats-chart" size={24} color="#FAF9F6" />
                <Text style={styles.suggestionText}>Monitoramento de Transações</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSend("Como identificar phishing?")}>
                <Ionicons name="alert-circle" size={24} color="#FAF9F6" />
                <Text style={styles.suggestionText}>Identificação de Phishing</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite a sua mensagem..."
          placeholderTextColor="#1E1E1E"
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => handleSend()}>
          <Ionicons name="send" size={24} color="#FAF9F6" />
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
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  initialView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  botTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F303E',
    marginBottom: 10,
  },
  initialIcon: {
    marginBottom: 20,
  },
  initialText: {
    fontSize: 22,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 25,
  },
  suggestionContainer: {
    width: '100%',
    marginTop: 10,
  },
  suggestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F303E',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  suggestionText: {
    marginLeft: 10,
    color: '#FAF9F6',
    fontSize: 18,
  },
  messageBubble: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    maxWidth: '80%',
  },
  botMessage: {
    backgroundColor: '#E6E6E6',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#0F303E',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#E6E6E6',
  },
  input: {
    flex: 1,
    height: 45,
    borderColor: '#1E1E1E',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#0F303E',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatBotScreen;