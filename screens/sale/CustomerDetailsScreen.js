import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigationParam } from "@react-navigation/native";

import { UserContext } from "../../contexts/UserContext";
import { BASE_URL } from "../../config";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../contexts/AuthContext";
import { Loading } from "../../components/Loading";

export default function CustomerDetailsScreen(props) {
  let id = JSON.stringify(props.route.params.id);

  const [loading, setLoading] = useState(false);
  const { logout } = React.useContext(AuthContext);
  const url = `${BASE_URL}/api/res.partner/` + id;
  const { token } = useContext(UserContext);
  const [customer, setCustomer] = useState({});

  makeRemoteRequest = () => {
    setLoading(true);
    fetch(url, {
      credentials: "omit",

      headers: {
        access_token: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error == "invalid_token") {
          console.log("invalid_token logging out ...");
          logout();
        }
        setCustomer(res);
        setLoading(false);
      });
  };
  // makeRemoteRequest();
  useEffect(() => {
    makeRemoteRequest();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerInfoCustomer}>
        <Icon
          name="account-circle-outline"
          size={60}
          color={"#f19a20"}
          style={{ textAlign: "center" }}
        />
        <Text style={styles.headerInfoNameCustomer}>{customer.name}</Text>
        <Text style={styles.headerInfoText}>
          <Icon name="smart-card-outline" size={18} color={"#f19a20"} />{" "}
          {customer.function || "-"}
        </Text>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* ?filters=[('partner_id', '=', 548)] */}
          <TouchableOpacity
            style={styles.headerInfoSaleCount}
            onPress={() =>
              props.navigation.push("Commandes Clients", {
                partner_id: customer.id,
                partner_name: customer.name,
              })
            }
          >
            <Text style={styles.headerInfoSaleText}>Ventes</Text>
            <Text style={styles.headerInfoSaleText}>
              {customer.sale_order_count}
            </Text>
          </TouchableOpacity>
          <View style={styles.headerInfoTotal}>
            <Text style={styles.headerInfoSaleText}>Total</Text>
            <Text style={styles.headerInfoSaleText}>
              {parseFloat(customer.total_invoiced).toFixed(3)}{" "}
              {customer?.currency_id?.name}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.infoCustomer}>
        <Text style={styles.infoCustomerText}>
          <Text style={styles.infoCustomerTextTitle}>Email: </Text>
          <Icon name="email-outline" size={16} color={"#f19a20"} />{" "}
          {customer.email || "-"}
        </Text>
        <Text style={styles.infoCustomerText}>
          <Text style={styles.infoCustomerTextTitle}>Téléphone: </Text>
          <Icon name="phone-outline" color={"#f19a20"} size={16} />{" "}
          {customer.phone || "-"}
        </Text>
        <Text style={styles.infoCustomerText}>
          <Text style={styles.infoCustomerTextTitle}>Mobile: </Text>
          <Icon name="cellphone" color={"#f19a20"} size={16} />{" "}
          {customer.mobile || "-"}
        </Text>
        <Text style={styles.infoCustomerText}>
          <Text style={styles.infoCustomerTextTitle}>Adresse: </Text>
          <Icon name="map-marker" color={"#f19a20"} size={16} />
          {customer.street || "-"} {customer.street2 || "-"}{" "}
          {customer.city || "-"} {customer.zip || "-"}
          {"\n"} {customer?.state_id?.name || "-"}{" "}
          {customer?.country_id?.name || "-"}
        </Text>
        <Text style={styles.infoCustomerText}>
          <Text style={styles.infoCustomerTextTitle}>Numero fiscal : </Text>
          {customer?.vat || "-"}
        </Text>
      </View>
      <Loading loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerInfoCustomer: {
    alignContent: "center",
    backgroundColor: "white",
    color: "white",
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    elevation: 1,
  },
  headerInfoNameCustomer: {
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
  },
  headerInfoText: {
    textAlign: "center",
    fontSize: 18,
  },
  headerInfoSaleCount: {
    backgroundColor: "#FDAC53",
    borderRadius: 10,
    flex: 1,
    padding: 10,
    margin: 5,
  },
  headerInfoTotal: {
    backgroundColor: "#FDAC53",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    margin: 5,
  },
  headerInfoSaleText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  infoCustomer: {
    flex: 4,
    alignContent: "flex-start",
    margin: 10,
  },
  infoCustomerText: {
    fontSize: 16,
    padding: 10,
  },
  infoCustomerTextTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
