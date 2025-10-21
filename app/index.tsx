import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

// Import da logo
import LogoImage from "../assets/images/GO VIAGENS logo 1.png";

export default function SplashScreen() {
  const router = useRouter();

  // Função atualizada para navegar para a tela de boas-vindas
  const navigateToWelcome = () => {
    // IMPORTANTE: A rota "/welcome" depende do nome do seu arquivo.
    // Se o seu segundo arquivo se chama 'welcome.tsx', a rota está correta.
    router.replace("/bemvindo");
  };

  return (
    <View style={styles.container}>
      {/* O 'onPress' agora chama a função correta */}
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={navigateToWelcome}
      >
        <Image source={LogoImage} style={styles.logo} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEE600",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 220,
    height: 120,
    resizeMode: "contain",
  },
});
