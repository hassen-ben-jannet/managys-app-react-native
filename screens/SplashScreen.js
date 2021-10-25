import React from 'react';
import {View, StyleSheet,Image,Text} from 'react-native';


export function SplashScreen() {

  return (
    <View style={styles.container}>
        <Image source={require('../assets/images/managys-logo.png')} style={styles.logo} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor:'black',
    borderBottomLeftRadius:500,
    borderBottomRightRadius:500,
    marginBottom:200,
    transform : [ { scaleX : 1.6 } ],

  },

  logo: {
    marginTop:300,
    width:"70%",
    alignSelf: "center",
    resizeMode: "contain",
    transform : [ { scaleX : 0.625 } ],
  }
});
