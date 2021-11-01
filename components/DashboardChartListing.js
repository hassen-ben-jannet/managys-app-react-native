import * as React from 'react';
import {
    BarChart,
  } from "react-native-chart-kit";
  
import { Text, View } from "../components/Themed";

import { StyleSheet, Dimensions, FlatList  } from "react-native";
const screenWidth = Dimensions.get("window").width -20;
const chartConfig = {
    backgroundGradientFrom: "white",
    // backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "white",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  
  };
  

export const DashboardChartListing = (props) => {
    return (
    <View style={[ { flex:2}]} >
      <BarChart
        style={{padding:10,}}
        data={props.chartData}
        width={screenWidth}
        height={290}
        chartConfig={chartConfig}
        verticalLabelRotation={50}
        yLabelsOffset={5}
        
        xLabelsOffset={-10}
        showBarTops={false}
        fromZero={true}
      />
      <FlatList
          data={props.listingData}
          keyExtractor={(listing) => "month" in listing ? listing.month : listing.quarter}
          style={{flex:1}}
          renderItem={({ item }) => (
            <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', padding:10, borderBottomWidth:1}}>
              <View style={{flexDirection: 'column'}}>
                <Text >{"month" in item ? item.month : item.quarter}</Text>
                
                <Text style={{color:'grey'}}>{item.nbr_invoices} Factures </Text>
              </View>
              <Text style={{alignItems:'flex-end'}}>{parseFloat(item.total).toFixed(3)} TND</Text>
            </View>
          )}
        />
    </View>
  )};