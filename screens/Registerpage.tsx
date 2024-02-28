import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingViewComponent, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebaseconfig';
import { Firestore, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import Iconic from 'react-native-vector-icons/Ionicons';




const Registerpage = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const userinfo = async () => {
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      email:email,
     
    });
  }

  const create = () => {
    if (email.length > 0 &&  password.length >0 ) {
      if(password.length>5){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 

          const user = userCredential.user;
          Alert.alert("Hurray....you Registerd succesfully PLease Log in");
          navigation.navigate("Login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(errorMessage);
          // ..
        })
      }
      else{
          Alert.alert("password have atleast 6 or more than 6 characters")
      }
     
    }

    else {
      Alert.alert("Enter valid email id or password.")
    }
      userinfo();
  }

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      console.log(data);
    })
  })

  return (
    <View style={styles.container}>
      <Text style={styles.maintext}>
        FINDit
      </Text>
      <Text style={styles.subtext}>
        Register
      </Text>

      <View style={styles.inputContainer}>
        <Iconic name="person" size={20} color={"white"} />
        <TextInput
          value={name}
          onChangeText={(name) => { setName(name) }}
          placeholder="Enter name"
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
          CREATE
        </Text>
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
    color: 'white',
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
export default Registerpage;