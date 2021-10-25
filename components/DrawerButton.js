import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function DrawerButton({ props }) {
  return (
    <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
      <Icon
        name="menu"
        style={{
          color: "black",
          fontSize: 30,
          fontWeight: "bold",
          marginRight: 30,
        }}
      />
    </TouchableOpacity>
  );
}
