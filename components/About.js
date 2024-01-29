import React,{useState,useEffect} from "react";
import * as Font from 'expo-font';
import icon from '../assets/App_logo.png'
import { View, Text, TouchableOpacity, Linking,Image } from "react-native";
const About = ({ onUpdate }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(()=>{
    const loadFont = async () => {
      await Font.loadAsync({
        'Courgette': require('../assets/fonts/Courgette.ttf')
         });
         setFontLoaded(true);
    };

    loadFont();
  },[])
  if (!fontLoaded) {
    return null;
  }
  function handleBack() {
    onUpdate("About", true);
  }
  return (
    <>
      <View style={{ gap: 20 }}>
        <Text style={{ fontSize: 20, textAlign: "center",fontFamily:'Courgette' }}>
          In this app Builded by Sivaprasath2004.
        </Text>
        <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
        <Image source={icon} style={{height:100,width:100,borderRadius:50}} />
        <View style={{justifyContent:'center'}}>
          <Text style={{fontSize:20,fontWeight:900}}>Annoncement Annoncer</Text>
          <Text style={{color:'gray'}}>Sivaprasath</Text>
        </View>
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
        >
          <Text>Visit:</Text>
          <Text
            style={{ color: "blue",textDecorationLine:'underline' }}
            onPress={() =>
              Linking.openURL("https://github.com/Sivaprasath2004")
            }
          >
            https://github.com/Sivaprasath2004
          </Text>
        </View>
        <View style={{ padding: 10, gap: 10 }}>
          <Text style={{ fontWeight: "700" }}>
            Note: This app utilizes email as a means to disseminate messages and
            notifications, efficiently managing a high volume of users and
            addressing potential challenges within the application.
          </Text>
          <Text style={{ fontWeight: "700" }}>
            To enhance the functionality of this application, the primary focus
            has been on incorporating numerous features to facilitate seamless
            communication among various institutions and workplaces, enabling
            the efficient exchange of information. In case of any issues, please
            feel free to contact the app builder for prompt assistance.
          </Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: "600", textAlign: "center" }}>
          Thank You for using the app.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleBack()}
        style={{
          width: "40%",
          color: "black",
          backgroundColor: "black",
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 15,
        }}
      >
        <Text style={{ fontSize: 20, color: "white",fontFamily:'Courgette' }}>
          Back
        </Text>
      </TouchableOpacity>
    </>
  );
};
export default About;
