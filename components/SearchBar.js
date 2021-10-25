import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../themes/styles";
import { Input } from "@ui-kitten/components";

export function SearchBar(props) {
  return (
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
  );
}
