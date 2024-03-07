import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import Iconic from "react-native-vector-icons/Ionicons";
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseconfig";

const UpdateProfile = ({ navigation }) => {
    const [dataname, setdataname] = useState('');
    const [dataemail, setdataemail] = useState('');
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const getdata = async () => {
        const q = query(collection(db, "users"), where("email", "==", auth.currentUser?.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data());
            setname(doc.data().name);
            setemail(doc.data().email);
        });
    }
    const handleupdate =async () => {
        const userRef = doc(db, "users", `${auth.currentUser?.uid}`);

        // Set the "capital" field of the city 'DC'
        await updateDoc(userRef, {
            name:name,
        });
        Alert.alert("Information updated succesfully!!")
    }
    useEffect(() => {
        getdata();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={{
                color: "white",
                fontSize: 20,
                justifyContent: 'center',
                textAlign: 'center',
                marginTop: 20
            }}>
                Edit your Information here
            </Text>
            <View style={{ marginTop: 20 }}>
                <View style={styles.inputContainer}>
                    <Iconic name="person" size={20} color={"white"} />
                    <TextInput
                        value={name}
                        onChangeText={(name) => { setname(name) }}
                        placeholder="Edit Name"
                        placeholderTextColor="grey"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        returnKeyType="next"
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                        style={{ color: "white", fontSize: 18, width: "90%" }}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={ handleupdate}>
                    <Text style={{ color: 'black', fontSize: 17 }}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingHorizontal: 30,
        paddingTop: 10,
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
export default UpdateProfile;