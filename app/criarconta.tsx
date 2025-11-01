import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
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
// ❗️ MUDANÇA: Importar o AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [imageUri, setImageUri] = useState<string | null>(null);
  // ❗️ MUDANÇA: Novo estado para o Base64
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  // 3. FUNÇÕES DE CÂMERA E GALERIA
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Precisamos de permissão para acessar sua galeria.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Quadrado para foto de perfil
      quality: 1,
      base64: true, // ❗️ MUDANÇA: Solicitar Base64
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      // ❗️ CORREÇÃO AQUI: Converte 'undefined' para 'null'
      setImageBase64(result.assets[0].base64 ?? null);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Precisamos de permissão para usar sua câmera.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1], // Quadrado para foto de perfil
      quality: 1,
      base64: true, // ❗️ MUDANÇA: Solicitar Base64
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      // ❗️ CORREÇÃO AQUI: Converte 'undefined' para 'null'
      setImageBase64(result.assets[0].base64 ?? null);
    }
  };

  // 4. FUNÇÃO QUE DEIXA O USUÁRIO ESCOLHER
  const selectProfilePicture = () => {
    Alert.alert(
      "Foto de Perfil",
      "Escolha como você quer adicionar sua foto:",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Galeria", onPress: pickImage },
        { text: "Tirar Foto", onPress: takePhoto },
      ]
    );
  };

  const handleRegister = async () => {
    // 5. ATUALIZA A VALIDAÇÃO E O OBJETO
    // ❗️ MUDANÇA: Validar também o imageBase64
    if (!nomeCompleto || !email || !senha || !imageUri || !imageBase64) {
      Alert.alert(
        "Erro",
        "Por favor, preencha todos os campos e adicione uma foto de perfil."
      );
      return;
    }

    // ❗️ MUDANÇA: Formatar a string de dados da imagem Base64
    const fotoUrlBase64 = `data:image/jpeg;base64,${imageBase64}`;

    const novoUsuario = {
      nomeCompleto,
      email,
      dataNascimento,
      telefone,
      senha,
      fotoPerfilUrl: fotoUrlBase64, // ❗️ MUDANÇA: Salvar o Base64
    };

    // 6. FAÇA A REQUISIÇÃO POST
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

      // ❗️ MUDANÇA: Salvar o ID do usuário logado
      if (data.id) {
        await AsyncStorage.setItem("usuarioId", data.id);
      }

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
        <View style={styles.formContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={styles.title}>Inscrever-se</Text>

          {/* 7. ADICIONA O BOTÃO DE FOTO DE PERFIL */}
          <TouchableOpacity
            style={styles.avatarPicker}
            onPress={selectProfilePicture}
          >
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="camera" size={40} color="#888" />
                <Text style={styles.avatarPlaceholderText}>Adicionar foto</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginLink}>Entrar</Text>
            </TouchableOpacity>
          </View>

          {/* ... (Restante dos inputs não muda) ... */}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome Completo</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#999"
                value={nomeCompleto}
                onChangeText={setNomeCompleto}
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
                onChangeText={setEmail}
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
                onChangeText={setDataNascimento}
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
                onChangeText={setTelefone}
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
                onChangeText={setSenha}
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

// ... (Estilos não mudam)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFDE00",
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
    marginBottom: 8,
  },
  avatarPicker: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F7F7F7",
    borderWidth: 2,
    borderColor: "#E8E8E8",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarPlaceholderText: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
