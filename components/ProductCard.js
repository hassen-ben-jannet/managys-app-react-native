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

export function ProductCard({ product, props }) {
  function showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  }

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Détails Article", { id: product.id })
      }
    >
      <View style={styles.cardContainer}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerInfoName}>{product.name}</Text>

          {product.email ? (
            <Text style={styles.customerInfoText}>
              <Icon name="email-outline" color={"#f19a20"} size={14} />{" "}
              {product.email}
            </Text>
          ) : null}
          {product.phone ? (
            <Text style={styles.customerInfoText}>
              <Icon name="phone-outline" color={"#f19a20"} size={14} />{" "}
              {product.phone}
            </Text>
          ) : null}
          {product.street || product.city || product.zip ? (
            <Text
              style={[styles.customerInfoText, { textTransform: "capitalize" }]}
            >
              <Icon name="pin-outline" color={"#f19a20"} size={14} />{" "}
              {product.street} {product.city}, {product.zip}
            </Text>
          ) : null}
        </View>

        <View style={styles.customerStat}>
          <View style={styles.customerOrder}>
            <Text style={{ color: "black", fontSize: 10, textAlign: "center" }}>
              Type
            </Text>
            <Text style={[styles.customerInfoText, { textAlign: "center" }]}>
              {product.type}
            </Text>
          </View>
          <View style={styles.customerInvoice}>
            <Text style={{ color: "black", fontSize: 10, textAlign: "center" }}>
              Prix
            </Text>

            <Text style={[styles.customerInfoText, { textAlign: "center" }]}>
              {product.list_price?.toFixed(3)} Dt
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
