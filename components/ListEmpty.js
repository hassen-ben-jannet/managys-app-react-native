import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function ListEmpty({ style, ...props }) {
  const sizeIcon = 40;
  const colorIcon = "red";
  return (
    <View style={styles.container}>
      <Icon
        style={styles.input}
        name="folder-outline"
        color={colorIcon}
        size={sizeIcon}
      />
      <Text style={styles.input}>Liste Vide</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "50%",
    justifyContent: "center",

    // backgroundColor: "lightgrey",
  },
  input: {
    textAlign: "center",
    color: "grey",
    fontWeight: "bold",
  },
});
