import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from "react-native";
import { auth, db } from "../firebaseconfig";
import Iconic from "react-native-vector-icons/Ionicons";

const YourItem = ({ navigation }) => {
    const [items, setItems] = useState([]);

    // Function to fetch items from Firestore
    const fetchItems = async () => {
        try {
            const q = query(collection(db, "items"), where("userId", "==", auth.currentUser?.uid));
            const querySnapshot = await getDocs(q);
            const fetchedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(fetchedItems);
            
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    // Function to handle item deletion
    const handleDelete = async (itemId) => {
        try {
            await deleteDoc(doc(db, "items", itemId));
            Alert.alert("Deleted successfully");
            // Refresh the list after deletion
            fetchItems();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };
   
    
    // Fetch items on component mount and when navigation focus changes
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => fetchItems());
        return unsubscribe;
    }, [navigation]);

    // Render individual item
   
    
        const renderItem = ({ item }) => (                
                <View style={styles.card}>
                <Text style={styles.userinfo}>{item.username}</Text>
                <Image style={{ marginLeft: 5, marginBottom: 5 }} source={{ uri: item.item_image }} width={290} height={400} />
                <View style={styles.divider}></View>
                <Text style={styles.postinfo}>
                    Item Name: {item.name}{'\n'}
                    Item Description: {item.description}{'\n'}
                    Item's Last Location: {item.last_location}
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 20, color: "black", alignSelf: "center" }}>
                    Item is {item.item_type} !!
                </Text>
                <View style={styles.divider}></View>
                <View style={styles.postbutton}>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                        <Iconic name="trash-outline" size={25} color={"red"} />
                    </TouchableOpacity>
                </View>
            </View>
             
        );
    

    return (
        <View style={styles.container}>
             <FlatList
             data={items}
             renderItem={renderItem}
             keyExtractor={item => item.id}
         />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121e2c",
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    card: {
        paddingLeft: 13,
        paddingRight: 10,
        paddingBottom: 15,
        backgroundColor: "silver",
        marginBottom: 20,
        borderRadius: 10,
    },
    postinfo: {
        paddingTop: 10,
        fontSize: 16,
        color: "black",
    },
    divider: {
        borderWidth: 0.5,
        borderColor: "black",
        width: "94%",
    },
    userinfo: {
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
    },
    postbutton: {
        marginTop: 10,
        alignSelf: "center",
    },
});

export default YourItem;
