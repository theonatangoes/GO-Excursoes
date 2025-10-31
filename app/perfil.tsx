import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

// 1. DEFINA A URL DA SUA API (use seu IP!)
const API_URL = "http://10.0.0.66:3000"; // ❗️ SUBSTITUA PELO SEU IP

// Assumindo que o usuário logado é o ID 1 (Theo Natan)
const USUARIO_ID = 1;

export default function PerfilUsuarioScreen() {
  const router = useRouter();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  // 2. CRIE ESTADOS PARA OS DADOS
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState(""); // Idealmente, o campo senha seria tratado de forma diferente

  const [loading, setLoading] = useState(true);

  // 3. CRIE O useEffect PARA BUSCAR OS DADOS DO USUÁRIO
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`${API_URL}/usuarios/${USUARIO_ID}`);
        if (!response.ok) {
          throw new Error("Usuário não encontrado.");
        }
        const data = await response.json();

        // 4. PREENCHA OS ESTADOS COM OS DADOS DA API
        setNomeCompleto(data.nomeCompleto);
        setEmail(data.email);
        setDataNascimento(data.dataNascimento);
        setTelefone(data.telefone);
        setSenha(data.senha); // Cuidado ao popular senhas
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []); // [] = Roda apenas uma vez

  const handleUpdateProfile = async () => {
    // 5. CRIE O OBJETO COM OS DADOS ATUALIZADOS
    const dadosAtualizados = {
      nomeCompleto,
      email,
      dataNascimento,
      telefone,
      senha, // ❗️ Cuidado: Você pode não querer enviar a senha assim
      // Se o campo senha estiver vazio, não o inclua no PATCH
    };

    try {
      // 6. FAÇA A REQUISIÇÃO PATCH (ou PUT)
      const response = await fetch(`${API_URL}/usuarios/${USUARIO_ID}`, {
        method: "PATCH", // PATCH atualiza só o que foi enviado
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAtualizados),
      });

      if (!response.ok) {
        throw new Error("Não foi possível atualizar o perfil.");
      }

      Alert.alert("Sucesso!", "Perfil atualizado.");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#0902B0" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoiding}
      >
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
          <View style={styles.formCard}>
            <Image
              source={require("../assets/images/avatar.png")}
              style={styles.avatar}
            />
            {/* 7. CONECTE OS INPUTS AOS ESTADOS */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome Completo</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite seu nome completo"
                  placeholderTextColor="#999"
                  value={nomeCompleto} // ❗️ MUDANÇA
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
                  value={email} // ❗️ MUDANÇA
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
                  value={dataNascimento} // ❗️ MUDANÇA
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
                  value={telefone} // ❗️ MUDANÇA
                  onChangeText={setTelefone} // ❗️ MUDANÇA
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite uma nova senha para alterar"
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor="#999"
                  value={senha} // ❗️ MUDANÇA
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
  // ... (seus estilos existentes)
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingTop: StatusBar.currentHeight,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 20,
    padding: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 34,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 25,
    paddingTop: 80,
    marginTop: 60,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: "absolute",
    top: -60,
    borderWidth: 4,
    borderColor: "#F4F4F4",
  },
  inputGroup: {
    marginBottom: 20,
    width: "100%",
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
    width: "100%",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
