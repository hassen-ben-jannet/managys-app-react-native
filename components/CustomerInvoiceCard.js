import { parse } from "expo-linking";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function CustomerInvoiceCard({ invoice, props }) {
  function showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  }
  const [colorState, setColorState] = useState("#9BB7D4");
  const [stateName, setStateName] = useState("Devis");

  useEffect(() => {
    getStateInfo(invoice.state);
  }, []);

  function getStateInfo(state) {
    let name = "";
    let color = "";
    switch (state) {
      case "draft":
        name = "Brouillon";
        color = "#9BB7D4";
        break;
      case "open":
        name = "Ouverte";
        color = "#9BB7D4";
        break;
      case "paid":
        name = "Payé";
        color = "#A0DAA9";
        break;

      case "cancel":
        name = "Annulé";
        color = "#363945";
        break;
    }
    setStateName(name);
    setColorState(color);
  }

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Détails Facture", { id: invoice.id })
      }
    >
      <View style={styles.cardContainer}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderInfoName}>{invoice?.number}</Text>
          {invoice?.date_invoice ? <Text> {invoice?.date_invoice}</Text> : null}
          {invoice?.partner_id?.name ? (
            <Text> {invoice?.partner_id?.name}</Text>
          ) : null}
        </View>

        <View style={styles.orderStat}>
          <View
            style={[styles.headerInfoState, { backgroundColor: colorState }]}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              {stateName}
            </Text>
          </View>
          <View style={styles.orderTotal}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {parseFloat(invoice.amount_total).toFixed(3)} TND
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    flex: 5,
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "lightgrey",
    flexDirection: "row",
  },
  orderInfo: {
    flex: 3,
    // borderRightWidth: 1,
    borderColor: "lightgrey",
  },
  orderInfoName: {
    fontSize: 18,
    color: "#f19a20",
    fontWeight: "bold",
  },
  orderStat: {
    flex: 2,
    flexDirection: "column",
  },
  orderDate: {
    flex: 1,
    alignContent: "center",
    alignSelf: "center",
  },
  orderTotal: {
    flex: 1,
    alignContent: "center",
    alignSelf: "center",
  },
  headerInfoState: {
    borderRadius: 10,
    padding: 10,
    // flex:1,
    margin: 5,
  },
});
