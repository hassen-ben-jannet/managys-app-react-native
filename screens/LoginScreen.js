import React, { useState } from 'react';
import { TouchableOpacity, View, Text, ScrollView, TextInput, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../contexts/AuthContext';
import { Dimensions } from "react-native";
import {Loading} from '../components/Loading';

const win = Dimensions.get('window');
export function LoginScreen({ navigation }) {
  const { login } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  function test(text) {
    console.log(text)
  }
  return (
    <View style={styles.container}>

      <View style={styles.sectionLogin}>

        <Image source={require('../assets/images/managys-logo.png')} style={styles.logo} />

        <View >
          <Text style={styles.loginText}>Se Connecter</Text>
          <TextInput
            style={styles.input}
            placeholder={'Email'}
            textContentType='username'
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder={'Password'}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.button}>
            <TouchableOpacity onPress={async () => {
              try {
                setLoading(true);

                await login(email, password)
                test('logged in')


              } catch (e) {
                setError(e.message);
                setLoading(false);
              }
            }}>
              <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
          </View>
       
        </View>
      </View>
      <Loading loading={loading} />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: 'white'

  },

  input: {
    width: '80%',
    height: 40,
    alignSelf: 'center',
    justifyContent: "center",
    borderBottomWidth: 1,

    marginVertical: 8,
    paddingHorizontal: 32,

  },
  logo: {
    width: win.width / 2,
    height: win.width / 5,
    alignSelf: "center",
    resizeMode: "contain"
  },
  loginText: {
    alignSelf: 'center',
    justifyContent: "center",
    fontSize: 25,
    fontWeight: '600',
    paddingTop: 60,
    paddingBottom: 20,

    // color: '#fff'
  },
  sectionLogin: {
    flex: 1,
    marginTop: 100,
    flexDirection: "column",
    justifyContent: "flex-start",

  },
  button: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 30,
    marginTop: 20,
    padding: 8,
    backgroundColor: '#f19a20'

  },
  textButton: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',

  }


});
