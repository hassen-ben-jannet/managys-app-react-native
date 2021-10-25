import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigationParam } from "@react-navigation/native";

import { UserContext } from "../../contexts/UserContext";
import { BASE_URL } from "../../config";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FlatList } from "react-native-gesture-handler";

export default function ProductDetailsScreen(props) {
  // const { customer_id } = route.params;

  let id = JSON.stringify(props.route.params.id);
  console.log(id);
  const url = `${BASE_URL}/api/product.template/` + id;
  const { token } = useContext(UserContext);
  const [product, setProduct] = useState({});

  makeRemoteRequest = () => {
    fetch(url, {
      credentials: "omit",

      headers: {
        access_token: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setProduct(res);
      });
  };
  makeRemoteRequest();

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

  const renderAttributeLine = ({ item: attributeLine }) => {
    return (
      <View
        style={{
          ...styles.tableRow,
        }}
      >
        <Text
          style={{ ...styles.columnRowTxt, fontWeight: "bold", width: "40%" }}
        >
          {attributeLine.product_id.name}
        </Text>
        <Text style={[styles.columnRowTxt, { textAlign: "right" }]}>
          {attributeLine.product_uom_qty}
        </Text>
        <Text style={[styles.columnRowTxt, { textAlign: "right" }]}>
          {parseFloat(attributeLine.price_unit).toFixed(3)}
        </Text>
        <Text style={[styles.columnRowTxt, { textAlign: "right" }]}>
          {parseFloat(attributeLine.price_subtotal).toFixed(3)}
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

        <Text style={styles.headerInfoNameOrder}>{product.name}</Text>

        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.headerInfoTotal}>
            <Text style={styles.headerInfoSaleTitle}>type</Text>
            <Text style={styles.headerInfoSaleText}>{product.type}</Text>
          </View>
          <View style={styles.headerInfoTotal}>
            <Text style={styles.headerInfoSaleTitle}>Taxe</Text>
            {/* <Text style={styles.headerInfoSaleText}>
              {parseFloat((product.taxes_id)?[0].amount)}%
              {product?.currency_id?.name}
            </Text> */}
          </View>
          <View style={styles.headerInfoTotal}>
            <Text style={styles.headerInfoSaleTitle}>Prix</Text>
            <Text style={styles.headerInfoSaleText}>
              {parseFloat(product.list_price).toFixed(3)}{" "}
              {product?.currency_id?.name}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.infoCustomer}>
        <FlatList
          data={product.attribute_line_ids}
          renderItem={renderAttributeLine}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={tableHeader}
        />
      </View>
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
    elevation: 5,
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
