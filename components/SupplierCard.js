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

export function SupplierCard({ supplier, props }) {
  function showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  }

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Détails Fournisseur", { id: supplier.id })
      }
    >
      <View style={styles.cardContainer}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerInfoName}>{supplier.name}</Text>

          {supplier.email ? (
            <Text style={styles.customerInfoText}>
              <Icon name="email-outline" color={"#f19a20"} size={14} />{" "}
              {supplier.email}
            </Text>
          ) : null}
          {supplier.phone ? (
            <Text style={styles.customerInfoText}>
              <Icon name="phone-outline" color={"#f19a20"} size={14} />{" "}
              {supplier.phone}
            </Text>
          ) : null}
          {supplier.street || supplier.city || supplier.zip ? (
            <Text
              style={[styles.customerInfoText, { textTransform: "capitalize" }]}
            >
              <Icon name="pin-outline" color={"#f19a20"} size={14} />{" "}
              {supplier.street} {supplier.city}, {supplier.zip}
            </Text>
          ) : null}
        </View>

        <View style={styles.customerStat}>
          <View style={styles.customerOrder}>
            <Text style={{ color: "black", fontSize: 10, textAlign: "center" }}>
              Nb Commandes
            </Text>
            <Text style={[styles.customerInfoText, { textAlign: "center" }]}>
              {supplier.sale_order_count}
            </Text>
          </View>
          <View style={styles.customerInvoice}>
            <Text style={{ color: "black", fontSize: 10, textAlign: "center" }}>
              Total Factures
            </Text>

            <Text style={[styles.customerInfoText, { textAlign: "center" }]}>
              {supplier.total_invoiced.toFixed(3)} Dt
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
