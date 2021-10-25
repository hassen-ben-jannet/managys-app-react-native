import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
  ColorSchemeName,
  Pressable,
  TouchableOpacity,
  Text,
  View,
  Button,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import LinkingConfiguration from "./LinkingConfiguration";
import { LoginScreen } from "../screens/LoginScreen";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "../contexts/AuthContext";
import DashboardScreen from "../screens/DashboardScreen";
import CustomerScreen from "../screens/sale/CustomerScreen";
import CustomerDetails from "../screens/sale/CustomerDetailsScreen";
import SupplierDetails from "../screens/purchase/SupplierDetailsScreen";

import OrderScreen from "../screens/sale/OrderScreen";
import CustomerInvoiceScreen from "../screens/sale/CustomerInvoiceScreen";
import SupplierScreen from "../screens/purchase/SupplierScreen";
import QuotationScreen from "../screens/purchase/QuotationScreen";
import SupplierInvoiceScreen from "../screens/purchase/SupplierInvoiceScreen";
import { SplashScreen } from "../screens/SplashScreen";
import { DrawerContent } from "../components/DrawerContent";
import { UserContext } from "../contexts/UserContext";
import OrderDetailsScreen from "../screens/sale/OrderDetailsScreen";
import { BackButton } from "../components/BackButton";
import { DrawerButton } from "../components/DrawerButton";
import InvoiceDetailsScreen from "../screens/sale/InvoiceDetailsScreen";
import ProductScreen from "../screens/stock/ProductScreen";
import ProductDetailsScreen from "../screens/stock/ProductDetailsScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName,
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();
const Stack2 = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function RootNavigator() {
  const { auth, state } = useAuth();
  function renderScreens() {
    if (state.loading) {
      return (
        <Stack.Screen
          name={"Splash"}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      );
    }
    return state.user ? (
      <Stack.Screen name="Connected" options={{ headerShown: false }}>
        {() => (
          <UserContext.Provider value={state.user}>
            <Drawer.Navigator
              drawerContent={(props) => <DrawerContent {...props} />}
            >
              <Stack.Screen options={{ headerShown: false }} name="MainStack">
                {() => (
                  <Stack.Navigator
                    initialRouteName="Dashboard"
                    screenOptions={(props) => ({
                      headerRight: () => <BackButton props={props} />,
                      headerLeft: () => <DrawerButton props={props} />,
                    })}
                  >
                    <Stack.Screen
                      options={(props) => ({
                        headerRight: () => false,
                      })}
                      name="Dashboard"
                      component={DashboardScreen}
                    />

                    {/* Clients */}
                    <Stack.Screen name="Clients" component={CustomerScreen} />
                    <Stack.Screen
                      name="CustomerDetails"
                      component={CustomerDetails}
                    />
                    <Stack.Screen
                      name="Commandes Clients"
                      component={OrderScreen}
                    />
                    <Stack.Screen
                      name="Détails Commande"
                      component={OrderDetailsScreen}
                    />
                    <Stack.Screen
                      name="Factures Clients"
                      component={CustomerInvoiceScreen}
                    />
                    <Stack.Screen
                      name="Détails Facture"
                      component={InvoiceDetailsScreen}
                      options={(props) => ({
                        headerRight: () => (
                          <BackButton
                            screenName="Factures Clients"
                            props={props}
                          />
                        ),
                      })}
                    />

                    {/* Fournisseurs */}
                    <Stack.Screen
                      name="Fournisseurs"
                      component={SupplierScreen}
                    />
                    <Stack.Screen
                      name="Détails Fournisseur"
                      component={SupplierDetails}
                      options={(props) => ({
                        headerRight: () => (
                          <BackButton screenName="Fournisseurs" props={props} />
                        ),
                      })}
                    />
                    <Stack.Screen
                      name="Devis Fournisseurs"
                      component={QuotationScreen}
                    />
                    <Stack.Screen
                      name="Factures Fournisseurs"
                      component={SupplierInvoiceScreen}
                    />
                    {/* <Drawer.Screen name="Factures Fournisseurs" component={SupplierInvoiceScreen} /> */}
                    {/* Stock */}
                    <Stack.Screen name="Articles" component={ProductScreen} />
                    <Stack.Screen
                      name="Détails Article"
                      component={ProductDetailsScreen}
                      options={(props) => ({
                        headerRight: () => (
                          <BackButton screenName="Articles" props={props} />
                        ),
                      })}
                    />

                    {/* <DrawerItem name="Deconnexion" component={SupplierInvoiceScreen} onPress={() => { logout() }} /> */}
                  </Stack.Navigator>
                )}
              </Stack.Screen>
            </Drawer.Navigator>
          </UserContext.Provider>
        )}
      </Stack.Screen>
    ) : (
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    );
  }

  return (
    <AuthContext.Provider value={auth}>
      <Stack.Navigator>{renderScreens()}</Stack.Navigator>
    </AuthContext.Provider>
  );
}

function CustomDrawerContent(props) {
  const { logout } = React.useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Deconnexion"
        onPress={() => {
          logout();
        }}
      />
    </DrawerContentScrollView>
  );
}
