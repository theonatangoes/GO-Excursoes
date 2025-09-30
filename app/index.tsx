import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

// Import da logo (confira se o arquivo está em /assets/images/go_logo.png)
import LogoImage from "../assets/images/GO VIAGENS logo 1.png";

export default function SplashScreen() {
  const router = useRouter();

  const navigateToLogin = () => {
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoContainer} onPress={navigateToLogin}>
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
