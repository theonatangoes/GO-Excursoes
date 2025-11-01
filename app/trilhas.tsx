import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react"; // Importar
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 1. DEFINA A URL DA SUA API (use seu IP!)
const API_URL = "http://10.0.0.66:3000"; // ❗️ SUBSTITUA PELO SEU IP

// 2. DEFINA A INTERFACE
interface Trilha {
  id: string;
  titulo: string;
  imagemCapaUrl: string;
}

export default function TrilhasScreen() {
  const router = useRouter();

  // 3. CRIE OS ESTADOS
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 4. CRIE O useEffect PARA BUSCAR OS DADOS
  useEffect(() => {
    const fetchTrilhas = async () => {
      try {
        const response = await fetch(`${API_URL}/trilhas`);
        if (!response.ok) {
          throw new Error("Falha ao buscar dados.");
        }
        const data: Trilha[] = await response.json();
        setTrilhas(data);
      } catch (e) {
        setError("Não foi possível carregar as trilhas.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchTrilhas();
  }, []);

  const handleCardPress = (itemId: string) => {
    // ❗️ MUDANÇA IMPORTANTE: Passando o ID para a próxima tela
    if (itemId === "diamantina") {
      router.push("/detalhes_trilha"); // Mantido, mas idealmente passaria o ID
    } else {
      console.log(`Navegação para ${itemId} ainda não implementada.`);
    }
  };

  const navigateToExcursoes = () => {
    router.replace("/excursoes");
  };

  // 5. ATUALIZE O RENDER
  const renderExploreContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color="#0902B0"
          style={{ marginTop: 20, height: 260 }}
        />
      );
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
      >
        {trilhas.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => handleCardPress(item.id)}
          >
            <Image
              source={{ uri: item.imagemCapaUrl }} // ❗️ MUDANÇA AQUI
              style={styles.cardImage}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
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
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuButtonDark}
              onPress={navigateToExcursoes}
            >
              <Image
                source={require("../assets/images/malabranca.png")}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonTextLight}>Excursões</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButtonLight}>
              <Image
                source={require("../assets/images/arvore_trilha_azul.png")}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonTextDark}>Trilhas</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.promoContainer}>
          <Image
            source={require("../assets/images/Propaganda.png")}
            style={styles.promoBanner}
          />
        </TouchableOpacity>
        <View style={styles.exploreSection}>
          <Text style={styles.exploreTitle}>Explorar Trilhas</Text>
          <Text style={styles.exploreSubtitle}>
            Descubra lugares e experiências!
          </Text>

          {renderExploreContent()}
        </View>
      </ScrollView>

      {/* // ===========================================
      // ❗️❗️❗️ INÍCIO DA ALTERAÇÃO QUE VOCÊ PEDIU ❗️❗️❗️
      // ===========================================
      */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/trilhas")}
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

        {/* ESTE É O BLOCO ALTERADO */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/feedbacks")}
        >
          <Feather name="message-square" size={24} color="#333" />
          <Text style={styles.navText}>Feedbacks</Text>
        </TouchableOpacity>
        {/* FIM DO BLOCO ALTERADO */}

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/perfil")}
        >
          <Feather name="user" size={24} color="#333" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
      {/* // ===========================================
      // ❗️❗️❗️ FIM DA ALTERAÇÃO ❗️❗️❗️
      // ===========================================
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (seus estilos existentes)
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
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginLeft: 10,
  },
  menuButtonDark: {
    flex: 1,
    backgroundColor: "#0902B0",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginRight: 10,
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
    backgroundColor: "#e0e0e0",
  },
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
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
    fontSize: 16,
    height: 260,
  },
});
