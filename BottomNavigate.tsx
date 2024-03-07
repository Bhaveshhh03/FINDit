import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "./home/Homepage";
import Post from "./home/Post";
import YourItem from "./home/YourItem";
import Iconic from "react-native-vector-icons/Ionicons";
import Profile from "./home/Profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import UpdateProfile from "./home/UpdateProfile";


const Tab = createBottomTabNavigator();
const Profilestack = ({ navigation }) => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="Updateprofile" component={UpdateProfile} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
const BottomNavigate = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "#07ab67",
            tabBarInactiveTintColor: "white",
            tabBarStyle: { backgroundColor: "#121e2c", height: 60 },
            tabBarShowLabel: false,
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
                else if (route.name == "Profilestack") {
                    iconname = focused ? "person" : "person-outline";
                }
                return <Iconic name={iconname} size={29} color={color} />;

            },
        })}>
            <Tab.Screen name="Home" component={Homepage} />
            <Tab.Screen name="post" component={Post} />
            <Tab.Screen name="Your Items" component={YourItem} />
            <Tab.Screen name="Profilestack" component={Profilestack} />
        </Tab.Navigator>
    )

}
export default BottomNavigate;