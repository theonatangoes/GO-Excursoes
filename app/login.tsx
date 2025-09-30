import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/Sublogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Menu principal */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButtonLight}>
          <Image
            source={require("../assets/images/mala.png")}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
          <Text style={styles.buttonTextDark}>Viagens</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButtonDark}>
          <Image
            source={require("../assets/images/arvore trila.png")}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
          <Text style={styles.buttonTextLight}>Trilhas</Text>
        </TouchableOpacity>
      </View>

      {/* Propaganda */}
      <TouchableOpacity>
        <Image
          source={require("../assets/images/Propaganda.png")}
          style={styles.promoBanner}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Explorar mais */}
      <Text style={styles.sectionTitle}>Explorar Mais</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.exploreCard}>
          <Image style={styles.exploreCardImage} />
        </TouchableOpacity>
        {/* Aqui você pode adicionar mais cards de exploração */}
      </ScrollView>

      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Pesquisar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEE600",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  logo: {
    width: 180,
    height: 80,
    alignSelf: "center",
    marginBottom: 20,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  menuButtonLight: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    marginRight: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  menuButtonDark: {
    flex: 1,
    backgroundColor: "#000",
    padding: 15,
    marginLeft: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  buttonTextDark: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextLight: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  promoBanner: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  exploreCard: {
    width: 200,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 15,
    overflow: "hidden",
  },
  exploreCardImage: {
    width: "100%",
    height: "100%",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    elevation: 5,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 14,
    color: "#000",
  },
});
