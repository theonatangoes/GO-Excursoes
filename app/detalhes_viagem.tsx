import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";

// 1. DEFINA A URL DA SUA API (use seu IP!)
const API_URL = "http://10.0.0.66:3000"; // ❗️ SUBSTITUA PELO SEU IP

const { width } = Dimensions.get("window");
const SCREEN_PADDING = 20;
const ITEM_WIDTH = width - SCREEN_PADDING * 2;

// 2. DEFINA A INTERFACE COMPLETA DA EXCURSÃO
interface ExcursaoDetalhes {
  id: string;
  titulo: string;
  hotel: {
    nome: string;
    endereco: string;
    estrelas: number;
  };
  imagensCarousel: string[];
  sobre: string;
  partida: {
    local: string;
    data: string;
    hora: string;
  };
  retorno: {
    local: string;
    data: string;
    hora: string;
  };
  precoPorPessoa: number;
}

export default function DetalhesViagem() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  // 3. CRIE OS ESTADOS
  const [viagem, setViagem] = useState<ExcursaoDetalhes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 4. CRIE O useEffect PARA BUSCAR OS DADOS
  useEffect(() => {
    const fetchViagem = async () => {
      try {
        // ❗️ ATENÇÃO: Hardcoded para 'porto-seguro'
        // O ideal aqui é pegar o ID vindo da navegação
        // const { id } = useLocalSearchParams();
        // const response = await fetch(`${API_URL}/excursoes/${id}`);

        const response = await fetch(`${API_URL}/excursoes/porto-seguro`);
        if (!response.ok) {
          throw new Error("Falha ao buscar dados da viagem.");
        }
        const data: ExcursaoDetalhes = await response.json();
        setViagem(data);
      } catch (e) {
        setError("Não foi possível carregar os detalhes da viagem.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchViagem();
  }, []);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleReservePress = () => {
    router.push("/pagamento_porto");
  };

  // 5. LÓGICA DE RENDERIZAÇÃO
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#0902B0" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (error || !viagem) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  // Define a imagem de estrelas com base no JSON
  const starImage =
    viagem.hotel.estrelas === 3
      ? require("../assets/images/3estrelas.png")
      : require("../assets/images/4estrelas.png"); // Adicione outras lógicas se precisar

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.headerSide}
          >
            <Ionicons name="arrow-back" size={28} color="#333" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.mainTitle}>{viagem.titulo}</Text>
            <Text style={styles.subtitle}>19 Out. - 23 Out., 2 adultos</Text>
          </View>
          <View style={styles.headerSide} />
        </View>

        <View style={styles.hotelInfoContainer}>
          <View style={styles.hotelNameContainer}>
            <Image
              source={require("../assets/images/Verificado_1.png")}
              style={styles.verifiedIcon}
            />
            <Text style={styles.hotelName}>{viagem.hotel.nome}</Text>
          </View>
          <Text style={styles.address}>{viagem.hotel.endereco}</Text>
          <Image source={starImage} style={styles.stars} />
        </View>

        <View style={styles.carouselContainer}>
          <FlatList
            data={viagem.imagensCarousel} // ❗️ MUDANÇA AQUI
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.carouselImage} /> // ❗️ MUDANÇA AQUI
            )}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
          <View style={styles.paginationContainer}>
            {viagem.imagensCarousel.map(
              (
                _,
                index // ❗️ MUDANÇA AQUI
              ) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === activeIndex ? styles.activeDot : {},
                  ]}
                />
              )
            )}
          </View>
        </View>

        <View style={styles.aboutContainer}>
          <Text style={[styles.sectionTitle, styles.centeredText]}>
            Sobre a hospedagem
          </Text>
          <Text style={[styles.description, styles.centeredText]}>
            {viagem.sobre}
          </Text>

          <View style={styles.embeddedFullInfoCard}>
            <View style={styles.bannerTopSection}>
              <View style={styles.iconContainer}>
                <Ionicons name="bus" size={30} color="#000" />
              </View>
              <Text style={styles.bannerTitle}>
                {viagem.titulo.toUpperCase()}
              </Text>
            </View>
            <View style={styles.bannerBottomSection}>
              <View style={styles.bannerRow}>
                <View style={styles.bannerColumn}>
                  <Text style={styles.bannerLabel}>LOCAL DE PARTIDA:</Text>
                  <Text style={styles.bannerValue}>{viagem.partida.local}</Text>
                </View>
                <View style={styles.bannerColumn}>
                  <Text style={styles.bannerLabel}>DATA:</Text>
                  <Text style={styles.bannerValue}>{viagem.partida.data}</Text>
                </View>
                <View style={styles.bannerColumn}>
                  <Text style={styles.bannerLabel}>HORA:</Text>
                  <Text style={styles.bannerValue}>{viagem.partida.hora}</Text>
                </View>
              </View>
              <View style={styles.bannerRow}>
                <View style={styles.bannerColumn}>
                  <Text style={styles.bannerLabel}>LOCAL DE RETORNO:</Text>
                  <Text style={styles.bannerValue}>{viagem.retorno.local}</Text>
                </View>
                <View style={styles.bannerColumn}>
                  <Text style={styles.bannerLabel}>DATA:</Text>
                  <Text style={styles.bannerValue}>{viagem.retorno.data}</Text>
                </View>
                <View style={styles.bannerColumn}>
                  <Text style={styles.bannerLabel}>HORA:</Text>
                  <Text style={styles.bannerValue}>{viagem.retorno.hora}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.reserveButton}
          onPress={handleReservePress}
        >
          <Text style={styles.reserveButtonText}>Reservar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... (seus estilos existentes)
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },
  headerSide: {
    width: 28,
    alignItems: "flex-start",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000ff",
  },
  subtitle: {
    fontSize: 16,
    color: "#000000ff",
    marginTop: 4,
  },
  bannerTopSection: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  iconContainer: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 8,
    marginRight: 15,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  bannerBottomSection: {
    backgroundColor: "#0902B0",
    padding: 15,
  },
  bannerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  bannerColumn: {
    flex: 1,
  },
  bannerLabel: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  bannerValue: {
    color: "#fff",
    fontSize: 14,
  },
  hotelInfoContainer: {
    marginBottom: 20,
  },
  hotelNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  verifiedIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  hotelName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0A01B4",
  },
  address: {
    fontSize: 14,
    color: "#000000ff",
    marginBottom: 8,
  },
  stars: {
    width: 100,
    height: 20,
    resizeMode: "contain",
  },
  carouselContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  carouselImage: {
    width: ITEM_WIDTH,
    height: 250,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
  },
  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 15,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#fff",
  },
  aboutContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000ff",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000000ff",
    marginBottom: 20,
  },
  centeredText: {
    textAlign: "center",
  },
  embeddedFullInfoCard: {
    marginHorizontal: -SCREEN_PADDING,
    marginTop: 20,
  },
  reserveButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  reserveButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000ff",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 50,
    fontSize: 16,
  },
});
