import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingViewComponent, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail, getAuth } from 'firebase/auth'
import { auth } from '../firebaseconfig';
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import Iconic from "react-native-vector-icons/Ionicons";

const Loginpage = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const create = () => {
    if (email.length > 0 && password.length > 0) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

          navigation.dispatch(StackActions.replace("MainHome"));
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(errorMessage);
        })
    }
    else {
      Alert.alert("Enter valid email id or password.");
    }
  }

  const handleforgotpass = () => {
   if(email!=null){
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Please check your email Password reset email is sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        Alert.alert(errorMessage);
      });
   }
   else{
    Alert.alert("Please enter your valid email.");
   }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.maintext}>
        FINDit
      </Text>
      <Text style={styles.subtext}>
        Login
      </Text>


      <View style={styles.inputContainer}>

        <Iconic name="mail" size={20} color={"white"} />

        <TextInput
          value={email}
          onChangeText={(email) => { setEmail(email) }}
          placeholder="Enter Email"
          placeholderTextColor="grey"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          underlineColorAndroid="#f000"

          blurOnSubmit={false}
          style={{ color: "white", fontSize: 18, width: "90%" }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Iconic name="lock-closed" size={20} color={"white"} />

        <TextInput
          value={password}
          onChangeText={(password) => { setPassword(password) }}
          placeholder="Password"
          placeholderTextColor="grey"
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="done"
          secureTextEntry={true}
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
          style={{ color: "white", fontSize: 18, width: "90%" }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={create}>
        <Text style={{ color: 'white' }}>
          LOGIN
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{ color: "white", paddingLeft: 50, paddingTop: 20 }}>Don't have an Account ? </Text>
        <Text style={{ color: "#07ab67", paddingLeft: 5, paddingTop: 20 }} onPress={() =>
          navigation.navigate('Register')}>Register</Text>
      </View>
      <TouchableOpacity style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
      }} onPress={handleforgotpass}>
        <Text style={{ color: "#07ab67", fontSize: 13 }}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: "#121e2c"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'white',
    fontSize: 15,
    width: "100%"
  },
  maintext: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "normal"
  },
  subtext: {
    color: "white",
    marginTop: 80,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    marginTop: 30,
    height: 50,
    borderColor: 'white',
    backgroundColor: "#07ab67",
    paddingLeft: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
})
export default Loginpage;