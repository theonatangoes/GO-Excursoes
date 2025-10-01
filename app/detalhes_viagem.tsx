import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image, // Importado para pegar a altura da barra de status
  Platform,
  SafeAreaView, // Mantido para compatibilidade com iOS
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";

const { width } = Dimensions.get("window");
const SCREEN_PADDING = 20;
const ITEM_WIDTH = width - SCREEN_PADDING * 2;

const carouselImages = [
  require("../assets/images/porto1.png"),
  require("../assets/images/porto2.png"),
  require("../assets/images/porto3.png"),
  require("../assets/images/porto4.png"),
  require("../assets/images/porto5.png"),
];

export default function DetalhesViagem() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    // Usamos SafeAreaView que agora tem um padding manual para Android
    <SafeAreaView style={styles.safeArea}>
      {/* TUDO está dentro da rolagem agora */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* CABEÇALHO */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.headerSide}
          >
            <Ionicons name="arrow-back" size={28} color="#333" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.mainTitle}>Porto Seguro</Text>
            <Text style={styles.subtitle}>19 Out. - 23 Out., 2 adultos</Text>
          </View>
          <View style={styles.headerSide} />
        </View>

        {/* Informações do Hotel */}
        <View style={styles.hotelInfoContainer}>
          <View style={styles.hotelNameContainer}>
            <Image
              source={require("../assets/images/Verificado_1.png")}
              style={styles.verifiedIcon}
            />
            <Text style={styles.hotelName}>Hotel Fenix Porto Seguro</Text>
          </View>
          <Text style={styles.address}>
            Rua Das Pitangueiras, 257, Centro, Porto Seguro, Bahia, Brasil
          </Text>
          <Image
            source={require("../assets/images/3estrelas.png")}
            style={styles.stars}
          />
        </View>

        {/* Carrossel */}
        <View style={styles.carouselContainer}>
          <FlatList
            data={carouselImages}
            renderItem={({ item }) => (
              <Image source={item} style={styles.carouselImage} />
            )}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
          <View style={styles.paginationContainer}>
            {carouselImages.map((_, index) => (
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

        {/* Sobre */}
        <View style={styles.aboutContainer}>
          <Text style={styles.sectionTitle}>Sobre a hospedagem</Text>
          <Text style={styles.description}>
            O Hotel Fênix Porto Seguro é uma opção aconchegante para quem busca
            conforto e praticidade na cidade. Localizado próximo às principais
            praias e pontos turísticos, oferece ambiente agradável, bom
            atendimento.
          </Text>
        </View>

        {/* Botão de Reserva */}
        <TouchableOpacity style={styles.reserveButton}>
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
    // Esta linha é a MUDANÇA PRINCIPAL:
    // Adiciona um espaço no topo igual à altura da barra de status no Android.
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    // Espaçamento só nas laterais e embaixo, o de cima agora é no safeArea
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 20, // Espaço entre o cabeçalho e o resto do conteúdo
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
});
