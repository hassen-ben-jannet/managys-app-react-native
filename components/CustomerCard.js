import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  ToastAndroid,
  Avatar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../themes/styles";

export function CustomerCard({ customer, props }) {
  function showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  }

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("CustomerDetails", { id: customer.id })
      }
    >
      <View style={styles.cardContainer}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerInfoName}>{customer.name}</Text>

          {customer.email ? (
            <Text style={styles.customerInfoText}>
              <Icon name="email-outline" color={"#f19a20"} size={14} />{" "}
              {customer.email}
            </Text>
          ) : null}
          {customer.phone ? (
            <Text style={styles.customerInfoText}>
              <Icon name="phone-outline" color={"#f19a20"} size={14} />{" "}
              {customer.phone}
            </Text>
          ) : null}
          {customer.street || customer.city || customer.zip ? (
            <Text
              style={[styles.customerInfoText, { textTransform: "capitalize" }]}
            >
              <Icon name="pin-outline" color={"#f19a20"} size={14} />{" "}
              {customer.street} {customer.city}, {customer.zip}
            </Text>
          ) : null}
        </View>

        <View style={styles.customerStat}>
          <View style={styles.customerOrder}>
            <Text style={{ color: "black", fontSize: 10, textAlign: "center" }}>
              Commandes
            </Text>
            <Text style={[styles.customerInfoText, { textAlign: "center" }]}>
              {customer.sale_order_count}
            </Text>
          </View>
          <View style={styles.customerInvoice}>
            <Text style={{ color: "black", fontSize: 10, textAlign: "center" }}>
              Total Factures
            </Text>

            <Text style={[styles.customerInfoText, { textAlign: "center" }]}>
              {customer.total_invoiced.toFixed(3)} Dt
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
