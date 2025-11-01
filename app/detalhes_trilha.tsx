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

const API_URL = "http://10.0.0.66:3000"; // ALTERAR SÓ IP

const { width } = Dimensions.get("window");
const SCREEN_PADDING = 20;
const ITEM_WIDTH = width - SCREEN_PADDING * 2;

interface TrilhaDetalhes {
  id: string;
  titulo: string;
  localizacao: string;
  estrelas: number;
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
export default function DetalhesTrilhas() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const [trilha, setTrilha] = useState<TrilhaDetalhes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrilha = async () => {
      try {
        const response = await fetch(`${API_URL}/trilhas/diamantina`);
        if (!response.ok) {
          throw new Error("Falha ao buscar dados da trilha.");
        }
        const data: TrilhaDetalhes = await response.json();
        setTrilha(data);
      } catch (e) {
        setError("Não foi possível carregar os detalhes da trilha.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchTrilha();
  }, []);

  const handleReservePress = () => {
    router.push("/pagamento_chapada");
  };

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

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#0902B0" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (error || !trilha) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  const starImage =
    trilha.estrelas === 4
      ? require("../assets/images/4estrelas.png")
      : require("../assets/images/3estrelas.png");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.mainTitle}>{trilha.titulo}</Text>
          <View style={styles.subtitleRow}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={28} color="#333" />
            </TouchableOpacity>
            <Text style={styles.subtitle}>19 Set. - 23 Set., 2 adultos</Text>
            <View style={{ width: 28 }} />
          </View>
        </View>

        <View style={styles.hotelInfoContainer}>
          <View style={styles.hotelNameContainer}>
            <Image
              source={require("../assets/images/Verificado_1.png")}
              style={styles.verifiedIcon}
            />
            <Text style={styles.hotelName}>{trilha.titulo}</Text>
          </View>
          <Text style={styles.address}>{trilha.localizacao}</Text>
          <Image source={starImage} style={styles.stars} />
        </View>

        <View style={styles.carouselContainer}>
          <FlatList
            data={trilha.imagensCarousel}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.carouselImage} />
            )}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
          <View style={styles.paginationContainer}>
            {trilha.imagensCarousel.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === activeIndex ? styles.activeDot : {},
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.aboutContainer}>
          <Text style={[styles.sectionTitle, styles.centeredText]}>
            Sobre a trilha
          </Text>
          <Text style={[styles.description, styles.centeredText]}>
            {trilha.sobre}
          </Text>

          <View style={styles.embeddedFullInfoCard}>
            <View style={styles.bannerTopSection}>
              <View style={styles.iconContainer}>
                <Ionicons name="airplane" size={30} color="#000" />
              </View>
              <Text style={styles.bannerTitle}>
                {trilha.titulo.toUpperCase()}
              </Text>
            </View>
            <View style={styles.bannerBottomSection}>
              <View style={styles.bannerRow}>
                <View style={styles.bannerColumn}>
                  <Text style={styles.bannerLabel}>LOCAL DE PARTIDA:</Text>
                  <Text style={styles.bannerValue}>{trilha.partida.local}</Text>
                </View>
                <View style={styles.bannerColumn}>
                  <Text style={styles.bannerLabel}>DATA:</Text>
                  <Text style={styles.bannerValue}>{trilha.partida.data}</Text>
                </View>
                <View style={styles.bannerColumn}>
                  <Text style={styles.bannerLabel}>HORA:</Text>
                  <Text style={styles.bannerValue}>{trilha.partida.hora}</Text>
                </View>
              </View>
              <View style={styles.bannerRow}>
                <View style={styles.bannerColumn}>
                  <Text style={styles.bannerLabel}>LOCAL DE RETORNO:</Text>
                  <Text style={styles.bannerValue}>{trilha.retorno.local}</Text>
                </View>
                <View style={styles.bannerColumn}>
                  <Text style={styles.bannerLabel}>DATA:</Text>
                  <Text style={styles.bannerValue}>{trilha.retorno.data}</Text>
                </View>
                <View style={styles.bannerColumn}>
                  <Text style={styles.bannerLabel}>HORA:</Text>
                  <Text style={styles.bannerValue}>{trilha.retorno.hora}</Text>
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
    paddingVertical: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000ff",
  },
  subtitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#000000ff",
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
