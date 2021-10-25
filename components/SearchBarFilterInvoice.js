import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../themes/styles";
import { Input } from "@ui-kitten/components";

export function SearchBarFilterInvoice({ active_state, partner_name, props }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        // borderRadius: 10,
        shadowOffset: {
          height: 5,
          width: 5,
        },
        elevation: 5,
      }}
    >
      <View
        style={{
          marginBottom: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => handleSearch(text)}
          status="info"
          placeholder="Chercher"
          style={{
            borderRadius: 25,
            borderWidth: 1,
            borderColor: "grey",
            backgroundColor: "#fff",
          }}
          textStyle={{ color: "#000" }}
          // clearButtonMode="always"
        />

        <TouchableOpacity
          onPress={() => refreshData()}
          style={{ position: "absolute", right: "5%" }}
        >
          <Icon name="refresh" size={25} color={"black"} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderRadius: 10,
          flexDirection: "row",
          alignSelf: "center",
          marginBottom: 5,
        }}
      >
        <TouchableOpacity onPress={() => filterDataState("draft")}>
          <Text
            style={[
              active_state == "draft"
                ? styles.filterButtonSelected
                : styles.filterButton,
            ]}
          >
            Brouillon
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterDataState("open")}>
          <Text
            style={[
              active_state == "open"
                ? styles.filterButtonSelected
                : styles.filterButton,
            ]}
          >
            Ouverte
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterDataState("paid")}>
          <Text
            style={[
              active_state == "paid"
                ? styles.filterButtonSelected
                : styles.filterButton,
            ]}
          >
            Payé
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => filterDataState("all")}>
          <Text
            style={[
              active_state == "all"
                ? styles.filterButtonSelected
                : styles.filterButton,
            ]}
          >
            Tous
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
