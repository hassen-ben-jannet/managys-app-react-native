import React, { useState } from "react";
import { View, StyleSheet, Text, AsyncStorage, Image } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import { AuthContext } from "../contexts/AuthContext";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../themes/styles";
import { useAuth } from "../hooks/useAuth";

import { BASE_URL } from "../config";
export function DrawerContent(props) {
  const [user, setUser] = useState();

  const { auth, state } = useAuth();
  const userdata = AsyncStorage.getItem("user").then((response) => {
    let userinfo = JSON.parse(response)?.userinfo;
    setUser(userinfo);
  });

  const { logout } = React.useContext(AuthContext);

  let company_logo = "data:image/png;base64," + user?.company_logo;
  let name = user?.name;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View>
          <Image
            style={{
              width: 200,
              height: 60,
            }}
            source={{ uri: company_logo }}
          />
          <Text
            style={{
              color: "darkgrey",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "right",
              padding: 10,
            }}
          >
            {name}
          </Text>
        </View>
        <View style={[styles.section, { marginTop: 10 }]}>
          <Text style={styles.sectionHeader}>Dashboard</Text>
          <DrawerItem
            style={styles.sectionItem}
            icon={() => (
              <Icon name="view-dashboard-outline" style={styles.sectionIcon} />
            )}
            label="Dashboard Achats"
            labelStyle={styles.sectionLabel}
            onPress={() => {
              props.navigation.navigate("Dashboard Achats");
            }}
          />
          <DrawerItem
            style={styles.sectionItem}
            icon={() => (
              <Icon name="view-dashboard-outline" style={styles.sectionIcon} />
            )}
            label="Dashboard Ventes"
            labelStyle={styles.sectionLabel}
            onPress={() => {
              props.navigation.navigate("Dashboard Ventes");
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Achat</Text>
          <View style={styles.sectionContent}>
            <DrawerItem
              style={styles.sectionItem}
              icon={() => (
                <Icon
                  name="account-arrow-left-outline"
                  style={styles.sectionIcon}
                />
              )}
              label="Fournisseurs"
              labelStyle={styles.sectionLabel}
              onPress={() => {
                props.navigation.navigate("Fournisseurs");
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon
                  name="file-document-edit-outline"
                  style={styles.sectionIcon}
                />
              )}
              label="Devis Fournisseurs"
              labelStyle={styles.sectionLabel}
              onPress={() => {
                props.navigation.navigate("Devis Fournisseurs");
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon
                  name="badge-account-horizontal-outline"
                  style={styles.sectionIcon}
                />
              )}
              label="Factures Fournisseurs"
              labelStyle={styles.sectionLabel}
              onPress={() => {
                props.navigation.navigate("Factures Fournisseurs");
              }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Vente</Text>
          <View style={styles.sectionContent}>
            <DrawerItem
              style={styles.sectionItem}
              icon={() => (
                <Icon
                  name="account-arrow-right-outline"
                  style={styles.sectionIcon}
                />
              )}
              label="Clients"
              labelStyle={styles.sectionLabel}
              onPress={() => {
                props.navigation.navigate("Clients");
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon name="file-document-outline" style={styles.sectionIcon} />
              )}
              label="Commandes Clients"
              labelStyle={styles.sectionLabel}
              onPress={() => {
                props.navigation.navigate("Commandes Clients");
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon
                  name="badge-account-horizontal-outline"
                  style={styles.sectionIcon}
                />
              )}
              label="Factures Clients"
              labelStyle={styles.sectionLabel}
              onPress={() => {
                props.navigation.navigate("Factures Clients");
              }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Stock</Text>
          <View style={styles.sectionContent}>
            <DrawerItem
              style={styles.sectionItem}
              icon={() => (
                <Icon name="package-variant" style={styles.sectionIcon} />
              )}
              label="Articles"
              labelStyle={styles.sectionLabel}
              onPress={() => {
                props.navigation.navigate("Articles");
              }}
            />
          </View>
        </View>

        <View style={{ top: 10 }}>
          <DrawerItem
            icon={() => <Icon name="logout-variant" />}
            label="Se déconnecter"
            //   style={styles.logoutLabel}
            //   labelStyle={styles.logoutLabel}
            onPress={() => {
              logout();
            }}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
