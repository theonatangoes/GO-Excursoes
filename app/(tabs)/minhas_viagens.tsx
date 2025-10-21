// Arquivo: app/(tabs)/minhas_viagens.tsx

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image, // Alterado de ImageBackground para Image, pois não há mais texto sobreposto
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Dados das viagens
const tripsData = [
  {
    id: "porto-seguro",
    image: require("../../assets/images/MinhasViagens-Porto.png"),
  },
  {
    id: "recife",
    image: require("../../assets/images/MinhasViagens-Refice.png"),
  },
  {
    id: "gramado",
    image: require("../../assets/images/MinhasViagens-Gramado.png"),
  },
];

export default function MinhasViagensScreen() {
  const router = useRouter();

  const handleTripPress = (tripId: string) => {
    if (tripId === "porto-seguro") {
      router.push("/detalhes_viagem");
    } else {
      console.log(`Navegação para ${tripId} ainda não implementada.`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 🔹 CABEÇALHO ATUALIZADO COM SETA 🔹 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minhas Viagens</Text>
        {/* Espaço vazio para manter o título centralizado */}
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {tripsData.map((trip) => (
          <TouchableOpacity
            key={trip.id}
            activeOpacity={0.9}
            onPress={() => handleTripPress(trip.id)}
          >
            {/* 🔹 USANDO IMAGE NORMAL SEM TEXTO POR CIMA 🔹 */}
            <Image source={trip.image} style={styles.cardImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// 🔹 ESTILOS ATUALIZADOS 🔹
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row", // Alinha itens horizontalmente
    alignItems: "center",
    justifyContent: "space-between", // Empurra a seta para um lado e o View vazio para o outro
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    // Não precisa de posicionamento absoluto mais
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardImage: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginBottom: 20,
  },
});
