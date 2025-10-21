import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PerfilUsuarioScreen() {
  const router = useRouter();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleUpdateProfile = () => {
    console.log("Tentativa de atualizar perfil...");
    // Adicione a lógica para salvar as alterações do perfil
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoiding}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Perfil do Usuário</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Card do Formulário */}
          <View style={styles.formCard}>
            {/* Imagem de Perfil */}
            <Image
              source={require("../assets/images/avatar.png")} // <-- Este caminho está CORRETO para a sua estrutura de pastas
              style={styles.avatar}
            />
            {/* Campos do Formulário */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome Completo</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite seu nome completo"
                  defaultValue="Theo Natan" // Valor de exemplo
                  placeholderTextColor="#999"
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="seuemail@exemplo.com"
                  defaultValue="teste123@gmail.com" // Valor de exemplo
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Data de Nascimento</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="DD/MM/AAAA"
                  defaultValue="27/04/2005" // Valor de exemplo
                  placeholderTextColor="#999"
                />
                <Feather
                  name="calendar"
                  size={20}
                  color="#888"
                  style={styles.icon}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Número de telefone</Text>
              <View style={styles.inputWrapper}>
                <TouchableOpacity style={styles.countrySelector}>
                  <Text style={styles.flag}>🇧🇷</Text>
                  <Ionicons name="chevron-down" size={16} color="#555" />
                </TouchableOpacity>
                <TextInput
                  style={[styles.textInput, styles.phoneInput]}
                  placeholder="(00) 9 0000-0000"
                  defaultValue="(88) 9 9205-3874" // Valor de exemplo
                  keyboardType="phone-pad"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="********"
                  defaultValue="********" // Valor de exemplo
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                >
                  <Feather
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={20}
                    color="#888"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* Botão de Atualizar */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleUpdateProfile}
            >
              <Text style={styles.submitButtonText}>Atualizar perfil</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F4F4", // Fundo cinza claro
    paddingTop: StatusBar.currentHeight,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Centraliza o título
    paddingVertical: 20,
    paddingHorizontal: 20, // Padding lateral
    position: "relative", // Para posicionar o botão de voltar
  },
  backButton: {
    position: "absolute",
    left: 20, // Alinha à esquerda
    padding: 10, // Área de toque
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 34, // Ajusta o espaçamento entre linhas se o título quebrar
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Centraliza o card verticalmente
    paddingHorizontal: 20,
    paddingBottom: 40, // Espaço no final
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 25,
    paddingTop: 80, // Espaço extra no topo para a imagem de avatar sobrepor
    marginTop: 60, // Margem para descer o card e dar espaço para o avatar
    alignItems: "center", // Centraliza o avatar
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: "relative", // Para posicionar o avatar
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60, // Metade da largura/altura para ser um círculo
    position: "absolute",
    top: -60, // Metade da altura para ficar metade dentro, metade fora
    borderWidth: 4, // Borda se necessário
    borderColor: "#F4F4F4", // Cor igual ao fundo
  },
  inputGroup: {
    marginBottom: 20,
    width: "100%", // Garante que os inputs ocupem toda a largura do card
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginLeft: 10,
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
  },
  flag: {
    fontSize: 24,
    marginRight: 8,
  },
  phoneInput: {
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#0902B0", // Azul escuro
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    width: "100%", // Ocupa toda a largura do card
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
