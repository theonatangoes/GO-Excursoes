import { Feather } from "@expo/vector-icons"; // <-- ADICIONADO
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const explorarData = [
  {
    id: "porto-seguro",
    imagem: require("../assets/images/Portoseguro.png"),
  },
  {
    id: "natal",
    imagem: require("../assets/images/Natal.png"),
  },
  {
    id: "rio-de-janeiro",
    imagem: require("../assets/images/RiodeJaneiro.png"),
  },
];

export default function ExcursoesScreen() {
  const router = useRouter();

  const handleCardPress = (itemId: string) => {
    if (itemId === "porto-seguro") {
      router.push("/detalhes_viagem");
    } else {
      console.log(`Navegação para ${itemId} ainda não implementada.`);
    }
  };

  const navigateToTrilhas = () => {
    router.replace("/trilhas");
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // <-- AJUSTADO
      >
        {/* Cabeçalho amarelo */}
        <View style={styles.headerYellow}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.greetingText}>Olá</Text>
              <Text style={styles.userName}>Theo Natan</Text>
            </View>
            <Image
              source={require("../assets/images/Sublogo.png")}
              style={styles.logo}
            />
          </View>
          {/* Botões de Menu */}
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuButtonLight}>
              <Image
                source={require("../assets/images/mala.png")}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonTextDark}>Excursões</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButtonDark}
              onPress={navigateToTrilhas}
            >
              <Image
                source={require("../assets/images/arvore_trilha.png")}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonTextLight}>Trilhas</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Propaganda */}
        <TouchableOpacity style={styles.promoContainer}>
          <Image
            source={require("../assets/images/Propaganda.png")}
            style={styles.promoBanner}
          />
        </TouchableOpacity>
        {/* Seção Explorar */}
        <View style={styles.exploreSection}>
          <Text style={styles.exploreTitle}>Explorar Excursões</Text>
          <Text style={styles.exploreSubtitle}>
            Descubra lugares e experiências!
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
          >
            {explorarData.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => handleCardPress(item.id)}
              >
                <Image source={item.imagem} style={styles.cardImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* ########## BARRA DE NAVEGAÇÃO ADICIONADA AQUI ########## */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/excursoes")}
        >
          <Feather name="search" size={24} color="#333" />
          <Text style={styles.navText}>Explorar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/(tabs)/minhas_viagens")}
        >
          <Feather name="globe" size={24} color="#333" />
          <Text style={styles.navText}>Minhas viagens</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Feather name="bell" size={24} color="#333" />
          <Text style={styles.navText}>Notificações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/perfil")}
        >
          <Feather name="user" size={24} color="#333" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
      {/* ####################################################### */}
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  headerYellow: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 22,
    color: "#000000ff",
  },
  userName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000ff",
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuButtonLight: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginRight: 10,
  },
  menuButtonDark: {
    flex: 1,
    backgroundColor: "#0902B0",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginLeft: 10,
  },
  buttonIcon: {
    width: 30,
    height: 30,
    marginBottom: 8,
    resizeMode: "contain",
  },
  buttonTextDark: {
    color: "#000000ff",
    fontWeight: "bold",
  },
  buttonTextLight: {
    color: "white",
    fontWeight: "bold",
  },
  promoContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 20,
    backgroundColor: "transparent",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  promoBanner: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    borderRadius: 20,
  },
  exploreSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#F4F4F4",
  },
  exploreTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000ff",
  },
  exploreSubtitle: {
    fontSize: 15,
    color: "#000000ff",
    marginBottom: 15,
  },
  carouselContainer: {
    paddingBottom: 20,
  },
  card: {
    width: 200,
    height: 260,
    marginRight: 15,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  // --- ESTILOS DA NAVBAR ADICIONADOS ---
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#000000ff",
    marginTop: 2,
  },
});
