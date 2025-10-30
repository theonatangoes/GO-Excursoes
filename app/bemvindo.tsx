import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  const handleRegister = () => {
    console.log("Navegando para a tela de criar conta...");
    router.push("/criarconta");
  };

  const handleLogin = () => {
    console.log("Navegando para Login...");
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require("../assets/images/GO VIAGENS logo 1.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Bem Vindo</Text>
          <Text style={styles.subtitle}>
            Sua próxima aventura começa aqui!{"\n"}
            Explore destinos incríveis, reserve suas viagens com facilidade e
            viva experiências inesquecíveis com quem entende de excursões.
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister} 
            activeOpacity={0.85}
          >
            <Text style={styles.registerText}>Registrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.loginText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE600",
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },

  // Seção azul
  bottomSection: {
    flex: 1,
    backgroundColor: "#0902B0",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 45,
    justifyContent: "space-between",
  },

  textContainer: {
    alignItems: "flex-start",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 15,
    color: "#FFFFFF",
    textAlign: "left",
    lineHeight: 22,
    marginBottom: 45,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 16,
    marginBottom: 40,
  },
  registerButton: {
    flex: 1,
    backgroundColor: "#FFE600",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  registerText: {
    color: "#0902B0",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0902B0",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
    shadowColor: "#1E40FF",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
