import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
        {tripsData.map((trip) => (
          <TouchableOpacity
            key={trip.id}
            activeOpacity={0.9}
            onPress={() => handleTripPress(trip.id)}
          >
            <Image source={trip.image} style={styles.cardImage} />
          </TouchableOpacity>
        ))}
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
  backButton: {
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
