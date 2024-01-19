import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { auth, db } from '../firebaseconfig';
import Iconic from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";

const Postcard = (props) => {
    const [imagedata, setimagedata] = useState('');
    const pickimage = async () => {
        const result = await launchImageLibrary({
            mediaType: "photo",
            quality: 1,
        }).then(res => {
            if (!res.didCancel) {
                setimagedata(res.assets[0].uri);
                console.log(res.assets[0].uri);
            }
        })
    }
    return (

        <View style={styles.card}>

            <Text style={styles.userinfo} > {props.username}</Text>

            {imagedata==null?(null
            ):<Image style={{ marginLeft: 4, marginBottom: 5 }}
            source={{ uri: props.item_image }}
            width={320}
            height={400}/>}
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

const styles = StyleSheet.create({
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
        width: "99%"
    },
    postinfo: {

        paddingTop: 10,
        fontSize: 16,
        color: "black"
    },
    postbutton: {
        marginTop: 10,
        marginLeft: 120,
        marginRight: 110,
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#07ab67"

    }
});
export default Postcard;