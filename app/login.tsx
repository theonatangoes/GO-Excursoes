import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

export default function LoginScreen() {
  const router = useRouter();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Esta função já está correta
  const handleLogin = () => {
    console.log("Navegando para a tela de excursões...");
    // A rota '/excursões' corresponde ao arquivo app/excursões.tsx
    router.replace("/excursoes");
  };

  const navigateToRegister = () => {
    router.push("/criarconta");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require("../assets/images/Sublogo Amarelo.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.formContainer}>
        <TouchableOpacity
          onPress={() => router.push("/bemvindo")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Entrar</Text>

          <View style={styles.registerPrompt}>
            <Text style={styles.registerPromptText}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={navigateToRegister}>
              <Text style={styles.registerLink}>Inscreva-se</Text>
            </TouchableOpacity>
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
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >
                <Feather
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.rememberContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <MaterialCommunityIcons
                name={rememberMe ? "checkbox-marked" : "checkbox-blank-outline"}
                size={24}
                color={rememberMe ? "#0902B0" : "#888"}
              />
              <Text style={styles.rememberText}>Lembre de mim</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordLink}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>Ou</Text>
            <View style={styles.separatorLine} />
          </View>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={22} color="#DB4437" />
            <Text style={styles.socialButtonText}>Continue com Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={22} color="#4267B2" />
            <Text style={styles.socialButtonText}>Continue com Facebook</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0902B0",
  },
  header: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 25,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0902B0",
    textAlign: "center",
    marginBottom: 8,
    marginTop: 20,
  },
  registerPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  registerPromptText: {
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
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
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rememberText: {
    color: "#555",
    fontSize: 14,
  },
  forgotPasswordLink: {
    color: "#0902B0",
    fontWeight: "bold",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#FFDE00",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#0902B0",
    fontSize: 18,
    fontWeight: "bold",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  separatorText: {
    marginHorizontal: 15,
    color: "#888",
    fontSize: 14,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  socialButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
});
