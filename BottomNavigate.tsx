import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "./home/Homepage";
import Post from "./home/Post";
import YourItem from "./home/YourItem";
import Iconic from "react-native-vector-icons/Ionicons";
import Profile from "./home/Profile";


const Tab = createBottomTabNavigator();

const BottomNavigate = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown:false,
            tabBarActiveTintColor:"#07ab67",
            tabBarInactiveTintColor:"white",
            tabBarStyle:{backgroundColor:"#121e2c",height:60},
            tabBarShowLabel:false,
            tabBarIcon: ({ color, size, focused }) => {
                let iconname;

                if (route.name == "Home") {
                    iconname = focused ? "home" : "home-outline";
                }
                else if (route.name == "post") {
                    iconname = focused ? "add" : "add-outline";
                }
                else if (route.name == "Your Items") {
                    iconname = focused ? "list" : "list-outline";
                }
                else if (route.name == "profile") {
                    iconname = focused ? "person" : "person-outline";
                }
                return <Iconic name={iconname} size={29} color={color} />;

            },
        })}>
            <Tab.Screen name="Home" component={Homepage} />
            <Tab.Screen name="post" component={Post} />
            <Tab.Screen name="Your Items" component={YourItem} />
            <Tab.Screen name="profile" component={Profile}/>
        </Tab.Navigator>
    )

}
export default BottomNavigate;