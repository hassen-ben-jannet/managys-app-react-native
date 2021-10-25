import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigationParam } from "@react-navigation/native";

import { UserContext } from "../../contexts/UserContext";
import { BASE_URL } from "../../config";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FlatList } from "react-native-gesture-handler";
import { AuthContext } from "../../contexts/AuthContext";
import { Loading } from "../../components/Loading";

export default function InvoiceDetailsScreen(props) {
  let id = JSON.stringify(props.route.params.id);

  const [loading, setLoading] = useState(false);
  const { logout } = React.useContext(AuthContext);
  const url = `${BASE_URL}/api/account.invoice/` + id;
  const { token } = useContext(UserContext);
  const [invoice, setInvoice] = useState({});
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
        setInvoice(res);
        setLoading(false);
      });
  };
  useEffect(() => {
    makeRemoteRequest();
  }, []);

  const tableHeader = () => {
    return (
      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeaderTxt, { width: "40%" }]}>Article</Text>
        <Text style={[styles.columnHeaderTxt, { textAlign: "right" }]}>
          Qté
        </Text>
        <Text style={[styles.columnHeaderTxt, { textAlign: "right" }]}>
          P.U
        </Text>
        <Text style={[styles.columnHeaderTxt, { textAlign: "right" }]}>
          Sous-total
        </Text>
      </View>
    );
  };

  const renderInvoiceLine = ({ item: invoiceLine }) => {
    return (
      <View
        style={{
          ...styles.tableRow,
        }}
      >
        <Text
          style={{ ...styles.columnRowTxt, fontWeight: "bold", width: "40%" }}
        >
          {invoiceLine.product_id.name}
        </Text>
        <Text style={[styles.columnRowTxt, { textAlign: "right" }]}>
          {invoiceLine.quantity}
        </Text>
        <Text style={[styles.columnRowTxt, { textAlign: "right" }]}>
          {parseFloat(invoiceLine.price_unit).toFixed(3)}
        </Text>
        <Text style={[styles.columnRowTxt, { textAlign: "right" }]}>
          {parseFloat(invoiceLine.price_subtotal).toFixed(3)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerInfoCustomer}>
        {/* <Icon
          name="file-document-outline"
          size={60}
          color={"#f19a20"}
          style={{ textAlign: "center" }}
        /> */}
        <View style={{ flexDirection: "row" }}>
          <View style={styles.headerInfoOrderDate}>
            <Text style={styles.headerInfoSaleTitle}>Date Facture</Text>
            <Text style={styles.headerInfoSaleText}>
              {invoice.date_invoice}
            </Text>
          </View>

          <View style={styles.headerInfoOrderClient}>
            <Text style={styles.headerInfoSaleTitle}>Client</Text>
            <Text style={styles.headerInfoSaleText}>
              {invoice.partner_id?.name}
            </Text>
          </View>
        </View>

        <Text style={styles.headerInfoNameOrder}>{invoice.number}</Text>

        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.headerInfoTotal}>
            <Text style={styles.headerInfoSaleTitle}>Taxe</Text>
            <Text style={styles.headerInfoSaleText}>
              {parseFloat(invoice.amount_tax).toFixed(3)}{" "}
              {invoice?.currency_id?.name}
            </Text>
          </View>
          <View style={styles.headerInfoTotal}>
            <Text style={styles.headerInfoSaleTitle}>Total HT</Text>
            <Text style={styles.headerInfoSaleText}>
              {parseFloat(invoice.amount_total - invoice.amount_tax).toFixed(3)}{" "}
              {invoice?.currency_id?.name}
            </Text>
          </View>
          <View style={styles.headerInfoTotal}>
            <Text style={styles.headerInfoSaleTitle}>Total TTC</Text>
            <Text style={styles.headerInfoSaleText}>
              {parseFloat(invoice.amount_total).toFixed(3)}{" "}
              {invoice?.currency_id?.name}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.infoCustomer}>
        <FlatList
          data={invoice.invoice_line_ids}
          renderItem={renderInvoiceLine}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={tableHeader}
        />
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
  headerInfoNameOrder: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
  },
  headerInfoText: {
    textAlign: "center",
    fontSize: 18,
  },
  headerInfoOrderDate: {
    width: "50%",
    padding: 0,
    margin: 5,
    alignItems: "flex-start",
  },
  headerInfoOrderClient: {
    width: "50%",
    padding: 0,
    margin: 5,
    alignItems: "flex-end",
  },
  headerInfoTotal: {
    // backgroundColor: "#FDAC53",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    margin: 5,
  },
  headerInfoSaleTitle: {
    textAlign: "center",
    alignSelf: "center",

    color: "black",
    fontSize: 16,
    // fontWeight: "bold",
  },
  headerInfoSaleText: {
    textAlign: "center",
    alignSelf: "center",
    color: "grey",
    // fontWeight: "bold",
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

  //table css
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#FDAC53",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    paddingHorizontal: 5,
    height: 40,
  },
  tableRow: {
    flexDirection: "row",
    height: 30,
    alignItems: "flex-start",
  },
  columnHeader: {
    width: "20%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    width: "20%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  columnRowTxt: {
    borderWidth: 1,
    height: 20,
    width: "20%",
    textAlign: "left",
    fontSize: 14,
    paddingHorizontal: 5,
  },
});
