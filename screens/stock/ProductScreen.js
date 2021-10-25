import { ProductCard } from "../../components/ProductCard";
import { SearchBar } from "../../components/SearchBar";
import React, { useState, useContext, useEffect } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid,
  Button,
} from "react-native";
import filter from "lodash.filter";
import {
  ApplicationProvider,
  Text,
  Avatar,
  Input,
} from "@ui-kitten/components";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { BASE_URL } from "../../config";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../contexts/AuthContext";

import { styles } from "../../themes/styles";

export default function ProductScreen(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);
  const { logout } = React.useContext(AuthContext);

  console.log("ProductScreen");

  useEffect(() => {
    const user = AsyncStorage.getItem("user").then((response) => {
      let token = JSON.parse(response).token;
      makeRemoteRequest(token);
    });
  }, []);

  refreshData = () => {
    const user = AsyncStorage.getItem("user").then((response) => {
      let token = JSON.parse(response).token;
      makeRemoteRequest(token);
      ToastAndroid.show("Data refreshed", ToastAndroid.LONG);
    });
  };

  filterDataState = (state = "all") => {
    const user = AsyncStorage.getItem("user").then((response) => {
      let token = JSON.parse(response).token;
      makeRemoteRequest(token, state);
      ToastAndroid.show("Data filtred", ToastAndroid.LONG);
    });
  };

  const makeRemoteRequest = (token, state = "all") => {
    let filter = "";
    if (state != "all") {
      filter = `?filters=[('state', '=', '${state}')]`;
    }
    const url = `${BASE_URL}/api/product.template` + filter;
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
        let list = res.results;
        // if (list) {
        //   list.sort((a, b) => b.amount_total - a.amount_total);
        // }

        setLoading(false);
        setData(list);
        setError(res.error || null);
        setFullData(list);
      })
      .catch((error) => {
        console.log("login error : " + error);
        console.log("token used : " + token);

        setError(error);
        setLoading(false);
      });
  };

  const contains = ({ name }, query) => {
    // if (name.includes(query) || email.includes(query)) {
    let query_min = query.toLowerCase();
    if (name.toLowerCase().includes(query_min)) {
      return true;
    }
    return false;
  };

  handleSearch = (text) => {
    console.log("search:" + text);
    const formattedQuery = text.toLowerCase();
    const data = filter(fullData, (item) => {
      return contains(item, formattedQuery);
    });

    // setQuery(text);
    setData(data);
  };

  const renderIcon = (props) => (
    <Icon name="magnify" size={25} color={"lightgrey"} />
  );

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%",
        }}
      />
    );
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const renderProductCard = ({ item: product }) => {
    return <ProductCard product={product} props={props} />;
  };

  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 2,
          paddingVertical: 2,
          marginTop: 0,
        }}
      >
        <FlatList
          data={data}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id.toString()}
          // ItemSeparatorComponent={renderSeparator}
          ListHeaderComponent={SearchBar}
          stickyHeaderIndices={[0]}
          ListFooterComponent={renderFooter}
        />
      </View>
    </ApplicationProvider>
  );
}
