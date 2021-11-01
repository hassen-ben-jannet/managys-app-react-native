import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../themes/styles";
import { Input } from "@ui-kitten/components";

export function SearchBarFilterOrder({ active_state, partner_name, props }) {
  // let new_filter = props.route.params?.active_state;
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
            // borderRadius: 25,
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
          // borderRadius: 10,
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
            Devis
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => filterDataState("sent")}>
          <Text
            style={[
              active_state == "sent"
                ? styles.filterButtonSelected
                : styles.filterButton,
            ]}
          >
            Devis Envoyé
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => filterDataState("sale")}>
          <Text
            style={[
              active_state == "sale"
                ? styles.filterButtonSelected
                : styles.filterButton,
            ]}
          >
            BC
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterDataState("cancel")}>
          <Text
            style={[
              active_state == "cancel"
                ? styles.filterButtonSelected
                : styles.filterButton,
            ]}
          >
            Annulé
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
      {partner_name && (
        <TouchableOpacity
          onPress={() => props.navigation.push("Commandes Clients", {})}
        >
          <Text style={styles.filterButtonSelected}>
            {partner_name}
            {/* <Icon name="cancel" size={20} color={"black"} /> */}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
