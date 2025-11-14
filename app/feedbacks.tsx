import { Feather, Ionicons } from "@expo/vector-icons";
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

const API_URL = "http://10.211.123.25:3000";

interface Feedback {
  id: number;
  usuarioNome: string;
  usuarioFotoUrl: string;
  estrelas: number;
  comentario: string;
  fotoViagemUrl: string;
}

const Stars = ({ count }: { count: number }) => {
  const starIcons = [];
  for (let i = 0; i < 5; i++) {
    starIcons.push(
      <Ionicons
        key={i}
        name={i < count ? "star" : "star-outline"}
        size={16}
        color="#FFD700"
      />
    );
  }
  return <View style={styles.starsContainer}>{starIcons}</View>;
};

export default function FeedbacksScreen() {
  const router = useRouter();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchFeedbacks = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${API_URL}/feedbacks`);
          if (!response.ok) {
            throw new Error("Falha ao buscar feedbacks.");
          }
          const data: Feedback[] = await response.json();
          setFeedbacks(data.reverse());
        } catch (e) {
          setError("Não foi possível carregar os feedbacks.");
          console.error(e);
        } finally {
          setLoading(false);
        }
      };

      fetchFeedbacks();
    }, [])
  );

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0902B0" />;
    }
    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }
    if (feedbacks.length === 0) {
      return <Text style={styles.errorText}>Nenhum feedback ainda.</Text>;
    }

    return feedbacks.map((item) => (
      <View key={item.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <Image source={{ uri: item.usuarioFotoUrl }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{item.usuarioNome}</Text>
            <Stars count={item.estrelas} />
          </View>
        </View>
        <Image source={{ uri: item.fotoViagemUrl }} style={styles.tripImage} />
        <Text style={styles.comment}>{item.comentario}</Text>
      </View>
    ));
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
        <Text style={styles.headerTitle}>Feedback dos Clientes</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderContent()}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/enviar_feedback")}
      >
        <Feather name="plus" size={28} color="#FFF" />
      </TouchableOpacity>
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
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {},
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    paddingTop: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: "#e0e0e0",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  starsContainer: {
    flexDirection: "row",
  },
  tripImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#e0e0e0",
  },
  comment: {
    fontSize: 14,
    lineHeight: 20,
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#555",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0902B0",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});
