import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Button, Modal, Linking } from "react-native";
import { auth, db } from '../firebaseconfig';
import Iconic from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";

const Postcard = (props) => {
    const [openmodal, setopenmodal] = useState(false);
    const [Emailtext, setEmailtext] = useState('');
    const emailsubmit=(useremail)=>{
      Linking.openURL(`mailto:${useremail}?body:${Emailtext}`)
    }
    function emailtextbox(useremail) {

        return (
            <View>
                <Modal visible={openmodal} animationType="slide" transparent={true} >
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.5)"
                    }}>
                        <View style={{
                            backgroundColor: "#121e2c",
                            padding: 10,
                            height: '90%',
                            width: '90%',
                            borderRadius: 30,

                        }}>
                            <Text></Text>
                            <TouchableOpacity onPress={() => setopenmodal(false)} style={{
                                alignSelf: "center",
                                paddingLeft: 250,
                                paddingTop: 10
                                }}><Iconic name="close-outline" size={30} color={"white"} />
                            </TouchableOpacity>
                            <Text style={{
                                fontSize:16,
                                color:'white',
                                paddingLeft:29,
                                marginTop:20
                            }}>Enter Your Message to Send </Text>
                            <TextInput
                                value={Emailtext}
                                onChangeText={(emailtext) => { setEmailtext(emailtext) }}
                                placeholderTextColor="white"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                blurOnSubmit={false}
                                multiline={true}
                                style={{ color: "white", fontSize: 18, width: "90%" ,
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop:30,
                                marginLeft:18,
                                paddingLeft: 15,
                                paddingRight: 15,
                                borderWidth: 1,
                                borderRadius: 15,
                                borderColor: 'white',    
                            }}
                            />
                           <View style={{
                            marginLeft:50,
                            marginRight:50,
                            marginTop:30,
                            
                           }}>
                           <Button title="Submit" color='#07ab67' onPress={()=>emailsubmit(useremail)}/>
                           </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
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

            <View style={{flexDirection:"row",marginBottom:10}}>
            <Text style={styles.userinfo} > {props.username}</Text>
            <Text style={{paddingTop:15,marginLeft:5,fontWeight:"bold"}}>({props.role})</Text>
            </View>
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
                    <TouchableOpacity  onPress={() => setopenmodal(true)}>
                        <Text style={{color:"white"}}>Found</Text>
                    </TouchableOpacity> : <TouchableOpacity  onPress={() => setopenmodal(true)}>
                        <Text style={{color:"white"}}>Contact</Text>
                    </TouchableOpacity>}
            </View>
            {emailtextbox(props.email)}
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