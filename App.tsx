

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registerpage from './screens/Registerpage';
import Loginpage from './screens/Loginpage';
import Homepage from './home/Homepage';
import Logoscreen from './screens/Logoscreen';
import { auth, db } from './firebaseconfig';
import BottomNavigate from './BottomNavigate';
import { collection, getDocs } from 'firebase/firestore';


const App=()=> {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const Stack = createNativeStackNavigator();
  
 

  return (

   
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Logo" component={Logoscreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Loginpage} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Registerpage} options={{ headerShown: false }} />
        <Stack.Screen name="MainHome" component={BottomNavigate} options={{ 
          headerTitle:"FINDit",
          headerTitleAlign:"center",
          headerStyle:{backgroundColor:"#121e2c",},
          headerTitleStyle:{color:"white",fontSize:25,fontWeight:"bold"},
          
          }}/>
      </Stack.Navigator>
    </NavigationContainer>

    
  );
}

export default App;
