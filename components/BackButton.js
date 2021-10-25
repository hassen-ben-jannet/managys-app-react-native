import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function BackButton({ props }) {
  return (
    <TouchableOpacity onPress={() => props.navigation.goBack("MainStack")}>
      <Icon
        name="arrow-left"
        style={{ color: "black", fontSize: 30, fontWeight: "bold", margin: 20 }}
      />
    </TouchableOpacity>
  );
}
