import React, { useEffect, useState } from "react"
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Iconic from "react-native-vector-icons/Ionicons";
import { auth, db } from "../firebaseconfig";
import { StackActions } from "react-navigation";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import UpdateProfile from "./UpdateProfile";
const Profile = ({ navigation }) => {
    const [data, setdata] = useState('');
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const getdata = async () => {
        const docRef = doc(db, "users", auth.currentUser?.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setdata(docSnap.data().name)
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          
        }
    }

    useEffect(() => {
        getdata();
        setdata('');
    }, [])


    return (
        <View style={styles.container}>

            <Text style={{
                color: "white",
                fontSize: 28,
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                Hello,</Text>
            <Text style={{
                color: "white",
                fontSize: 20,
                fontWeight: 'bold',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                {data} 👋
            </Text>


            <View style={styles.subcontainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Updateprofile')}>
                    <Text style={{ color: 'black',fontSize:17 }}>
                        Update Profile
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutbutton} onPress={async () => {
                    await auth.signOut();
                    // navigation.dispatch(StackActions.popToTop());
                    Alert.alert("You have been Logged out!")
                }} >
                    <Text style={{ color: 'white',fontSize:17 }}>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingHorizontal: 3,
        paddingTop: 10,
        backgroundColor: "#121e2c"
    },
    subcontainer: {
        height: "100%",
        paddingHorizontal: 0,
        paddingTop: 30,
        backgroundColor: "#121e2c"
    },
    button: {
        marginTop: 20,
        height: 50,
        borderColor: 'white',
        backgroundColor: "#07ab67",
        paddingLeft: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    logoutbutton: {
        marginTop: 20,
        height: 50,
        borderColor: 'white',
        backgroundColor: "red",
        paddingLeft: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
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
})

export default Profile;