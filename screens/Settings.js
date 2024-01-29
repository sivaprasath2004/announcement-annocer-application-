import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet,BackHandler,Alert  } from "react-native";
import SetttingsAccountPage from "../components/Settings";
import Emailers from "../components/Emailers";
import AddUser from "../components/AddUser";
import Logout from "./Logout";
import About from "../components/About";
import MyComponent from "../constants/fonts";
import {
  MaterialCommunityIcons,
  Entypo,
  Zocial,
  AntDesign,
  FontAwesome5,FontAwesome
} from "@expo/vector-icons";
import * as Font from 'expo-font';
import Settingsprivacy from "../components/Settingsprivacy";
const Setttings = () => {
  useEffect(() => {
    const backPressed = () => {
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backPressed);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backPressed);
    };
  }, []); 
  const [checker, setChecker] = useState({
    profile: false,
    privacy: false,
    addreceiver: true,
    Emailers: true,
    About: true,
    Logout: true,
    profileDetails:true,
  });
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(()=>{
    const loadFont = async () => {
      await Font.loadAsync({
        'Courgette': require('../assets/fonts/Courgette.ttf'),
        'Sriracha':require('../assets/fonts/Sriracha.ttf')
         });
         setFontLoaded(true);
    };

    loadFont();
  },[])
  if (!fontLoaded) {
    return null;
  }
  function handleUser({ item }) {
    setChecker((previous) => ({ ...previous, profile: item, privacy: item }));
  }
  function BACK(item, value) {
    setChecker((previous) => ({ ...previous, [item]: value }));
  }
  return (
    <>
    {!checker.profile &&
      !checker.privacy &&
      checker.addreceiver && 
      checker.Emailers &&
      checker.About &&
      checker.Logout &&
      checker.profileDetails? 
    
    <View
      style={{
        backgroundColor:'white',
        justifyContent: "center",
        paddingLeft:20,
        height: "100%",
        gap: 20,
        paddingBottom:50
      }}
    >
      
        <>
        <Text style={{fontFamily:'Sriracha',fontSize:20,paddingLeft:10}}>General</Text>
        <View style={styles.container}>
            <TouchableOpacity
              onPress={() =>
                setChecker((previous) => ({ ...previous, profileDetails: false }))
              }
              style={styles.button}
            >
              <View style={{flex:1}}>
              <FontAwesome name="user" size={24} color="black" />
              </View>
              <Text style={styles.text}>Profile</Text>
              <View style={{flex:1.8}}>
              <AntDesign name="right" size={24} color="gray" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() =>
                setChecker((previous) => ({ ...previous, privacy: true }))
              }
              style={styles.button}
            >
              <View style={{flex:1}}>
              <Entypo name="lock" size={30} color="black" />
              </View>
              <Text style={styles.text}>Password</Text>
              <View style={{flex:1.8}}>
              <AntDesign name="right" size={24} color="gray" />
              </View>
            </TouchableOpacity>
          </View>
        <Text style={{fontFamily:'Sriracha',fontSize:20,paddingLeft:10}}>Advance</Text>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() =>
                setChecker((previous) => ({ ...previous, profile: true }))
              }
              style={styles.button}
            >
              <View style={{flex:1}}>
              <MaterialCommunityIcons
                name="account-group"
                size={30}
                color="black"
              />
            </View>
              <Text style={styles.text}>Account</Text>
              <View style={{flex:1.8}}>
              <AntDesign name="right" size={24} color="gray" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() =>
                setChecker((previous) => ({ ...previous, Emailers: false }))
              }
              style={styles.button}
            >
              <View style={{flex:1}}>
              <Zocial name="email" size={30} color="black" /></View>
              <Text style={styles.text}>Emailers</Text>
              <View style={{flex:1.8}}>
              <AntDesign name="right" size={24} color="gray" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() =>
                setChecker((previous) => ({ ...previous, addreceiver: false }))
              }
              style={styles.button}
            >
              <View style={{flex:1}}>
              <MaterialCommunityIcons
                name="email-plus"
                size={30}
                color="black"
              /></View>
              <Text style={styles.text}>Receiver</Text>
              <View style={{flex:1.8}}>
              <AntDesign name="right" size={24} color="gray" />
              </View>
            </TouchableOpacity>
          </View>
        <Text style={{fontFamily:'Sriracha',fontSize:20,paddingLeft:10}}>Support</Text>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() =>
                setChecker((previous) => ({ ...previous, About: false }))
              }
              style={styles.button}
            >
              <View style={{flex:1}}>
              <AntDesign name="exclamationcircle" size={24} color="black" /></View>
              <Text style={styles.text}>About</Text>
              <View style={{flex:1.8}}>
              <AntDesign name="right" size={24} color="gray" />
              </View>
            </TouchableOpacity>
          </View>
        <Text style={{fontFamily:'Sriracha',fontSize:20,paddingLeft:10}}>Personalization</Text>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() =>
                setChecker((previous) => ({ ...previous, Logout: false }))
              }
              style={styles.button}
            >
              <View style={{flex:1}}>
              <FontAwesome5 name="door-open" size={24} color="black" /></View>
              <Text style={styles.text}>Logout</Text>
              <View style={{flex:1.8}}>
              <AntDesign name="right" size={24} color="gray" />
              </View>
            </TouchableOpacity>
          </View>
        </>
     
    </View>
    
      : !checker.profileDetails?
      <View style={styles.container_sett}>
      <MyComponent onUpdate={BACK} />
      </View>
      :
      checker.profile ? (
        <View style={styles.container_sett}>
      <SetttingsAccountPage onUpdate={handleUser} />
      </View>
    ) : checker.privacy ? (
      <View style={styles.container_sett}>
      <Settingsprivacy onUpdate={handleUser} />
      </View>
    ) : !checker.addreceiver ? (
      <View style={styles.container_sett}>
      <AddUser onUpdate={BACK} data={'home'} />
      </View>
    ) : !checker.Emailers ? (
      <View style={styles.container_sett}>
      <Emailers onUpdate={BACK} />
      </View>
    ) : !checker.About ? (
      <View style={styles.container_sett}>
      <About onUpdate={BACK} />
      </View>
    ) : !checker.Logout ? (
      <View style={styles.container_sett}>
      <Logout onUpdate={BACK} />
      </View>
    ) : (
      <></>

    )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 25,
    width: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  text: { alignSelf: "center", fontSize: 19,fontFamily:'Courgette',color:'black',flex:4 },
  image: { height: 30, width: 30 },
  container_sett:{
    backgroundColor:'white',
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: 30, 
  }
});
export default Setttings;
