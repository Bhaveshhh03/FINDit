import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingViewComponent, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebaseconfig';
import { Firestore, addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import Iconic from 'react-native-vector-icons/Ionicons';
import { log } from "react-native-reanimated";
import { SelectList } from "react-native-dropdown-select-list";

const Registerpage = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, setuser] = useState('');
  const [selected, setSelected] = React.useState("");
  const itemcategories = [
    { key: '1', value: 'Student' },
    { key: '2', value: 'Faculty' },
    { key: '3', value: 'External' },
  ]
  const create = async () => {

    if (email.length > 0 && password.length > 0) {
      if (password.length > 5) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            // Signed up 
            navigation.navigate("Login");
            await setDoc(doc(db, "users", auth.currentUser?.uid), {
              name: name,
              email: email,
              role: selected,
              date: serverTimestamp()
            });
            Alert.alert("Hurray....you Registerd succesfully PLease Log in");

            console.log(user);

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(errorMessage);
            // ..
          })
      }

      else {
        Alert.alert("password have atleast 6 or more than 6 characters")
      }

    }

    else {
      Alert.alert("Enter valid email id or password.")
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
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
      <Text style={{color:"white", marginLeft:10,marginBottom:10}}>Please Select between the Student , Faculty or External user below</Text>
      <SelectList
        arrowicon={<Iconic name="chevron-down-outline" size={25} color={"white"} />}
        searchicon={<Iconic name="person" size={20} color={"white"} />}
        closeicon={<Iconic name="close-outline" size={25} color={"white"} />}
        inputStyles={{ color: "white", fontSize: 15 }}
        dropdownTextStyles={{ color: "white" }}
        boxStyles={{ borderRadius: 15, borderColor: "white" }}
        setSelected={(val) => setSelected(val)}
        data={itemcategories}
        save="value"
      />
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
    marginTop: 50,
    marginBottom: 30,
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