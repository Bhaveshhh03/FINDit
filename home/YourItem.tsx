import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList, Alert, Image } from "react-native";
import { auth, db } from "../firebaseconfig";
import Postcard from "./Postcard";
import Iconic from "react-native-vector-icons/Ionicons";

const YourItem = ({ navigation }) => {
    const [items, setitems] = useState([]);
    const [refresh, setrefresh] = useState(false);
    const [id, setid] = useState();
    const itemlist = async () => {
        const q = query(collection(db, "items"), where("userId", "==", auth.currentUser?.uid));

        const querySnapshot = await getDocs(q);
        let itemArray: any = [];
        querySnapshot.forEach((doc) => {
            itemArray.push(doc.data());
            setitems(itemArray);
           // setid(doc.id());
        })};


        useEffect(() => {

            itemlist();
            navigation.addListener("focus", () => setrefresh(!refresh));
        }, [navigation, refresh])

        postcard = props => {
            return (
                <View style={styles.card}>

                    <Text style={styles.userinfo} > {props.username}</Text>

                    <Image style={{ marginLeft: 5, marginBottom: 5 }}
                        source={{ uri: props.item_image }}
                        width={290}
                        height={400}
                    />
                    <View style={styles.divider}>
                    </View>
                    <Text style={styles.postinfo} >
                        Item Name : {props.name}{'\n'}
                        Item Description : {props.description}{'\n'}
                        Item's Last Location : {props.last_location}
                    </Text>
                    <Text style={{ fontWeight: "bold", fontSize: 20, color: "black", alignSelf: "center" }}>
                        Item is {props.item_type} !!
                    </Text>
                    <View style={styles.divider}>
                    </View>
                    <View style={styles.postbutton}>
                        {props.item_type == "Lost" ?
                            <TouchableOpacity>
                                <Text>found</Text>
                            </TouchableOpacity> : <TouchableOpacity>
                                <Text>Contact</Text>
                            </TouchableOpacity>}
                    </View>
                </View>
            )
        }


        return (
            <View style={styles.container}>
                <FlatList
                    data={items}
                    renderItem={({ item }) =>
                        this.postcard(item)


                    }
                    keyExtractor={item => item.time}
                />
            </View>
        );
    }
    const styles = StyleSheet.create({
        container: {
            height: "100%",
            paddingHorizontal: 30,
            paddingTop: 30,
            backgroundColor: "#121e2c",
            justifyContent: "center",
            alignItems: "center",
        },
        card: {
            paddingLeft: 13,
            paddingRight: 10,
            paddingBottom: 15,
            backgroundColor: "silver",
            width: "100%",
            marginBottom: 20,
            borderRadius: 10
        },
        postinfo: {

            paddingTop: 10,
            fontSize: 16,
            color: "black"
        },
        divider: {
            borderWidth: 0.5,
            borderColor: "black",
            width: "94%"
        },
        userinfo: {
            paddingTop: 10,
            paddingBottom: 10,
            fontWeight: "bold",
            fontSize: 20,
            color: "black"
        },
        postbutton: {
            marginTop: 10,
            marginLeft: 140,
            marginRight: 120,
            alignItems: "center",



        }
    })

    export default YourItem;