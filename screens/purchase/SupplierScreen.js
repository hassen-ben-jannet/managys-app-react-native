import { SupplierCard } from "../../components/SupplierCard";
import { SearchBar } from "../../components/SearchBar";
import React, { useState, useContext, useEffect } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid,
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
import { Loading } from "../../components/Loading";
import { ListEmpty } from "../../components/ListEmpty";

import { styles } from "../../themes/styles";

export default function SupplierScreen(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);
  const { logout } = React.useContext(AuthContext);

  console.log("SupplierScreen");

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
      // ToastAndroid.show("Data refreshed", ToastAndroid.LONG);
    });
  };

  const makeRemoteRequest = (
    token,
    filter = "?filters=[('supplier', '=', True)]"
  ) => {
    const url = `${BASE_URL}/api/res.partner` + filter;
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
        if (list) {
          list.sort((a, b) => b.total_invoiced - a.total_invoiced);
        }

        setLoading(false);
        setData(list);
        setError(res.error || null);
        setFullData(list);
      })
      .catch((error) => {
        console.log("login error ::: " + error);
        console.log("token used ::: " + token);

        setError(error);
        setLoading(false);
      });
  };

  const contains = ({ name, email }, query) => {
    // if (name.includes(query) || email.includes(query)) {
    if (name.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    return false;
  };

  handleSearch = (text) => {
    console.log("search:" + text);
    const formattedQuery = text.toLowerCase();
    const data = filter(fullData, (user) => {
      return contains(user, formattedQuery);
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

  const renderSupplierCard = ({ item: supplier }) => {
    return <SupplierCard supplier={supplier} props={props} />;
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
          renderItem={renderSupplierCard}
          keyExtractor={(item) => item.id.toString()}
          // ItemSeparatorComponent={renderSeparator}
          ListHeaderComponent={SearchBar}
          stickyHeaderIndices={[0]}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={ListEmpty}
        />
        <Loading loading={loading} />
      </View>
    </ApplicationProvider>
  );
}
