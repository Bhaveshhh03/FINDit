import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Iconic from "react-native-vector-icons/Ionicons";
import { auth, db } from "../firebaseconfig";
import { StackActions } from "react-navigation";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
const Profile = ({ navigation,props }) => {
    const [data, setdata] = useState();
    const getdata = async () => {
        const q = query(collection(db, "users"), where("email", "==", auth.currentUser?.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.data());
          setdata(doc.data().name);
        });
        }
        
        
        useEffect(() => {
            getdata();
        }, [])

    
    return (
        <View style={styles.container}>
            <View style={styles.logout}>
                <Text style={{ color: "white", fontSize: 20 }}>Hello , {data} 👋 </Text>

                <TouchableOpacity style={styles.button}

                    onPress={async () => {
                        await auth.signOut();
                        // navigation.dispatch(StackActions.popToTop());
                    }}>
                    <Iconic name="log-out-outline" size={25} color={"red"} />

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
    button: {
        paddingLeft: 30,
        marginBottom: 20
    },
    logout: {
        flexDirection: "row"
    },
})

export default Profile;