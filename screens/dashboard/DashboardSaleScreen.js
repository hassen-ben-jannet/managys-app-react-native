import * as React from "react";
import { StyleSheet, Dimensions, FlatList  } from "react-native";

import { Text, View } from "../../components/Themed";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { BASE_URL } from "../../config";

import { UserContext } from "../../contexts/UserContext";
import {DashboardChartListing} from "../../components/DashboardChartListing";

import { Loading } from "../../components/Loading"
const initialLayout = { width: Dimensions.get('window').width };

export default function DashboardSaleScreen() {
  
  const { token } = React.useContext(UserContext);
  const [index, setIndex] = React.useState(0);
  
  const [loading, setLoading] = React.useState(false);
  const [chartMonthData, setChartMonthData] = React.useState({
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  });
  
  const [listingMonthData, setListingMonthData] = React.useState([]);
  const [chartQuarterData, setChartQuarterData] = React.useState({
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  });
  
  const [listingQuarterData, setListingQuarterData] = React.useState([]);
  const [nbrOrders, setNbrOrders] = React.useState(0);
  
  const [nbrPaidInvoices, setNbrPaidInvoices] = React.useState(0);
  
  const [nbrUnpaidInvoices, setNbrUnpaidInvoices] = React.useState(0);
  const [totalOrders, setTotalOrders] = React.useState(0);
  const [totalPaidInvoices, setTotalPaidInvoices] = React.useState(0);
  const [totalUnpaidInvoices, setTotalUnpaidInvoices] = React.useState(0);
  
  const [totalInvoices, setTotalInvoices] = React.useState(0);
  const [routes] = React.useState([
    { key: 'monthlySale', title: 'Mensuelles'},
    { key: 'quarterlySale', title: 'Trimestriels'},
  ]);
  React.useEffect(() => {
    const url = `${BASE_URL}/api/dashboard?year=2021&type=out_invoice`;
    setLoading(true);

    fetch(url, {
      credentials: "omit",
      headers: {
        access_token: token,
      },
    }).then((res) => res.json())
    .then((res) => {
      if (res.error == "invalid_token") {
        logout();
      }
      let list = res;
      setNbrOrders(list.nbr_orders);
      setTotalOrders(list.total_orders);
      setNbrPaidInvoices(list.nbr_paid_invoices);
      setNbrUnpaidInvoices(list.nbr_unpaid_invoices);
      setTotalPaidInvoices(list.total_paid);
      setTotalUnpaidInvoices(list.total_unpaid);



      
      setChartMonthData({
        labels: list.months.map( ({month}) => month),
        datasets: [
          {
            data: list.months.map( ( { total} ) => total)
          }
        ]
      });
      setListingMonthData(list.months);
      setChartQuarterData({
        labels: list.quarters.map( ( { quarter} ) => quarter),
        datasets: [
          {
            data: list.quarters.map( ( { total} ) => total)
          }
        ]
      });
      setListingQuarterData(list.quarters);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
    });

  }, [])

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'monthlySale':
        return <DashboardChartListing chartData={chartMonthData} listingData={listingMonthData} />;
      case 'quarterlySale':
        return <DashboardChartListing chartData={chartQuarterData} listingData={listingQuarterData} />;
      default:
        return null;
    }
  };
  

  return (
<View style={styles.container}>
  
      <Text style={styles.sectionName}>Ventes</Text> 
      <View style={styles.topSection}>
      <View style={styles.sectionContainer}>
        <View style={styles.subsectionColumn}>
          <Text  style={styles.totalTitle}> Commandes</Text>
          <Text  style={styles.totalNbrInvoices}> {nbrOrders} Commandes</Text>
          <Text  style={styles.totalContent}> {parseFloat(totalOrders).toFixed(3)} TND </Text>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.subsectionColumn}>
          <Text  style={styles.totalTitle}> Factures A payer</Text>
          
          <Text  style={styles.totalNbrInvoices}> {nbrUnpaidInvoices} Factures</Text>
          <Text  style={styles.totalContent}> {parseFloat(totalUnpaidInvoices).toFixed(3)} TND </Text>
        </View>
      </View>
      
      <View style={styles.sectionContainer}>
        <View style={styles.subsectionColumn}>
          <Text  style={styles.totalTitle}> Factures Payés </Text>
          <Text  style={styles.totalNbrInvoices}> {nbrPaidInvoices} Factures</Text>
          <Text  style={styles.totalContent}> {parseFloat(totalPaidInvoices).toFixed(3)} TND </Text>
        </View>
      </View>
      </View>
      
      

      <TabView
          navigationState={{ index, routes }}
          renderScene={_renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          style={styles.containerTab}
          renderTabBar={props => <TabBar {...props}
          indicatorStyle={{ backgroundColor: '#f19a20' }}
          style={{ backgroundColor: 'white' }}
          labelStyle={{color:'#f19a20'}}
         />} 
        />
        
        <Loading loading={loading} />
        
    
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  topSection: {
    flexDirection: "row",
  },
  sectionContainer: {
    borderRadius: 2,

    elevation:2,
    paddingVertical: 5, 
    margin: 3,
    flex:1,
  },
  sectionName: {
    fontSize: 22, 
    padding: 5,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#f19a20',
  },
  subsectionColumn: {
    flexDirection: "column", 
    alignItems:'flex-start',
    alignSelf:'center',
  },
  totalTitle: {
    fontSize: 15,
    paddingVertical:3,
    alignSelf:'center',
    fontWeight: 'bold'
  },
  totalNbrInvoices: {
    fontSize: 13,
    paddingVertical:3,
    alignSelf:'center',

  },
  totalContent: {
    fontSize: 14,
    paddingVertical:3,

    alignSelf:'center',
    color:'grey',
    fontWeight: 'bold'
  },
  containerTab: {
    marginTop: 10,
    elevation:1,
    height:1000,
    color: 'white'
  },
});
