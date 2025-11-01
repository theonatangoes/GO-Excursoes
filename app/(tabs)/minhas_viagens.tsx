import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const API_URL = "http://10.0.0.66:3000"; // ALTERAR SÓ IP

interface MinhaViagem {
  id: number;
  viagemId: string;
  titulo: string;
  imagemUrl: string;
}

export default function MinhasViagensScreen() {
  const router = useRouter();
  const [trips, setTrips] = useState<MinhaViagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchMinhasViagens = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${API_URL}/minhasViagens`);
          if (!response.ok) {
            throw new Error("Falha ao buscar dados.");
          }
          const data: MinhaViagem[] = await response.json();
          setTrips(data);
        } catch (e) {
          setError("Não foi possível carregar suas viagens.");
          console.error(e);
        } finally {
          setLoading(false);
        }
      };

      fetchMinhasViagens();
    }, [])
  );

  const handleTripPress = (tripId: string) => {
    if (tripId === "porto-seguro") {
      router.push("/detalhes_viagem");
    } else if (tripId === "diamantina") {
      router.push("/detalhes_trilha");
    } else {
      console.log(`Navegação para ${tripId} ainda não implementada.`);
    }
  };

  const renderTrips = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0902B0" />;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    if (trips.length === 0) {
      return (
        <Text style={styles.emptyText}>
          Você ainda não comprou nenhuma viagem.
        </Text>
      );
    }

    return (
      <>
        {trips.map((trip) => (
          <TouchableOpacity
            key={trip.id}
            activeOpacity={0.9}
            onPress={() => handleTripPress(trip.viagemId)}
          >
            <Image source={{ uri: trip.imagemUrl }} style={styles.cardImage} />
          </TouchableOpacity>
        ))}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minhas Viagens</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderTrips()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {},
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardImage: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: "#e0e0e0",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 50,
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#555",
    marginTop: 50,
    fontSize: 16,
  },
});
