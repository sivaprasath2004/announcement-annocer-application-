import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import * as Font from 'expo-font';
import HomeLoader from "./components/HomeLoader";
import Tabs from './navigation/tabs'
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const App = () => {
const Stack = createStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const [checker, setChecker] = useState("Login");
  const [loaded] = Font.useFonts({
    'Courgette': require('./assets/fonts/Courgette.ttf'),
    'Tangerine': require('./assets/fonts/Tangerine.ttf'),
    'Monoton': require('./assets/fonts/Monoton.ttf'),
  });
  

  useEffect(() => {
   
    const fetchData = async () => {
      const storedValue =
        (await AsyncStorage.getItem("@Annoncement:Annoncer")) || "null";
      const id = (await AsyncStorage.getItem("Annoncement:Annoncer")) || "null";
      if (storedValue !== "null" && id !== "null") {
        try{
        let checking=await axios.post("https://annoncement-annocer-backend.vercel.app/userChecking",{
          id:id,
        })
        if(Object.values(checking.data).length>=1)
        {
          setChecker("Home");
        }
        else{
        setChecker("Login");
        }
      }catch(err){console.log(err)}
      } else {
        setChecker("Login");
      }
      setIsLoading(false);
    };

    fetchData();
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    function loaders(){
      clearTimeout(timer);
    }
    
    loaders()
  }, []);

  return (
    <>
      {isLoading || !loaded ? (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black", 
          }}
        >
          
          <Text style={{fontSize: 35, color: "white", fontWeight: "900" }}>
            Annoncement
          </Text>
          <Text style={{ fontSize: 35, color: "white", fontWeight: "900" }}>
            Annoncer
          </Text>
          <View style={{
marginTop: 150,
width: 50,
height: 50,

          }}>
          <HomeLoader />
          </View>
        </View>
      ) : (
        <NavigationContainer >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={checker}
          >
            <Stack.Screen
              name="Home"
              component={Tabs}
              options={{ headerShown:false, 
              }}
             
            />
            <Stack.Screen
            
              name="Login"
              options={{ headerShown: false }}
              component={Login}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
