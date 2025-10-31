import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// 1. DEFINA A URL DA SUA API (use seu IP!)
const API_URL = "http://10.0.0.66:3000"; // ❗️ SUBSTITUA PELO SEU IP

export default function RegisterScreen() {
  const router = useRouter();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  // 2. CRIE ESTADOS PARA CADA CAMPO DO FORMULÁRIO
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegister = async () => {
    // 3. CRIE O OBJETO DE NOVO USUÁRIO
    const novoUsuario = {
      nomeCompleto,
      email,
      dataNascimento,
      telefone,
      senha,
    };

    // 4. FAÇA A REQUISIÇÃO POST
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      });

      if (!response.ok) {
        throw new Error("Não foi possível criar a conta.");
      }

      const data = await response.json();
      console.log("Usuário registrado:", data);

      Alert.alert("Sucesso!", "Sua conta foi criada.", [
        { text: "OK", onPress: () => router.replace("/excursoes") },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível criar a conta. Tente novamente.");
    }
  };

  const navigateToLogin = () => {
    router.replace("/login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../assets/images/Sublogo.png")}
          style={styles.logo}
        />

        <View style={styles.formContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={styles.title}>Inscrever-se</Text>
          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginLink}>Entrar</Text>
            </TouchableOpacity>
          </View>

          {/* 5. CONECTE OS INPUTS AOS ESTADOS */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome Completo</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#999"
                value={nomeCompleto}
                onChangeText={setNomeCompleto} // ❗️ MUDANÇA
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="seuemail@exemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail} // ❗️ MUDANÇA
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Data de Nascimento</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#999"
                value={dataNascimento}
                onChangeText={setDataNascimento} // ❗️ MUDANÇA
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
                keyboardType="phone-pad"
                placeholderTextColor="#999"
                value={telefone}
                onChangeText={setTelefone} // ❗️ MUDANÇA
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="********"
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor="#999"
                value={senha}
                onChangeText={setSenha} // ❗️ MUDANÇA
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

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleRegister}
          >
            <Text style={styles.submitButtonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // ... (seus estilos existentes)
  container: {
    flex: 1,
    backgroundColor: "#FFDE00",
  },
  logo: {
    alignSelf: "center",
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  backButton: {
    position: "absolute",
    top: 25,
    left: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0902B0",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 8,
  },
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  loginPromptText: {
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    fontSize: 14,
    color: "#0902B0",
    fontWeight: "bold",
  },
  inputGroup: {
    marginBottom: 20,
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
    backgroundColor: "#0902B0",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
