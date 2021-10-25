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

export function OrderCard({ order, props }) {
  function showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  }
  const [colorState, setColorState] = useState("#9BB7D4");
  const [stateName, setStateName] = useState("Devis");

  useEffect(() => {
    getStateInfo(order.state);
  }, []);

  function getStateInfo(state) {
    //  state : draft = Devis
    //  sent = Devis Envoyé
    //  sale = Bon de commande
    //  done = Verouillé
    //  draft = devis
    //  cancel = Annulé
    let name = "";
    let color = "";
    switch (state) {
      case "draft":
        name = "Devis";
        color = "#9BB7D4";
        break;
      case "sent":
        name = "Devis Envoyé";
        color = "#9BB7D4";
        break;
      case "sale":
        name = "Confirmé";
        color = "#A0DAA9";
        break;

      case "done":
        name = "Verouillé";
        color = "#363945";
        break;
      case "cancel":
        name = "Annulé";
        color = "lightgrey";
        break;
    }
    setStateName(name);
    setColorState(color);
  }

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Détails Commande", { id: order.id })
      }
    >
      <View style={styles.cardContainer}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderInfoName}>{order.name}</Text>
          {order.date_order ? (
            <Text style={styles.orderInfoText}> {order.date_order}</Text>
          ) : null}
          {order.partner_id?.name ? (
            <Text style={styles.orderInfoTextName}>
              {" "}
              {order.partner_id?.name}
            </Text>
          ) : null}
        </View>

        <View style={styles.orderStat}>
          <View style={styles.OrderState}>
            <Text
              style={[styles.headerInfoState, { backgroundColor: colorState }]}
            >
              {stateName}
            </Text>
          </View>

          <View style={styles.orderTotal}>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "black" }}>
              {parseFloat(order.amount_total).toFixed(3)} TND
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
    flex: 4,
    // borderRightWidth: 1,
    borderColor: "lightgrey",
  },
  orderInfoName: {
    fontSize: 18,
    color: "#f19a20",
    fontWeight: "bold",
  },
  orderInfoText: {
    fontSize: 14,
    color: "grey",
  },

  orderInfoTextName: {
    fontSize: 14,
    color: "grey",
    fontWeight: "bold",
  },

  orderStat: {
    padding: 2,
    textAlign: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    flex: 2,
    flexDirection: "column",
  },
  OrderState: {
    flex: 1,
    alignContent: "center",
    alignSelf: "center",
    // borderBottomWidth: 1,
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
    fontSize: 14,
    borderRadius: 10,
    paddingHorizontal: 10,
    // flex:1,
    margin: 5,
    color: "white",
  },
});
