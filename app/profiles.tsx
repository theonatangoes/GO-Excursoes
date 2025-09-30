import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import LogoImage from "../assets/images/n1 1.png";
import Profile2 from "../assets/images/perfil amarelo.png";
import Profile5 from "../assets/images/perfil azul claro.png";
import Profile1 from "../assets/images/perfil azul escuro.png";
import Profile3 from "../assets/images/perfil verde.png";
import Profile4 from "../assets/images/perfil vermelho.png";

const profiles = [
  { name: "Theo", image: Profile1 },
  { name: "Cauã", image: Profile2 },
  { name: "Vitório", image: Profile3 },
  { name: "Caetano", image: Profile4 },
  { name: "Cristiano", image: Profile5 },
  { name: "", image: null },
];

export default function ProfilesScreen() {
  const router = useRouter();

  const selectProfile = () => {
    router.replace("/(tabs)");
  };

  const editProfiles = () => {
    console.log("Editar perfis");
  };

  return (
    <View style={styles.container}>
      <Image source={LogoImage} style={styles.logoImage} />

      <TouchableOpacity style={styles.editButton} onPress={editProfiles}>
        <MaterialIcons name="edit" size={20} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Quem está assistindo?</Text>

      <ScrollView contentContainerStyle={styles.grid}>
        {profiles.map((p, index) => (
          <TouchableOpacity
            key={index}
            style={styles.profileContainer}
            onPress={p.image ? selectProfile : undefined}
            disabled={!p.image}
          >
            {p.image && <Image source={p.image} style={styles.profileImage} />}
            <Text style={styles.name}>{p.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
  },
  logoImage: {
    width: 500,
    height: 50,
    resizeMode: "contain",
    marginBottom: 50,
  },
  editButton: {
    position: "absolute",
    top: 95,
    right: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 40,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 400,
  },
  profileContainer: {
    width: 120,
    height: 120,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: "cover",
  },
  name: {
    color: "#fff",
    marginTop: 5,
    fontSize: 16,
  },
});
