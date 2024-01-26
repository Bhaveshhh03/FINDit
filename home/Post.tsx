import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { addDoc, collection, doc, setDoc, getDocs, Timestamp, serverTimestamp, where, query } from "firebase/firestore";
import { auth, db, storage, storageRef } from "../firebaseconfig";
import { launchImageLibrary } from 'react-native-image-picker';
import Iconic from "react-native-vector-icons/Ionicons";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { SelectList } from 'react-native-dropdown-select-list'
const Post = (props) => {
    const [items, setitems] = useState([]);
    const [name, setname] = useState('');
    const [imagedata, setimagedata] = useState(null);
    const [picture, setpicture] = useState('');
    const [description, setdescription] = useState('');
    const [lastLocation, setlastLocation] = useState('');
    const [userId, setuserId] = useState('');
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
        handleupload();
    }, [])

    const itemlist = async () => {
        const querySnapshot = await getDocs(collection(db, "items"));
        let itemArray: any = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, doc.data());
            itemArray.push(doc.data());
            setitems(itemArray);

        });
    }

    const lost = async () => {
        if (picture == null) {
            return null;
        }
        if (name.length > 0 && description.length && lastLocation.length > 0) {
            const docRef = await addDoc(collection(db, "items"), {
                name: name,
                description: description,
                last_location: lastLocation,
                userId: auth.currentUser?.uid,
                item_type: "Lost",
                item_image: picture,
                time: Date.now(),
                username: data,
                item_categories: selected
            });
            Alert.alert("Post Added Succesfully!!")
            setname("");
            setdescription("");
            setlastLocation("");
            itemlist();
        }
        else {
            Alert.alert("Please enter all Fields!!")
        }


    }
    const found = async (url) => {
        if (name.length > 0 && description.length && lastLocation.length > 0) {
            const docRef = await addDoc(collection(db, "items"), {
                name: name,
                description: description,
                last_location: lastLocation,
                userId: auth.currentUser?.uid,
                item_type: "Found",
                item_image: url,
                time: Date.now(),
                username: data,
                item_categories: selected
            });
            Alert.alert("Post Added Succesfully!!")
            setname("");
            setdescription("");
            setlastLocation("");
            itemlist();
        }
        else {
            Alert.alert("Please enter all Fields!!")
        }

    }

    const pickimage = async () => {
        const result = await launchImageLibrary({
            mediaType: "photo",
            quality: 1,
        }).then(res => {
            if (!res.didCancel) {
                setimagedata(res.assets[0].uri);
                console.log("ressss",res.assets[0].uri);
                handleupload();
            }
        })
    }
    const handleupload = async () => {
        const response = await fetch(imagedata);
        const blob = await response.blob();
        const reference = storageRef(storage, 'user_item/' + Date.now());

        uploadBytes(reference, blob).then((snapshot) => {
            console.log("uploaded blob file");
            getDownloadURL(snapshot.ref).then((downloadUrl) => {
                console.log(downloadUrl);
                found(downloadUrl);
            })
        })
    }
    const [selected, setSelected] = React.useState("");

    const itemcategories = [
        { key: '1', value: 'Mobiles' },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers' },
        { key: '5', value: 'Identiy Card' },
        { key: '6', value: 'Stationary' },
        { key: '7', value: 'Documents' },
        { key: '8', value: 'Others' },
    ]
    console.log("select val", selected);
    return (


        <View style={styles.container}>
            <View style={styles.postcontainer}>
                <TextInput style={styles.field}
                    value={name}
                    onChangeText={(itemname) => { setname(itemname) }}
                    placeholder="Enter item Name"
                    placeholderTextColor="white"
                    autoCapitalize="none"
                    blurOnSubmit={false}
                />
                <TextInput style={styles.field}
                    value={description}
                    onChangeText={(description) => { setdescription(description) }}
                    placeholder="Enter item Description"
                    placeholderTextColor="white"
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    multiline={true}
                />
                <TextInput style={styles.field}
                    value={lastLocation}
                    onChangeText={(lastlocation) => { setlastLocation(lastlocation) }}
                    placeholder="Last item Location"
                    placeholderTextColor="white"
                    autoCapitalize="none"
                    blurOnSubmit={false}
                />
                <SelectList
                    arrowicon={<Iconic name="chevron-down-outline" size={25} color={"white"} />}
                    searchicon={<Iconic name="search-outline" size={25} color={"white"} />}
                    closeicon={<Iconic name="close-outline" size={25} color={"white"} />}
                    inputStyles={{ color: "white" }}
                    dropdownTextStyles={{ color: "white" }}
                    boxStyles={{ borderRadius: 10, borderColor: "white" }}
                    setSelected={(val) => setSelected(val)}
                    data={itemcategories}
                    save="value"
                />
                <TouchableOpacity style={styles.uploadimgButton} onPress={pickimage} >
                    <Text style={{ fontSize: 18, color: "white" }}>
                        Upload Item image
                    </Text>

                </TouchableOpacity>
            </View>
            <View style={styles.buttonpos}>
                <TouchableOpacity style={styles.button} onPress={lost}>
                    <Text style={{ fontSize: 18, color: "white" }}>Lost</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={found} >
                    <Text style={{ fontSize: 18, color: "white" }}>Found</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#121e2c",
        justifyContent: "center",
        alignItems: "center"

    },
    postcontainer: {
        width: "90%",
        height: "auto",
        paddingBottom: 20,
        backgroundColor: "#121e2c",
        borderRadius: 10,
    },
    field: {
        borderBottomColor: "white",
        borderBottomWidth: 1,
        fontSize: 17,
        color: "white",
        height: "auto",
        paddingTop: 10,
        marginBottom: 20

    },
    buttonpos: {
        flexDirection: "row",
        marginTop: 30,
    },
    button: {

        marginLeft: 50,
        marginRight: 50,
        height: 40,
        borderColor: 'white',
        backgroundColor: "#07ab67",
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        justifyContent: "center",
    },
    uploadimgButton: {
        marginTop: 30,
        height: 40,
        borderColor: 'white',
        backgroundColor: "#07ab67",
        paddingLeft: 90,
        paddingRight: 50,
        borderRadius: 10,
        justifyContent: "center",
    }
})
export default Post;