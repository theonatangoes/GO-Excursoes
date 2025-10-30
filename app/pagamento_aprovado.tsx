import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function ConfirmacaoPagamento() {
  const router = useRouter();
  const handlePress = () => router.push("/excursoes");

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/Pagamento Confirmado.png")}
            style={styles.confirmationImage}
            resizeMode="cover"
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFD700",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start", 
    alignItems: "center",
  },
  confirmationImage: {
    width: width,
    height: height * 0.95, 
    marginTop: 200, 
  },
});
