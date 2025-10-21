import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

const paymentMethods = [
  {
    id: "mastercard",
    name: "Cartão de Crédito",
    details: "123443********27",
    icon: require("../assets/images/Mastercard-logo 1.png"),
  },
  {
    id: "paypal",
    name: "Paypal",
    details: "5221********2562",
    icon: require("../assets/images/Paypal.png"),
  },
  {
    id: "googlepay",
    name: "Google Pay",
    details: "4142********7667",
    icon: require("../assets/images/GooglePay.png"),
  },
];

export default function PagamentoScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState("mastercard");

  // 🔹 FUNÇÃO ATUALIZADA PARA NAVEGAR 🔹
  const handleConfirmPayment = () => {
    console.log(`Pagamento confirmado com: ${selectedMethod}`);
    // Navega para a tela de pagamento aprovado
    router.replace("/pagamento_aprovado");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Text style={styles.headerTitleMain}>Método</Text>
          <View style={styles.headerSubtitleRow}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitleSub}>de Pagamento</Text>
            <View style={{ width: 28 }} />
          </View>
        </View>

        {/* Métodos de pagamento */}
        <View style={styles.paymentOptionsContainer}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.optionCard}
              onPress={() => setSelectedMethod(method.id)}
            >
              <Image source={method.icon} style={styles.optionIcon} />
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionName}>{method.name}</Text>
                <Text style={styles.optionDetails}>{method.details}</Text>
              </View>
              <View style={styles.radioOuter}>
                {selectedMethod === method.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Imagem principal */}
        <View style={styles.summaryCardContainer}>
          <Image
            source={require("../assets/images/ChapadaPagamento.png")}
            style={styles.summaryImage}
            resizeMode="cover"
          />
        </View>

        {/* Detalhamento de Custos */}
        <View style={styles.costBreakdown}>
          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Valor por pessoa</Text>
            <Text style={styles.costValue}>R$700</Text>
          </View>
          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Total de pessoas</Text>
            <Text style={styles.costValue}>2</Text>
          </View>
          <View style={styles.dashedLine} />
          <View style={styles.costRow}>
            <Text style={styles.totalLabel}>Valor Total</Text>
            <Text style={styles.totalValue}>R$1.400</Text>
          </View>
        </View>
      </ScrollView>

      {/* Botão Confirmar */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmPayment}
        >
          <Text style={styles.confirmButtonText}>Confirmar Pagamento</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingTop: StatusBar.currentHeight,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
  headerTitleMain: {
    fontSize: 26,
    fontWeight: "bold",
  },
  headerSubtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  headerTitleSub: {
    fontSize: 26,
    fontWeight: "bold",
  },
  paymentOptionsContainer: {
    marginTop: 10,
  },
  optionCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  optionIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  optionDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#0902B0",
  },
  summaryCardContainer: {
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  summaryImage: {
    width: "100%",
    height: 220,
  },
  costBreakdown: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  costLabel: {
    fontSize: 16,
    color: "#555",
  },
  costValue: {
    fontSize: 16,
    color: "#333",
  },
  dashedLine: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#F4F4F4",
  },
  confirmButton: {
    backgroundColor: "#FFDE00",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
