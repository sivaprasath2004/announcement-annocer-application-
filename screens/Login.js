import React, {cloneElement, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Image,
  Linking
} from "react-native";
import AddUser from "../components/AddUser";
import image from '../assets/login.png'
import * as Font from 'expo-font';
import { MaterialCommunityIcons,AntDesign, Entypo ,Feather} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import HomeLoader from "../components/HomeLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login = () => {
  const navigation = useNavigation();
  const [checker, setChecker] = useState(true);
  const [loading,setloading]=useState({check:false,load:false,loginpage:false,addreceiver:true})
  const [useInput, setUserInput] = useState({});
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
  const Verified = async (account) => {
    await AsyncStorage.setItem("@Annoncement:Annoncer", account.Account);
    await AsyncStorage.setItem("Annoncement:Annoncer", account._id);
    await AsyncStorage.setItem("@AnnoncementUserName",account.UserName);
    await AsyncStorage.setItem("@Annoncement:AnnoncerEmail",account.Email)
    navigation.navigate("Home");
    setUserInput({});
    setloading({})
  };
  const login = async () => {
    if (useInput.Email !== undefined && useInput.Email !== "" &&useInput.Pass !== "" && useInput.Pass !== undefined) {
      try {
        setloading((pre)=>({...pre,load:true,check:false}))
        let response = await axios.post(
          "https://annoncement-annocer-backend.vercel.app/login",
          {
            email: useInput.Email,
            pass: useInput.Pass,
          }
        );
        if (
          response.data.Account === "Admin" ||
          response.data.Account === "SuperUser"
        ) {
          setloading((pre)=>({...pre,check:true,load:false}))
          Verified(response.data);
        } else {
          setloading((pre)=>({...pre,load:false,check:false}))
          setUserInput((previous) => ({ ...previous, Error: response.data }));
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setloading((pre)=>({...pre,check:false,load:false}))
      setUserInput((previous) => ({ ...previous, Error: "Enter the Details" }));
    }
  };
  function BACK(item, value) {
    setloading((previous) => ({ ...previous, [item]: value }));
  }

  return (
   
  <>
  {!loading.loginpage?
    <View
      style={{
        height: "100%",
        top:0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#F4CCCC'
      }}
    >
      <Image  style={{height:'50%',width:'100%',marginTop:-150}} source={image} alt="image" />
      <View
      style={{position:'absolute',width:'100%',shadowColor:'black',elevation:30,borderTopRightRadius:25,borderTopLeftRadius:25,height:300,backgroundColor:'white',bottom:0,justifyContent:'center',alignItems:'center',justifyContent:'space-evenly'}}
      ><Text style={{color:'black',fontWeight:'900',fontSize:30}}>Welcome Back</Text>
      <Text style={{color:'gray',fontWeight:'300',fontSize:16}}>"Discover endless possibilities with our Announcement Announcer app! Simply Get Started  and  Sign In start spreading your messages effortlessly."</Text>
      <Text>
        If you want Anything Issue contac Us <Text style={{color:'blue', textDecorationLine: 'underline'}} onPress={()=>Linking.openURL("https://github.com/Sivaprasath2004")}>Github?</Text>
      </Text>
      <View  style={{width:'90%',height:50,borderRadius:20,
  backgroundColor:'black'
      ,justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity
      onPress={()=>setloading((pre)=>({...pre,loginpage:true,addreceiver:true}))}
      >
        <Text style={{fontSize:20,color:'white',fontFamily:'Courgette'}}>Get started</Text>
        <View style={{position:'absolute',right:-100}}>
        <AntDesign name="arrowright" size={30} color="white" />
        </View>
      </TouchableOpacity>
      </View></View>
      </View> 
    :!loading.addreceiver?
    <View style={{width:'100%',height:'100%',backgroundColor:'#9c9c9c'
    ,justifyContent:'center',alignItems:'center'}}>
      <View style={[styles.design_round,{backgroundColor:'#545454',bottom:20,right:0}]}></View>
      <View style={[styles.design_round,{backgroundColor:'#969696',bottom:60,left:70}]}></View>
      <View style={[styles.design_round,{backgroundColor:'gray',top:15,left:5}]}></View>
      <View style={[styles.design_round,{backgroundColor:'#969696',top:45,right:15}]}>
        </View>
     <AddUser onUpdate={BACK} data={'login'}/>
    </View>:<View
      style={{
        height: "100%",
        top:0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#9c9c9c'
      }}
    >
      <View style={[styles.design_box,{transform:'rotate(15deg)',backgroundColor:'#545454'}]}></View>
      <View style={[styles.design_box,{backgroundColor:'gray',transform:'rotate(35deg)'}]}></View>
      <View style={[styles.design_box,{backgroundColor:'#969696',transform:'rotate(65deg)'}]}>
        </View>
      <View style={{gap:50,justifyContent:'center',alignItems:'center',borderRadius:20,minWidth:350,minHeight:400,backgroundColor:'whitesmoke',shadowColor:'black',elevation:2,}}>
      <Text style={{ fontSize: 28, fontWeight: "900" }}>
        SIGN IN
      </Text>
      <View style={[styles.button, { marginTop: 5 }]}>
        <View style={{width:30,justifyContent:'center',alignItems:'center',height:'100%'}}>
        <MaterialCommunityIcons
          name="account"
          size={26}
          color="black"
        />
        </View>
        <View  style={{width:230}}>
        <TextInput
          style={{top:10,fontSize: 18,paddingRight:10}}
          placeholder="Email"
          value={useInput.Email}
          onChangeText={(text) =>
            setUserInput((previous) => ({ ...previous, Email: text }))
          }
        />
        </View>
      </View>
      <View style={styles.button}>
      <View style={{width:30,justifyContent:'center',alignItems:'center',height:'100%'}}>
        <Entypo name="lock" size={22} color="black"  />
        </View>
        <View  style={{width:200}}>
        <TextInput
          style={{top:10,fontSize: 18,paddingRight:10}}
          placeholder="Password"
          secureTextEntry={checker}
          value={useInput.Pass}
          onChangeText={(text) =>
            setUserInput((previous) => ({ ...previous, Pass: text }))
          }
        />
        </View>
        <View style={{justifyContent:'center',width:30,alignItems:'center',height:'100%'}}>
        <TouchableOpacity
          onPress={() => setChecker(!checker)}
        >
          {checker?
          <Feather name="eye" size={24} color="black" />:
          <Feather name="eye-off" size={24} color="black" />
}
        </TouchableOpacity>
        </View>
      </View>
      
      <View style={{ position:'absolute',top:'85%',right:0,justifyContent: "center", alignItems: "center", gap: 15 }}>
      <Text style={{right:15,color: "red", fontSize: 16 }}>
          {useInput.Error === undefined ? "" : useInput.Error}
        </Text>
        <View style={{flexDirection:'row'}}>
               <TouchableOpacity
          style={{
            backgroundColor: "black",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            flexDirection:'row',
            borderRadius: 15,
            left:-50,
            borderBottomRightRadius:100,
            width: 150,
          }}
          onPress={() => setloading((pre)=>({...pre,addreceiver:false}))}
        >
           <MaterialCommunityIcons
          name="account"
          size={24}
          color="white"
          style={{left:-20}}
        />
          <Text style={{color:'white',fontWeight:'900',fontSize:17}}>Form</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            flexDirection:'row',
            borderRadius: 15,
            borderBottomLeftRadius:100,
            width: 150,
          }}
          onPress={() => login()}
        >
          {!loading.load && !loading.check?<><Text
            style={{ fontWeight: "900", fontSize: 18, color: "whitesmoke" }}
          >
            Sign in
          </Text>
          <View style={{position:'absolute',justifyContent:'center',right:10}}>
          <AntDesign name="arrowright" size={24} color="white" />
          </View></>:
          loading.check?<View style={{position:'absolute',height:30,width:30}}>
            <AntDesign name="checkcircle" size={24} color="green" />
          </View>:
          <View style={{position:'absolute',width:30,height:30}}>
          <HomeLoader />
        </View>}
        </TouchableOpacity>

        </View>
      </View>
      </View>
    </View>
}
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "whitesmoke",
    height: 50,
    width: "80%",
    shadowColor: "black",
    elevation: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 10,
  },
  text: {
    left: 18,
    fontSize: 18,
    width:'70%',
    alignSelf: "center",
    height: "100%",
  },
  image: { left: 10, height: 25, width: 25, alignSelf: "center" },
  design_round:{position:'absolute',minWidth:100,minHeight:100,borderRadius:50,shadowColor:'black',elevation:10,},
  design_box:{position:'absolute',minWidth:380,minHeight:400,shadowColor:'black',elevation:10,}
});
export default Login;
