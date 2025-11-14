import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_URL = "http://10.211.123.25:3000";

const StarRatingInput = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  return (
    <View style={styles.starsContainer}>
      {[...Array(5)].map((_, index) => {
        const starNum = index + 1;
        return (
          <TouchableOpacity key={starNum} onPress={() => setRating(starNum)}>
            <Ionicons
              name={starNum <= rating ? "star" : "star-outline"}
              size={32}
              color="#FFD700"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function EnviarFeedbackScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Precisamos de permissão para acessar sua galeria.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Precisamos de permissão para usar sua câmera.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  const handleEnviarFeedback = async () => {
    if (rating === 0 || !comentario || !imageUri) {
      Alert.alert(
        "Erro",
        "Por favor, preencha todos os campos e adicione uma foto."
      );
      return;
    }
    const novoFeedback = {
      usuarioNome: "Theo Natan",
      usuarioFotoUrl: "https://i.imgur.com/avatar-placeholder.png",
      estrelas: rating,
      comentario: comentario,
      fotoViagemUrl: imageUri,
    };

    try {
      const response = await fetch(`${API_URL}/feedbacks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoFeedback),
      });

      if (!response.ok) {
        throw new Error("Não foi possível enviar seu feedback.");
      }

      Alert.alert("Obrigado!", "Seu feedback foi enviado com sucesso.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível enviar seu feedback.");
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
        <Text style={styles.headerTitle}>Enviar Feedback</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.label}>Avalie sua viagem:</Text>
          <StarRatingInput rating={rating} setRating={setRating} />

          <Text style={styles.label}>Foto da viagem:</Text>
          <View style={styles.imagePickerContainer}>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Ionicons name="images" size={30} color="#0902B0" />
              <Text style={styles.imageButtonText}>Anexar foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
              <Ionicons name="camera" size={30} color="#0902B0" />
              <Text style={styles.imageButtonText}>Tirar foto</Text>
            </TouchableOpacity>
          </View>

          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          )}

          <Text style={styles.label}>Deixe seu comentário:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Descreva sua experiência..."
            multiline
            value={comentario}
            onChangeText={setComentario}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleEnviarFeedback}
          >
            <Text style={styles.submitButtonText}>Enviar Feedback</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {},
  scrollContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  imagePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  imageButton: {
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  imageButtonText: {
    color: "#0902B0",
    marginTop: 8,
    fontWeight: "bold",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#e0e0e0",
  },
  textInput: {
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 15,
    fontSize: 16,
    color: "#333",
    height: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#FFDE00",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 24,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0902B0",
  },
});
