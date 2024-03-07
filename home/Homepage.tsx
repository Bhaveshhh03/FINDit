import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebaseconfig';
import { useRoute, useNavigation, StackActions, NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import { SelectList } from 'react-native-dropdown-select-list'
import Iconic from "react-native-vector-icons/Ionicons";
import Postcard from "./Postcard";

const Homepage = ({ navigation }) => {

    const [items, setitems] = useState([]);
    const [olditems, setolditems] = useState([]);
    const [refresh, setrefresh] = useState(false);
    const [selected, setSelected] = React.useState("");

    const itemlist = async () => {
        const querySnapshot = await getDocs(collection(db, "items"));
        let itemArray: any = [];
        querySnapshot.forEach((doc) => {
            itemArray.push(doc.data());
            setitems(itemArray);
            setolditems(itemArray);
            console.log(items);
        });

    }
    useEffect(() => {
        itemlist();
        navigation.addListener("focus", () => setrefresh(!refresh));
    }, [navigation, refresh])


    const filteritem = (item) => {
        if (item.item_categories == selected) {
            return (
                <Postcard name={item.name}
                    description={item.description}
                    last_location={item.last_location}
                    username={item.username}
                    item_type={item.item_type}
                    item_image={item.item_image}
                    email={item.useremail} />
            )
        }
        if (selected == "All" || selected == "") {
            return (
                <Postcard name={item.name}
                    description={item.description}
                    last_location={item.last_location}
                    username={item.username}
                    item_type={item.item_type}
                    item_image={item.item_image}
                    email={item.useremail} />
            )
        }
    }


    const itemcategories = [
        { key: '1', value: 'All' },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers' },
        { key: '5', value: 'Identiy Card' },
        { key: '6', value: 'Stationary' },
        { key: '7', value: 'Documents' },
        { key: '8', value: 'Mobiles' },
        { key: '9', value: 'Others' },
    ]
    return (


        <View style={styles.container}>

            <SelectList
                arrowicon={<Iconic name="chevron-down-outline" size={25} color={"white"} />}
                searchicon={<Iconic name="search-outline" size={25} color={"white"} />}
                closeicon={<Iconic name="close-outline" size={25} color={"white"} />}
                inputStyles={{ color: "white" }}
                placeholder="Search Item "
                dropdownTextStyles={{ color: "white" }}
                boxStyles={{ borderRadius: 10, borderColor: "white" }}
                setSelected={(val) => setSelected(val)}
                data={itemcategories}
                save="value" />

            <FlatList style={{ marginTop: 20 }}
                data={items}
                renderItem={({ item }) => filteritem(item)}
                keyExtractor={item => item.time} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: "#121e2c"

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
    userinfo: {
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: "bold",
        fontSize: 20,
        color: "black"
    },
    divider: {
        borderWidth: 0.5,
        borderColor: "black",
        width: "94%"
    },
    postinfo: {

        paddingTop: 10,
        fontSize: 16,
        color: "black"
    },
    postbutton: {
        marginTop: 10,
        marginLeft: 110,
        marginRight: 110,
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#07ab67"

    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
})
export default Homepage;