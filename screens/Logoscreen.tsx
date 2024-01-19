import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from '../firebaseconfig';
import { StackActions, useNavigation } from "@react-navigation/native";
import BottomNavigate from "../BottomNavigate";
import Loginpage from "./Loginpage";
const Logoscreen = ({ navigation }) => {



    useEffect(() => {
        setTimeout(() => {

            auth.onAuthStateChanged((user) => {
                const isUserlogin = user ==null ?    "Login" :"MainHome"       
                navigation.dispatch( StackActions.replace(isUserlogin));    
            })
        }, 600)
        return () => {

        }
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                FINDit
            </Text>
        </View>
    )

}
const styles = StyleSheet.create({
    container:{
        height:"100%",
        backgroundColor:"#121e2c",
        justifyContent:"center"
    
      },
      text:{
        color:"white",
        fontSize:40,
        fontWeight:"bold",
        fontFamily:"normal",
        textAlign:"center",
        paddingBottom:70
        
      },
})
export default Logoscreen;